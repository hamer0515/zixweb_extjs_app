Ext.define('Zixweb.store.component.BfjAcct', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],
			autoLoad : true,

			proxy : {
				type : 'ajax',
				url : 'base/bfjacct'
			}
		});