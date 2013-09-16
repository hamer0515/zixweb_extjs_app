Ext.define('Zixweb.view.login.LoginForm', {
			extend : 'Ext.form.Panel',
			alias : 'widget.loginform',

			title : '帐务处理系统',
			autoShow : true,

			initComponent : function() {
				this.url = '/login/login';
				this.floating = true;
				this.width = 200;
				this.bodyPadding = 10;
				this.border = false;
				this.frame = false;
				this.defaults = {
					border : false,
					xtype : 'panel'
				};
				this.fieldDefaults = {
					labelAlign : 'top',
					allowBlank : false,
					msgTarget : 'qtip',
					width : 180
				};
				this.items = {
					items : [{
								xtype : 'textfield',
								fieldLabel : '用户名',
								name : 'username'
							}, {
								xtype : 'textfield',
								fieldLabel : '密码',
								inputType : 'password',
								name : 'password'
							}]
				};

				this.buttons = [{
							text : '登录',
							action : 'submit'
						}, {
							text : '重置',
							action : 'reset'
						}];
				this.callParent(arguments);
			}
		});