package bol.modules;

import bol.Constants;
import bol.Socket;
import bol.util.Response.ResponseList;
import dal.Dal;
import com.softwarementors.extjs.djn.config.annotations.DirectMethod;
import com.softwarementors.extjs.djn.servlet.ssm.WebContextManager;
import java.io.Serializable;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpSession;

public class SessionLog implements Serializable {

    private static final String SQL_INSERT = "INSERT INTO system_sessions (user_id, session_date) VALUES (?, ?)";
    private static final String SQL_TABLE = "system_sessions";
    public static final String PROPERTY_ID = Constants.PROPERTY_SESSION_ID;
    
    private int sessionID;
    private int userID;
    private Date sessionDate;
    private ArrayList<Visit> history;

    public SessionLog() {
        this.setHistory(new ArrayList<Visit>());
    }

    public SessionLog(ResultSet data) {
        try {
            this.setSessionID(data.getInt(Constants.DB_FIELD_SESSION_ID));
            this.setUserID(data.getInt(Constants.DB_FIELD_USER_ID));
            this.setSessionDate(data.getTimestamp(Constants.DB_FIELD_SESSION_DATE));
            this.setHistory(Socket.<Visit>list(new Object[]{data.getInt(Constants.DB_FIELD_SESSION_ID)}, Visit.SQL_LIST, Visit.class, Dal.StatmentType.preparedStatment));
        } catch (SQLException ex) {
            Logger.getLogger(SessionLog.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public int getSessionID() {
        return this.sessionID;
    }

    public void setSessionID(int logID) {
        this.sessionID = logID;
    }

    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public Date getSessionDate() {
        return this.sessionDate;
    }

    public void setSessionDate(Date date) {
        this.sessionDate = date;
    }

    public ArrayList<Visit> getHistory() {
        return this.history;
    }

    public void setHistory(ArrayList<Visit> history) {
        this.history = history;
    }

    public void save() {
        try {
            PreparedStatement statement = Dal.doMutation(new Object[]{this.getUserID(), this.getSessionDate()}, SessionLog.SQL_INSERT);
            ResultSet result = statement.getGeneratedKeys();
            if (result != null && result.next()) {
                this.setSessionID(result.getInt(1));
            }
        } catch (SQLException ex) {
            Logger.getLogger(SessionLog.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public void add(Section section) throws Exception {
        Visit visit = new Visit();
        this.getHistory().add(visit);
        visit.setSessionID(this.getSessionID());
        visit.setSectionID(section.getSectionID());
        visit.setVisitTime(Calendar.getInstance().getTime());
        visit.save();
    }

    @DirectMethod
    public static SessionLog getCurrentLog() {
        HttpSession session = WebContextManager.get().getSession();
        return (SessionLog) session.getAttribute(Constants.SESSION_LOG_PROPERTY);
    }

    public static SessionLog create(User user) {
        SessionLog session = new SessionLog();
        session.setUserID(user.getUserID());
        session.setSessionDate(Calendar.getInstance().getTime());
        session.save();
        return session;
    }

    @DirectMethod
    public static ResponseList list(int start, int limit, String sort, String direction, int userID) {
        return Socket.<SessionLog>pagination(SQL_TABLE, SessionLog.class, start, limit, sort, direction, " WHERE user_id = '" + userID + "'");
    }

    public static class Visit implements Serializable {

        private static final String SQL_INSERT = "INSERT INTO system_session_history (session_id, section_id, visit_time) VALUES (?, ?, ?)";
        private static final String SQL_LIST = "SELECT h.visit_id, h.session_id, h.section_id, s.module_id, m.module_title, h.visit_time FROM system_session_history As h INNER JOIN system_sections As s ON h.section_id = s.section_id INNER JOIN system_modules As m ON s.module_id = m.module_id WHERE h.session_id = ? ORDER BY h.visit_time DESC";
        private int visitID;
        private int sessionID;
        private int sectionID;
        private int moduleID;
        private String moduleTitle;
        private Date visitTime;

        public Visit() {
        }

        public Visit(ResultSet data) {
            try {
                this.setVisitID(data.getInt(Constants.DB_FIELD_VISIT_ID));
                this.setSessionID(data.getInt(Constants.DB_FIELD_SESSION_ID));
                this.setSectionID(data.getInt(Constants.DB_FIELD_SECTION_ID));
                this.setModuleID(data.getInt(Constants.DB_FIELD_MODULE_ID));
                this.setModuleTitle(data.getString(Constants.DB_FIELD_MODULE_TITLE));
                this.setVisitTime(data.getTimestamp(Constants.DB_FIELD_VISIT_TIME));
            } catch (SQLException ex) {
                Logger.getLogger(Visit.class.getName()).log(Level.SEVERE, null, ex);
            }
        }

        public int getVisitID() {
            return this.visitID;
        }

        public void setVisitID(int visitID) {
            this.visitID = visitID;
        }

        public int getSessionID() {
            return this.sessionID;
        }

        public void setSessionID(int sessionID) {
            this.sessionID = sessionID;
        }

        public int getSectionID() {
            return sectionID;
        }

        public void setSectionID(int sectionID) {
            this.sectionID = sectionID;
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

        public Date getVisitTime() {
            return this.visitTime;
        }

        public void setVisitTime(Date visitTime) {
            this.visitTime = visitTime;
        }

        public void save() throws Exception {
            Dal.doMutation(new Object[]{this.getSessionID(), this.getSectionID(), this.getVisitTime()}, Visit.SQL_INSERT);
        }
    }
}