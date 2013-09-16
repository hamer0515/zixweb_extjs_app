Ext.define('Zixweb.view.task.Task0000detail', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.task0000detail',
	border : false,

	initComponent : function() {
		var tpl = new Ext.XTemplate(
				'<tpl for=".">',
				'<div>',
				'<table width="98%" id="task0000_{id}" border="0" cellspacing="1" cellpadding="0" align="center"  bgcolor="#C8DCF0" class="live_1_table">',
				'<tr bgcolor="#B4CFCF" align="center">',
				'<td class="ice_one" width="25%">审核编号</td>',
				'<td class="ice_two" width="25%">{id}</td>',
				'<td class="ice_one" width="25%">会计期间</td>',
				'<td class="ice_two" width="25%">{content.period}</td></tr>',
				'<tr>',
				'<td class="ice_one" width="25%">创建人</td>',
				'<td class="ice_two" width="25%">{c_user_name}</td>',
				'<td class="ice_one" width="25%">创建时间</td>',
				'<td class="ice_two" width="25%">{ts_c}</td></tr>',
				'<tr>',
				'<td class="ice_one" width="25%">审核状态</td>',
				'<td class="ice_two" width="25%">{shstatus:this.shstatus()}</td>',
				'<td class="ice_one" width="25%">审核类型</td>',
				'<td class="ice_two" width="25%">{shtype:this.shtype()}</td></tr>',
				'<tr>',
				'<td class="ice_one" width="25%">特种调账单填写原因</td>',
				'<td class="ice_two" width="75%" colspan="3">',
				'<textarea rows="2" class="textarea" disabled="true">{content.cause}</textarea>',
				'</td></tr>',
				'<tpl if="this.isRdonly(rdonly)">',
				'<tpl if="shstatus == 0">',
				'<tr bgcolor="#B4CFCF" align="center">',
				'<td class="ice_one-0" width="100%" colspan="4">',
				'<input type="button" id="task0000detail_pass_{id}" value="通过" />',
				'<input type="button" id="task0000detail_deny_{id}" value="拒绝" />',
				'</td></tr>', '</tpl></tpl></table>',
				'{[this.genjds(values)]}', '</div>', '</tpl>', {
					isRdonly : function(rdonly) {
						return rdonly !== 'rdonly';
					},
					genjds : function(json) {
						var data = '<table width="98%" border="0" cellspacing="1" cellpadding="0" align="center"  bgcolor="#C8DCF0" class="live_1_table"><tbody>';
						for (var key in json.content.jd_books) {
							var j_book = json.content.jd_books[key].j_book;
							var d_book = json.content.jd_books[key].d_book;
							var header = {
								'acct' : '资金账号， 包括自有资金与备付金账号',
								'bfj_acct' : '备付金账号',
								'bi' : '银行接口编号',
								'c' : '客户id',
								'cust_proto' : '客户协议',
								'e_date' : '差错日期',
								'fp' : '周期确认规则',
								'p' : '产品',
								'period' : '期间日期',
								'tx_date' : '交易日期',
								'wlzj_type' : '往来资金类型',
								'zjbd_date' : '资金变动日期',
								'zjbd_type' : '资金变动类型',
								'zyzj_acct' : '自有资金账号'
							};
							var books = Ext.data.StoreManager
									.lookup('Zixweb.store.component.Books');
							var j_name = books.getAt(books.findExact('id',
									j_book._type)).data.name;
							var d_name = books.getAt(books.findExact('id',
									d_book._type)).data.name;
							data += '<tr bgcolor="#ffffff" align="left"><td class="ice_one1">'
									+ '分录' + key + '</td></tr>';
							data += '<tr bgcolor="#ffffff" align="left"><td><table class="live_1_table" cellspacing="1" cellpadding="0" border="0" bgcolor="#C8DCF0" align="center" width="48%" style="float:left">'
									+ '<tbody><tr class="live_1_table_tr" bgcolor="#ffffff" align="center">'
									+ '<td colspan="3">借方科目:'
									+ j_name
									+ '</td>'
									+ '</tr>'
									+ '<tr bgcolor="#e3f1f1" align="center">'
									+ '<td width="20%" colspan="2">核算项</td>'
									+ '<td width="20%">金额</td>' + '</tr>';
							var j_amt = j_book.amt;
							delete j_book._type;
							delete j_book.amt;
							var length = Object.keys(j_book).length;
							var num = 0;
							for (var key in j_book) {
								if (num == 0) {
									data += '<tr bgcolor="#ffffff" align="center">'
											+ '<td width="35%">'
											+ header[key]
											+ '</td>'
											+ '<td width="45%">'
											+ j_book[key]
											+ '</td>'
											+ '<td rowspan="'
											+ length
											+ '">'
											+ j_amt + '</td>' + '</tr>';
								} else {
									data += '<tr bgcolor="#ffffff" align="center">'
											+ '<td width="35%">'
											+ header[key]
											+ '</td>'
											+ '<td width="45%">'
											+ j_book[key] + '</td>' + '</tr>';
								}
								num++;
							}
							data += '</tbody></table>';
							data += '<table class="live_1_table" cellspacing="1" cellpadding="0" border="0" bgcolor="#C8DCF0" align="center" width="48%" style="float:right">'
									+ '<tbody><tr class="live_1_table_tr" bgcolor="#ffffff" align="center">'
									+ '<td colspan="3">贷方科目:'
									+ d_name
									+ '</td>'
									+ '</tr>'
									+ '<tr bgcolor="#e3f1f1" align="center">'
									+ '<td width="20%" colspan="2">核算项</td>'
									+ '<td width="20%">金额</td>' + '</tr>';
							var d_amt = d_book.amt;
							delete d_book._type;
							delete d_book.amt;
							length = Object.keys(d_book).length;
							num = 0;
							for (var key in d_book) {
								if (num == 0) {
									data += '<tr bgcolor="#ffffff" align="center">'
											+ '<td width="35%">'
											+ header[key]
											+ '</td>'
											+ '<td width="45%">'
											+ d_book[key]
											+ '</td>'
											+ '<td rowspan="'
											+ length
											+ '">'
											+ j_amt + '</td>' + '</tr>';
								} else {
									data += '<tr bgcolor="#ffffff" align="center">'
											+ '<td width="35%">'
											+ header[key]
											+ '</td>'
											+ '<td width="45%">'
											+ d_book[key] + '</td>' + '</tr>';
								}
								num++;
							}
							data += '</tbody></table>';
						}
						data += '</tbody></table>';
						return data;
					}
				});
		tpl.shstatus = function(shstatus) {
			var text = ['待审核', '审核通过', '审核未通过'];
			return text[shstatus];
		};
		tpl.shtype = function(shtype) {
			var text = ['特种调账单', '凭证撤销'];
			return text[parseInt(shtype) - 1];
		};
		var store = new Ext.data.Store({
			fields : ['c_user_name', 'content', 'shstatus', 'id', 'ts_c',
					'shtype', 'v_ts', 'v_user', 'ys_id', 'c_user_name',
					'rdonly'],
			proxy : {
				type : 'ajax',
				url : 'task0000/detail'
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
						return;
					}
					// button注册事件
					var id = 'task0000_' + records[0].data.id;
					var tbl = Ext.get(id);
					var buttons = tbl.select("input[type=button]");
					for (var i in buttons.elements) {
						var button = Ext.get(buttons.elements[i]
								.getAttribute('id'));
						button.on('click', function(e, thiz, eOpts) {
							var arr = thiz.getAttribute('id').split('_');
							var id = arr.pop();
							var type = arr.pop();
							if (type === 'pass') {
								Ext.MessageBox.confirm('提示', '执行审核通过?',
										function(opt) {
											if (opt === 'yes') {
												Ext.Ajax.request({
													async : false,
													url : 'task0000/pass',
													params : {
														id : id
													},
													success : function(response) {
														var success = Ext
																.decode(response.responseText).success;
														if (success) {
															Ext.MessageBox
																	.alert(
																			'提示',
																			'操作成功');
															store.reload();
														} else {
															Ext.MessageBox
																	.alert(
																			'警告',
																			'操作失败');
														}
													},
													failure : function(
															response, opts) {
														Ext.MessageBox.show({
															title : '警告',
															msg : '服务器出错，请联系管理人员',
															buttons : Ext.Msg.YES,
															icon : Ext.Msg.ERROR
														});
													}
												});
											}
										});
							} else if (type === 'deny') {
								Ext.MessageBox.confirm('提示', '执行审核拒绝?',
										function(opt) {
											if (opt === 'yes') {
												Ext.Ajax.request({
													async : false,
													url : 'task0000/deny',
													params : {
														id : id
													},
													success : function(response) {
														var success = Ext
																.decode(response.responseText).success;
														if (success) {
															Ext.MessageBox
																	.alert(
																			'提示',
																			'操作成功');
														} else {
															Ext.MessageBox
																	.alert(
																			'警告',
																			'操作失败');
														}
														store.reload();
													},
													failure : function(
															response, opts) {
														Ext.MessageBox.show({
															title : '警告',
															msg : '服务器出错，请联系管理人员',
															buttons : Ext.Msg.YES,
															icon : Ext.Msg.ERROR
														});
													}
												});
											}
										});
							}
						});
					}
				}
			}
		});
		this.store = store;
		var view = Ext.create('Ext.view.View', {
					store : store,
					tpl : tpl,
					itemSelector : 'div'
				});
		this.items = view;
		this.callParent(arguments);
	}
});