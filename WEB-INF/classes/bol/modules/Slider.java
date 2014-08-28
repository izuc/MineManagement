package bol.modules;

import bol.BusinessModule;
import bol.Constants;
import bol.Socket;
import bol.util.Response.ResponseMessage;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mysql.jdbc.PreparedStatement;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import dal.Dal;
import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Slider extends BusinessModule implements Serializable {

    public static final String SQL_DELETE = "DELETE FROM slider WHERE slider_id = ? LIMIT 1";
    public static final String SQL_FETCH = "SELECT * FROM slider WHERE slider_id = ? LIMIT 1";
    public static final String SQL_LIST = "SELECT * FROM slider INNER JOIN graphs ON graphs.graph_id = slider.graph_id ORDER BY graphs.graph_name ASC";
    public static final String SQL_LIST_USER = "SELECT * FROM slider INNER JOIN graphs ON graphs.graph_id = slider.graph_id WHERE slider.user_id = ? ORDER BY graphs.graph_name ASC";
    public static final String SQL_TABLE = "slider";
    private static final String SQL_UPDATE = "UPDATE slider SET user_id = ?, graph_id = ? WHERE slider_id = ?";
    private static final String SQL_INSERT = "INSERT INTO slider (user_id, graph_id) VALUES (?, ?)";
    public static final String PROPERTY_ID = Constants.PROPERTY_SLIDER_ID;
    
    private int sliderID;
    private int userID;
    private int graphID;
    private String graphName;

    public Slider() {
    }

    public Slider(ResultSet data) {
        try {
            super.setEntityState(EntityState.Unchanged);
            this.setSliderID(data.getInt(Constants.DB_FIELD_SLIDER_ID));
            this.setUserID(data.getInt(Constants.DB_FIELD_USER_ID));
            this.setGraphID(data.getInt(Constants.DB_FIELD_GRAPH_ID));
            this.setGraphName(data.getString(Constants.DB_FIELD_GRAPH_NAME));
        } catch (SQLException ex) {
            Logger.getLogger(Section.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Slider(JsonObject data) {       
        this.setSliderID(data.get(Constants.PROPERTY_SLIDER_ID).getAsInt());
        this.setUserID(data.get(Constants.PROPERTY_USER_ID).getAsInt());
        this.setGraphID(data.get(Constants.PROPERTY_GRAPH_ID).getAsInt());
    }
    
    public int getSliderID() {
        return this.sliderID;
    }

    public void setSliderID(int sliderID) {
        this.sliderID = sliderID;
    }
    
    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public int getGraphID() {
        return this.graphID;
    }

    public void setGraphID(int graphID) {
        this.graphID = graphID;
    }
    
    public String getGraphName() {
        return this.graphName;
    }

    public void setGraphName(String graphName) {
        this.graphName = graphName;
    }
    
     @DirectMethod
    public ArrayList userList(int user_id) throws Exception {
        return Socket.list(new Object[]{user_id}, Slider.SQL_LIST_USER, Slider.class, Dal.StatmentType.preparedStatment);
    }

    @Override
    protected PreparedStatement insert() throws Exception {
        return Dal.doMutation(new Object[]{this.getUserID(), this.getGraphID()}, Slider.SQL_INSERT);
    }

    @Override
    protected PreparedStatement update() throws Exception {
        return Dal.doMutation(new Object[]{this.getUserID(), this.getGraphID(), this.getSliderID()}, Slider.SQL_UPDATE);
    }
}

