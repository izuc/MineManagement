Ext.Loader.setConfig({enabled: true});
Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    
    var pivotGrid = Ext.create('Mz.examples.Common', {
        title:          'Grouper function',

        aggregate: [{
            dataIndex:  'value',
            header:     'Sum of value',
            aggregator: 'sum'
        }],
        
        leftAxis: [{
            dataIndex:  'company',
            header:     'Groups',
            grouperFn: function(record){
                if(/^[a-e]/i.test(record.get('company'))) return 'A-E';
                if(/^[f-s]/i.test(record.get('company'))) return 'F-S';
                if(/^[t-z]/i.test(record.get('company'))) return 'T-Z';
                return record.get('company');
            },
            sortable:   false
        },{
            dataIndex:  'company',
            header:     'Company',
            sortable:   false
        }],
        
        topAxis: [{
            width:      120,
            dataIndex:  'country'
        },{
            dataIndex:  'date',
            grouperFn: function(record){
                return Ext.Date.format(record.get('date'), "Y");
            }
        },{
            dataIndex:  'date',
            grouperFn: function(record){
                return Ext.Date.format(record.get('date'), "m");
            },
            renderer: function(v){
                return Ext.Date.monthNames[parseInt(v, 10) - 1];
            }
        }]
        
    });

    
});
