package bol.modules;

import bol.BusinessModule;
import bol.Constants;
import bol.Socket;
import bol.util.Response.ResponseMessage;
import bol.util.Response.ResponseObject;
import bol.util.Response.ResponseType;
import com.google.gson.JsonArray;
import com.jgoodies.common.base.Strings;
import com.softwarementors.extjs.djn.config.annotations.DirectFormPostMethod;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import com.softwarementors.extjs.djn.servlet.ssm.WebContextManager;
import dal.Dal;
import java.io.IOException;
import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpSession;
import org.apache.commons.fileupload.FileItem;

public class User extends BusinessModule implements Serializable {

    public static final String SQL_UPDATE = "UPDATE system_user_accounts SET group_id = ?, user_name = ?, full_name = ?, user_type = ? WHERE user_id = ?";
    public static final String SQL_INSERT = "INSERT INTO system_user_accounts (group_id, user_name, full_name, user_password, user_type) VALUES (?, ?, ?, SHA1(?), ?)";
    public static final String SQL_DELETE = "DELETE FROM system_user_accounts WHERE user_id = ? LIMIT 1";
    public static final String SQL_FETCH = "SELECT * FROM system_user_accounts WHERE user_id = ? LIMIT 1";
    public static final String SQL_LIST = "SELECT * FROM system_user_accounts";
    public static final String SQL_TABLE = "system_user_accounts";
    private static final String ERR_PASSWORD_REQUIRED = "You must include a password when creating a new record";
    private static final String ERR_USERNAME_TAKEN = "User name is already taken";
    private static final String LOGOUT_MSG = "You have successfully logged out";
    private static final String LOGOUT_TITLE = "Goodbye";
    private static final String SQL_LOGIN_USER = "SELECT * FROM system_user_accounts WHERE user_name = ? AND user_password = SHA1(?)";
    private static final String SQL_CHANGE_PASSWORD = "UPDATE system_user_accounts SET user_password = SHA1(?) WHERE user_id = ?";
    private static final String SQL_CHECK_USERNAME = "SELECT user_id, user_name FROM system_user_accounts WHERE user_name = ? AND user_id != ?";
    private static final String ERROR_INVALID_CREDENTIALS = "You have supplied invalid user credentials";
    private static final String ERROR_LOGIN_FAILED = "Login Failed";
    private static final String MSG_LOGIN_SUCCESS = "Login Success";
    private static final String MSG_NOW_AUTHENTICATED = "You are now authenticated";
    private static final String REGEX_PASSWORD = "^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9_-]{8,15}$";
    private static final String ERR_PASSWORD_DOESNT_MATCH = "Confirmation password does not match";
    private static final String ERR_PASSWORD_STRENGTH = "Password must be 8-15 alphanumeric characters (can contain hyphens and underscores)";
    public static final String PROPERTY_ID = Constants.PROPERTY_USER_ID;
    
    public enum UserType {

        Normal, Admin
    };
    private int userID;
    private String userName;
    private String password;
    private String confirmationPassword;
    private int groupID;
    private String fullName;
    private int userType;

    public User() {
    }

    public User(ResultSet data) {
        try {
            super.setEntityState(EntityState.Unchanged);
            this.setUserID(data.getInt(Constants.DB_FIELD_USER_ID));
            this.setGroupID(data.getInt(Constants.DB_FIELD_GROUP_ID));
            this.setUserName(data.getString(Constants.DB_FIELD_USER_NAME));
            this.setUserType(data.getInt(Constants.DB_FIELD_USER_TYPE));
            this.setFullName(data.getString(Constants.DB_FIELD_FULL_NAME));
        } catch (SQLException ex) {
            Logger.getLogger(User.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        if (this.isUserNameValid(userName)) {
            this.userName = userName;
        }
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        if (this.isPasswordValid(password)) {
            this.password = password;
        }
    }

    public String getConfirmationPassword() {
        return confirmationPassword;
    }

    public void setConfirmationPassword(String confirmationPassword) {
        this.confirmationPassword = confirmationPassword;
    }

    public int getGroupID() {
        return this.groupID;
    }

    public void setGroupID(int groupID) {
        this.groupID = groupID;
    }

    public int getUserType() {
        return this.userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }
    
    public String getFullName() {
        return this.fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public AccessGroup getAccessGroup() {
        return Socket.<AccessGroup>create(new Object[]{this.getGroupID()}, AccessGroup.SQL_FETCH, AccessGroup.class, Dal.StatmentType.preparedStatment);
    }

    public boolean isAdminAccount() {
        return (User.UserType.values()[this.getUserType()] == User.UserType.Admin);
    }

    private boolean isUserNameValid(String userName) {
        if (this.getEntityState() != EntityState.Unchanged) {
            if (this.getValidation().validateRequired(Constants.PROPERTY_USER_NAME, userName) && this.getValidation().validateLength(Constants.PROPERTY_USER_NAME, userName, 5, 15)) {
                try {
                    ResultSet records = Dal.doQuery(new Object[]{userName, this.getUserID()}, SQL_CHECK_USERNAME, Dal.StatmentType.preparedStatment);
                    if (Dal.hasRows(records)) {
                        this.getValidation().put(Constants.PROPERTY_USER_NAME, ERR_USERNAME_TAKEN);
                        return false;
                    }
                } catch (SQLException ex) {
                    Logger.getLogger(User.class.getName()).log(Level.SEVERE, null, ex);
                    return false;
                }
            } else {
                return false;
            }
        }
        return true;
    }

    private boolean isPasswordValid(String password) {
        if (this.getEntityState() != EntityState.Unchanged) {
            if (Strings.isNotBlank(password)) {
                if (password.equals(this.getConfirmationPassword())) {
                    if (!password.matches(REGEX_PASSWORD)) {
                        this.getValidation().put(Constants.PROPERTY_PASSWORD, ERR_PASSWORD_STRENGTH);
                        return false;
                    }
                } else {
                    this.getValidation().put(Constants.PROPERTY_PASSWORD, ERR_PASSWORD_DOESNT_MATCH);
                    return false;
                }
            } else {
                if (this.getEntityState() == EntityState.Added) {
                    this.getValidation().put(Constants.PROPERTY_PASSWORD, ERR_PASSWORD_REQUIRED);
                    return false;
                }
            }
        }
        return true;
    }

    @DirectMethod
    public static ResponseMessage doLogout() {
        ResponseMessage response = new ResponseMessage();
        WebContextManager.get().getSession().invalidate();
        response.setTitle(LOGOUT_TITLE);
        response.setMessage(LOGOUT_MSG);
        return response;
    }

    @DirectFormPostMethod
    public static ResponseObject doLogin(Map<String, String> formParameters, Map<String, FileItem> fileFields) throws IOException {
        User user = (User) Socket.<User>create(new Object[]{formParameters.get(Constants.PROPERTY_USER_NAME), formParameters.get(Constants.PROPERTY_PASSWORD)}, User.SQL_LOGIN_USER, User.class, Dal.StatmentType.preparedStatment);
        ResponseObject response = new ResponseObject();
        HttpSession session = WebContextManager.get().getSession();
        if (user != null) {
            response.setSuccess(true);
            response.setTitle(MSG_LOGIN_SUCCESS);
            response.setMessage(MSG_NOW_AUTHENTICATED);
            response.setObject(user);
            session.setAttribute(Constants.SESSION_USER_PROPERTY, user);
            session.setAttribute(Constants.SESSION_LOG_PROPERTY, SessionLog.create(user));
        } else {
            response.setSuccess(false);
            response.setTitle(ERROR_LOGIN_FAILED);
            response.setMessage(ERROR_INVALID_CREDENTIALS);
        }
        return response;
    }

    @DirectMethod
    public static User getLoggedInUser() {
        HttpSession session = WebContextManager.get().getSession();
        return (User)session.getAttribute(Constants.SESSION_USER_PROPERTY);
    }

    @DirectMethod
    public static ArrayList<ResponseType> userTypes() {
        return ResponseType.<UserType>create(UserType.values());
    }
    
    @Override
    protected PreparedStatement insert() throws Exception {
        return Dal.doMutation(new Object[]{this.getGroupID(), this.getUserName(), this.getFullName(), this.getPassword(), this.getUserType()}, User.SQL_INSERT);
    }

    @Override
    protected PreparedStatement update() throws Exception {
        PreparedStatement update = Dal.doMutation(new Object[]{this.getGroupID(), this.getUserName(), this.getFullName(), this.getUserType(), this.getUserID()}, User.SQL_UPDATE);
        if (!this.getPassword().isEmpty()) {
            Dal.doMutation(new Object[]{this.getPassword(), this.getUserID()}, User.SQL_CHANGE_PASSWORD);
        }
        return update;
    }
}