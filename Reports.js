		Ext.define('MyApp.view.Report1', {
			extend: 'Ext.container.Container',

			requires: [
				'Ext.grid.Panel',
				'Ext.grid.View',
				'Ext.tab.Panel',
				'Ext.tab.Tab',
				'Ext.JSON'
			],
			
			frame: true,
			
			fieldDefaults: {
				labelAlign: 'left',
				msgTarget: 'side'
			},
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			initComponent: function() {
				var me = this;
				
				function perc(v) {
					return v + '%';
				}

				var form = false,
					selectedRec = false,
					//performs the highlight of an item in the bar series
					highlightOperatorTonnesBar = function(storeItem) {
						var name = storeItem.get('operator'),
							series = barChart.series.get(0),
							i, items, l;

						series.highlight = true;
						series.unHighlightItem();
						series.cleanHighlights();
						for (i = 0, items = series.items, l = items.length; i < l; i++) {
							if (name == items[i].storeItem.get('operator')) {
								series.highlightItem(items[i]);
								break;
							}
						}
						series.highlight = false;
					},
					updateRadarChart = function(rec) {
						radarStore.loadData([{
							'Name': 'Tonnes',
							'Data': rec.get('tonnes')
						}, {
							'Name': 'Payload',
							'Data': rec.get('payload_compliance')
						}, {
							'Name': 'Experience',
							'Data': rec.get('hours_of_experience')
						}]);
					};
					
				var myData = [
					['Operator 1'],
					['Operator 2'],
					['Operator 3'],
					['Operator 4'],
					['Operator 5'],
					['Operator 6'],
					['Operator 7'],
					['Operator 8'],
					['Operator 9'],
					['Operator 10']];
				
				for (var i = 0, l = myData.length, rand = Math.random; i < l; i++) {
					var data = myData[i];
					data[1] = ((rand() * 10000) >> 0) / 100;
					data[2] = ((rand() * 10000) >> 0) / 100;
					data[3] = ((rand() * 10000) >> 0) / 100;
					data[4] = ((rand() * 10000) >> 0) / 100;
					data[5] = ((rand() * 10000) >> 0) / 100;
				}

				//create data store to be shared among the grid and bar series.
				var ds = Ext.create('Ext.data.ArrayStore', {
					fields: [
						{name: 'operator'},
						{name: 'tonnes',   type: 'float'},
						{name: 'payload_compliance', type: 'float'},
						{name: 'hours_of_experience',  type: 'float'}
					],
					data: myData,
					listeners: {
						beforesort: function() {
							if (barChart) {
								var a = barChart.animate;
								barChart.animate = false;
								barChart.series.get(0).unHighlightItem();
								barChart.animate = a;
							}
						},
						refresh: {
							fn: function() {
								if (selectedRec) {
									highlightOperatorTonnesBar(selectedRec);
								}
							},
							delay: 1
						}
					}
				});

				var radarStore = Ext.create('Ext.data.JsonStore', {
					fields: ['Name', 'Data'],
					data: [
					{
						'Name': 'Tonnes',
						'Data': 100
					}, {
						'Name': 'Payload',
						'Data': 100
					}, {
						'Name': 'Experience',
						'Data': 100
					}]
				});
				
				var radarChart = Ext.create('Ext.chart.Chart', {
					margin: '0 0 0 0',
					insetPadding: 20,
					flex: 1.2,
					animate: true,
					store: radarStore,
					theme: 'Blue',
					axes: [{
						steps: 5,
						type: 'Radial',
						position: 'radial',
						maximum: 100
					}],
					series: [{
						type: 'radar',
						xField: 'Name',
						yField: 'Data',
						showInLegend: false,
						showMarkers: true,
						markerConfig: {
							radius: 4,
							size: 4,
							fill: 'rgb(69,109,159)'
						},
						style: {
							fill: 'rgb(194,214,240)',
							opacity: 0.5,
							'stroke-width': 0.5
						}
					}]
				});
				
				var gridPanel = Ext.create('Ext.grid.Panel', {
					id: 'operator-form',
					flex: 7,
					store: ds,
					title:'Operator Data',

					columns: [
						{
							id     :'operator',
							text   : 'Operator',
							flex: 1,
							sortable : true,
							dataIndex: 'operator'
						},
						{
							text   : 'Tonnes',
							flex: 1,
							sortable : true,
							dataIndex: 'tonnes',
							align: 'right'
						},
						{
							text   : 'Payload compliance',
							sortable : true,
							flex: 1,
							align: 'right',
							dataIndex: 'payload_compliance',
							renderer: perc
						},
						{
							text   : 'Hours of experience',
							sortable : true,
							flex: 1,
							align: 'right',
							dataIndex: 'hours_of_experience'
						}
					],

					listeners: {
						selectionchange: function(model, records) {
							var fields;
							if (records[0]) {
								selectedRec = records[0];
								if (!form) {
									form = this.up('panel').down('form').getForm();
									fields = form.getFields();
									fields.each(function(field){
										if (field.name != 'operator') {
											field.setDisabled(false);
										}
									});
								} else {
									fields = form.getFields();
								}
								
								form.suspendEvents();
								form.loadRecord(selectedRec);
								form.resumeEvents();
								highlightOperatorTonnesBar(selectedRec);
							}
						}
					}
				});

				
				var barChart = Ext.create('Ext.chart.Chart', {
					height: 200,
					margin: '0 0 3 0',
					cls: 'x-panel-body-default',
					shadow: true,
					animate: true,
					store: ds,
					axes: [{
						type: 'Numeric',
						position: 'left',
						fields: ['tonnes'],
						minimum: 0,
						hidden: true
					}, {
						type: 'Category',
						position: 'bottom',
						fields: ['operator'],
						label: {
							renderer: function(v) {
								return Ext.String.ellipsis(v, 15, false);
							},
							font: '9px Arial',
							rotate: {
								degrees: 270
							}
						}
					}],
					series: [{
						type: 'column',
						axis: 'left',
						style: {
							fill: '#456d9f'
						},
						highlightCfg: {
							fill: '#a2b5ca'
						},
						label: {
							contrast: true,
							display: 'insideEnd',
							field: 'tonnes',
							color: '#000',
							orientation: 'vertical',
							'text-anchor': 'middle'
						},
						listeners: {
							itemmouseup: function(item) {
								 var series = barChart.series.get(0);
								 gridPanel.getSelectionModel().select(Ext.Array.indexOf(series.items, item));
							}
						},
						xField: 'name',
						yField: ['tonnes']
					}]
				});
				
				Ext.applyIf(me, {
					items: [barChart, {
						xtype: 'container',
						layout: {type: 'hbox', align: 'stretch'},
						flex: 3,
						items: [gridPanel, {
							xtype: 'form',
							flex: 3,
							layout: {
								type: 'vbox',
								align:'stretch'
							},
							margin: '0 0 0 5',
							title: 'Operator Details',
							items: [radarChart, {
								margin: '5',
								xtype: 'fieldset',
								border: false,
								flex: 1,
								defaults: {
									width: 240,
									labelWidth: 90,
									disabled: true,
									maxValue: 100,
									minValue: 0,
									enforceMaxLength: true,
									maxLength: 5,
									bubbleEvents: ['change']
								},
								defaultType: 'numberfield',
								items: [{
									fieldLabel: 'Name',
									name: 'operator',
									xtype: 'textfield',
									enforceMaxLength: false,
									hidden: true
								}, {
									fieldLabel: 'Tonnes',
									name: 'tonnes',
									hidden: true
								}, {
									fieldLabel: 'Payload',
									name: 'payload_compliance',
									hidden: true
								}, {
									fieldLabel: 'Experience',
									name: 'hours_of_experience',
									hidden: true
								}]
							}],
							listeners: {
								buffer: 200,
								change: function(field, newValue, oldValue, listener) {
									if (selectedRec && form) {
										if (newValue > field.maxValue) {
											field.setValue(field.maxValue);
										} else {
											if (form.isValid()) {
												form.updateRecord(selectedRec);
												updateRadarChart(selectedRec);
											}
										}
									}
								}
							}
						}]
					}]
				});
				me.callParent(arguments);
			}
		});