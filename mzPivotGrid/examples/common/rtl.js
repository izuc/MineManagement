Ext.Loader.setConfig({enabled: true});
Ext.onReady(function () {
    Ext.tip.QuickTipManager.init();

    var view = Ext.create('Ext.container.Viewport', {
        rtl: true,
        layout:'border',
        items: [{
            title:'گزارش آماری',
            xtype: 'istatistics',
            region: 'center'
        }]
    });
    view.down('grid').getStore().load();
});

var data = [
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس اینترنت", "Owner": "فاقد مسئول", "IncidentStatusId": 1, "IncidentStatusTitle": "Open", "DatePeriod": "AllDay", "Count": 3 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس اینترنت", "Owner": "فاقد مسئول", "IncidentStatusId": 1, "IncidentStatusTitle": "Open", "DatePeriod": "Today", "Count": 2 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس اینترنت", "Owner": "فاقد مسئول", "IncidentStatusId": 1, "IncidentStatusTitle": "Open", "DatePeriod": "AllDay", "Count": 3 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "فاقد سرويس", "Owner": "فاقد مسئول", "IncidentStatusId": 1, "IncidentStatusTitle": "Open", "DatePeriod": "AllDay", "Count": 3 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "فاقد سرويس", "Owner": "فاقد مسئول", "IncidentStatusId": 1, "IncidentStatusTitle": "Open", "DatePeriod": "AllDay", "Count": 3 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس ایمیل", "Owner": "فاقد مسئول", "IncidentStatusId": 2, "IncidentStatusTitle": "Reopen", "DatePeriod": "AllDay", "Count": 1 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس ایمیل", "Owner": "فاقد مسئول", "IncidentStatusId": 2, "IncidentStatusTitle": "Reopen", "DatePeriod": "AllDay", "Count": 1 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس ایمیل", "Owner": "فاقد مسئول", "IncidentStatusId": 3, "IncidentStatusTitle": "InProgress", "DatePeriod": "AllDay", "Count": 1 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس ایمیل", "Owner": "فاقد مسئول", "IncidentStatusId": 4, "IncidentStatusTitle": "Close", "DatePeriod": "AllDay", "Count": 4 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس ایمیل", "Owner": "فاقد مسئول", "IncidentStatusId": 4, "IncidentStatusTitle": "Close", "DatePeriod": "AllDay", "Count": 4 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس خبری", "Owner": "فاقد مسئول", "IncidentStatusId": 1, "IncidentStatusTitle": "Open", "DatePeriod": "AllDay", "Count": 3 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس خبری", "Owner": "فاقد مسئول", "IncidentStatusId": 1, "IncidentStatusTitle": "Open", "DatePeriod": "AllDay", "Count": 3 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس خبری", "Owner": "فاقد مسئول", "IncidentStatusId": 3, "IncidentStatusTitle": "InProgress", "DatePeriod": "AllDay", "Count": 1 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس خبری", "Owner": "فاقد مسئول", "IncidentStatusId": 4, "IncidentStatusTitle": "Close", "DatePeriod": "AllDay", "Count": 4 },
        { "SupportGroupCategoryTitle": "شبکه", "ServiceTitle": "سرویس خبری", "Owner": "فاقد مسئول", "IncidentStatusId": 1, "IncidentStatusTitle": "Open", "DatePeriod": "Today", "Count": 2 },
        { "SupportGroupCategoryTitle": "همه", "ServiceTitle": "سرویس خبری", "Owner": "فاقد مسئول", "IncidentStatusId": 4, "IncidentStatusTitle": "Close", "DatePeriod": "AllDay", "Count": 4 }
];

Ext.define('armandar.IncidentStatistics', {
    extend: 'Ext.panel.Panel',
    alias:'widget.istatistics',
    layout: 'fit',
    border: true,
    constructor: function () {
        this.callParent(arguments);
        var grid = Ext.create('Mz.pivot.Grid', {
            viewLayoutType: 'compact',
            border:         false,            
            
            viewConfig: {
                trackOver: true,
                stripeRows: false
            },
            
            tbar: [{
                xtype: 'button',
                text: 'بازیابی اطلاعات',
                handler: function () {
                    grid.getStore().load();
                }
            }],
            
            store: Ext.create('Ext.data.Store', {
                autoLoad: true,
                fields: [{
                    name: 'SupportGroupCategoryTitle',
                    mapping: 'SupportGroupCategoryTitle'
                }, {
                    name: 'DatePeriod',
                    mapping: 'DatePeriod'
                }, {
                    name: 'Count',
                    mapping: 'Count'
                }, {
                    name: 'IncidentStatusTitle',
                    mapping: 'IncidentStatusTitle'
                }, {
                    name: 'Owner',
                    mapping: 'Owner'
                }, {
                    name: 'ServiceTitle',
                    mapping: 'ServiceTitle'
            }
                ],
                data: data
            }),
            aggregate: [{
                dataIndex:  'Count',
                header:     'تعداد',
                aggregator: 'sum',
                align:      'center',
                width:      45,
                renderer:   Ext.util.Format.numberRenderer('0')
            }, {
                dataIndex:  'Count',
                header:     'ميانگين',
                aggregator: 'avg',
                align:      'center',
                width:      45,
                renderer:   Ext.util.Format.numberRenderer('00.00')
            }],
            
            leftAxis: [{
                width:      120,
                dataIndex:  'SupportGroupCategoryTitle',
                header:     'گروه پشتيباني',
                direction:  'ASC'
            },{
                width:      120,
                dataIndex:  'ServiceTitle',
                header:     'سرويس',
                direction:  'ASC'
            },{
                width:      120,
                dataIndex:  'Owner',
                header:     'مسئول رسيدگي',
                direction:  'ASC'
            },{
                width:      120,
                dataIndex:  'IncidentStatusTitle',
                header:     'وضعيت',
                direction:  'ASC'
            }],

            topAxis: [{
                dataIndex:  'DatePeriod',
                width:      80,
                direction:  'DESC'
            }]
            
        });        
        this.items.add(grid);
    }
});