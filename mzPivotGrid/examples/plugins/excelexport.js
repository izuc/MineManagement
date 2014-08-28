Ext.Loader.setConfig({enabled: true});
Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    
    var excelExport = Ext.create('Mz.pivot.plugin.ExcelExport', {
        title:  'Pivot grid export'
    });

    var pivotGrid = Ext.create('Mz.examples.Common', {
        title:          'Excel export',

        plugins: [excelExport],
        
        actions: [{
            xtype: 'button',
            text: 'Excel visible',
            handler: function () {
                var f = excelExport.getExcelData(true);
                document.location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(f);
            }
        }, {
            xtype: 'button',
            text: 'Excel all',
            handler: function () {
                var f = excelExport.getExcelData(false);
                document.location = 'data:application/vnd.ms-excel;base64,' + Base64.encode(f);
            }
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
