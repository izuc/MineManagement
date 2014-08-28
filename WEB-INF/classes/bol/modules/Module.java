package bol.modules;

import bol.BusinessModule;
import bol.Constants;
import bol.Socket;
import bol.util.Response.ResponseType;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import dal.Dal;
import java.io.File;
import java.io.Serializable;
import java.net.URLDecoder;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Module extends BusinessModule implements Serializable {

    public static final String SQL_FETCH = "SELECT * FROM system_modules WHERE module_id = ? LIMIT 1";
    public static final String SQL_DELETE = "DELETE FROM system_modules WHERE module_id = ? LIMIT 1";
    public static final String SQL_LIST = "SELECT * FROM system_modules m INNER JOIN system_sections s ON s.module_id = m.module_id WHERE s.group_id = ? ORDER BY m.module_order ASC";
    public static final String SQL_TABLE = "system_modules";
    private static final String SQL_UPDATE = "UPDATE system_modules SET module_title = ?, module_icon = ?, module_source = ?, WHERE module_id = ?";
    private static final String SQL_INSERT = "INSERT INTO system_modules (module_title, module_icon, module_source) VALUES (?, ?, ?, ?)";
    public static final String PROPERTY_ID = Constants.PROPERTY_MODULE_ID;
    
    private int moduleID;
    private String moduleTitle;
    private String moduleIcon;
    private String moduleSource;

    public Module() {
    }

    public Module(ResultSet data) {
        try {
            super.setEntityState(EntityState.Unchanged);
            this.setModuleID(data.getInt(Constants.DB_FIELD_MODULE_ID));
            this.setModuleTitle(data.getString(Constants.DB_FIELD_MODULE_TITLE));
            this.setModuleIcon(data.getString(Constants.DB_FIELD_MODULE_ICON));
            this.setModuleSource(data.getString(Constants.DB_FIELD_MODULE_SOURCE));
        } catch (SQLException ex) {
            Logger.getLogger(Module.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public int getModuleID() {
        return this.moduleID;
    }

    public void setModuleID(int moduleID) {
        this.moduleID = moduleID;
    }

    public String getModuleTitle() {
        return moduleTitle;
    }

    public void setModuleTitle(String moduleTitle) {
        this.moduleTitle = moduleTitle;
    }

    public String getModuleIcon() {
        return moduleIcon;
    }

    public void setModuleIcon(String moduleIcon) {
        this.moduleIcon = moduleIcon;
    }

    public String getModuleSource() {
        return this.moduleSource;
    }

    public void setModuleSource(String moduleSource) {
        this.moduleSource = moduleSource;
    }

    @Override
    protected PreparedStatement insert() throws Exception {
        return Dal.doMutation(new Object[]{this.getModuleTitle(), this.getModuleIcon(), this.getModuleSource()}, Module.SQL_INSERT);
    }

    @Override
    protected PreparedStatement update() throws Exception {
        return Dal.doMutation(new Object[]{this.getModuleTitle(), this.getModuleIcon(), this.getModuleSource(), this.getModuleID()}, Module.SQL_UPDATE);
    }

    @DirectMethod
    public static ArrayList<ResponseType> getSimpleList() {
        ArrayList<ResponseType> list = new ArrayList<ResponseType>();
        User user = User.getLoggedInUser();
        if (user != null) {
            AccessGroup group = user.getAccessGroup();
            for (Module module : Socket.<Module>list(new Object[]{group.getGroupID()}, Module.SQL_LIST, Module.class, Dal.StatmentType.preparedStatment)) {
                list.add(new ResponseType(module.getModuleID(), module.getModuleTitle(), module.getModuleIcon()));
            }
        }
        return list;
    }

    @DirectMethod
    public static ArrayList<ResponseType> getModuleList() {
        ArrayList<ResponseType> list = new ArrayList<ResponseType>();
        try {
            File directory = new File(URLDecoder.decode(Thread.currentThread().getContextClassLoader().getResource(Module.class.getPackage().getName().replace('.', '/')).getFile(), "UTF-8"));
            if (directory.isDirectory()) {
                int index = 0;
                for (File file : directory.listFiles()) {
                    if (file.getName().endsWith(Constants.DOT_CLASS)) {
                        Class clazz = Class.forName(Module.class.getPackage().getName() + Constants.DOT + file.getName().replace(Constants.DOT_CLASS, Constants.EMPTY_STRING));
                        if (clazz.getSuperclass().equals(BusinessModule.class)) {
                            list.add(new ResponseType(index, clazz.getSimpleName()));
                        }
                    }
                    index++;
                }
            }
        } catch (Exception ex) {
            Logger.getLogger(Module.class.getName()).log(Level.SEVERE, null, ex);
        }
        return list;
    }
}
