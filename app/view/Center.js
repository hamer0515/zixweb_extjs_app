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
						maxText : 15,
						pageSize : 5
					}],
			items : [{
						// xtype : 'zjdzbfj'
						title : 'Tab 1',
						iconCls : 'tabs',
						html : 'Tab Body<br/><br/>',
						closable : false
					}],
			autoShow : true,
			listeners : {
				tabchange : function(tabPanel, newCard, oldCard, eOpts) {
					if (/^(center_task|center_zjdzbfjgzcx|center_zjdzbfj)/.test(newCard.id)) {
						newCard.items.items[0].store.reload();
					}
				}
			},
			initComponent : function() {
				this.callParent(arguments);
			}
		});