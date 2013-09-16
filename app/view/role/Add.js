Ext.define('Zixweb.view.role.Add', {
			extend : 'Ext.window.Window',
			alias : 'widget.roleadd',
			id : 'panel.roleadd',
			title : '添加新角色',
			layout : 'fit',
			autoShow : true,

			initComponent : function() {
				var store = new Ext.data.TreeStore({
							fields : ['text', 'route_id'],
							proxy : {
								type : 'ajax',
								url : 'base/routes'
							}
						});
				this.items = [{
							xtype : 'form',
							id : 'roleaddform',
							url : 'role/add',
							border : false,
							fieldDefaults : {
								labelWidth : 70
							},
							bodyPadding : 5,
							items : [{
										xtype : 'textfield',
										name : 'name',
										fieldLabel : '角色名称',
										allowBlank : false,
										validateOnChange : false,
										msgTarget : 'qtip',
										verify : {
											url : 'role/check'
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
							text : '添加',
							action : 'submit'
						}, {
							text : '取消',
							scope : this,
							handler : this.close
						}];

				this.callParent(arguments);
			}
		});