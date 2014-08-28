package bol.modules;

import bol.BusinessModule;
import bol.Constants;
import bol.util.Response;
import com.google.gson.JsonArray;
import dal.Dal;

import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class AccessGroup extends BusinessModule implements Serializable {

    public static final String SQL_UPDATE = "UPDATE system_access_groups SET group_name = ?, group_description  = ? WHERE group_id = ?";
    public static final String SQL_INSERT = "INSERT INTO system_access_groups (group_name, group_description) VALUES (?, ?, ?)";
    public static final String SQL_DELETE = "DELETE FROM system_access_groups WHERE group_id = ? LIMIT 1";
    public static final String SQL_FETCH = "SELECT * FROM system_access_groups WHERE group_id = ? LIMIT 1";
    public static final String SQL_LIST = "SELECT * FROM system_access_groups ORDER BY group_name ASC";
    public static final String SQL_TABLE = "system_access_groups";
    public static final String PROPERTY_ID = Constants.PROPERTY_GROUP_ID;

    private int groupID;
    private String groupName;
    private String groupDescription;

    public AccessGroup() {
    }

    public AccessGroup(ResultSet data) {
        try {
            super.setEntityState(EntityState.Unchanged);
            this.setGroupID(data.getInt(Constants.DB_FIELD_GROUP_ID));
            this.setGroupName(data.getString(Constants.DB_FIELD_GROUP_NAME));
            this.setGroupDescription(data.getString(Constants.DB_FIELD_GROUP_DESCRIPTION));
        } catch (SQLException ex) {
            Logger.getLogger(AccessGroup.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public int getGroupID() {
        return this.groupID;
    }

    public void setGroupID(int groupID) {
        this.groupID = groupID;
    }

    public String getGroupName() {
        return this.groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupDescription() {
        return this.groupDescription;
    }

    public void setGroupDescription(String groupDescription) {
        this.groupDescription = groupDescription;
    }

    @Override
    protected PreparedStatement insert() throws Exception {
        return Dal.doMutation(new Object[]{this.getGroupName(), this.getGroupDescription()}, AccessGroup.SQL_INSERT);
    }

    @Override
    protected PreparedStatement update() throws Exception {
        return Dal.doMutation(new Object[]{this.getGroupName(), this.getGroupDescription(), this.getGroupID()}, AccessGroup.SQL_UPDATE);
    }
}