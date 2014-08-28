/*
This file is part of mzPivotGrid

Copyright (c) 2012-2014 Teodorescu D. Adrian PFA

Contact:  http://www.mzsolutions.eu

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance 
with the Commercial Software License Agreement provided with the Software.
 
*/

/**
* This is the class that takes care of pivot grid mouse events.
* 
*/
Ext.define('Mz.pivot.feature.PivotEvents',{
    extend: 'Ext.grid.feature.Feature',

    alias: 'feature.pivotevents',

    eventPrefix:    'pivotcell',
    eventSelector:  '.' + Ext.baseCSSPrefix + 'grid-cell',

    // this cls is used to catch events on the summary data rows (not on the header)
    summaryDataCls:             Ext.baseCSSPrefix + 'pivot-summary-data',
    summaryDataSelector:        '.' + Ext.baseCSSPrefix + 'pivot-summary-data',
    cellSelector:               '.' + Ext.baseCSSPrefix + 'grid-cell',
    groupHeaderCls:             Ext.baseCSSPrefix + 'pivot-group-header',
    groupHeaderCollapsibleCls:  Ext.baseCSSPrefix + 'pivot-group-header-collapsible',

    // summary rows styling
    summaryRowCls:              Ext.baseCSSPrefix + 'grid-group-total',
    summaryRowSelector:         '.' + Ext.baseCSSPrefix + 'grid-group-total',
    grandSummaryRowCls:         Ext.baseCSSPrefix + 'grid-grand-total',
    grandSummaryRowSelector:    '.' + Ext.baseCSSPrefix + 'grid-grand-total',

    init: function(grid){
        var me = this;
        
        me.initEventsListeners();
        
        me.callParent(arguments);
    },
    
    destroy: function(){
        var me = this;
        
        delete me.view;
        delete me.grid;
        
        if(me.gridMaster){
            delete me.gridMaster;
        }
        if(me.matrix){
            delete me.matrix;
        }
        
        me.destroyEventsListeners();
        me.callParent(arguments);
    },

    initEventsListeners: function(){
        var me = this,
            listeners = {
                afterrender:    me.onViewAfterRender,
                scope:          me,
                destroyable:    true
            };
        
        listeners[me.eventPrefix + 'click'] = me.onCellEvent;
        listeners[me.eventPrefix + 'dblclick'] = me.onCellEvent;
        listeners[me.eventPrefix + 'contextmenu'] = me.onCellEvent;
                
        me.eventsViewListeners = me.view.on(listeners);
    },

    destroyEventsListeners: function(){
        Ext.destroy(this.eventsViewListeners);
    },
    
    onViewAfterRender: function(){
        var me = this;
        
        me.gridMaster = this.view.up('mzpivotgrid');
        me.matrix = me.gridMaster.getMatrix();
    },
    
    onCellEvent: function(view, tdCell, e){
        var me = this,
            colIndex = -1,
            row = Ext.fly(tdCell).findParent(me.summaryDataSelector) || Ext.fly(tdCell).findParent(me.summaryRowSelector),
            group, ret, eventName,
            colIndex, column, colDef, leftKey, topKey,
            params = {
                grid:       me.gridMaster,
                view:       me.view,
                cellEl:     tdCell
            };
        
        if(!row){
            return false;
        }
        
        row = Ext.fly(row);
        leftKey = Ext.getDom(row).getAttribute('data-recordid');
        
        if(row.hasCls(me.grandSummaryRowCls)){
            // we are on the grand total row
            eventName = 'pivottotal';
        }else if(row.hasCls(me.summaryRowCls)){
            // we are on a group total row
            eventName = 'pivotgroup';
        }else if(row.hasCls(me.summaryDataCls)){
            // we are on a pivot item row
            eventName = 'pivotitem';
        }
        
        colIndex = Ext.getDom(tdCell).getAttribute('columnid');
        column = me.getColumnHeaderById(colIndex);
        
        Ext.apply(params, {
            columnId:   colIndex,
            column:     column,
            leftKey:    leftKey
        });
        
        if(Ext.fly(tdCell).hasCls(me.groupHeaderCls)){
            // it's a header cell
        }else{
            eventName += 'cell';
            colDef = me.getTopAxisGroupByDataIndex(column.dataIndex);
            if(colDef){
                topKey = colDef.col;
                
                Ext.apply(params, {
                    topKey:         topKey,
                    dimensionId:    colDef.agg
                });
            }
        }
        
        ret = me.gridMaster.fireEvent(eventName + e.type, params, e);
        
        if(ret !== false && e.type == 'click' && Ext.fly(tdCell).hasCls(me.groupHeaderCollapsibleCls)){
            // if this is a pivotgroupclick event type then expand/collapse that row group
            me.gridMaster.doExpandCollapse('row', leftKey);
            
            if(Ext.fly(leftKey)){
                Ext.fly(leftKey).scrollIntoView(me.view.el, false, false);
            }
        }
        
        return false;
    },
    
    getColumnHeaderById: function(columnId){
        var me = this,
            columns = me.view.getGridColumns(),
            i;
        
        for(i = 0; i < columns.length; i++){
            if(columns[i].id === columnId){
                return columns[i];
            }
        }
    },
    
    getTopAxisGroupByDataIndex: function(dataIndex){
        var me = this,
            columns = me.gridMaster.matrix.getColumns(),
            i;
            
        for(i = 0; i < columns.length; i++){
            if(columns[i].name === dataIndex){
                return columns[i];
            }
        }
    }


});