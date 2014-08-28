package bol.modules;

import dal.Dal;
import bol.BusinessModule;
import bol.Constants;
import bol.Socket;
import bol.util.Response.ResponseMessage;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.mysql.jdbc.PreparedStatement;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import java.io.Serializable;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Graph extends BusinessModule implements Serializable {

    public static final String SQL_DELETE = "DELETE FROM graphs WHERE graph_id = ? LIMIT 1";
    public static final String SQL_FETCH = "SELECT * FROM graphs WHERE graph_id = ? LIMIT 1";
    public static final String SQL_LIST = "SELECT * FROM graphs ORDER BY graph_order ASC";
    public static final String SQL_TABLE = "graphs";
    private static final String SQL_UPDATE = "UPDATE graphs SET graph_name = ?, graph_source = ? WHERE graph_id = ?";
    private static final String SQL_INSERT = "INSERT INTO graphs (graph_name, graph_source) VALUES (?, ?)";
    public static final String PROPERTY_ID = Constants.PROPERTY_GRAPH_ID;
    
    private int graphID;
    private String graphName;
    private String graphSource;

    public Graph() {
    }

    public Graph(ResultSet data) {
        try {
            super.setEntityState(EntityState.Unchanged);
            this.setGraphID(data.getInt(Constants.DB_FIELD_GRAPH_ID));
            this.setGraphName(data.getString(Constants.DB_FIELD_GRAPH_NAME));
            this.setGraphSource(data.getString(Constants.DB_FIELD_GRAPH_SOURCE));
        } catch (SQLException ex) {
            Logger.getLogger(Section.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public Graph(JsonObject data) {
        this.setGraphID(data.get(Constants.PROPERTY_GRAPH_ID).getAsInt());
        this.setGraphName(data.get(Constants.PROPERTY_GRAPH_NAME).getAsString());
        this.setGraphSource(data.get(Constants.PROPERTY_GRAPH_SOURCE).getAsString());
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
    
    public String getGraphSource() {
        return this.graphSource;
    }

    public void setGraphSource(String graphSource) {
        this.graphSource = graphSource;
    }

    @Override
    protected PreparedStatement insert() throws Exception {
        return Dal.doMutation(new Object[]{this.getGraphName(), this.getGraphSource()}, Graph.SQL_INSERT);
    }

    @Override
    protected PreparedStatement update() throws Exception {
        return Dal.doMutation(new Object[]{this.getGraphName(), this.getGraphSource(), this.getGraphID()}, Graph.SQL_UPDATE);
    }
}

