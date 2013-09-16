Ext.define('Zixweb.view.North', {
			extend : 'Ext.panel.Panel',
			alias : 'widget.north',
			layout : {
				type : 'hbox',
				align : 'middle'
			},
			autoShow : true,

			initComponent : function() {
				this.items = [{
							xtype : 'image',
							border : false,
							src : '../images/yeepay_logo.jpg',
							margin : '0 0 0 20'
						}, {
							xtype : 'image',
							border : false,
							src : '../images/logo_title.png',
							margin : '0 0 0 40'
						}, {
							xtype : 'image',
							border : false,
							src : '../images/logout.jpg',
							margin : "0 0 0 800"
						}, {
							xtype : 'displayfield',
							value : "<a href='/login/logout'>安全退出</a>",
							margin : '0 0 0 5'
						}];
				this.callParent(arguments);
			}
		});