Ext.define('Zixweb.view.Center', {
			extend : 'Ext.tab.Panel',
			alias : 'widget.center',
			enableTabScroll : true,
			id : 'center_tab_container',
			defaults : {
				autoScroll : true,
				bodyPadding : 10
			},
			plugins : [{
						ptype : 'tabscrollermenu',
						menuPrefixText : '标签',
						maxText : 15,
						pageSize : 5
					}, {
						ptype : 'tabclosemenu',
						closeTabText : '关闭标签',
						closeAllTabsText : '关闭所有标签',
						closeOthersTabsText : '关闭其他标签'

					}],
			items : [{
						title : '欢迎登录',
						iconCls : 'tabs',
						html : '财务中心-帐务处理系统',
						closable : false
					}],
			autoShow : true,
			listeners : {
				tabchange : function(tabPanel, newCard, oldCard, eOpts) {
					if (/^(center_task|center_zjdzbfj)/.test(newCard.id)) {
						newCard.items.items[0].store.reload();
					}
				}
			},
			initComponent : function() {
				this.callParent(arguments);
			}
		});