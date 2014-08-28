Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    
    var pivotGrid = Ext.create('Mz.pivot.Grid', {
        title:          'Remote matrix',

        renderTo:       document.body,
        height:         550,
        width:          800,
        
        viewConfig: {
            trackOver:      true,
            stripeRows:     false
        },

        matrixConfig: {
            mztype:     'remote',
            url:        'dataset.json'
            // uncomment this line to check the remote calculations example
            //url:        'remote.php'  
        },
        
        // uncomment this block to check the remote calculations example
        /*plugins: [{
            ptype:  'mzconfigurator',
            fields: [
                {dataIndex: 'value', header: 'Value'},
                {dataIndex: 'country', header: 'Country'},
                {dataIndex: 'company', header: 'Company'},
                {dataIndex: 'quantity', header: 'Quantity'}
            ]
        }],*/
        
        aggregate: [{
            id:         'agg1',
            dataIndex:  'value',
            header:     'Sum of value',
            aggregator: 'sum'
        },{
            id:         'agg2',
            dataIndex:  'value',
            header:     '# records',
            aggregator: 'count',
            align:      'right',
            renderer:   Ext.util.Format.numberRenderer('0')
        }],
        
        leftAxis: [{
            id:         'leftAxis1',
            dataIndex:  'company',
            header:     'Company',
            sortable:   false
        }],
        
        topAxis: [{
            id:         'topAxis1',
            width:      120,
            dataIndex:  'country',
            header:     'Country'
        }]        
        
    });

    
});
