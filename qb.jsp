<!DOCTYPE html>
<html>
	<head>
		<title>
			Query Builder
		</title>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<!--
		<link rel="stylesheet" href="resources/css/ext-all.css" type="text/css">-->
		<link href="resources/css/shCore.css" rel="stylesheet" type="text/css" />
		<link href="resources/css/shThemeDefault.css" rel="stylesheet" type="text/css" />
		<link type="text/css" rel="stylesheet" href="resources/css/app.css" />
		<!--<link rel="stylesheet" href="resources/ext-theme-neptune/ext-theme-neptune-all.css" type="text/css">-->
		<link rel="stylesheet" type="text/css" href="resources/css/azzurra-large/azzurra-core.css" />
		<link rel="stylesheet" type="text/css" href="resources/css/azzurra-large/azzurra-ui-blue.css" />
		
		
		<script type="text/javascript" src="ext-all.js"></script>
		<script type="text/javascript" src="shCore.js"></script>
		<script type="text/javascript" src="shBrushSql.js"></script>
		
		<script type="text/javascript" src="djn/djn-remote-call-support.js"></script>
		<script type="text/javascript" src="ejn/ejn-assert.js"></script>
		<script type="text/javascript" src="js/Api.js"></script>
		
		<script type="text/javascript" src="/src/grid/ViewDropZone.js"></script>
		<script type="text/javascript" src="/src/draw/Draw.js"></script>
		<script type="text/javascript" src="/src/ux/window/VisualSQLQueryBuilder.js"></script>
		
		<script type="text/javascript" src="js/azzurra.js"></script>
		<script type="text/javascript" src="js/IE8.fix.js"></script>
		
		<script>
			Ext.tip.QuickTipManager.init();
			
			Ext.app.REMOTING_API.enableBuffer = 0;
			var remotingProvider = Ext.Direct.addProvider( Ext.app.REMOTING_API);
			Djn.RemoteCallSupport.addCallValidation(remotingProvider);
			Djn.RemoteCallSupport.validateCalls = true;
			
			Ext.Loader.setConfig({
				enabled: true,
				paths: {
					Ext: 'src'
				}
			});
			
			Ext.require([ 
				'Ext.draw.Sprite', 
				'Ext.ux.window.VisualSQLQueryBuilder'
			]);
			
			Ext.onReady(function(){ 
				var qbWindow = Ext.create('Ext.ux.window.VisualSQLQueryBuilder');
				qbWindow.show();
			});
		</script>
	</head>
	
	<body>
	</body>
</html>