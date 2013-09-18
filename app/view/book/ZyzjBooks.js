Ext.define('Zixweb.view.book.ZyzjBooks', {
	extend : 'Ext.tree.Panel',
	alias : 'widget.bookzyzj',
	useArrows : true,
	rootVisible : false,
	height : 540,

	initComponent : function() {

		Ext.apply(this, {
			store : new Ext.data.TreeStore({
						fields : ['text', 'j', 'd', 'url'],
						autoload : true,
						proxy : {
							type : 'ajax',
							url : 'book/zyzj'
						},
						listeners : {
							load : function(thiz, records, successful, eOpts) {
								if (!successful) {
									Ext.MessageBox.show({
												title : '警告',
												msg : '数据加载失败,请联系管理员',
												buttons : Ext.Msg.YES,
												icon : Ext.Msg.ERROR
											});
								}
							}
						}
					}),
			columns : [{
						xtype : 'treecolumn',
						text : '科目',
						flex : 2,
						dataIndex : 'text'
					}, {
						text : '轧差借方余额',
						flex : 1,
						dataIndex : 'j',
						renderer : function(value) {
							return Ext.util.Format.number(value, '0,0.00');
						}
					}, {
						text : '轧差贷方余额',
						flex : 1,
						dataIndex : 'd',
						renderer : function(value) {
							return Ext.util.Format.number(value, '0,0.00');
						}
					}, {
						xtype : 'actioncolumn',
						text : '操作',
						width : 80,
						align : 'center',
						items : [{
							tooltip : '详细',
							getClass : function(v, meta, rec) {
								if (rec.data.url) {
									return 'detail';
								} else {
									return 'hide';
								}
							},
							isDisabled : function(view, rowIdx, colIdx, item,
									record) {
								return !record.data.leaf;
							},
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								var viewport = grid.up('viewport'), center = viewport
										.down('center'), id = 'book_detail_'
										+ rec.data.url, cmp = Ext.getCmp(id);
								var store = Ext.data.StoreManager
										.lookup('Zixweb.store.book.detail.'
												+ rec.data.url);
								store.removeAll(true);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									center.add({
										closable : true,
										xtype : 'panel',
										items : {
											xtype : 'book_detail_'
													+ rec.data.url
										},
										id : 'book_detail_' + rec.data.url,
										title : Ext.String.ellipsis(
												rec.data.text.substr(0,
														rec.data.text
																.indexOf("-"))
														+ '科目详细', 8, true)
									}).show();
									viewport.doLayout();
								}
							}
						}, {
							tooltip : '历史信息',
							handler : function(grid, rowIndex, colIndex) {
								var rec = grid.getStore().getAt(rowIndex);
								var viewport = grid.up('viewport'), center = viewport
										.down('center'), id = 'book_hist_'
										+ rec.data.url, cmp = Ext.getCmp(id);
								var store = Ext.data.StoreManager
										.lookup('Zixweb.store.book.hist.'
												+ rec.data.url);
								store.removeAll(true);
								if (cmp) {
									center.setActiveTab(cmp);
								} else {
									center.add({
										closable : true,
										xtype : 'panel',
										items : {
											xtype : 'book_hist_' + rec.data.url
										},
										id : 'book_hist_' + rec.data.url,
										title : Ext.String.ellipsis(
												rec.data.text.substr(0,
														rec.data.text
																.indexOf("-"))
														+ '科目历史信息', 8, true)
									}).show();
									viewport.doLayout();
								}
							},
							getClass : function(v, meta, rec) {
								if (rec.data.url) {
									return 'history';
								} else {
									return 'hide';
								}
							},
							isDisabled : function(view, rowIdx, colIdx, item,
									record) {
								return !record.data.url;
							}
						}]
					}]
		});
		this.callParent(arguments);
	}
});
