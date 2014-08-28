/*
This file is part of mzPivotGrid

Copyright (c) 2012-2014 Teodorescu D. Adrian PFA

Contact:  http://www.mzsolutions.eu

Commercial Usage
Licensees holding valid commercial licenses may use this file in accordance 
with the Commercial Software License Agreement provided with the Software.
 
*/

/**
* This matrix processes the records locally without any remote calls to the server.
* 
*/
Ext.define('Mz.aggregate.matrix.Local', {
    extend: 'Mz.aggregate.matrix.Abstract',
    
    alias:  'pivotmatrix.local',
    mztype: 'local',
    
    requires: [
        'Mz.aggregate.matrix.Abstract',
        'Mz.aggregate.axis.Local'
    ],

    mztypeLeftAxis:     'local',
    mztypeTopAxis:      'local',
    
    /**
    * This is the store used to pivot the data.
    * 
    * @cfg
    * @type {Ext.data.Store}
    */
    store:              null,
    
    /**
    * The matrix processes the records in multiple jobs.
    * Specify here how many records should be processed in a single job.
    * 
    * @cfg
    * @type Number
    */
    recordsPerJob:      1000,
    
    /**
    * How many miliseconds between processing jobs?
    * 
    * @cfg
    * @type Number
    */
    timeBetweenJobs:    2,
    
    onInitialize: function(){
        var me = this;
        
        me.localDelayedTask = new Ext.util.DelayedTask(me.delayedProcess, me);
        
        me.callParent(arguments);
    },
    
    onReconfigure: function(config){
        var me = this,
            store, newStore;
        
        if(config.store){
            // a new store was passed to
            newStore = config.store;
        }else{
            if(me.store){
                if(me.store.isStore && !me.storeListeners){
                    // we have a store but no listeners were attached to it
                    store = me.store;
                }else{
                    // we need to initialize the store that we got
                    newStore = me.store;
                }
            }
        }
        
        if(newStore){
            store = Ext.getStore(newStore || '');
            if(Ext.isEmpty(store) && Ext.isString(newStore)){
                store = Ext.create(newStore);
            }
        }

        if(store && store.isStore){
            Ext.destroy(me.storeListeners);
            
            if(me.store && me.store.autoDestroy && store != me.store){
                Ext.destroy(me.store);
            }
            
            // let's initialize the store (if needed)
            me.store = store;
            // add listeners to the store
            me.storeListeners = me.store.on({
                refresh:        me.startProcess,
                datachanged:    me.startProcess,
//                add:            me.startProcess,
//                update:         me.startProcess,
//                remove:         me.startProcess,
                clear:          me.startProcess,
                scope:          me,
                destroyable:    true
            });
        }
        
        me.callParent(arguments);
    },
    
    onDestroy: function(){
        var me = this;
        
        me.localDelayedTask.cancel();
        me.localDelayedTask = null;
        
        Ext.destroy(me.storeListeners);
        if(me.store && me.store.isStore && me.store.autoDestroy){
            Ext.destroy(me.store);
        }
        
        me.callParent(arguments);
    },
    
    startProcess: function(){
        var me = this;
        
        // if we don't have a store then do nothing
        if(!me.store || (me.store && !me.store.isStore)){
            // nothing to do
            return;
        }
        
        me.clearData();
        
        me.localDelayedTask.delay(50);
    },
    
    delayedProcess: function(){
        var me = this;
        
        // let's start the process
        me.fireEvent('start', me);
        
        if(me.store.getTotalCount() == 0){
            me.endProcess();
            return;
        }
        
        me.statusInProgress = false;
        
        me.records = me.store.getRange();
        
        me.processRecords(0);
    },
    
    processRecords: function(position){
        var me = this,
            i = position, totalLength = me.records.length;
        
        me.statusInProgress = true;

        while(i < totalLength && i < position + me.recordsPerJob && me.statusInProgress){
            me.processRecord(me.records[i], i, totalLength);
            i++;
        }
        
        // if we reached the last record then stop the process
        if(i >= totalLength){
            me.statusInProgress = false;
            
            // now that the cells matrix was built let's calculate the aggregates
            me.results.calculate();

            // let's build the trees and apply value filters
            me.leftAxis.buildTree();
            me.topAxis.buildTree();

            // recalculate everything after applying the value filters
            if(me.filterApplied){
                me.results.calculate();
            }
            
            me.endProcess();
            return;
        }
        
        // if the matrix was not reconfigured meanwhile then start a new job
        if(me.statusInProgress && totalLength > 0){
            Ext.defer(me.processRecords, me.timeBetweenJobs, me, [i]);
        }
    },
    
    /**
    * Process the specified record and fire the 'progress' event
    */
    processRecord: function(record, index, length){
        var me = this,
            grandTotalKey = me.grandTotalKey,
            leftKeys, topKeys, i, j,
            grandTotalDone = false;
        
        leftKeys = me.leftAxis.addRecord(record);
        topKeys = me.topAxis.addRecord(record);
        
        if(leftKeys.length > 0 || topKeys.length > 0){
            me.results.add(grandTotalKey, grandTotalKey).addRecord(record);
        }

        for (i = 0; i < leftKeys.length; i++) {
            me.results.add(leftKeys[i], grandTotalKey).addRecord(record);

            for (j = 0; j < topKeys.length; j++) {
                me.results.add(leftKeys[i], topKeys[j]).addRecord(record);

                if(!grandTotalDone){
                    me.results.add(grandTotalKey, topKeys[j]).addRecord(record);
                }
            }
            grandTotalDone = true;
        }

        me.fireEvent('progress', me, index + 1, length);
    },
    
    /**
    * Fetch all records that belong to the specified row group
    * 
    * @param {String} key Row group key
    */
    getRecordsByRowGroup: function(key){
        var results = this.results.getByLeftKey(key),
            length = results.length,
            records = [], 
            i;
            
        for(i = 0; i < length; i++){
            records = Ext.Array.merge(records, results[i].records || []);
        }
        
        return records;
    },
    
    /**
    * Fetch all records that belong to the specified col group
    * 
    * @param {String} key Col group key
    */
    getRecordsByColGroup: function(key){
        var results = this.results.getByTopKey(key),
            length = results.length,
            records = [], 
            i;
            
        for(i = 0; i < length; i++){
            records = Ext.Array.merge(records, results[i].records || []);
        }
        
        return records;
    },
    
    /**
    * Fetch all records that belong to the specified row/col group
    * 
    * @param {String} rowKey Row group key
    * @param {String} colKey Col group key
    */
    getRecordsByGroups: function(rowKey, colKey){
        var result = this.results.get(rowKey, colKey);
        
        return ( result ? result.records || [] : []);
    }
    
});