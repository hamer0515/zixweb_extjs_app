Ext.application({
	requires : ['Ext.container.Viewport', 'Ext.ux.TabScrollerMenu',
			'Ext.toolbar.Paging', 'Ext.ux.form.ItemSelector',
			'Ext.grid.plugin.RowExpander'],
	name : 'Zixweb',
	minHeight : 600,
	minWidth : 800,

	appFolder : 'app',
	controllers : ['West', 'Login', 'Component', 'Roles', 'Users', 'Routes',
			'Books', 'Yspz', 'Task', 'Pzlr', 'Zjdz'],
	views : ['Zixweb.view.North', 'Zixweb.view.South', 'Zixweb.view.Center'],
	stores : [],

	launch : function() {
		Ext.override(Ext.grid.View, {
					enableTextSelection : true
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
			remoteverify : function(val, field) {
				var valiStatus = true;// 验证状态
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
								Ext.MessageBox.alert('服务器出错，请联系管理人员');
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
					items : [{
								region : 'north',
								xtype : 'north',
								height : 60,
								margins : '0 5 0 5'
							}, {
								title : '菜單',
								region : 'west',
								xtype : 'west',
								margins : '0 0 0 5',
								width : 200,
								collapsible : true,
								layout : 'fit'
							}, {
								region : 'center',
								xtype : 'center',
								layout : 'fit',
								height : 683,
								margins : '0 5 0 0'
							}, {
								region : 'south',
								xtype : 'south',
								height : 25,
								margins : '0 5 0 5'
							}]
				});
	}
});