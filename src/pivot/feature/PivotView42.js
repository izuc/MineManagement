/*
This file is part of mzPivotGrid

Copyright (c) 2012-2014 Teodorescu D. Adrian PFA

Contact:  http://www.mzsolutions.eu

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance 
with the Commercial Software License Agreement provided with the Software.
 
*/

/**
* This class is used when running in ExtJS 4.2.x
* It is automatically added to the pivot grid.
* 
*/
Ext.define('Mz.pivot.feature.PivotView42', {
    extend: 'Mz.pivot.feature.PivotViewCommon',
    
    alias: 'feature.pivotview42',
    
    tableTpl: {
        before: function (values) {
            this.pivotViewFeature.setup();
            // we only need one record to be able to render the complete groups
            // there's no need to iterate through all of them
            if(values.rows.length > 0){
                values.rows.length = 1;
            }
        },
        after: function (values) {
            // some cleanup here?
            //this.pivotViewFeature.cleanup();
        },
        priority: 200
    },
    
    rowTpl: [
        '{%',
            //'debugger;\n',
            'if(!this.pivotViewFeature.processDone) {',
                'this.pivotViewFeature.outputGroups({out: out, values: values});\n',
            '}',
        '%}',
        {
            priority: 200,

            syncRowHeights: function (firstRow, secondRow) {
                var owner = this.owner,
                    selectors = [owner.groupHeaderCollapsibleCls, owner.summaryRowCls, Ext.baseCSSPrefix + 'grid-data-row']; //, owner.summaryTableInlineSelector];

                firstRow = Ext.fly(firstRow, 'syncDest');
                secondRow = Ext.fly(secondRow, 'sycSrc');

                // Sync the heights of header elements in each row if they need it.
                Ext.each(selectors, function(item){
                    var firstHd = firstRow.select('tr[class*=' + item + ']', true),
                        firstLen = firstHd.getCount(),
                        secondHd = secondRow.select('tr[class*=' + item + ']', true),
                        secondLen = secondHd.getCount();
                    
                    if(firstLen > 0 && secondLen > 0 && firstLen == secondLen){
                        firstHd.each(function(firstEl, c, index){
                            var firstHeight, secondHeight,
                                secondEl = secondHd.item(index);
                            
                            //firstEl.style.height = secondEl.style.height = '';
                            if ((firstHeight = firstEl.getAttribute('offsetHeight')) > (secondHeight = secondEl.getAttribute('offsetHeight'))) {
                                secondEl.setHeight(firstHeight);
                            }
                            else if (secondHeight > firstHeight) {
                                firstEl.setHeight(secondHeight);
                            }
                        });
                    }
                });
            },

            syncContent: function (destRow, sourceRow) {
                destRow = Ext.fly(destRow, 'syncDest');
                sourceRow = Ext.fly(sourceRow, 'sycSrc');
                var owner = this.owner,
                    destHd = destRow.select(owner.eventSelector),
                    sourceHd = sourceRow.select(owner.eventSelector),
                    destSummaryRow = destRow.select(owner.summaryRowSelector),
                    sourceSummaryRow = sourceRow.select(owner.summaryRowSelector);

                // Sync the content of header element.
                if (destHd && sourceHd && destHd.getCount() <= sourceHd.getCount()) {
                    destHd.each(function (el, c, index) {
                        el.syncContent(sourceHd.item(index));
                    });
                }

                // Sync the content of summary row elements. There may be more summary elements for multiple level grouping
                if (destSummaryRow && sourceSummaryRow && destSummaryRow.getCount() <= sourceSummaryRow.getCount()) {
                    destSummaryRow.each(function (el, c, index) {
                        el.syncContent(sourceSummaryRow.item(index));
                    });
                }
            }
        }
    ],

    init: function (grid) {
        var me = this,
            view = me.view;

        me.callParent(arguments);

        // Add a table level processor
        view.addTableTpl(me.tableTpl).pivotViewFeature = me;
        // Add a row level processor
        view.addRowTpl(Ext.XTemplate.getTpl(me, 'rowTpl')).pivotViewFeature = me;
        //view.addCellTpl(Ext.XTemplate.getTpl(me, 'pivotCellTpl'));

        view.preserveScrollOnRefresh = true;
    },
    
    vetoEvent: function (record, row, rowIndex, e) {
        // Do not veto mouseover/mouseout
        if (e.type !== 'mouseover' && e.type !== 'mouseout' && e.type !== 'mouseenter' && e.type !== 'mouseleave' && e.getTarget(this.eventSelector)) {
            return false;
        }
    }
    

});