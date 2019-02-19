exports.up = function(knex, Promise) {
	return knex.schema.createTable('schools', tbl => {
		tbl.increments('id')
		tbl
			.string('school_name')
			.notNullable()
			.unique()
		tbl.string('country')
		tbl.string('city')
		tbl.string('address').unique()
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users')
}
