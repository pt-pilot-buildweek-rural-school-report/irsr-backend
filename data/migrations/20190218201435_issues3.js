exports.up = function(knex, Promise) {
	return knex.schema.alterTable('issues', tbl => {
		tbl.dropColumn('logged_by')
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('issues')
}
