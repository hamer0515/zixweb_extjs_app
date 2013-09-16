Ext.define('Zixweb.controller.West', {
			extend : 'Ext.app.Controller',
			views : ['West'],

			init : function() {
				this.control({
							'west' : {
								itemclick : this.myClick
							}
						});
			},
			myClick : function(view, rec) {
				if (rec.data.leaf) {
					var viewport = view.up('viewport'), center = viewport
							.down('center'), id = 'center_' + rec.data.url, cmp = Ext
							.getCmp(id);
					if (cmp) {
						center.setActiveTab(cmp);
					} else {
						center.add({
									closable : true,
									xtype : 'panel',
									items : {
										xtype : rec.data.url
									},
									id : 'center_' + rec.data.url,
									title : Ext.String.ellipsis(rec.data.text, 8, true)
								}).show();
						viewport.doLayout();
					}
				}
			}
		});