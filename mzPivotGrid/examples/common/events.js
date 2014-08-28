Ext.Loader.setConfig({enabled: true});
Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();
    
    var getListenerFn = function(eventName){
        return function(){
            var field = pivotGrid.down('#dockedId');
            field.setValue( eventName + ' occured!' + "\n" + field.getValue() );
        }
    };
    
    var pivotGrid = Ext.create('Mz.examples.Common', {
        title:      'Events',
        height:     500,
        
        actions: [{
            xtype:  'button',
            text:   'Clear events log',
            handler: function(){
                pivotGrid.down('#dockedId').setValue('');
            }
        }],
        
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
        }],
        
        dockedItems: [{
            xtype:  'container',
            dock:   'bottom',
            layout: 'fit',
            height: 100,
            
            items: [{
                xtype:  'textarea',
                itemId: 'dockedId'
            }]
        }],
        
        listeners: {
            pivotgroupexpand:           getListenerFn('pivotgroupexpand'),
            pivotgroupcollapse:         getListenerFn('pivotgroupcollapse'),
            pivotgroupclick:            getListenerFn('pivotgroupclick'),
            pivotgroupdblclick:         getListenerFn('pivotgroupdblclick'),
            pivotgroupcontextmenu:      getListenerFn('pivotgroupcontextmenu'),
            pivotgroupcellclick:        getListenerFn('pivotgroupcellclick'),
            pivotgroupcelldblclick:     getListenerFn('pivotgroupcelldblclick'),
            pivotgroupcellcontextmenu:  getListenerFn('pivotgroupcellcontextmenu'),
            pivotitemclick:             getListenerFn('pivotitemclick'),
            pivotitemdblclick:          getListenerFn('pivotitemdblclick'),
            pivotitemcontextmenu:       getListenerFn('pivotitemcontextmenu'),
            pivotitemcellclick:         getListenerFn('pivotitemcellclick'),
            pivotitemcelldblclick:      getListenerFn('pivotitemcelldblclick'),
            pivotitemcellcontextmenu:   getListenerFn('pivotitemcellcontextmenu'),
            pivottotalclick:            getListenerFn('pivottotalclick'),
            pivottotaldblclick:         getListenerFn('pivottotaldblclick'),
            pivottotalcontextmenu:      getListenerFn('pivottotalcontextmenu'),
            pivottotalcellclick:        getListenerFn('pivottotalcellclick'),
            pivottotalcelldblclick:     getListenerFn('pivottotalcelldblclick'),
            pivottotalcellcontextmenu:  getListenerFn('pivottotalcellcontextmenu'),
        }
        
    });

});
