package bol;

import bol.modules.User;
import bol.util.Response;
import bol.util.Response.ResponseSubmission;
import java.util.Map;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.fileupload.FileItem;
import bol.util.Response.ResponseList;
import bol.util.Response.ResponseObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.jgoodies.common.base.Strings;
import com.jgoodies.validation.util.ValidationUtils;
import com.softwarementors.extjs.djn.config.annotations.DirectFormPostMethod;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;

import dal.Dal;
import java.sql.PreparedStatement;
import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.Level;
import java.util.logging.Logger;

public abstract class BusinessModule {

    private static final String CONSTANT_SQL_TABLE = "SQL_TABLE";
    private static final String CONSTANT_SQL_FETCH = "SQL_FETCH";
    private static final String CONSTANT_SQL_LIST = "SQL_LIST";
    private static final String CONSTANT_SQL_DELETE = "SQL_DELETE";
    private static final String CONSTANT_PROPERTY_ID = "PROPERTY_ID";
    private static final String ENTITY_STATE = "entity";    
    
    private EntityState entityState;
    private Validation validation = new Validation();

    public enum EntityState {

        Added, Modified, Unchanged
    };

    protected Validation getValidation() {
        return this.validation;
    }

    public EntityState getEntityState() {
        return this.entityState;
    }

    public void setEntityState(EntityState entityState) {
        this.entityState = entityState;
    }

    @DirectMethod
    public ResponseObject create(int identifier) throws Exception {
        ResponseObject response = new ResponseObject();
        response.setObject(Socket.create(new Object[]{identifier}, this.getClass().getField(BusinessModule.CONSTANT_SQL_FETCH).get(null).toString(), this.getClass(), Dal.StatmentType.preparedStatment));
        response.setSuccess(true);
        return response;
    }

    @DirectMethod
    public void remove(int identifier) throws Exception {
        Dal.doMutation(new Object[]{identifier}, this.getClass().getField(BusinessModule.CONSTANT_SQL_DELETE).get(null).toString());
    }

    @DirectMethod
    public ArrayList list() throws Exception {
        return Socket.list(new Object[]{}, this.getClass().getField(BusinessModule.CONSTANT_SQL_LIST).get(null).toString(), this.getClass(), Dal.StatmentType.preparedStatment);
    }

    @DirectMethod
    public ResponseList pagination(int start, int limit, String sort, String direction, String where) throws Exception {
        return Socket.pagination(this.getClass().getField(BusinessModule.CONSTANT_SQL_TABLE).get(null).toString(), this.getClass(), start, limit, sort, direction, where);
    }

    @DirectFormPostMethod
    public ResponseSubmission commit(Map<String, String> formParameters, Map<String, FileItem> fileFields) {
        ResponseSubmission response = new ResponseSubmission();
        try {
            User user = User.getLoggedInUser();
                if (user != null) {
                    
                    ArrayList<String> names = new ArrayList<String>();
                    for (Map.Entry<String, String> entry : formParameters.entrySet()) {
                        if (entry.getKey().contains(Constants.INPUT_EL)) {
                            names.add(entry.getKey());
                        }
                    }
                    for (String name : names) {
                        String new_name = name.replace(Constants.INPUT_EL, Constants.EMPTY_STRING);
                        String value = formParameters.remove(name);
                        formParameters.put(new_name, value);
                    }
                    
                    BusinessModule instance = this.getClass().newInstance();
                    instance.setEntityState(EntityState.values()[Integer.valueOf(formParameters.get(BusinessModule.ENTITY_STATE))]);
                    BeanUtils.populate(instance, formParameters);
                    
                    if (instance.getValidation().isValid()) {
                        instance.save(formParameters, fileFields);
                    }
                    response.setErrors(instance.getValidation());
                    response.setSuccess(instance.getValidation().isValid());
                    response.setMessage(response.isSuccess() ? Constants.MSG_SAVE_SUCCESS : Constants.MSG_SAVE_FAILED);
                    response.setTitle(response.isSuccess() ? Constants.TITLE_SAVE_SUCCESS : Constants.TITLE_SAVE_FAILED);
                }
        } catch (Exception ex) {
            Logger.getLogger(BusinessModule.class.getName()).log(Level.SEVERE, null, ex);
            response.setMessage(ex.getMessage());
            response.setTitle(Constants.TITLE_SAVE_FAILED);
            response.setSuccess(false);
        }
        return response;
    }
    
    @DirectMethod
    public Response.ResponseMessage saveData(JsonArray json) throws Exception {
        return Socket.saveData(json.get(0).getAsJsonObject(), this.getClass().getField(BusinessModule.CONSTANT_PROPERTY_ID).get(null).toString(), this.getClass());
    }
    
    @DirectMethod
    public void delete(JsonArray json) throws Exception {
        JsonObject obj = json.get(0).getAsJsonObject();
        Dal.doMutation(new Object[]{obj.get(this.getClass().getField(BusinessModule.CONSTANT_PROPERTY_ID).get(null).toString()).getAsInt()}, 
                this.getClass().getField(BusinessModule.CONSTANT_SQL_DELETE).get(null).toString());
    }

    abstract protected PreparedStatement insert() throws Exception;

    abstract protected PreparedStatement update() throws Exception;

    /**
     * The default save method. It is overridden in the sub classes where manipulation 
     * using the formParameters, or fileFields are required. The method executes the abstract insert or update
     * methods depending on the state of the object. This method is only used when the commit DirectFormPostMethod has been triggered.
     * @param formParameters
     * @param fileFields
     */
    public void save(Map<String, String> formParameters, Map<String, FileItem> fileFields) throws Exception {
        switch (this.getEntityState()) {
            case Added:
                this.insert();
                break;
            case Modified:
                this.update();
                break;
        }
    }

    public static class Validation extends HashMap<String, String> {

        public static final String ERR_REQUIRED = "The field {0} is required.";
        public static final String ERR_LETTERS_ONLY = "The field {0} can only be letters";
        public static final String ERR_LENGTH = "The field {0} must be {1}-{2} characters in length";

        public Validation() {
            // This is required in order for an empty HashMap to be serialised properly.
            this.put(Constants.EMPTY_STRING, Constants.EMPTY_STRING);
        }

        public void addError(String propertyName, String error, Object[] array) {
            MessageFormat message = new MessageFormat(error);
            this.put(propertyName, message.format(array));
        }

        public boolean validateLettersOnly(String propertyName, String value) {
            if (!ValidationUtils.isAlpha(value)) {
                this.addError(propertyName, Validation.ERR_LETTERS_ONLY, new Object[]{propertyName});
                return false;
            }
            return true;
        }

        public boolean validateRequired(String propertyName, String value) {
            if (Strings.isBlank(value)) {
                this.addError(propertyName, Validation.ERR_REQUIRED, new Object[]{propertyName});
                return false;
            }
            return true;
        }

        public boolean validateLength(String propertyName, String value, int min, int max) {
            if (!ValidationUtils.hasBoundedLength(value, min, max)) {
                this.addError(propertyName, Validation.ERR_LENGTH, new Object[]{propertyName, min, max});
                return false;
            }
            return true;
        }

        public boolean isValid() {
            return (this.size() == 1);
        }
    }
}
