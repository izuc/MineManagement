package bol.util;

import java.util.ArrayList;
import java.util.Map;

public class Response {

    public static class ResponseList {

        private int totalRows;
        private boolean success;
        private ArrayList data;
        private String message;

        public int getTotalRows() {
            return totalRows;
        }

        public void setTotalRows(int totalRows) {
            this.totalRows = totalRows;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public ArrayList getData() {
            return this.data;
        }

        public void setData(ArrayList data) {
            this.data = data;
        }

        public String getMessage() {
            return this.message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class ResponseObject {

        private Object data;
        private boolean success;
        private String title;
        private String message;

        public Object getObject() {
            return data;
        }

        public void setObject(Object object) {
            this.data = object;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class ResponseType {

        private int id;
        private String name;
        private String extra;

        public ResponseType() {
        }

        public ResponseType(int id, String name) {
            this.setId(id);
            this.setName(name);
        }
        
        public ResponseType(int id, String name, String extra) {
            this.setId(id);
            this.setName(name);
            this.setExtra(extra);
        }

        public int getId() {
            return this.id;
        }

        public void setId(int id) {
            this.id = id;
        }

        public String getName() {
            return this.name;
        }

        public void setName(String name) {
            this.name = name;
        }
        
        public String getExtra() {
            return this.extra;
        }

        public void setExtra(String extra) {
            this.extra = extra;
        }

        public static <E extends Enum> ArrayList<ResponseType> create(E[] types) {
            ArrayList<ResponseType> data = new ArrayList<ResponseType>();
            for (E type : types) {
                data.add(new ResponseType(type.ordinal(), type.toString()));
            }
            return data;
        }
    }

    public static class ResponseMessage {

        private boolean success;
        private String title;
        private String message;

        public boolean isSuccess() {
            return this.success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getTitle() {
            return this.title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getMessage() {
            return this.message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

    public static class ResponseSubmission {

        private boolean success;
        private Map<String, String> errors;
        private String message;
        private String title;

        public boolean isSuccess() {
            return this.success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }

        public String getMessage() {
            return this.message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
        
        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public Map<String, String> getErrors() {
            return this.errors;
        }

        public void setErrors(Map<String, String> errors) {
            this.errors = errors;
        }
    }

    public static class ResponseNode {

        private String id;
        private String text;
        private boolean leaf;

        public ResponseNode(String id, String text, boolean leaf) {
            this.setId(id);
            this.setText(text);
            this.setLeaf(leaf);
        }

        public String getId() {
            return this.id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getText() {
            return this.text;
        }

        public void setText(String text) {
            this.text = text;
        }

        public boolean isLeaf() {
            return this.leaf;
        }

        public void setLeaf(boolean leaf) {
            this.leaf = leaf;
        }
    }

    public static class ResponseMenuItem {

        public static final String CLS = "x-btn-text-icon";
        public static final String SCALE = "medium";
        private String scale;
        private String text;
        private String cls;
        private String icon;
        private String menu;
        private String handler;

        public ResponseMenuItem() {
        }

        public void setScale(String scale) {
            this.scale = scale;
        }

        public void setText(String text) {
            this.text = text;
        }

        public void setCls(String cls) {
            this.cls = cls;
        }

        public void setIcon(String icon) {
            this.icon = icon;
        }

        public void setMenu(String menu) {
            this.menu = menu;
        }

        public void setHandler(String handler) {
            this.handler = handler;
        }
    }
}
