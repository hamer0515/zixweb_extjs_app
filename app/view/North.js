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
							height : 39,
							width : 127,
							src : '../images/yeepay_logo.jpg',
							margin : '0 0 0 20'
						}, {
							xtype : 'image',
							border : false,
							height : 39,
							width : 158,
							src : '../images/logo_title.png',
							margin : '0 0 0 40'
						}, {
							xtype : 'image',
							border : false,
							height : 16,
							width : 16,
							src : '../images/door_in.png',
							margin : "0 0 0 800"
						}, {
							xtype : 'displayfield',
							value : "<a href='/login/logout'>安全退出</a>",
							margin : '0 0 0 5'
						}];
				this.callParent(arguments);
			}
		});