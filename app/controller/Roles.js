Ext.define('Zixweb.controller.Roles', {
			extend : 'Ext.app.Controller',
			views : ['role.List', 'role.Add', 'role.Edit'],

			init : function() {
				this.control({
							'roleadd button[action=submit]' : {
								click : this.roleAddSave
							},
							'roledit button[action=update]' : {
								click : this.roleEditUpdate
							}
						});
			},
			roleAddSave : function(button) {
				var panel = Ext.getCmp('roleaddform');
				var form = panel.getForm();
				if (form.isValid()) {
					var limits = [];
					var records = panel.down('treepanel').getChecked();
					records.forEach(function(element, index, array) {
								limits.push(element.data.route_id);
							});
					form.submit({
								clientValidation : true,
								url : panel.url,
								params : {
									limits : limits
								},
								success : function(form, action) {
									var list = Ext.getCmp('center_rolelist');
									var items = list.items.items;
									items[0].getStore().reload();
									Ext.MessageBox.show({
												title : '消息',
												msg : '角色添加成功',
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
												msg : '角色添加失败',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
								},
								waitMsg : '请求提交中...',
								waitTitle : '请稍等'
							});
				}
			},
			roleEditUpdate : function(button) {
				var panel = Ext.getCmp('roleditform');
				var form = panel.getForm();
				if (form.isValid()) {
					var limits = [];
					var records = panel.down('treepanel').getChecked();
					records.forEach(function(element, index, array) {
								limits.push(element.data.route_id);
							});
					form.submit({
								clientValidation : true,
								url : panel.url,
								params : {
									limits : limits
								},
								success : function(form, action) {
									var list = Ext.getCmp('center_rolelist');
									var items = list.items.items;
									items[0].getStore().reload();
									Ext.MessageBox.show({
												title : '消息',
												msg : '角色更新成功',
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
												msg : '角色更新失败',
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