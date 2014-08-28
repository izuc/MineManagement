/*
This file is part of mzPivotGrid

Copyright (c) 2012-2014 Teodorescu D. Adrian PFA

Contact:  http://www.mzsolutions.eu

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance 
with the Commercial Software License Agreement provided with the Software.
 
*/

/**
* This class is used when running in ExtJS 4.1.x.
* It is automatically added to the pivot grid.
* 
*/
Ext.define('Mz.pivot.feature.PivotView41', {
    extend: 'Mz.pivot.feature.PivotViewCommon',

    alias: 'feature.pivotview41',

    requires: [
        'overrides.util.Format'
    ],
    
    init: function(grid){
        var me = this;

        me.callParent(arguments);

        me.view.preserveScrollOnRefresh = true;
    },
    
    getFragmentTpl: function() {
        var me = this;
        
        return {
            // @todo inject here the function that will be called from the template and renders the grid
            getPivotFeature: function(){
                return me;
            }
        };
    },

    // Injects isRow and closeRow into the metaRowTpl.
    getMetaRowTplFragments: function() {
        return {
            isRow: this.isRow,
            closeRow: this.closeRow
        };
    },

    // injected into rowtpl and wrapped around metaRowTpl
    // becomes part of the standard tpl
    isRow: function() {
        // @todo inject here the function that renders the rows
        // @todo in collectData set o.rows = [null]; to avoid any output of the row template
        return '{% this.getPivotFeature().renderGroups(out); %}' + '<tpl if="typeof rows === \'undefined\'">';
    },

    // injected into rowtpl and wrapped around metaRowTpl
    // becomes part of the standard tpl
    closeRow: function() {
        return '</tpl>';
    },

    // isRow and closeRow are injected via getMetaRowTplFragments
    mutateMetaRowTpl: function(metaRowTpl) {
        metaRowTpl.unshift('{[this.isRow()]}');
        metaRowTpl.push('{[this.closeRow()]}');
    },

    collectData: function(records, preppedRecords, startIndex, fullWidth, o) {
        var me = this;
        
        if(me.gridMaster && me.gridMaster.syncRowHeights && !me.gridMaster.hasMyInterceptor){
            me.gridMaster.syncRowHeights = Ext.Function.createInterceptor(me.gridMaster.syncRowHeights, me.syncGroupHeaders());
            me.gridMaster.hasMyInterceptor = true;
        }
        
        me.setup();
        o.rows = [null];
        
        return o;
    },
    
    renderGroups: function(out){
        var me = this;
        
        me.outputGroups({
            out:        out,
            values: {
                view:           me.view,
                columns:        me.columns,
                itemClasses:    []
            }
        });
    },
    
    // we need to sync the group headers too if the grid is locked
    syncGroupHeaders: function(){
        var pivotFeature = this;
        
        return function(){
            var me = this,
                ln,
                i  = 0,
                lockedView, normalView,
                lockedRowEls, normalRowEls,
                scrollTop;

            
            
            lockedView = me.lockedGrid.getView();
            normalView = me.normalGrid.getView();
            lockedRowEls = lockedView.el.query('tr:any(' + pivotFeature.summaryRowSelector + '|' + pivotFeature.grandSummaryRowSelector + ')');
            normalRowEls = normalView.el.query('tr:any(' + pivotFeature.summaryRowSelector + '|' + pivotFeature.grandSummaryRowSelector + ')');
            ln = lockedRowEls.length;
            
            if(lockedRowEls.length == normalRowEls.length){
                for (; i < ln; i++) {
                    Ext.fly(normalRowEls[i]).setHeight(lockedRowEls[i].offsetHeight);
                }
            }
        }
    }
    
    
    
});