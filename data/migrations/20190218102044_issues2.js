exports.up = function(knex, Promise) {
	return knex.schema.alterTable('issues', tbl => {
		tbl.renameColumn('completed_by', 'date_resolved')
		tbl.renameColumn('is_complete', 'is_resolved')
	})
}

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('issues')
}
