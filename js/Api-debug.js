/**********************************************************************
 * 
 * Code generated automatically by DirectJNgine
 * Copyright (c) 2009, Pedro Agulló Soliveres
 * 
 * DO NOT MODIFY MANUALLY!!
 * 
 **********************************************************************/

Ext.namespace( 'Ext.app');

Ext.app.PROVIDER_BASE_URL=window.location.protocol + '//' + window.location.host + '/' + (window.location.pathname.split('/').length>2 ? window.location.pathname.split('/')[1]+ '/' : '')  + '/djn/directprovider';

Ext.app.POLLING_URLS = {
}

Ext.app.REMOTING_API = {
  url: Ext.app.PROVIDER_BASE_URL,
  type: 'remoting',
  actions: {
    SessionLog: [
      {
        name: 'getCurrentLog'/*() => bol.modules.SessionLog */,
        len: 0,
        formHandler: false
      },
      {
        name: 'list'/*(int, int, String, String, int) => bol.util.Response$ResponseList */,
        len: 5,
        formHandler: false
      }
    ],
    User: [
      {
        name: 'doLogin'/*() => bol.util.Response$ResponseObject -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'doLogout'/*() => bol.util.Response$ResponseMessage */,
        len: 0,
        formHandler: false
      },
      {
        name: 'pagination'/*(int, int, String, String, String) => bol.util.Response$ResponseList */,
        len: 5,
        formHandler: false
      },
      {
        name: 'commit'/*() => bol.util.Response$ResponseSubmission -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'saveData'/*(com.google.gson.JsonArray) => bol.util.Response$ResponseMessage */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getLoggedInUser'/*() => bol.modules.User */,
        len: 0,
        formHandler: false
      },
      {
        name: 'create'/*(int) => bol.util.Response$ResponseObject */,
        len: 1,
        formHandler: false
      },
      {
        name: 'userTypes'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      },
      {
        name: 'list'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      },
      {
        name: 'delete'/*(com.google.gson.JsonArray) => void */,
        len: 1,
        formHandler: false
      },
      {
        name: 'remove'/*(int) => void */,
        len: 1,
        formHandler: false
      }
    ],
    Graph: [
      {
        name: 'pagination'/*(int, int, String, String, String) => bol.util.Response$ResponseList */,
        len: 5,
        formHandler: false
      },
      {
        name: 'commit'/*() => bol.util.Response$ResponseSubmission -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'saveData'/*(com.google.gson.JsonArray) => bol.util.Response$ResponseMessage */,
        len: 1,
        formHandler: false
      },
      {
        name: 'create'/*(int) => bol.util.Response$ResponseObject */,
        len: 1,
        formHandler: false
      },
      {
        name: 'list'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      },
      {
        name: 'delete'/*(com.google.gson.JsonArray) => void */,
        len: 1,
        formHandler: false
      },
      {
        name: 'remove'/*(int) => void */,
        len: 1,
        formHandler: false
      }
    ],
    Slider: [
      {
        name: 'userList'/*(int) => java.util.ArrayList */,
        len: 1,
        formHandler: false
      },
      {
        name: 'pagination'/*(int, int, String, String, String) => bol.util.Response$ResponseList */,
        len: 5,
        formHandler: false
      },
      {
        name: 'commit'/*() => bol.util.Response$ResponseSubmission -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'saveData'/*(com.google.gson.JsonArray) => bol.util.Response$ResponseMessage */,
        len: 1,
        formHandler: false
      },
      {
        name: 'create'/*(int) => bol.util.Response$ResponseObject */,
        len: 1,
        formHandler: false
      },
      {
        name: 'list'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      },
      {
        name: 'delete'/*(com.google.gson.JsonArray) => void */,
        len: 1,
        formHandler: false
      },
      {
        name: 'remove'/*(int) => void */,
        len: 1,
        formHandler: false
      }
    ],
    AccessGroup: [
      {
        name: 'pagination'/*(int, int, String, String, String) => bol.util.Response$ResponseList */,
        len: 5,
        formHandler: false
      },
      {
        name: 'commit'/*() => bol.util.Response$ResponseSubmission -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'saveData'/*(com.google.gson.JsonArray) => bol.util.Response$ResponseMessage */,
        len: 1,
        formHandler: false
      },
      {
        name: 'create'/*(int) => bol.util.Response$ResponseObject */,
        len: 1,
        formHandler: false
      },
      {
        name: 'list'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      },
      {
        name: 'delete'/*(com.google.gson.JsonArray) => void */,
        len: 1,
        formHandler: false
      },
      {
        name: 'remove'/*(int) => void */,
        len: 1,
        formHandler: false
      }
    ],
    Database: [
      {
        name: 'getTable'/*(com.google.gson.JsonArray) => java.util.ArrayList */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getTables'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      }
    ],
    Module: [
      {
        name: 'pagination'/*(int, int, String, String, String) => bol.util.Response$ResponseList */,
        len: 5,
        formHandler: false
      },
      {
        name: 'commit'/*() => bol.util.Response$ResponseSubmission -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'saveData'/*(com.google.gson.JsonArray) => bol.util.Response$ResponseMessage */,
        len: 1,
        formHandler: false
      },
      {
        name: 'create'/*(int) => bol.util.Response$ResponseObject */,
        len: 1,
        formHandler: false
      },
      {
        name: 'list'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      },
      {
        name: 'delete'/*(com.google.gson.JsonArray) => void */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getSimpleList'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      },
      {
        name: 'remove'/*(int) => void */,
        len: 1,
        formHandler: false
      },
      {
        name: 'getModuleList'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      }
    ],
    Section: [
      {
        name: 'pagination'/*(int, int, String, String, String) => bol.util.Response$ResponseList */,
        len: 5,
        formHandler: false
      },
      {
        name: 'commit'/*() => bol.util.Response$ResponseSubmission -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'saveData'/*(com.google.gson.JsonArray) => bol.util.Response$ResponseMessage */,
        len: 1,
        formHandler: false
      },
      {
        name: 'create'/*(int) => bol.util.Response$ResponseObject */,
        len: 1,
        formHandler: false
      },
      {
        name: 'loadModule'/*(int) => bol.util.Response$ResponseObject */,
        len: 1,
        formHandler: false
      },
      {
        name: 'list'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      },
      {
        name: 'delete'/*(com.google.gson.JsonArray) => void */,
        len: 1,
        formHandler: false
      },
      {
        name: 'remove'/*(int) => void */,
        len: 1,
        formHandler: false
      }
    ],
    Loads: [
      {
        name: 'list'/*() => com.google.gson.JsonArray */,
        len: 0,
        formHandler: false
      }
    ],
    Realtime: [
      {
        name: 'pagination'/*(int, int, String, String, String) => bol.util.Response$ResponseList */,
        len: 5,
        formHandler: false
      },
      {
        name: 'commit'/*() => bol.util.Response$ResponseSubmission -- FORM HANDLER */,
        len: 1,
        formHandler: true
      },
      {
        name: 'saveData'/*(com.google.gson.JsonArray) => bol.util.Response$ResponseMessage */,
        len: 1,
        formHandler: false
      },
      {
        name: 'create'/*(int) => bol.util.Response$ResponseObject */,
        len: 1,
        formHandler: false
      },
      {
        name: 'list'/*() => java.util.ArrayList */,
        len: 0,
        formHandler: false
      },
      {
        name: 'delete'/*(com.google.gson.JsonArray) => void */,
        len: 1,
        formHandler: false
      },
      {
        name: 'remove'/*(int) => void */,
        len: 1,
        formHandler: false
      }
    ]
  }
}

