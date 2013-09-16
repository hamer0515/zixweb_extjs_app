Ext.define('Zixweb.controller.Yspz', {
	extend : 'Ext.app.Controller',
	models : ['Zixweb.model.yspz.yspzq.Field', 'Zixweb.model.yspz.yspzq.Detail'],
	views : ['Zixweb.view.yspz.yspzq.Detail', 'Zixweb.view.yspz.revoke_cause'],

	init : function() {
		this.control({
					'yspzrevoke_cause button[action=submit]' : {
						click : this.revoke
					}
				});
	},
	revoke : function(e, btn, eOpts) {
		var panel = Ext.getCmp('yspzrevoke_causeform');
		var form = panel.getForm();
		if (form.isValid()) {
			form.submit({
						clientValidation : true,
						url : panel.url,
						success : function(f, action) {
							var tabpanel = Ext.getCmp('center_tab_container');
							var active = tabpanel.getActiveTab();
							var detail = active.down('yspzqdetail');
							detail.store.reload();
							Ext.MessageBox.show({
										title : '消息',
										msg : '凭证撤销成功',
										closable : false,
										buttons : Ext.Msg.YES,
										icon : Ext.Msg.INFO,
										scope : panel.up('window'),
										fn : function() {
											this.close();
										}
									});
						},
						failure : function(form, action) {
							Ext.MessageBox.show({
										title : '警告',
										msg : '凭证撤销失败',
										buttons : Ext.Msg.YES,
										icon : Ext.Msg.ERROR
									});
						},
						waitMsg : '请求提交中...',
						waitTitle : '请稍等'
					});
		}
	}

});