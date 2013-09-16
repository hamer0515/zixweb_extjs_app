Ext.define('Zixweb.view.task.SHTask', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.taskshtask',

	defaults : {
		bodyPadding : 5,
		collapsible : true,
		border : false
	},

	initComponent : function() {
		var store = new Ext.data.Store({
					fields : ['id', 'cause', 'c_user_name', 'ts_c',
							'sh_status', 'sh_type'],

					pageSize : 50,
					remoteSort : true,

					proxy : {
						type : 'ajax',
						api : {
							read : 'task/shtask'
						},
						reader : {
							type : 'json',
							root : 'data',
							totalProperty : 'totalCount',
							successProperty : 'success'
						}
					},
					listeners : {
						beforeload : function(store, operation, eOpts) {
							var form = Ext.getCmp('taskshtaskform').getForm();
							var values = form.getValues();
							var grid = Ext.getCmp('task_shtask');
							if (form.isValid()) {
								if (values.from) {
									values.from += ' 00:00:00';
								}
								if (values.to) {
									values.to += ' 23:59:59';
								}
								store.proxy.extraParams = values;
							} else {
								return false;
							}
						}
					}
				});
		this.store = store;
		this.items = [{
					xtype : 'form',
					title : '待审核任务查询',
					id : 'taskshtaskform',

					fieldDefaults : {
						labelWidth : 90
					},
					items : [{
								xtype : 'fieldcontainer',
								fieldLabel : '创建日期范围',
								layout : 'hbox',
								items : [{
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'from',
											margin : '0 10 0 0',
											width : 193
										}, {
											xtype : 'datefield',
											format : 'Y-m-d',
											name : 'to',
											width : 193
										}]
							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'textfield',
											name : 'id',
											margin : '0 10 0 0',
											width : 288,
											vtype : 'id',
											fieldLabel : '任务编号'
										}, {
											xtype : 'textfield',
											fieldLabel : '创建用户',
											width : 288,
											name : 'c_user'
										}]

							}, {
								xtype : 'fieldcontainer',
								layout : 'hbox',
								items : [{
											xtype : 'shstatus',
											name : 'status',
											margin : '0 10 0 0',
											fieldLabel : '审核状态'
										}, {
											xtype : 'shtype',
											name : 'type',
											fieldLabel : '审核类型'
										}]

							}, {
								xtype : 'button',
								text : '查询',
								margin : '0 20 0 0',
								handler : function() {
									store.loadPage(1);
								}
							}, {
								xtype : 'button',
								text : '重置',
								handler : function(button) {
									button.up('panel').getForm().reset();
								}
							}]
				}, {
					title : '待审核任务',
					xtype : 'gridpanel',
					id : 'task_shtask',
					height : 500,

					store : store,
					dockedItems : [{
								xtype : 'pagingtoolbar',
								store : store,
								dock : 'bottom',
								displayInfo : true
							}],
					columns : [{
								text : "任务编号",
								itemId : 'id',
								dataIndex : 'id',
								sortable : false,
								width : 80
							}, {
								text : "创建用户",
								itemId : 'c_user',
								dataIndex : 'c_user_name',
								sortable : false,
								flex : 1
							}, {
								text : "创建时间",
								dataIndex : 'ts_c',
								itemId : 'ts_c',
								sortable : false,
								flex : 1
							}, {
								text : "审核状态",
								dataIndex : 'sh_status',
								sortable : false,
								flex : 1,
								renderer : function(value) {
									var text = ['待审核', '审核通过', '审核未通过']
									return text[value];
								}
							}, {
								text : "审核类型",
								dataIndex : 'sh_type',
								flex : 1,
								sortable : false,
								renderer : function(value) {
									var text = ['特种调账单', '凭证撤销'];
									return text[value - 1];
								}
							}, {
								text : "备注",
								dataIndex : 'cause',
								flex : 2,
								sortable : false,
								renderer : function(value) {
									return "<div title='"
											+ value
											+ "'>"
											+ Ext.String.ellipsis(value, 28,
													true) + "</div>";
								}
							}, {
								xtype : 'actioncolumn',
								text : '操作',
								width : 80,
								align : 'center',
								items : [{
									tooltip : '详细',
									getClass : function(v, meta, rec) {
										return 'detail';
									},
									handler : function(grid, rowIndex, colIndex) {
										var rec = grid.getStore()
												.getAt(rowIndex);
										var viewport = grid.up('viewport'), center = viewport
												.down('center'), id = 'book_detail_'
												+ rec.data.ys_type
												+ rec.data.ys_id, cmp = Ext
												.getCmp(id);
										var yspzqdetail = Ext
												.createByAlias('widget.yspzqdetail');
										yspzqdetail.store.load({
													params : {
														ys_type : rec.data.ys_type,
														ys_id : rec.data.ys_id
													}
												});
										if (cmp) {
											center.setActiveTab(cmp);
										} else {
											center.add({
												closable : true,
												xtype : 'panel',
												items : yspzqdetail,
												id : 'book_detail_'
														+ rec.data.ys_type
														+ rec.data.ys_id,
												title : Ext.String
														.ellipsis(
																rec.data.ys_type
																		+ ':'
																		+ rec.data.ys_id
																		+ '详细信息',
																8, true)
											}).show();
										}
										viewport.doLayout();
									}
								}]
							}]

				}];
		this.callParent(arguments);
		store.loadPage(1);
	}
});