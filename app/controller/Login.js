Ext.define('Zixweb.controller.Login', {
			extend : 'Ext.app.Controller',
			views : ['login.LoginForm', 'login.PasswordReset', 'login.Logout'],

			init : function() {
				this.control({
							'loginform button[action=submit]' : {
								click : this.submit
							},
							'loginform button[action=reset]' : {
								click : this.reset
							},
							'passwordreset button[action=passwordreset]' : {
								click : this.passwordreset
							},
							'passwordreset button[action=reset]' : {
								click : this.reset
							}
						});
			},
			submit : function(button) {
				var panel = button.up('panel');
				var form = panel.getForm();
				if (form.isValid()) {
					form.submit({
								clientValidation : true,
								url : panel.url,
								success : function(form, action) {
									Ext.MessageBox.wait('登录成功，努力加载中...', '请稍等');
									window.location.href = "/index.html";
								},
								failure : function(form, action) {
									Ext.MessageBox.show({
												title : '警告',
												msg : '用户名或密码错误',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
								},
								waitMsg : '使劲登录中...',
								waitTitle : '请稍等'
							});
				}
			},
			passwordreset : function(button) {
				var panel = button.up('panel');
				var form = panel.getForm();
				if (form.isValid()) {
					form.submit({
								clientValidation : true,
								url : panel.url,
								success : function(form, action) {
									Ext.MessageBox.show({
												title : '提示',
												msg : '密码修改成功',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.INFO
											});
									form.reset();
								},
								failure : function(form, action) {
									switch (action.failureType) {
										case Ext.form.action.Action.CLIENT_INVALID :
											Ext.MessageBox.show({
														title : '失败',
														msg : '表单数据有误，请检查',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											break;
										case Ext.form.action.Action.CONNECT_FAILURE :
											Ext.MessageBox.show({
														title : '失败',
														msg : '网络链接出错',
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
											break;
										case Ext.form.action.Action.SERVER_INVALID :
											Ext.MessageBox.show({
														title : '失败',
														msg : action.result.msg,
														buttons : Ext.Msg.YES,
														icon : Ext.Msg.ERROR
													});
									}
								},
								waitMsg : '正在提交请求...',
								waitTitle : '请稍等'
							});
				}
			},
			reset : function(button) {
				button.up('panel').getForm().reset();
			}
		});