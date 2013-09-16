Ext.define('Zixweb.store.component.Acct', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],
			autoLoad : true,

			proxy : {
				type : 'ajax',
				url : 'base/account'
			}
		});