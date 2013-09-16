Ext.define('Zixweb.view.book.detail.deposit_bfj', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.book_detail_deposit_bfj',

	defaults : {
		margin : '0 5 0 5'
	},

	initComponent : function() {
		this.items = [{
			xtype : 'form',
			id : 'depositbfjdetailform',

			border : false,
			fieldDefaults : {
				labelWidth : 90
			},
			bodyPadding : 5,
			items : [{
						xtype : 'fieldcontainer',
						fieldLabel : '期间日期范围',
						layout : 'hbox',
						items : [{
									xtype : 'datefield',
									format : 'Y-m-d',
									name : 'period_from',
									margin : '0 10 0 0',
									allowBlank : false,
									verify : {
										id : 'book_detail_deposit_bfj_to'
									},
									vtype : 'dateinterval',
									width : 192
								}, {
									xtype : 'datefield',
									id : 'book_detail_deposit_bfj_to',
									format : 'Y-m-d',
									name : 'period_to',
									allowBlank : false,
									width : 192
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
									xtype : 'bfjacct',
									name : 'bfj_acct',
									margin : '0 10 0 0',
									fieldLabel : '备付金帐号'
								}]
					}, {
						xtype : 'fieldcontainer',
						layout : 'hbox',
						items : [{
							xtype : 'combobox',
							id : 'book_detail_deposit_bfj_fir',
							fieldLabel : '第一核算项',
							store : [["bfj_acct", "备付金帐号"], ["period", "期间日期"]],
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							name : 'fir',
							margin : '0 10 0 0',
							width : 240,
							listeners : {
								blur : function(self, The, eOpts) {
									if (!Ext.Array.contains(['bfj_acct',
													'period'], self.getValue())) {
										self.setValue('');
									}
								}
							}
						}, {
							xtype : 'combobox',
							fieldLabel : '第二核算项',
							id : 'book_detail_deposit_bfj_sec',
							store : [["bfj_acct", "备付金帐号"], ["period", "期间日期"]],
							queryMode : 'local',
							displayField : 'name',
							valueField : 'value',
							name : 'sec',
							margin : '0 10 0 0',
							width : 240,
							listeners : {
								blur : function(self, The, eOpts) {
									if (!Ext.Array.contains(['bfj_acct',
													'period'], self.getValue())) {
										self.setValue('');
									}
								}
							}
						}]
					}, {
						xtype : 'button',
						text : '查询',
						margin : '0 20 0 0',
						handler : function() {
							var deposit_bfj = Ext.data.StoreManager
									.lookup('Zixweb.store.book.detail.deposit_bfj');
							deposit_bfj.loadPage(1);
						}
					}, {
						xtype : 'button',
						text : '重置',
						handler : function(button) {
							button.up('panel').getForm().reset();
						}
					}]
		}, {
			xtype : 'gridpanel',
			id:'book_detail_deposit_bfj_grid',
			height : 430,
			store : 'Zixweb.store.book.detail.deposit_bfj',
			dockedItems : [{
						xtype : 'pagingtoolbar',
						store : 'Zixweb.store.book.detail.deposit_bfj',
						dock : 'bottom',
						displayInfo : true
					}],
			columns : [{
						text : "备付金帐号",
						itemId : 'bfj_acct',
						dataIndex : 'bfj_acct',
						sortable : false,
						flex : 2
					}, {
						text : "期间日期",
						dataIndex : 'period',
						itemId : 'period',
						sortable : false,
						flex : 1,
						renderer : Ext.util.Format.dateRenderer('Y年m月d日')
					}, {
						text : "借方金额",
						dataIndex : 'j',
						sortable : false,
						flex : 1,
						renderer : function(value) {
							return Ext.util.Format.number(value, '0,0.00');
						}
					}, {
						text : "贷方金额",
						dataIndex : 'd',
						width : 100,
						sortable : false,
						flex : 1,
						renderer : function(value) {
							return Ext.util.Format.number(value, '0,0.00');
						}
					}]
		}];
		this.callParent(arguments);
	}
});