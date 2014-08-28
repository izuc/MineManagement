package bol;

import bol.modules.User;
import bol.util.Response.ResponseList;
import bol.util.Response.ResponseMessage;
import com.google.gson.JsonObject;
import dal.Dal;
import dal.Dal.StatmentType;
import java.lang.reflect.Constructor;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Socket {

    private static <E> void processResult(ArrayList<E> list, ResultSet records, Class clazz) throws Exception {
        Constructor constructor = clazz.getConstructor(ResultSet.class);
        while (records.next()) {
            list.add((E) constructor.newInstance(records));
        }
    }

    public static <E> E create(Object[] parameters, String statement, Class clazz, StatmentType type) {
        try {
            Constructor constructor = clazz.getConstructor(ResultSet.class);
            ResultSet records = Dal.doQuery(parameters, statement, type);
            return (Dal.hasRows(records) ? (E) constructor.newInstance(records) : null);
        } catch (Exception ex) {
            Logger.getLogger(Socket.class.getName()).log(Level.SEVERE, null, ex);
        }
        return null;
    }

    public static <E> ResponseList pagination(String table, Class clazz, int start, int limit, String sort, String direction, String where) {
        ResponseList response = new ResponseList();
        try {
            response.setData(new ArrayList<E>());
            response.setTotalRows(Dal.getCount(table, where));
            Socket.<E>processResult((ArrayList<E>) response.getData(), Dal.doQuery(String.format("SELECT * FROM %s%s ORDER BY %s %s LIMIT %d, %d", table, where, sort, direction, start, limit)), clazz);
            response.setSuccess(true);
        } catch (Exception ex) {
            Logger.getLogger(BusinessModule.class.getName()).log(Level.SEVERE, null, ex);
            response.setSuccess(false);
            response.setMessage(ex.getMessage());
        }
        return response;
    }

    public static <E> ArrayList<E> list(Object[] parameters, String statement, Class clazz, StatmentType type) {
        ArrayList<E> list = new ArrayList<E>();
        try {
            ResultSet records = Dal.doQuery(parameters, statement, type);
            Socket.<E>processResult(list, records, clazz);
        } catch (Exception ex) {
            Logger.getLogger(BusinessModule.class.getName()).log(Level.SEVERE, null, ex);
        }
        return list;
    }

    public static ResponseMessage saveData(JsonObject data, String propertyID, Class clazz) {
        ResponseMessage response = new ResponseMessage();
        try {
            User user = User.getLoggedInUser();
            if (user != null) {
                Constructor constructor = clazz.getConstructor(JsonObject.class);
                BusinessModule object = (BusinessModule) constructor.newInstance(data);
                if (data.get(propertyID).getAsInt() == 0) object.insert(); else object.update();
                response.setTitle(Constants.TITLE_SAVE_SUCCESS);
                response.setMessage(Constants.MSG_SAVE_SUCCESS);
                response.setSuccess(true);
            } else {
                response.setTitle(Constants.TITLE_SAVE_SUCCESS);
                response.setMessage(Constants.MSG_NOT_LOGGED_IN);
                response.setSuccess(false);
            }
        } catch (Exception ex) {
            Logger.getLogger(clazz.getName()).log(Level.SEVERE, null, ex);
            response.setTitle(Constants.TITLE_SAVE_FAILED);
            response.setMessage(ex.getMessage() + Constants.SPACE + data.toString());
            response.setSuccess(false);
        }
        return response;
    }
}
