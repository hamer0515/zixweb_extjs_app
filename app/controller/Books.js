Ext.define('Zixweb.controller.Books', {
			extend : 'Ext.app.Controller',
			stores : ['Zixweb.store.book.detail.income_in',
					'Zixweb.store.book.detail.deposit_bfj'],
			views : ['book.AllBooks', 'book.ZyzjBooks', 'book.BfjBooks',
					'book.detail.income_in', 'book.detail.deposit_bfj',
					'book.hist.deposit_bfj'],

			init : function() {
				this.control({});
			}
		});