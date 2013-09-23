Ext.define('Zixweb.view.component.Product', {
			extend : 'Ext.form.ComboBox',
			alias : 'widget.product',
			store : 'Zixweb.store.component.Product',

			initComponent : function() {
				this.forceSelection = true;
				this.valueField = 'id';
				this.displayField = 'name';
				this.callParent(arguments);
			}
		});
