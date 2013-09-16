Ext.application({
			requires : ['Ext.container.Viewport'],
			name : 'Zixweb',
			minHeight : 600,
			minWidth : 800,
			appFolder : 'app',
			controllers : ['Login'],

			launch : function() {
				Ext.create('Ext.container.Viewport', {
							layout : 'fit',
							items : {
								xtype : 'loginform'
							}
						});
			}
		});