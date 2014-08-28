package dal;

import java.sql.Connection;
import java.sql.Statement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class SiteDal {

    private static final String JDBC_DRIVER = "com.microsoft.sqlserver.jdbc.SQLServerDriver";
    private static final String JDBC_URL_LOCATION = "jdbc:sqlserver://localhost;instanceName=SQLSERVER3;database=PowerView_mwb;";   
    
    private static final String DB_USER_NAME = "sa";
    private static final String DB_PASSWORD = "password";
    private static Connection connection;

    public enum StatmentType {

        preparedStatment, callableStatement
    };

    private static Statement getStatement() throws SQLException {
        return (Statement) SiteDal.getConnection().createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
    }

    public static ResultSet doQuery(String sql) throws SQLException {
        return SiteDal.getStatement().executeQuery(sql);
    }

    private static Connection getConnection() {
        try {
            Class.forName(JDBC_DRIVER);
            SiteDal.connection = (Connection) DriverManager.getConnection(JDBC_URL_LOCATION, DB_USER_NAME, DB_PASSWORD);
        } catch (Exception ex) {
            Logger.getLogger(Dal.class.getName()).log(Level.SEVERE, null, ex);
        }
        return SiteDal.connection;
    }
}