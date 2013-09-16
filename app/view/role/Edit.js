Ext.define('Zixweb.view.role.Edit', {
			extend : 'Ext.window.Window',
			alias : 'widget.roledit',

			title : '更新角色',
			layout : 'fit',
			autoShow : true,

			initComponent : function() {
				var store = new Ext.data.TreeStore({
							fields : ['text', 'route_id'],
							proxy : {
								type : 'ajax',
								url : 'base/routes',
								extraParams : {
									id : this.role_id
								}
							}
						});
				this.items = [{
							xtype : 'form',
							id : 'roleditform',
							url : 'role/update',
							border : false,
							fieldDefaults : {
								labelWidth : 70
							},
							bodyPadding : 5,
							items : [{
										xtype : 'hiddenfield',
										id : 'role_id',
										name : 'role_id'
									}, {
										xtype : 'textfield',
										name : 'name',
										fieldLabel : '角色名称',
										allowBlank : false,
										validateOnChange : false,
										msgTarget : 'qtip',
										verify : {
											url : 'role/check',
											id : 'role_id'
										},
										vtype : 'remoteverify'
									}, {
										xtype : 'textarea',
										name : 'memo',
										fieldLabel : '角色描述',
										width : 400
									}, {
										xtype : 'routes',
										store : store
									}]
						}];

				this.buttons = [{
							text : '更新',
							action : 'update'
						}, {
							text : '取消',
							scope : this,
							handler : this.close
						}];

				this.callParent(arguments);
			}
		});