Ext.define('Zixweb.view.West', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.west',
	width : 200,
	autoShow : true,
	disableSelection : true,
	store : new Ext.data.TreeStore({
				fields : ['text', 'url'],
				autoLoad : true,

				proxy : {
					type : 'ajax',
					url : 'login/menu'
				},
				listeners : {
					load : function(thiz, records, successful, eOpts) {
						if (!successful) {
							Ext.MessageBox.show({
										title : '警告',
										msg : '菜单加载失败，请重新登录',
										buttons : Ext.Msg.YES,
										icon : Ext.Msg.ERROR,
										fn : function() {
											window.location.href = "/login.html";
										}
									});

						}
					}
				}
			}),
	rootVisible : false,
	initComponent : function() {
		this.callParent(arguments);
	}
});