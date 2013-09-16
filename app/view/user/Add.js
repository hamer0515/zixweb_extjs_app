Ext.define('Zixweb.view.user.Add', {
			extend : 'Ext.window.Window',
			alias : 'widget.useradd',
			id : 'panel.useradd',
			title : '添加新用户',
			layout : 'fit',
			autoShow : true,

			initComponent : function() {
				this.items = [{
							xtype : 'form',
							id : 'useraddform',
							url : 'user/add',
							border : false,
							fieldDefaults : {
								labelWidth : 70
							},
							bodyPadding : 5,
							items : [{
										xtype : 'textfield',
										name : 'username',
										fieldLabel : '用户名',
										anchor : '100%',
										allowBlank : false,
										validateOnChange : false,
										msgTarget : 'qtip',
										verify : {
											url : 'user/check'
										},
										vtype : 'remoteverify'
									}, {
										xtype : 'textfield',
										allowBlank : false,
										name : 'password',
										inputType : 'password',
										fieldLabel : '初始密码'
									}, {
										xtype : 'itemselector',
										name : 'roles',
										id : 'itemselector-roles',
										width : 700,
										height : 300,
										fieldLabel : '角色选择',
										store : new Ext.data.Store({
													fields : ['name', 'role_id'],
													autoLoad : true,

													proxy : {
														type : 'ajax',
														api : {
															read : '/base/allroles'
														},
														reader : {
															type : 'json'
														}
													}
												}),
										displayField : 'name',
										valueField : 'role_id',
										allowBlank : false,
										msgTarget : 'qtip',
										fromTitle : '可选择',
										toTitle : '已选择'
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