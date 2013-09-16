Ext.define('Zixweb.store.book.detail.income_in', {
			extend : 'Ext.data.Store',
			fields : ['p', 'c', 'period', 'j', 'd'],

			pageSize : 50,
			remoteSort : true,

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/income_in'
				},
				reader : {
					type : 'json',
					root : 'data',
					totalProperty : 'totalCount',
					successProperty : 'success'
				}
			},
			sorters : [{
						property : 'period',
						direction : 'DESC'
					}],
			listeners : {
				beforeload : function(store, operation, eOpts) {
					var form = Ext.getCmp('incomeindetailform').getForm();
					if (form.isValid()) {
						store.proxy.extraParams = form.getValues();
					} else {
						return false;
					}
				}
			}
		});