Ext.define('Zixweb.view.login.PasswordReset', {
			extend : 'Ext.form.Panel',
			alias : 'widget.passwordreset',

			title : '可以设置新密码了',
			autoShow : true,

			initComponent : function() {
				this.url = '/login/passwordreset';
				this.floating = true;
				this.width = 240;
				this.height = 280;
				this.bodyPadding = 20;
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
					width : 200
				};
				this.items = {
					items : [{
								xtype : 'textfield',
								fieldLabel : '旧密码',
								inputType : 'password',
								name : 'oldpassword'
							}, {
								xtype : 'textfield',
								fieldLabel : '新密码',
								inputType : 'password',
								name : 'newpassword',
								id : 'newpassword'
							}, {
								xtype : 'textfield',
								fieldLabel : '确认新密码',
								inputType : 'password',
								name : 'confirmpassword',
								id : 'verify',
								verifypwd : {
									id : 'newpassword'
								},
								vtype : 'verifypwd'
							}]
				};

				this.buttons = [{
							text : '确定',
							action : 'passwordreset'
						}, {
							text : '重置',
							action : 'reset'
						}];
				this.callParent(arguments);
			}
		});