Ext.define('ShortcutModel', {
    extend: 'Ext.data.Model',
    fields: [
       { name: 'name' },
       { name: 'id', type: 'int' },
	   { name: 'extra' }
    ]
});

Ext.define('MyDesktop.App', {
    extend: 'Ext.ux.desktop.App',
	
	config: {
		user: {}
	},

    requires: [
		'Ext.direct.*',
        'Ext.window.MessageBox',
		'Ext.data.DirectStore',
        'MyDesktop.Settings'
    ],
	
	
	constructor: function(configs) {
		this.callParent();
		this.initConfig(configs);
	},


    init: function() {
        this.callParent();
		
		Ext.app.REMOTING_API.enableBuffer = 0;
		var remotingProvider = Ext.Direct.addProvider( Ext.app.REMOTING_API);
		Djn.RemoteCallSupport.addCallValidation(remotingProvider);
		Djn.RemoteCallSupport.validateCalls = true;
    },
	
    getModules : function(){
        return [];
    },
	
	showModule: function(moduleID) {
		Section.loadModule(moduleID, function (response, e) {
			if (response.success) {
				try {
					(new Function('(function() { ' + response.data.module.moduleSource + '})();'))();
				} catch(err){
				}
				sayText(response.message,3,1,3);
			}
		});
	},
	
	generateUniqueID: function (prefix) {
		var i = 0;
		do {
			i++;
			var id = prefix + '_' + i;
		} while (Ext.query('#' + id).length);
		return id;
	},
	
    getDesktopConfig: function () {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {

            contextMenuItems: [
                { text: 'Change Settings', handler: me.onSettings, scope: me }
            ],
			
			shortcuts: Ext.create("Ext.data.DirectStore",{
				model : "ShortcutModel",
				autoLoad : true,
				proxy : {
					type : "direct",
					directFn : Module.getSimpleList
				}
			}),
			wallpaper: 'wallpapers/caterpillar.jpg',
            //wallpaper: 'wallpapers/control_room.png',
			//wallpaper: 'wallpapers/wallpaper_two.png',
            wallpaperStretch: true
        });
    },

    getStartConfig : function() {
        var me = this, ret = me.callParent();

        return Ext.apply(ret, {
            title: this.config.user.fullName,
            iconCls: 'user',
            height: 300,
            toolConfig: {
                width: 100,
                items: [
                    {
                        text:'Settings',
                        iconCls:'settings',
                        handler: me.onSettings,
                        scope: me
                    },
                    '-',
                    {
                        text:'Logout',
                        iconCls:'logout',
                        handler: me.onLogout,
                        scope: me
                    }
                ]
            }
        });
    },

    getTaskbarConfig: function () {
        var ret = this.callParent();

        return Ext.apply(ret, {
            quickStart: [],
            trayItems: [
                { xtype: 'trayclock', flex: 1 }
            ]
        });
    },

    onLogout: function () {
        User.doLogout(function (result, e) {
			Ext.get('helmet_image').hide();
			location.reload();
		});
    },

    onSettings: function () {
        var dlg = new MyDesktop.Settings({
            desktop: this.desktop
        });
        dlg.show();
    }
});
