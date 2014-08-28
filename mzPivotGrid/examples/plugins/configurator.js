Ext.Loader.setConfig({enabled: true});
Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    
    var pivotGrid = Ext.create('Mz.examples.Common', {
        title:          'Configurator',

        plugins: [{
            ptype:  'mzconfigurator'
        }]
        
    });

    
});
