Ext.define('Zixweb.model.yspz.yspzq.Detail', {
			extend : 'Ext.data.Model',
			fields : ['title', 'ys_type', 'cause', 'memo', 'revoke_flag',
					'revoke_cause', 'period', 'ys_id', 'properties', 'j_book',
					'd_book', 'isdetail', 'j_amt', 'd_amt'],
			associations : [{
						type : 'hasMany',
						model : 'Zixweb.model.yspz.yspzq.Field',
						name : 'j_book',
						associationKey : 'j_book'
					}, {
						type : 'hasMany',
						model : 'Zixweb.model.yspz.yspzq.Field',
						name : 'd_book',
						associationKey : 'd_book'
					}, {
						type : 'hasMany',
						model : 'Zixweb.model.yspz.yspzq.Field',
						name : 'properties',
						associationKey : 'properties'
					}]
		});