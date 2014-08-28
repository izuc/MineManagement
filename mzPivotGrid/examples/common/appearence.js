Ext.Loader.setConfig({enabled: true});
Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    
    var createMenu = function(text, prop){
        var obj = {};
        
        return {
            xtype:      'button',
            text:       text,
            menu: {
                defaults: {
                    xtype:  'menucheckitem',
                    group:  prop
                },
                items: [{
                    text:       'First',
                    checked:    pivotGrid && pivotGrid[prop] == 'first',
                    handler: function(){
                        obj[prop] = 'first';
                        pivotGrid.reconfigurePivot(obj);
                    }
                },{
                    text:       'Last',
                    checked:    pivotGrid && pivotGrid[prop] == 'last',
                    handler: function(){
                        obj[prop] = 'last';
                        pivotGrid.reconfigurePivot(obj);
                    }
                },{
                    text:       'None',
                    checked:    pivotGrid && pivotGrid[prop] == 'none',
                    handler: function(){
                        obj[prop] = 'none';
                        pivotGrid.reconfigurePivot(obj);
                    }
                }]
            }
        };
    };
    
    var pivotGrid = Ext.create('Mz.examples.Common', {
        title:          'Appearence',
        width:          900,
        
        actions: [{
            xtype:      'button',
            text:       'Layout type',
            menu: {
                defaults: {
                    xtype:  'menucheckitem',
                    group:  'layout'
                },
                items: [{
                    text:       'Compact',
                    checked:    pivotGrid && pivotGrid['viewLayoutType'] == 'compact',
                    handler: function(){
                        pivotGrid.reconfigurePivot({
                            viewLayoutType: 'compact'
                        });
                    }
                },{
                    text:       'Outline',
                    checked:    pivotGrid && pivotGrid['viewLayoutType'] == 'outline',
                    handler: function(){
                        pivotGrid.reconfigurePivot({
                            viewLayoutType: 'outline'
                        });
                    }
                }]
            }
        },
        createMenu('Row totals position', 'rowSubTotalsPosition'),
        createMenu('Row grand totals position', 'rowGrandTotalsPosition'),
        createMenu('Col totals position', 'colSubTotalsPosition'),
        createMenu('Col grand totals position', 'colGrandTotalsPosition')
        ],
        
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
        }]
        
    });

    
});
