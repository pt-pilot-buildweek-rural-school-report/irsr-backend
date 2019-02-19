exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('issues')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('issues').insert([
				{
					issue_name: 'HDMI cables',
					issue_type: 'tech equipment',
					logged_by: 'Khari',
					is_complete: false,
					resolved_by: '',
					is_scheduled: true,
					ignored: false,
					comments: 'Missing 5 cables since last Monday',
					school_id: '1',
					user_id: '1'
				},
				{
					issue_name: 'TVs',
					issue_type: 'general school supplies',
					logged_by: 'Courtney',
					is_complete: false,
					resolved_by: '',
					is_scheduled: true,
					ignored: false,
					comments: 'Vandalization, 3 screens are cracked, cannot see image',
					school_id: '2',
					user_id: '2'
				},
				{
					issue_name: 'Tablets',
					issue_type: 'tech equipment',
					logged_by: 'Khari',
					is_complete: false,
					resolved_by: '',
					is_scheduled: true,
					ignored: false,
					comments: 'Tablet #1435 does not connect to internet',
					school_id: '1',
					user_id: '1'
				},
				{
					issue_name: 'Routers',
					issue_type: 'tech equipment',
					logged_by: 'Andrew',
					is_complete: false,
					resolved_by: '',
					is_scheduled: true,
					ignored: false,
					comments:
						'In need of all new routers to keep up with wireless capabilities',
					school_id: '1',
					user_id: '3'
				},
				{
					issue_name: 'Server',
					issue_type: 'tech',
					logged_by: 'Ryan',
					is_complete: false,
					resolved_by: '',
					is_scheduled: true,
					ignored: false,
					comments: 'Server has been down since 0830',
					school_id: '3',
					user_id: '4'
				},
				{
					issue_name: 'Instructor',
					issue_type: 'personel',
					logged_by: 'Courtney',
					is_complete: false,
					resolved_by: '',
					is_scheduled: true,
					ignored: false,
					comments: 'Need to hire instructor for computer lab',
					school_id: '2',
					user_id: '2'
				}
			])
		})
}
