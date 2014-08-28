package bol.modules;

import dal.Dal;
import bol.BusinessModule;
import bol.Constants;
import bol.Socket;
import bol.util.Response.ResponseMessage;
import bol.util.Response.ResponseObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mysql.jdbc.PreparedStatement;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Section extends BusinessModule implements Serializable {

    public static final String SQL_DELETE = "DELETE FROM system_sections WHERE section_id = ? LIMIT 1";
    public static final String SQL_FETCH = "SELECT * FROM system_sections WHERE section_id = ? LIMIT 1";
    public static final String SQL_LIST = "SELECT * FROM system_sections";
    public static final String SQL_TABLE = "system_sections";
    private static final String SQL_UPDATE = "UPDATE system_sections SET module_id = ?, group_id = ? WHERE section_id = ?";
    private static final String SQL_INSERT = "INSERT INTO system_sections (module_id, group_id) VALUES (?, ?)";
    
    private static final String SQL_FETCH_AUTHORISED_SECTION = "SELECT * FROM system_sections WHERE group_id = ? AND module_id = ?";
    private static final String ERROR_INVALID_ACCESS_PERMISSIONS = "Invalid Access Permissions Defined";
    private static final String ERROR_MODULE_DOESNT_EXIST = "Associated Module Does Not Exist";
    private static final String ERROR_USER_SESSION_EXPIRED = "User Session Expired";
    private static final String MSG_SPAWNED_SECTION = "Spawned Section";
    public static final String PROPERTY_ID = Constants.PROPERTY_SECTION_ID;
    
    private int sectionID;
    private int moduleID;
    private int groupID;

    public Section() {
    }

    public Section(ResultSet data) {
        try {
            super.setEntityState(EntityState.Unchanged);
            this.setSectionID(data.getInt(Constants.DB_FIELD_SECTION_ID));
            this.setModuleID(data.getInt(Constants.DB_FIELD_MODULE_ID));
            this.setGroupID(data.getInt(Constants.DB_FIELD_GROUP_ID));
        } catch (SQLException ex) {
            Logger.getLogger(Section.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Section(JsonObject data) {
        this.setSectionID(data.get(Constants.PROPERTY_SECTION_ID).getAsInt());
        this.setModuleID(data.get(Constants.PROPERTY_MODULE_ID).getAsInt());
        this.setGroupID(data.get(Constants.PROPERTY_GROUP_ID).getAsInt());
    }

    public int getSectionID() {
        return this.sectionID;
    }

    public void setSectionID(int sectionID) {
        this.sectionID = sectionID;
    }

    public int getGroupID() {
        return this.groupID;
    }

    public void setGroupID(int groupID) {
        this.groupID = groupID;
    }

    public int getModuleID() {
        return this.moduleID;
    }

    public void setModuleID(int moduleID) {
        this.moduleID = moduleID;
    }

    public Module getModule() {
        return Socket.<Module>create(new Object[]{this.getModuleID()}, Module.SQL_FETCH, Module.class, Dal.StatmentType.preparedStatment);
    }

    @Override
    protected PreparedStatement insert() throws Exception {
        return Dal.doMutation(new Object[]{this.getModuleID(), this.getGroupID()}, Section.SQL_INSERT);
    }

    @Override
    protected PreparedStatement update() throws Exception {
        return Dal.doMutation(new Object[]{this.getModuleID(), this.getGroupID(), this.getSectionID()}, Section.SQL_UPDATE);
    }

    public static Section getAuthorisedSection(AccessGroup group, int moduleID) {
        return Socket.<Section>create(new Object[]{group.getGroupID(), moduleID}, Section.SQL_FETCH_AUTHORISED_SECTION, Section.class, Dal.StatmentType.preparedStatment);
    }

    @DirectMethod
    public static ResponseObject loadModule(int moduleID) {
        ResponseObject response = new ResponseObject();
        try {
            User user = User.getLoggedInUser();
            if (user != null) {
                AccessGroup group = user.getAccessGroup();
                Section section = Section.getAuthorisedSection(group, moduleID);
                if (section != null) {
                    SessionLog.getCurrentLog().add(section);
                    Module module = section.getModule();
                    if (module != null) {
                        response.setObject(new ResponseModule(module, group));
                        response.setSuccess(true);
                        response.setTitle(Section.MSG_SPAWNED_SECTION);
                        response.setMessage(module.getModuleTitle());
                    } else {
                        throw new Exception(Section.ERROR_MODULE_DOESNT_EXIST);
                    }
                } else {
                    throw new Exception(Section.ERROR_INVALID_ACCESS_PERMISSIONS + group.getGroupID() + " " + moduleID);
                }
            } else {
                throw new Exception(Section.ERROR_USER_SESSION_EXPIRED);
            }
        } catch (Exception ex) {
            response.setSuccess(false);
            response.setMessage(ex.getMessage());
        }
        return response;
    }

    public static class ResponseModule {

        private Module module;

        public ResponseModule(Module module, AccessGroup group) {
            this.setModule(module);
        }

        public Module getModule() {
            return this.module;
        }

        public void setModule(Module module) {
            this.module = module;
        }
    }
}
