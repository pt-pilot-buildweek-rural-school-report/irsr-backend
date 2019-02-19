exports.up = function(knex, Promise) {
	return knex.schema.createTable('schools', tbl => {
		tbl.increments('id')
		tbl
			.string('school_name')
			.notNullable()
			.unique()
		tbl.string('country').notNullable()
		tbl.string('city').notNullable()
		tbl
			.string('address')
			.notNullable()
			.unique()
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users')
}