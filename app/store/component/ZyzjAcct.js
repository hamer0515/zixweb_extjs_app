Ext.define('Zixweb.store.component.ZyzjAcct', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],
			autoLoad : true,

			proxy : {
				type : 'ajax',
				url : 'base/zyzjacct'
			}
		});