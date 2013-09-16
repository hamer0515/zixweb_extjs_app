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
						}
					}),
			rootVisible : false,
			initComponent : function() {
				this.callParent(arguments);
			}
		});