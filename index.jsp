<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
	<title>Mine Management</title>
    <link rel="stylesheet" type="text/css" href="css/desktop.css" />
	<link rel="stylesheet" type="text/css" href="mzPivotGrid/mzPivotGrid.css" />
	<link href="resources/css/shCore.css" rel="stylesheet" type="text/css" />
	<link href="resources/css/shThemeDefault.css" rel="stylesheet" type="text/css" />
	<link type="text/css" rel="stylesheet" href="resources/css/app.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/azzurra-large/azzurra-core.css" />
	<link rel="stylesheet" type="text/css" href="resources/css/azzurra-large/azzurra-ui-blue.css" />
    <script type="text/javascript" src="ext-all.js"></script>
	<script type="text/javascript" src="djn/djn-remote-call-support.js"></script>
	<script type="text/javascript" src="ejn/ejn-assert.js"></script>
	<script type="text/javascript" src="js/Api.js"></script>
	<script type="text/javascript" src="js/Desktop.js"></script>
	<script type="text/javascript" src="js/example-data.js"></script>
	<script type="text/javascript" src="App.js"></script>
	<script type="text/javascript" src="mzPivotGrid/mzPivotGrid-all.js"></script>
	<script type="text/javascript" src="shCore.js"></script>
	<script type="text/javascript" src="shBrushSql.js"></script>
	<script type="text/javascript" src="src/grid/ViewDropZone.js"></script>
	<script type="text/javascript" src="src/draw/Draw.js"></script>
	<script type="text/javascript" src="js/azzurra.js"></script>
	<script type="text/javascript" src="js/IE8.fix.js"></script>
    <script type="text/javascript">
        Ext.Loader.setPath({
            'Ext.ux.desktop': 'js',
            'MyDesktop': ''
        });
		
		Ext.require([
			'MyDesktop.App',
			'Ext.form.*',
			'Ext.direct.*',
			'Ext.chart.*',
			'Ext.grid.Panel',
			'Ext.layout.container.Column'
		]);
		
		var MineManagement;
		
		function showLoginForm() {
			var login_form = new Ext.form.FormPanel({
				title: 'Login',
				bodyStyle:'padding:5px 5px 0;background-color: transparent;',
				border: false,
				width: 400,
				fieldDefaults: {
					msgTarget: 'side',
					labelWidth: 125
				},
				defaultType: 'textfield',
				defaults: {
					anchor: '100%'
				},
				items: [
						new Ext.form.TextField({
							name: 'userName',
							fieldLabel: 'Username',
							allowBlank: false,
							blankText: 'Enter your username',
							width: 130
						}), 
						new Ext.form.TextField({
							name: 'password',
							fieldLabel: 'Password',
							inputType: 'password',
							allowBlank: false,
							blankText: 'Enter your password',
							width: 130
						})],
				api: {
					submit: User.doLogin
				},
				buttons: [{
					text: 'Login',
					handler: function (button, event) {
						if (login_form.getForm().isValid()) {
							login_form.submit({
								success: function(form, action) {
									login_form.destroy();
									console.log(action);
									MineManagement = new MyDesktop.App({user: action.result.data});
									sayText(action.result.message,3,1,3);
									Ext.get('logo').hide();
								}
							});
						}
					}
				}]
			});
			
			login_form.render('main');
		}

        
        Ext.onReady(function () {
			Ext.app.REMOTING_API.enableBuffer = 0;
			var remotingProvider = Ext.Direct.addProvider( Ext.app.REMOTING_API);
			Djn.RemoteCallSupport.addCallValidation(remotingProvider);
			Djn.RemoteCallSupport.validateCalls = true;
			
			User.getLoggedInUser(function (response, e) {
				if (response) {
					MineManagement = new MyDesktop.App({user: response});
					Ext.get('logo').hide();
				} else {
					showLoginForm();
				}
			});
                        
                        Loads.list(function (response, e) {
				alert('test');
				alert(response);
			});
            
        });
    </script>
	<style>
		body {
			background-color: #DFEAF2;
		}
		
		.x-toolbar-footer {
			background: none !important;
		}
		
		#main {
			margin-left: auto;
			margin-right: auto;
			margin-top: 165px;
			width: 400px;
		}
		
		#VHSS {
			bottom: 35px;
			position: fixed;
			right: 0;
		}
		
		#logo {
			left: 0;
			margin-left: auto;
			margin-right: auto;
			position: absolute;
			right: 0;
			top: 30px;
		}
		
		#helmet_image {
			bottom: 236px;
			display: block;
			position: absolute;
			right: 92px;
			z-index: 10;
			width: 195px;
		}
	</style>
</head>

<body>
	<script>
		function vh_sceneLoaded() {
			Ext.get('helmet_image').show();
			User.getLoggedInUser(function (response, e) {
				if (!response) {
					sayText('Welcome to Mine Management Software',3,1,3);
				}
			});
		}
	</script>
	<img id="logo" src="peabody-logo.png" width="303px" />
	<div id="main"></div>
	<img id="helmet_image" src="helmet_image.png" style="display: none;" />
	<script language="JavaScript" type="text/javascript" src="http://vhss-d.oddcast.com/vhost_embed_functions_v2.php?acc=4439795&js=1"></script><script language="JavaScript" type="text/javascript">AC_VHost_Embed(4439795,300,400,'',1,1, 2368245, 0,1,0,'b82cdb16c8c32ffbb767edbf3cbc9d49',9);</script>
</body>
</html>