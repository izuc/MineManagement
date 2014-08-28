Ext.Loader.setConfig({enabled: true});
Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    
    var pivotGrid = Ext.create('Mz.examples.Common', {
        title:          'Range editor',

        plugins: [{
            ptype: 'mzrangeeditor'
        }],
        
        aggregate: [{
            dataIndex:  'value',
            header:     'Sum of value',
            aggregator: 'sum'
        },{
            dataIndex:  'value',
            header:     '# records',
            aggregator: 'count',
            align:      'right',
            renderer:   Ext.util.Format.numberRenderer('0')
        }],
        
        leftAxis: [{
            dataIndex:  'company',
            header:     'Company',
            sortable:   false
        }],
        
        topAxis: [{
            width:      120,
            dataIndex:  'country'
        }]
        
    });

    
});
