Ext.onReady(function() {

    Ext.define('Mz.examples.Common', {
        extend: 'Mz.pivot.Grid',
        
        renderTo:       document.body,
        height:         550,
        width:          800,
        
        viewConfig: {
            trackOver:      true,
            stripeRows:     false
        },
        
        store:  new Ext.data.ArrayStore({
            autoLoad:   true,
            proxy: {
                type:       'ajax',
                url:        '../dataset.json',
                reader: {
                    type:       'json',
                    root:       'rows'
                }
            },
            fields: [
                {name: 'id',        type: 'int'},
                {name: 'company',   type: 'string'},
                {name: 'country',   type: 'string'},
                {name: 'date',      type: 'date', dateFormat: 'd/m/Y'},
                {name: 'value',     type: 'int'},
                {name: 'quantity',  type: 'int'},
                {
                    name: 'year',
                    convert: function(v, record){
                        return Ext.Date.format(record.get('date'), "Y");
                    }
                },{
                    name: 'continent',
                    convert: function(v, record){
                        if(Ext.Array.indexOf(['Belgium', 'Netherlands', 'United Kingdom'], record.get('country')) >= 0) return 'Europe';
                        if(Ext.Array.indexOf(['Canada', 'United States'], record.get('country')) >= 0 ) return 'North America';
                        if(Ext.Array.indexOf(['Australia'], record.get('country')) >= 0 ) return 'Australia';
                    }
                }
            ]
        }),
        
        initComponent: function(){
            var me = this,
                buttons = me.actions || [];
            
            Ext.Array.insert(buttons, 0, [{
                xtype:  'button',
                text:   'Refresh',
                handler: function(){
                    me.getStore().load();
                }
            }]);
            
            Ext.apply(me, {
                tbar:   buttons
            });
            
            me.callParent(arguments);
        }
        
    });
    
});