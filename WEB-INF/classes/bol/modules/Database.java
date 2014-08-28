package bol.modules;


import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import dal.SiteDal;
import java.security.SecureRandom;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class Database {
    
    private static volatile SecureRandom numberGenerator = null;
    private static final long MSB = 0x8000000000000000L;
    
    public static String genRandom32Hex() {
        SecureRandom ng = numberGenerator;
        if (ng == null) {
            numberGenerator = ng = new SecureRandom();
        }

        return Long.toHexString(MSB | ng.nextLong()) + Long.toHexString(MSB | ng.nextLong());
    }
    
    @DirectMethod
    public static ArrayList<ResponseTable> getTables() {
        ArrayList<ResponseTable> list = new ArrayList<ResponseTable>();
        
        try {
            
            ResultSet records = SiteDal.doQuery("SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_TYPE = 'BASE TABLE';");
            while (records.next()) {
                String name = records.getString(1);
                list.add(new ResponseTable(name, true, true));
            }
            
        } catch (SQLException ex) {

        }
        
        return list;
    }
    
    
    @DirectMethod
    public static ArrayList<ResponseTableData> getTable(JsonArray data) {
        ArrayList<ResponseTableData> list = new ArrayList<ResponseTableData>();
        
        try {
            JsonObject obj = data.get(0).getAsJsonObject();
            String tablename = obj.get("tablename").getAsString();
            
            list.add(new ResponseTableData("*", "", Database.genRandom32Hex(), "", tablename, ""));
            
            ResultSet records = SiteDal.doQuery("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = N'" + tablename + "';");
            while (records.next()) {
                String field = records.getString("COLUMN_NAME");
                String type = records.getString("DATA_TYPE");
                String id = Database.genRandom32Hex();
                list.add(new ResponseTableData(field, "", id, "", tablename, type));
            }
            
        } catch (SQLException ex) {

        }
        
        return list;
    }
    
    public static class ResponseTableData {

        private String field;
        private String extra;
        private String id;
        private String key;
        private String tableName;
        private String type;

        public ResponseTableData(String field, String extra, String id, String key, String tableName, String type) {
            this.setField(field);
            this.setExtra(extra);
            this.setId(id);
            this.setKey(key);
            this.setTableName(tableName);
            this.setType(type);
        }
        
        public String getField() {
            return this.field;
        }
        
        public void setField(String field) {
            this.field = field;
        }
        
        public String getExtra() {
            return this.extra;
        }
        
        public void setExtra(String extra) {
            this.extra = extra;
        }
        
        public String getId() {
            return this.id;
        }
        
        public void setId(String id) {
            this.id = id;
        }
        
        public String getKey() {
            return this.key;
        }
        
        public void setKey(String key) {
            this.key = key;
        }
        
        public String getTableName() {
            return this.tableName;
        }
        
        public void setTableName(String tableName) {
            this.tableName = tableName;
        }
        
        public String getType() {
            return this.type;
        }
        
        public void setType(String type) {
            this.type = type;
        }

        
    }
    
    
    public static class ResponseTable {

        private String text;
        private boolean allowDrop;
        private boolean leaf;

        public ResponseTable(String text, boolean allowDrop, boolean leaf) {
            this.setText(text);
            this.setAllowDrop(allowDrop);
            this.setLeaf(leaf);
        }
        
        public String getText() {
            return this.text;
        }
        
        public void setText(String text) {
            this.text = text;
        }
        
        public boolean getAllowDrop() {
            return this.allowDrop;
        }
        
        public void setAllowDrop(boolean allowDrop) {
            this.allowDrop = allowDrop;
        }
        
        public boolean getLeaf() {
            return this.leaf;
        }
        
        public void setLeaf(boolean leaf) {
            this.leaf = leaf;
        }

    }
    
}
