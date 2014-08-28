package bol.modules;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import dal.SiteDal;
import java.sql.ResultSet;

public class Loads {
   
    @DirectMethod
    public JsonArray list() throws Exception {
        ResultSet records = SiteDal.doQuery("SELECT rt.shiftdate, SUM(l.measureton) as tons "
                + "FROM hist_exproot rt INNER JOIN hist_loads l ON rt.shiftindex = l.shiftindex\n" +
                    "GROUP BY rt.shiftdate");
        
        JsonArray json = new JsonArray();
        
        while (records.next()) {
            JsonObject jo = new JsonObject();
            jo.addProperty("shiftdate", records.getString("shiftdate"));
            jo.addProperty("tons", records.getDouble("tons"));
            json.add(jo);
        }
        
        return json;
    }
    
}
