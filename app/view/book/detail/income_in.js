Ext.define('Zixweb.view.book.detail.income_in', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_income_in',

	defaults : { // defaults are applied to items, not the container
		margin : '0 5 0 5'
	},

	initComponent : function() {
		this.items = [{
			xtype : 'form',
			id : 'incomeindetailform',

			border : false,
			fieldDefaults : {
				labelWidth : 90
			},
			height : 125,
			bodyPadding : 5,
			items : [{
						xtype : 'fieldcontainer',
						fieldLabel : '期间日期范围',
						layout : 'hbox',
						url : 'book/income_in',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_from',
									margin : '0 10 0 0',
									allowBlank : false,
									verify : {
										id : 'book_detail_income_in_to'
									},
									vtype : 'dateinterval',
									width : 240
								}, {
									xtype : 'datefield',
									id : 'book_detail_income_in_to',
									format : 'Y-m-d',
									name : 'period_to',
									allowBlank : false,
									width : 240
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'textfield',
									name : 'c',
									margin : '0 10 0 0',
									fieldLabel : '客户id',
									width : 240

								}, {
									xtype : 'product',
									name : 'p',
									fieldLabel : '产品类型',
									width : 240
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'combobox',
									fieldLabel : '第一核算项',
									store : Ext.create('Ext.data.Store', {
												fields : ['value', 'name'],
												data : [{
															"value" : "c",
															"name" : "客户id"
														}, {
															"value" : "p",
															"name" : "产品"
														}, {
															"value" : "period",
															"name" : "期间日期"
														}]
											}),
									queryMode : 'local',
									displayField : 'name',
									valueField : 'value',
									name : 'fir',
									margin : '0 10 0 0',
									width : 240,
									forceSelection : true
								}, {
									xtype : 'combobox',
									fieldLabel : '第二核算项',
									store : Ext.create('Ext.data.Store', {
												fields : ['value', 'name'],
												data : [{
															"value" : "c",
															"name" : "客户id"
														}, {
															"value" : "p",
															"name" : "产品"
														}, {
															"value" : "period",
															"name" : "期间日期"
														}]
											}),
									queryMode : 'local',
									displayField : 'name',
									valueField : 'value',
									name : 'sec',
									margin : '0 10 0 0',
									width : 240,
									forceSelection : true
								}, {
									xtype : 'combobox',
									fieldLabel : '第三核算项',
									store : Ext.create('Ext.data.Store', {
												fields : ['value', 'name'],
												data : [{
															"value" : "c",
															"name" : "客户id"
														}, {
															"value" : "p",
															"name" : "产品"
														}, {
															"value" : "period",
															"name" : "期间日期"
														}]
											}),
									queryMode : 'local',
									displayField : 'name',
									valueField : 'value',
									name : 'thi',
									margin : '0 10 0 0',
									width : 240,
									forceSelection : true
								}]
					}, {
						xtype : 'button',
						text : '查询',
						action : 'query',
						handler : function() {
							var income_in = Ext.data.StoreManager
									.lookup('Zixweb.store.book.detail.income_in');
							income_in.loadPage(1);
						}
					}]
		}, {
			xtype : 'gridpanel',
			height : 430,
			store : 'Zixweb.store.book.detail.income_in',
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : 'Zixweb.store.book.detail.income_in',
						dock : 'bottom',
						displayInfo : true
					}],
			columns : [{
						text : "客户id",
						dataIndex : 'c',
						width : 80,
						sortable : true,
						flex : 1
					}, {
						text : "产品",
						dataIndex : 'p',
						sortable : false,
						flex : 2
					}, {
						text : "期间日期",
						dataIndex : 'period',
						sortable : false,
						flex : 2,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						text : "借方金额",
						dataIndex : 'j',
						width : 70,
						sortable : true,
						flex : 1
					}, {
						text : "贷方金额",
						dataIndex : 'd',
						width : 70,
						sortable : true,
						flex : 1
					}]
		}];
		this.callParent(arguments);
	}
});