Ext.define('Zixweb.view.login.Logout', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.logout',

			// title : '老老实实登录吧',
			autoShow : true,

			initComponent : function() {
				Ext.Msg.show({
							floating : true,
							title : '不要离开我',
							msg : '你怎么舍得丢下我',
							buttons : Ext.Msg.OKCANCEL,
							closable : false,
							fn : function(id) {
								console.log(id);
								if (id === 'cancel') {
									Ext
											.getCmp('center_tab_container')
											.remove(Ext.getCmp('center_logout'));
								} else {
									window.location.href = "login/logout";
									Ext.MessageBox.show({
												title : '88',
												msg : '跳转中...',
												floating : true,
												closable : false
											});
								}
							},
							icon : Ext.window.MessageBox.WARNING
						});
				this.callParent(arguments);
			}
		});