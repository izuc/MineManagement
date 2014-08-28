/*
This file is part of mzPivotGrid

Copyright (c) 2012-2014 Teodorescu D. Adrian PFA

Contact:  http://www.mzsolutions.eu

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance 
with the Commercial Software License Agreement provided with the Software.
 
*/

/**
* This class takes care of pivot grid layout rendering.
* 
*/
Ext.define('Mz.pivot.feature.PivotViewCommon',{
    extend: 'Mz.pivot.feature.PivotEvents',
        
    // all views css classes
    groupTitleCls:              Ext.baseCSSPrefix + 'pivot-group-title',
    groupHeaderCollapsedCls:    Ext.baseCSSPrefix + 'pivot-group-header-collapsed',
    tableCls:                   Ext.baseCSSPrefix + 'grid-table',
    rowCls:                     Ext.baseCSSPrefix + 'grid-row',
    dirtyCls:                   Ext.baseCSSPrefix + 'grid-dirty-cell',
    
    // outline view css classes
    outlineCellHiddenCls:       Ext.baseCSSPrefix + 'pivot-outline-cell-hidden',
    outlineCellGroupExpandedCls:Ext.baseCSSPrefix + 'pivot-outline-cell-previous-expanded',
    
    compactGroupHeaderCls:      Ext.baseCSSPrefix + 'pivot-group-header-compact',
    
    compactLayoutPadding:       25,

    rtlAlign: {
        right:  'left',
        left:   'right',
        center: 'center'
    },

    pivotRowTpl: [
        '{%',
            'var dataRowCls = values.recordIndex === -1 ? "" : " ' + Ext.baseCSSPrefix + 'grid-data-row";',
        '%}',
        '<tr role="row" {[values.rowId ? ("id=\\"" + values.rowId + "\\"") : ""]} ',
            'data-boundView="{view.id}" ',
            'data-recordId="{record.internalId}" ',
            'data-recordIndex="{recordIndex}" ',
            'class="{[values.itemClasses.join(" ")]} {[values.rowClasses.join(" ")]}{[dataRowCls]}" ',
            '{rowAttr:attributes} tabIndex="-1">',
            '<tpl for="columns">' +
                '{%',
                    'this.getPivotFeature().renderCell(values, parent.record, parent.recordIndex, xindex - 1, out, parent)',
                 '%}',
            '</tpl>',
        '</tr>',
        {
            priority: 0
        }
    ],

    pivotCellTpl: [
        '{%',
            'values.hideCell = values.tdAttr == "hidden";\n',
        '%}',
        '<tpl if="!hideCell">',
            '<td class="{tdCls}" {tdAttr} columnid="{column.id}" columnindex="{columnIndex}">',
                '<div {unselectableAttr} class="' + Ext.baseCSSPrefix + 'grid-cell-inner"',
                    'style="text-align:{align};<tpl if="style">{style}</tpl>">{value}</div>',
            '</td>',
        '</tpl>', {
            priority: 0
        }
    ],

    cellValues: {
        classes: [
            Ext.baseCSSPrefix + 'grid-cell ' + Ext.baseCSSPrefix + 'grid-td' // for styles shared between cell and rowwrap 
        ]
    },
    
    isRTL: function(){
        var me = this;
        
        if(me.gridMaster.getHierarchyState){
            return me.gridMaster.getHierarchyState().rtl;
        }
        
        return false;
    },

    renderRow: function(values, out){
        var me = this,
            tpl = me.pivotRowTpl;
            
        //tpl.pivotViewFeature = me;
        tpl.getPivotFeature = function(){
            return me;
        };
        tpl.applyOut(values, out);
    },
    
    renderCell: function(column, record, recordIndex, columnIndex, out) {
        var me = this,
            selModel = me.grid.selModel,
            cellValues = me.cellValues,
            classes = cellValues.classes,
            fieldValue = record.data[column.dataIndex],
            cellTpl = me.pivotCellTpl,
            value, clsInsertPoint;

        cellValues.record = record;
        cellValues.column = column;
        cellValues.recordIndex = recordIndex;
        cellValues.columnIndex = columnIndex;
        cellValues.cellIndex = columnIndex;
        cellValues.align = me.isRTL() ? me.rtlAlign[column.align] : column.align;
        cellValues.tdCls = column.tdCls;
        cellValues.innerCls = column.innerCls;
        cellValues.style = cellValues.tdAttr = "";
        cellValues.unselectableAttr = me.grid.enableTextSelection ? '' : 'unselectable="on"';

        if (column.renderer && column.renderer.call) {
            value = column.renderer.call(column.scope || me.ownerCt, fieldValue, cellValues, record, recordIndex, columnIndex, me.dataSource, me);
            if (cellValues.css) {
                // This warning attribute is used by the compat layer
                // TODO: remove when compat layer becomes deprecated
                record.cssWarning = true;
                cellValues.tdCls += ' ' + cellValues.css;
                delete cellValues.css;
            }
        } else {
            value = fieldValue;
        }
        cellValues.value = (value == null || value === '') ? '&#160;' : value;

        // Calculate classes to add to cell
        classes[1] = Ext.baseCSSPrefix + 'grid-cell-' + column.getItemId();
            
        // On IE8, array[len] = 'foo' is twice as fast as array.push('foo')
        // So keep an insertion point and use assignment to help IE!
        clsInsertPoint = 2;

        if (column.tdCls) {
            classes[clsInsertPoint++] = column.tdCls;
        }
        if (me.markDirty && record.isModified(column.dataIndex)) {
            classes[clsInsertPoint++] = me.dirtyCls;
        }
        if (column.isFirstVisible) {
            classes[clsInsertPoint++] = me.grid.firstCls;
        }
        if (column.isLastVisible) {
            classes[clsInsertPoint++] = me.grid.lastCls;
        }
        if (!me.enableTextSelection) {
            classes[clsInsertPoint++] = Ext.baseCSSPrefix + 'unselectable';
        }

        classes[clsInsertPoint++] = cellValues.tdCls;
        if (selModel && selModel.isCellSelected && selModel.isCellSelected(me, recordIndex, columnIndex)) {
            classes[clsInsertPoint++] = (me.grid.selectedCellCls);
        }

        // Chop back array to only what we've set
        classes.length = clsInsertPoint;

        cellValues.tdCls = classes.join(' ');

        cellTpl.applyOut(cellValues, out);
        
        // Dereference objects since cellValues is a persistent var in the XTemplate's scope chain
        cellValues.column = null;
    },


    setup: function () {
        var me = this;

//        if(!me.gridMaster){
//            me.gridMaster = me.view.ownerCt.up("mzpivotgrid") || me.view.ownerCt;
//        }
//        if(!me.matrix){
//            me.matrix = me.gridMaster.getMatrix();
//        }
        me.columns = me.view.getGridColumns();
        
        
        if(Ext.XTemplate.getTpl){
            me.pivotRowTpl = Ext.XTemplate.getTpl(me, 'pivotRowTpl');
            me.pivotCellTpl = Ext.XTemplate.getTpl(me, 'pivotCellTpl');
        }else{
            me.pivotRowTpl = new Ext.XTemplate(me['pivotRowTpl']);
            me.pivotCellTpl = new Ext.XTemplate(me['pivotCellTpl']);
        }

        me.processDone = false;
    },

    getRowId: function(record){
        return this.view.id + '-record-' + record.internalId;
    },
    
    outputGroups: function(config){
        var me = this,
            fn = me['outputGroup' + Ext.String.capitalize(me.matrix.viewLayoutType)],
            outputFn,
            out = config['out'], 
            values = config['values'];
        
        if(!Ext.isFunction(fn)){
            // specified view type doesn't exist so let's use the outline view
            fn = me.outputGroupOutline;
        }
        outputFn = Ext.Function.bind(fn, me);
        
        // add the grand total line
        if(me.matrix.rowGrandTotalsPosition == 'first'){
            me.outputGrandTotal({
                out:        out,
                columns:    values.columns
            });
        }
        
        Ext.Array.each(me.matrix.leftAxis.getTree(), function(group, index, all){
            outputFn({
                out:                out,
                group:              group,
                values:             values,
                previousExpanded:   (index > 0 ? all[index-1].expanded : false)
            });
        }, me);
        
        // add the grand total line
        if(me.matrix.rowGrandTotalsPosition == 'last'){
            me.outputGrandTotal({
                out:        out,
                columns:    values.columns
            });
        }

        // mark the process as done so we don't do the same stuff for all records in the store
        me.processDone = true;
    },
    
    outputGrandTotal: function(config){
        var me = this,
            out = config['out'], 
            columns = config['columns'], 
            i = me.matrix.leftAxis.dimensions.getCount(), 
            found = false,
            tplVars, record,
            group = {
                key:    me.matrix.grandTotalKey
            };
            
        if(!me.matrix.pivotStore){
            return;
        }
        
        // create a dummy record
        record = new me.matrix.pivotStore.model(me.matrix.preparePivotStoreRecordData(group));
        record.internalId = me.matrix.grandTotalKey;
        
        tplVars = {
            view:           me.view,
            record:         record,
            rowStyle:       '',
            rowClasses:     [],
            itemClasses:    [me.grandSummaryRowCls, me.summaryDataCls],
            recordIndex:    -1,
            rowId:          me.getRowId(record),
            columns:        columns
        };

        Ext.Array.each(columns, function(column){
            if(column.leftAxis){
                column.savedRenderer = column.renderer;
                if(me.matrix.viewLayoutType == 'compact' || column.dataIndex == me.matrix.leftAxis.dimensions.getAt(0).getId()){
                    if(me.matrix.viewLayoutType == 'compact'){
                        record.set(me.matrix.compactViewKey, me.matrix.textGrandTotalTpl);
                        i = 1;
                    }else{
                        record.set(column.dataIndex, me.matrix.textGrandTotalTpl);
                    }
                    record.commit();
                    column.renderer = me.groupOutlineRenderer({
                        renderer:           column.renderer, 
                        group:              group, 
                        colspan:            i, 
                        hidden:             false, 
                        subtotalRow:        true
                    }); 
                    found = true;
                }else{
                    column.renderer = me.groupOutlineRenderer({
                        renderer:           column.renderer, 
                        group:              group, 
                        colspan:            0, 
                        hidden:             found, 
                        subtotalRow:        true
                    }); 
                    i--;
                }
            }
        });
        
        //me.view.self.prototype.rowTpl.applyOut(tplVars, out);
        me.renderRow(tplVars, out);

        // Restore regular column renderers
        Ext.Array.each(columns, function(column){
            if(column.leftAxis){
                column.renderer = column.savedRenderer;
                delete column.savedRenderer;
            }
        });
    },
    
    
// Outline view functions    

    outputGroupOutline: function(config){
        var me = this,
            group = config['group'], 
            values = config['values'], 
            out = config['out'], 
            previousExpanded = config['previousExpanded'];
        
        if(group.record){
            me.outputGroupOutlineWithoutChildren({
                group:              group, 
                values:             values, 
                out:                out
            });
        }else{
            me.outputGroupOutlineWithChildren({
                group:              group, 
                values:             values, 
                out:                out,
                previousExpanded:   previousExpanded
            });
        }
    },

    outputGroupOutlineWithoutChildren: function(config){
        var me = this,
            group = config['group'], 
            values = config['values'], 
            out = config['out'],
            itemClasses = values.itemClasses;
            
        itemClasses.push(me.summaryRowCls, me.groupHeaderCls, me.groupTitleCls);
        
        me.outputRecordOutline({
            group:      group, 
            values:     values, 
            out:        out
        });
    },
    
    outputGroupOutlineWithChildren: function(config){
        var me = this,
            group = config['group'], 
            values = config['values'], 
            out = config['out'], 
            previousExpanded = config['previousExpanded'],
            hasSummaryData = false,
            record, i;
            
        if(!group.expanded || (group.expanded && me.matrix.rowSubTotalsPosition == 'first')){
            // summary row is on the group header
            hasSummaryData = true;
            record = new me.matrix.pivotStore.model(me.matrix.preparePivotStoreRecordData(group));
        }else if(me.matrix.rowSubTotalsPosition == 'last' || me.matrix.rowSubTotalsPosition == 'none'){
            record = new me.matrix.pivotStore.model();
            record.set(group.dimension.getId(), group.name);
        }
        record.internalId = group.key;
        record.commit();
        
        me.outputGroupHeaderRecordOutline({
            out:                out, 
            group:              group, 
            record:             record, 
            columns:            values.columns, 
            previousExpanded:   previousExpanded,
            hasSummaryData:     hasSummaryData
        });

        if(group.expanded){
            if(group.children){
                for(i = 0; i < group.children.length; i++){
                    if(group.children[i]['children']){
                        me.outputGroupOutlineWithChildren({
                            group:      group.children[i], 
                            values:     values, 
                            out:        out
                        });
                    }else{
                        me.outputRecordOutline({
                            group:      group.children[i], 
                            values:     values, 
                            out:        out
                        });
                    }
                }
            }
            if(me.matrix.rowSubTotalsPosition == 'last'){
                record = new me.matrix.pivotStore.model(me.matrix.preparePivotStoreRecordData(group));
                record.set(group.dimension.getId(), group.getTextTotal());
                record.internalId = group.key;
                record.commit();
                me.outputGroupHeaderRecordOutline({
                    out:                out, 
                    group:              group, 
                    record:             record, 
                    columns:            values.columns, 
                    previousExpanded:   previousExpanded, 
                    subtotalRow:        true,
                    hasSummaryData:     true
                });
            }
        }
    },
    
    outputGroupHeaderRecordOutline: function(config){
        var me = this,
            out = config['out'], 
            group = config['group'], 
            record = config['record'], 
            columns = config['columns'], 
            previousExpanded = config['previousExpanded'], 
            subtotalRow = config['subtotalRow'],
            hasSummaryData = config['hasSummaryData'],
            i = me.matrix.leftAxis.dimensions.getCount(), 
            found = false,
            tplVars;
            
        tplVars = {
            view:           me.view,
            record:         record,
            rowStyle:       '',
            rowClasses:     [],
            itemClasses:    [me.summaryRowCls, hasSummaryData ? me.summaryDataCls : ''],
            recordIndex:    -1,
            rowId:          me.getRowId(record),
            columns:        columns
        };

        Ext.Array.each(columns, function(column){
            if(column.leftAxis){
                column.savedRenderer = column.renderer;
                if(column.dataIndex == group.dimension.getId()){
                    column.renderer = me.groupOutlineRenderer({
                        renderer:           column.renderer, 
                        group:              group, 
                        colspan:            i, 
                        hidden:             false, 
                        previousExpanded:   previousExpanded, 
                        subtotalRow:        subtotalRow
                    }); 
                    found = true;
                }else{
                    column.renderer = me.groupOutlineRenderer({
                        renderer:           column.renderer, 
                        group:              group, 
                        colspan:            0, 
                        hidden:             found, 
                        previousExpanded:   previousExpanded, 
                        subtotalRow:        subtotalRow
                    }); 
                    i--;
                }
            }
        });
        
        //me.view.self.prototype.rowTpl.applyOut(tplVars, out);
        me.renderRow(tplVars, out);

        // Restore regular column renderers
        Ext.Array.each(columns, function(column){
            if(column.leftAxis){
                column.renderer = column.savedRenderer;
                delete column.savedRenderer;
            }
        });
    },

    outputRecordOutline: function(config){
        var me = this,
            group = config['group'], 
            values = config['values'], 
            out = config['out'],
            found = false,
            record = group.record,
            tplVars;

        tplVars = {
            view:           me.view,
            record:         record,
            rowStyle:       '',
            rowClasses:     [],
            itemClasses:    [me.rowCls, me.summaryDataCls],
            recordIndex:    me.gridMaster.store.data.indexOfKey(record.getId()),
            rowId:          me.getRowId(record),
            columns:        values.columns
        };
        
        Ext.Array.each(values.columns, function(column){
            if(column.leftAxis){
                column.savedRenderer = column.renderer;
                if(column.dataIndex == group.dimension.getId()){
                    found = true;
                }
                column.renderer = me.recordOutlineRenderer({
                    renderer:   column.renderer, 
                    group:      group, 
                    hidden:     !found
                }); 
            }
        });
        
        //me.view.self.prototype.rowTpl.applyOut(tplVars, out);
        me.renderRow(tplVars, out);

        // Restore regular column renderers
        Ext.Array.each(values.columns, function(column){
            if(column.leftAxis){
                column.renderer = column.savedRenderer;
                delete column.savedRenderer;
            }
        });
    },

    groupOutlineRenderer: function(config){
        var me = this,
            prevRenderer = config['renderer'], 
            group = config['group'], 
            colspan = config['colspan'], 
            hidden = config['hidden'], 
            previousExpanded = config['previousExpanded'], 
            subtotalRow = config['subtotalRow'];
        
        return function (value, metaData, record, rowIndex, colIndex, store, view) {
            if(Ext.isFunction(prevRenderer)){
                value = prevRenderer.apply(this, arguments);
            }
            // the value has to be encoded to avoid messing up the DOM
            value = Ext.String.htmlEncode(String(value));
            
            if(colspan > 0){
                metaData.tdAttr = 'id="' + group.key + '" colspan = "' + colspan + '"';
                //metaData.tdCls = me.summaryTableTitleCls;
                metaData.tdCls = me.groupHeaderCls;
                if(!subtotalRow){
                    metaData.tdCls += ' ' + me.groupHeaderCollapsibleCls;
                    if(!group.expanded){
                        metaData.tdCls += ' ' + me.groupHeaderCollapsedCls;
                    }
                    if(previousExpanded){
                        metaData.tdCls += ' ' + me.outlineCellGroupExpandedCls;
                    }
                }
                
                return '<div class="' + me.groupTitleCls +'">' + value + '</div>';
            }
            if(hidden){
                metaData.tdAttr = 'hidden';
            }
            metaData.tdCls = me.outlineCellHiddenCls;
            return '';
        }
    },

    recordOutlineRenderer: function(config){
        var me = this,
            prevRenderer = config['renderer'], 
            group = config['group'], 
            hidden = config['hidden'];
        
        return function (value, metaData, record, rowIndex, colIndex, store, view) {
            if(Ext.isFunction(prevRenderer)){
                value = prevRenderer.apply(this, arguments);
            }
            // the value has to be encoded to avoid messing up the DOM
            value = Ext.String.htmlEncode(String(value));
            
            if(hidden){
                //metaData.tdCls = ''; // a class that hides the cell borders
                metaData.tdCls = me.outlineCellHiddenCls;
                return '';
            }
            metaData.tdCls = me.groupHeaderCls + ' ' + me.groupTitleCls;
            return value;
        }
    },




// Compact view functions
    
    outputGroupCompact: function(config){
        var me = this,
            group = config['group'], 
            values = config['values'], 
            out = config['out'], 
            previousExpanded = config['previousExpanded'];
        
        if(group.record){
            me.outputGroupCompactWithoutChildren({
                group:              group, 
                values:             values, 
                out:                out
            });
        }else{
            me.outputGroupCompactWithChildren({
                group:              group, 
                values:             values, 
                out:                out,
                previousExpanded:   previousExpanded
            });
        }
    },

    outputGroupCompactWithoutChildren: function(config){
        var me = this,
            group = config['group'], 
            values = config['values'], 
            out = config['out'],
            itemClasses = values.itemClasses;
            
        itemClasses.push(me.summaryRowCls, me.groupHeaderCls, me.groupTitleCls);
        
        me.outputRecordCompact({
            group:      group, 
            values:     values, 
            out:        out
        });
    },
    
    outputGroupCompactWithChildren: function(config){
        var me = this,
            group = config['group'], 
            values = config['values'], 
            out = config['out'], 
            previousExpanded = config['previousExpanded'],
            hasSummaryData = false,
            record, i;
            
        if(!group.expanded || (group.expanded && me.matrix.rowSubTotalsPosition == 'first')){
            // summary row is on the group header
            hasSummaryData = true;
            record = new me.matrix.pivotStore.model(me.matrix.preparePivotStoreRecordData(group));
        }else if(me.matrix.rowSubTotalsPosition == 'last' || me.matrix.rowSubTotalsPosition == 'none'){
            record = new me.matrix.pivotStore.model();
            record.set(me.matrix.compactViewKey, group.name);
        }
        record.internalId = group.key;
        record.commit();
        
        me.outputGroupHeaderRecordCompact({
            out:                out, 
            group:              group, 
            record:             record, 
            columns:            values.columns, 
            previousExpanded:   previousExpanded,
            hasSummaryData:     hasSummaryData
        });

        if(group.expanded){
            if(group.children){
                for(i = 0; i < group.children.length; i++){
                    if(group.children[i]['children']){
                        me.outputGroupCompactWithChildren({
                            group:      group.children[i], 
                            values:     values, 
                            out:        out
                        });
                    }else{
                        me.outputRecordCompact({
                            group:      group.children[i], 
                            values:     values, 
                            out:        out
                        });
                    }
                }
            }
            if(me.matrix.rowSubTotalsPosition == 'last'){
                record = new me.matrix.pivotStore.model(me.matrix.preparePivotStoreRecordData(group));
                record.set(me.matrix.compactViewKey, group.getTextTotal());
                record.internalId = group.key;
                record.commit();
                me.outputGroupHeaderRecordCompact({
                    out:                out, 
                    group:              group, 
                    record:             record, 
                    columns:            values.columns, 
                    previousExpanded:   previousExpanded, 
                    subtotalRow:        true,
                    hasSummaryData:     true
                });
            }
        }
    },
    
    outputGroupHeaderRecordCompact: function(config){
        var me = this,
            out = config['out'], 
            group = config['group'], 
            record = config['record'], 
            columns = config['columns'], 
            previousExpanded = config['previousExpanded'], 
            subtotalRow = config['subtotalRow'],
            hasSummaryData = config['hasSummaryData'],
            i = me.matrix.leftAxis.dimensions.getCount(), 
            found = false,
            tplVars;
            
        tplVars = {
            view:           me.view,
            record:         record,
            rowStyle:       '',
            rowClasses:     [],
            itemClasses:    [me.summaryRowCls, hasSummaryData ? me.summaryDataCls : ''],
            recordIndex:    -1,
            rowId:          me.getRowId(record),
            columns:        columns
        };

        Ext.Array.each(columns, function(column){
            if(column.leftAxis){
                column.savedRenderer = column.renderer;
                column.renderer = me.groupCompactRenderer({
                    renderer:           column.renderer, 
                    group:              group, 
                    colspan:            0, 
                    previousExpanded:   previousExpanded, 
                    subtotalRow:        subtotalRow
                }); 
            }
        });
        
        //me.view.self.prototype.rowTpl.applyOut(tplVars, out);
        me.renderRow(tplVars, out);

        // Restore regular column renderers
        Ext.Array.each(columns, function(column){
            if(column.leftAxis){
                column.renderer = column.savedRenderer;
                delete column.savedRenderer;
            }
        });
    },

    outputRecordCompact: function(config){
        var me = this,
            group = config['group'], 
            values = config['values'], 
            out = config['out'],
            found = false,
            record = group.record,
            tplVars;
            
        tplVars = {
            view:           me.view,
            record:         record,
            rowStyle:       '',
            rowClasses:     [],
            itemClasses:    [me.rowCls, me.summaryDataCls],
            recordIndex:    me.gridMaster.store.data.indexOfKey(record.getId()),
            rowId:          me.getRowId(record),
            columns:        values.columns
        };
        
        Ext.Array.each(values.columns, function(column){
            if(column.leftAxis){
                column.savedRenderer = column.renderer;
                column.renderer = me.recordCompactRenderer({
                    renderer:   column.renderer, 
                    group:      group
                }); 
            }
        });
        
        //me.view.self.prototype.rowTpl.applyOut(tplVars, out);
        me.renderRow(tplVars, out);

        // Restore regular column renderers
        Ext.Array.each(values.columns, function(column){
            if(column.leftAxis){
                column.renderer = column.savedRenderer;
                delete column.savedRenderer;
            }
        });
    },

    groupCompactRenderer: function(config){
        var me = this,
            prevRenderer = config['renderer'], 
            group = config['group'], 
            colspan = config['colspan'], 
            previousExpanded = config['previousExpanded'], 
            subtotalRow = config['subtotalRow'];
        
        return function (value, metaData, record, rowIndex, colIndex, store, view) {
            if(Ext.isFunction(prevRenderer)){
                value = prevRenderer.apply(this, arguments);
            }

            // the value has to be encoded to avoid messing up the DOM
            value = Ext.String.htmlEncode(String(value));

            if(group.level > 0){
                metaData.style = (me.isRTL() ? 'margin-right: ' : 'margin-left: ') + (me.compactLayoutPadding * group.level) + 'px;';
            }
            
            metaData.tdAttr = 'id="' + group.key + '"';
            metaData.tdCls = me.groupHeaderCls + ' ' + me.compactGroupHeaderCls;
            if(!subtotalRow){
                metaData.tdCls += ' ' + me.groupHeaderCollapsibleCls;
                if(!group.expanded){
                    metaData.tdCls += ' ' + me.groupHeaderCollapsedCls;
                }
                if(previousExpanded){
                    metaData.tdCls += ' ' + me.outlineCellGroupExpandedCls;
                }
            }
            
            return '<div class="' + me.groupTitleCls +'">' + value + '</div>';
        }
    },

    recordCompactRenderer: function(config){
        var me = this,
            prevRenderer = config['renderer'], 
            group = config['group'];
        
        return function (value, metaData, record, rowIndex, colIndex, store, view) {
            if(Ext.isFunction(prevRenderer)){
                value = prevRenderer.apply(this, arguments);
            }

            // the value has to be encoded to avoid messing up the DOM
            value = Ext.String.htmlEncode(String(value));

            if(group.level > 0){
                metaData.style = (me.isRTL() ? 'margin-right: ' : 'margin-left: ') + (me.compactLayoutPadding * group.level) + 'px;';
            }
            
            metaData.tdCls = me.groupHeaderCls + ' ' + me.groupTitleCls + ' ' + me.compactGroupHeaderCls;
            return value;
        }
    }
    

});