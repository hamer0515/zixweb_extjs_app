Ext.define('Zixweb.store.component.YsType', {
			extend : 'Ext.data.Store',
			fields : ['id', 'name'],
			autoLoad : true,

			proxy : {
				type : 'ajax',
				url : 'base/ystype'
			}
		});