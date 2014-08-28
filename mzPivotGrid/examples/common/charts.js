Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    
    var height = 250, width = 700;
    
    var store = new Ext.data.JsonStore({
        filters: [
            function(item) {
                return item.get('year') >= 2012;
            }
        ],
        proxy: {
            type:       'ajax',
            url:        'charts.json',
            reader: {
                type:       'json',
                root:       'rows'
            }
        },
        autoLoad:   true,
        fields: [
            {name: 'orderid',       type: 'int'},
            {name: 'salesperson',   type: 'string'},
            {name: 'country',       type: 'string'},
            {name: 'orderdate',     type: 'date', dateFormat: 'd/m/Y'},
            {name: 'amount',        type: 'int'},
            {
                name: 'person-range',
                convert: function(v, record){
                    if(/^[a-j]/i.test(record.get('salesperson'))) return 'A-J';
                    if(/^[k-s]/i.test(record.get('salesperson'))) return 'K-S';
                    if(/^[t-z]/i.test(record.get('salesperson'))) return 'T-Z';
                    return v;
                }
            },{
                name: 'year',
                convert: function(v, record){
                    return Ext.Date.format(record.get('orderdate'), "Y");
                }
            }
        ]
    });

    var pivotChart = null;
    
    var pivotGrid = Ext.create('Mz.pivot.Grid', {
        renderTo:       document.body,
        title:          'Chart integration',
        height:         height,
        width:          width,
        enableLocking:  false,
        enableGrouping: true,
        viewConfig: {
            trackOver:      true,
            stripeRows:     false
        },
        
        tbar: [{
            xtype:          'combo',
            itemId:            'idSelect',
            fieldLabel:     'Select report',
            flex:             1,
            editable:         false,
            //value: 'r1',
            store: [
                ['r1', 'What are the order amounts of each salesperson?'],
                ['r2', 'What are the order amounts of each salesperson in a specific country?'],
                ['r3', 'How did salespeople perform in a specific year?']
            ],
            listeners: {
                change: function(combo, newValue, oldValue, eOpts){
                    switch(newValue){
                        case 'r1':
                            pivotGrid.reconfigurePivot({
                                topAxis: []
                            });
                        break;
                        
                        case 'r2':
                            pivotGrid.reconfigurePivot({
                                topAxis: [{
                                    dataIndex:  'country',
                                    direction:  'ASC'
                                }]
                            });
                        break;
                        
                        case 'r3':
                            pivotGrid.reconfigurePivot({
                                topAxis: [{
                                    dataIndex:  'year',
                                    direction:  'ASC'
                                }]
                            });
                        break;
                    }
                }
            }
        }],

        store: store,
        
        aggregate: [{
            measure:    'amount',
            header:     'Sales',
            aggregator: 'sum',
            align:      'right',
            width:      85,
            renderer:   Ext.util.Format.numberRenderer('0,000.00')
        }],
        
        caption:  '',
        leftAxis: [{
            width:      80,
            id:         'salesperson',
            dataIndex:  'salesperson',
            header:     'Sales person'
        }],
        
        topAxis: [],
        
        listeners: {
            afterrender: function(pivotGrid){
                setTimeout(function(){
                    var combo = pivotGrid.down('#idSelect');
                    combo.select(combo.getStore().getAt(0));
                }, 100);
            },
            
            pivotdone: function(){
                if(pivotChart){
                    pivotChart.destroy();
                }
                var fields = [],
                    titles = [],
                    columns = pivotGrid.headerCt.getGridColumns();
                
                for(var i = 0; i < columns.length; i++){
                    if(!columns[i].leftAxis){
                        fields.push(columns[i].dataIndex);
                        titles.push(columns[i].text);
                    }
                }
                
                pivotChart = Ext.create('Ext.chart.Chart', {
                    renderTo:       document.body,
                    width:          width,
                    height:         height,
                    store:          pivotGrid.getPivotStore(),
                    legend: {
                        position:   'top'
                    },
                    axes: [{
                        title:      'Sales person',
                        type:       'Category',
                        fields:     ['salesperson'],
                        position:   'bottom'
                    },{
                        title:      'Total',
                        fields:     fields,
                        type:       'Numeric',
                        position:   'left'
                    }],
                    series: [{
                        type:       'column',
                        highlight:  true,
                        axis:       'bottom',
                        xField:     'salesperson',
                        yField:     fields,
                        title:      titles
                    }]
                });                
            }
        }
    });
    

    
});
