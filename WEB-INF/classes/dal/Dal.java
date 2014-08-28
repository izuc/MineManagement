package dal;

import com.mysql.jdbc.CallableStatement;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.PreparedStatement;
import com.mysql.jdbc.Statement;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class Dal {

    private static final String CALL_POSTFIX = " }";
    private static final String CALL_PREFIX = "{ call ";
    private static final String SQL_COUNT_QUERY = "SELECT COUNT(*) FROM ";
    private static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    private static final String JDBC_URL_LOCATION = "jdbc:mysql://localhost/mine_management";
    private static final String DB_USER_NAME = "root";
    private static final String DB_PASSWORD = "";
    private static Connection connection;

    public enum StatmentType {

        preparedStatment, callableStatement
    };

    private static Statement getStatement() throws SQLException {
        return (Statement) Dal.getConnection().createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_UPDATABLE);
    }

    private static void addParameters(PreparedStatement statement, Object[] parameters) throws SQLException {
        if (parameters != null) {
            for (int i = 0; i < (parameters.length); i++) {
                statement.setObject((i + 1), parameters[i]);
            }
        }
    }

    public static ResultSet doQuery(Object[] parameters, String sql, Dal.StatmentType type) throws SQLException {
        PreparedStatement statement = ((type == StatmentType.callableStatement) ? (CallableStatement) Dal.getConnection().prepareCall(Dal.CALL_PREFIX + sql + Dal.CALL_POSTFIX)
                : (PreparedStatement) Dal.getConnection().prepareStatement(sql));
        Dal.addParameters(statement, parameters);
        return statement.executeQuery();
    }

    public static ResultSet doQuery(String sql) throws SQLException {
        return Dal.getStatement().executeQuery(sql);
    }

    public static PreparedStatement doMutation(Object[] parameters, String sql) throws SQLException {
        PreparedStatement statement = (PreparedStatement) Dal.getConnection().prepareStatement(sql);
        Dal.addParameters(statement, parameters);
        statement.executeUpdate();
        return statement;
    }

    public static int getCount(String table, String where) throws SQLException {
        ResultSet records = Dal.doQuery(Dal.SQL_COUNT_QUERY + table + where);
        records.next();
        return records.getInt(1);
    }

    public static boolean hasRows(ResultSet results) throws SQLException {
        results.first();
        return ((results != null) ? (results.getRow() > 0) : false);
    }

    private static Connection getConnection() {
        try {
            Class.forName(JDBC_DRIVER);
            Dal.connection = (Connection) DriverManager.getConnection(JDBC_URL_LOCATION, DB_USER_NAME, DB_PASSWORD);
        } catch (Exception ex) {
            Logger.getLogger(Dal.class.getName()).log(Level.SEVERE, null, ex);
        }
        return Dal.connection;
    }
}