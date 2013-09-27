Ext.application({
	requires : ['Ext.container.Viewport', 'Ext.ux.TabScrollerMenu',
			'Ext.toolbar.Paging', 'Ext.grid.plugin.RowExpander',
			'Ext.ux.TabScrollerMenu', 'Ext.ux.TabCloseMenu'],
	name : 'Zixweb',
	minHeight : 768,
	minWidth : 1024,

	appFolder : 'app',
	controllers : ['Index', 'Login', 'Component', 'Roles', 'Users', 'Routes',
			'Books', 'Yspz', 'Task', 'Pzlr', 'Zjdz', 'Zqqr', 'Login'],

	launch : function() {
		Ext.override(Ext.grid.View, {
					enableTextSelection : true
				});
		Ext.override(Ext.ux.TabCloseMenu, {
					createMenu : function() {
						var me = this;

						if (!me.menu) {
							var items = [{
										text : me.closeTabText,
										iconCls : this.closeTabIconCls,
										scope : me,
										handler : me.onClose
									}];

							if (me.showCloseAll || me.showCloseOthers) {
								items.push('-');
							}

							if (me.showCloseOthers) {
								items.push({
											text : me.closeOthersTabsText,
											iconCls : this.closeOtherTabsIconCls,
											scope : me,
											handler : me.onCloseOthers
										});
							}

							if (me.showCloseAll) {
								items.push({
											text : me.closeAllTabsText,
											iconCls : this.closeAllTabsIconCls,
											scope : me,
											handler : me.onCloseAll
										});
							}

							if (me.extraItemsHead) {
								items = me.extraItemsHead.concat(items);
							}

							if (me.extraItemsTail) {
								items = items.concat(me.extraItemsTail);
							}

							me.menu = Ext.create('Ext.menu.Menu', {
										items : items,
										listeners : {
											hide : me.onHideMenu,
											scope : me,
											delay : 1
										}
									});
						}

						return me.menu;
					}
				});
		/* 计算两日期相差的日期年月日等 */
		Date.prototype.dateDiff = function(interval, objDate) {
			var d = this, t = d.getTime(), t2 = objDate.getTime(), i = {};
			i["y"] = objDate.getFullYear() - d.getFullYear();
			i["q"] = i["y"] * 4 + Math.floor(objDate.getMonth() / 4)
					- Math.floor(d.getMonth() / 4);
			i["m"] = i["y"] * 12 + objDate.getMonth() - d.getMonth();
			i["ms"] = objDate.getTime() - d.getTime();
			i["w"] = Math.floor((t2 + 345600000) / (604800000))
					- Math.floor((t + 345600000) / (604800000));
			i["d"] = Math.floor(t2 / 86400000) - Math.floor(t / 86400000);
			i["h"] = Math.floor(t2 / 3600000) - Math.floor(t / 3600000);
			i["n"] = Math.floor(t2 / 60000) - Math.floor(t / 60000);
			i["s"] = Math.floor(t2 / 1000) - Math.floor(t / 1000);
			return i[interval];
		};
		Ext.apply(Ext.form.field.VTypes, {
					id : function(val, field) {
						return /^\d*$/.exec(val);
					},
					idText : '不是有效的数字'// 验证错误出现的提示
				});
		Ext.apply(Ext.form.field.VTypes, {
			money : function(val, field) {
				return /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.exec(val);
			},
			moneyText : '不是有效的金额'// 验证错误出现的提示
		});
		Ext.apply(Ext.form.field.VTypes, {
					verifypwd : function(val, field) {
						var valiStatus = true;// 验证状态
						var textfield = Ext.getCmp(field.verifypwd.id);
						var form = textfield.up('form').getForm();
						var passwd = field.value;
						if (textfield.lastValue != passwd) {
							valiStatus = false;
						}
						return valiStatus;
					},
					verifypwdText : '密码不一致'// 验证错误出现的提示
				});
		Ext.apply(Ext.form.field.VTypes, {
					beforecurrentdate : function(val, field) {
						var valiStatus = false;// 验证状态
						var from = new Date(val);
						var to = new Date();
						var interval = from.dateDiff('d', to);
						if (interval > 0) {
							valiStatus = true;
						}
						return valiStatus;
					},
					beforecurrentdateText : '日期值必须小于当前日期'// 验证错误出现的提示
				});
		Ext.apply(Ext.form.field.VTypes, {
			remoteverify : function(val, field) {
				var valiStatus = false;// 验证状态
				var url = field.verify.url;
				var id = -1;
				if (field.verify.id)
					id = Ext.getCmp(field.verify.id).getSubmitValue();
				Ext.Ajax.request({
							async : false,
							url : url,
							params : {
								name : val,
								id : id
							},
							success : function(response) {
								valiStatus = Ext.decode(response.responseText).success;
							},
							failure : function(response, opts) {
								Ext.MessageBox.show({
											title : '警告',
											msg : '服务器端出错，错误码:'
													+ response.status,
											buttons : Ext.Msg.YES,
											icon : Ext.Msg.ERROR
										});
							}
						});
				return valiStatus;
			},
			remoteverifyText : '名称已存在，请重新输入'// 验证错误出现的提示
		});
		Ext.apply(Ext.form.field.VTypes, {
			dateinterval : function(val, field) {
				var from = new Date(val);
				var to = new Date(Ext.getCmp(field.verify.id).getSubmitValue());
				var interval = from.dateDiff('d', to);
				if (interval > 30) {
					return false;
				}
				return true;
			},
			dateintervalText : '会计期间跨度不能大于30天'
		});
		Ext.create('Ext.container.Viewport', {
					layout : 'border',
					items : {
						xtype : 'loginform'
					}
				});
	}
});