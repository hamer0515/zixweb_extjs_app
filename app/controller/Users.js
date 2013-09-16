Ext.define('Zixweb.controller.Users', {
			extend : 'Ext.app.Controller',
			views : ['user.List', 'user.Add', 'user.Edit'],

			init : function() {
				this.control({
							'useradd button[action=submit]' : {
								click : this.userAddSave
							},
							'useredit button[action=update]' : {
								click : this.userEditUpdate
							}
						});
			},
			userAddSave : function(button) {
				var panel = Ext.getCmp('useraddform');
				var form = panel.getForm();
				if (form.isValid()) {
					var roles = panel.down('itemselector').getValue();
					form.submit({
								clientValidation : true,
								url : panel.url,
								params : {
									roles : roles
								},
								success : function(form, action) {
									var list = Ext.getCmp('center_userlist');
									var items = list.items.items;
									items[0].getStore().reload();
									Ext.MessageBox.show({
												title : '提示',
												msg : '用户添加成功',
												closable : false,
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.INFO,
												scope : panel.up('window'),
												fn : function() {
													this.close();
												}
											});
								},
								failure : function(form, action) {
									Ext.MessageBox.show({
												title : '警告',
												msg : '用户添加失败',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
								},
								waitMsg : '请求提交中...',
								waitTitle : '请稍等'
							});
				}
			},
			userEditUpdate : function(button) {
				var panel = Ext.getCmp('usereditform');
				var form = panel.getForm();
				if (form.isValid()) {
					var roles = panel.down('itemselector').getValue();
					form.submit({
								clientValidation : true,
								url : panel.url,
								params : {
									roles : roles
								},
								success : function(form, action) {
									var list = Ext.getCmp('center_userlist');
									var items = list.items.items;
									items[0].getStore().reload();
									Ext.MessageBox.show({
												title : '提示',
												msg : '用户更新成功',
												closable : false,
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.INFO,
												scope : panel.up('window'),
												fn : function() {
													this.close();
												}
											});
								},
								failure : function(form, action) {
									Ext.MessageBox.show({
												title : '警告',
												msg : '用户更新失败',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
								},
								waitMsg : '请求提交中...',
								waitTitle : '请稍等'
							});
				}
			}
		});