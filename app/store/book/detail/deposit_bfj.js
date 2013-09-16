Ext.define('Zixweb.store.book.detail.deposit_bfj', {
			extend : 'Ext.data.Store',
			fields : ['bfj_acct', 'period', 'j', 'd'],

			pageSize : 50,
			remoteSort : true,

			proxy : {
				type : 'ajax',
				api : {
					read : 'book/detail/deposit_bfj'
				},
				reader : {
					type : 'json',
					root : 'data',
					totalProperty : 'totalCount',
					successProperty : 'success'
				}
			},
			listeners : {
				beforeload : function(store, operation, eOpts) {
					var form = Ext.getCmp('depositbfjdetailform').getForm();
					var values = form.getValues();
					var grid = Ext.getCmp('book_detail_deposit_bfj_grid');
					grid.down('#bfj_acct').hide();
					grid.down('#period').hide();
					var columns = grid.columns;
					if (values.fir) {
						var fir = grid.down('#' + values.fir);
						fir.show();
						var oldindex = grid.headerCt.getHeaderIndex(fir);
						if (oldindex != 0) {
							grid.headerCt.move(oldindex, 0);
						}
					}
					if (values.sec) {
						var sec = grid.down('#' + values.sec);
						sec.show();
						var oldindex = grid.headerCt.getHeaderIndex(sec);
						if (oldindex != 1) {
							grid.headerCt.move(oldindex, 1);
						}
					}
					if (!(values.fir || values.sec)) {
						grid.down('#bfj_acct').show();
						grid.down('#period').show();
						var fir = grid.down('#bfj_acct');
						var oldindex = grid.headerCt.getHeaderIndex(fir);
						if (oldindex != 0) {
							grid.headerCt.move(oldindex, 0);
						}
					}
					grid.getView().refresh();
					if (form.isValid()) {
						store.proxy.extraParams = values;
					} else {
						return false;
					}
				}
			}
		});