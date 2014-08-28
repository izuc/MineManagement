package bol.modules;

import dal.Dal;
import bol.BusinessModule;
import bol.Constants;

import com.google.gson.JsonObject;
import com.mysql.jdbc.PreparedStatement;
import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Realtime extends BusinessModule implements Serializable {

    public static final String SQL_DELETE = "DELETE FROM realtime WHERE realtime_id = ? LIMIT 1";
    public static final String SQL_FETCH = "SELECT * FROM realtime WHERE realtime_id = ? LIMIT 1";
    public static final String SQL_LIST = "SELECT * FROM realtime ORDER BY realtime_order ASC";
    public static final String SQL_TABLE = "realtime";
    private static final String SQL_UPDATE = "UPDATE realtime SET realtime_name = ?, realtime_source = ? WHERE realtime_id = ?";
    private static final String SQL_INSERT = "INSERT INTO realtime (realtime_name, realtime_source) VALUES (?, ?)";
    public static final String PROPERTY_ID = Constants.PROPERTY_REALTIME_ID;
    
    private int realtimeID;
    private String realtimeName;
    private String realtimeSource;

    public Realtime() {
    }

    public Realtime(ResultSet data) {
        try {
            super.setEntityState(EntityState.Unchanged);
            this.setRealtimeID(data.getInt(Constants.DB_FIELD_REALTIME_ID));
            this.setRealtimeName(data.getString(Constants.DB_FIELD_REALTIME_NAME));
            this.setRealtimeSource(data.getString(Constants.DB_FIELD_REALTIME_SOURCE));
        } catch (SQLException ex) {
            Logger.getLogger(Section.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Realtime(JsonObject data) {
        this.setRealtimeID(data.get(Constants.PROPERTY_REALTIME_ID).getAsInt());
        this.setRealtimeName(data.get(Constants.PROPERTY_REALTIME_NAME).getAsString());
        this.setRealtimeSource(data.get(Constants.PROPERTY_REALTIME_SOURCE).getAsString());
    }

    public int getRealtimeID() {
        return this.realtimeID;
    }

    public void setRealtimeID(int realtimeID) {
        this.realtimeID = realtimeID;
    }

    public String getRealtimeName() {
        return this.realtimeName;
    }

    public void setRealtimeName(String realtimeName) {
        this.realtimeName = realtimeName;
    }
    
    public String getRealtimeSource() {
        return this.realtimeSource;
    }

    public void setRealtimeSource(String realtimeSource) {
        this.realtimeSource = realtimeSource;
    }

    @Override
    protected PreparedStatement insert() throws Exception {
        return Dal.doMutation(new Object[]{this.getRealtimeName(), this.getRealtimeSource()}, Realtime.SQL_INSERT);
    }

    @Override
    protected PreparedStatement update() throws Exception {
        return Dal.doMutation(new Object[]{this.getRealtimeName(), this.getRealtimeSource(), this.getRealtimeID()}, Realtime.SQL_UPDATE);
    }
}

