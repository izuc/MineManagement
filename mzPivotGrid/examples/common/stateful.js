Ext.state.Manager.setProvider(new Ext.state.LocalStorageProvider());
Ext.Loader.setConfig({enabled: true});
Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    
    var pivotGrid = Ext.create('Mz.examples.Common', {
        title:          'Stateful',
        
        stateful:   true,
        stateId:    'mzPivotGrid',
        
        actions: [{
            xtype:  'button',
            text:   'Configure',
            handler: function(){
                pivotGrid.reconfigurePivot({
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
                    },{
                        dataIndex:  'year',
                        header:     'Year',
                        sortable:   false
                    }],
                    
                    topAxis: [{
                        dataIndex:  'continent',
                        sortable:   false
                    },{
                        width:      120,
                        dataIndex:  'country'
                    }]
                });
            }
        },{
            xtype:  'button',
            text:   'Clear state',
            handler: function(){
                Ext.state.Manager.getProvider().clear(pivotGrid.stateId);
                document.location = document.location;
            }
        }]
        
        
    });

    
});
