Ext.define('Zixweb.store.component.Bi', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],
			autoLoad : true,

			proxy : {
				type : 'ajax',
				url : 'base/bi_dict'
			}
		});