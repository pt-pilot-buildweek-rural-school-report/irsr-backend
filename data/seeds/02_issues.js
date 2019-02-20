exports.seed = function(knex, Promise) {
	// Deletes ALL existing entries
	return knex('issues')
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex('issues').insert([
				{
					issue_name: 'HDMI cables',
          issue_type: 'Tech',
          created_at: "",
          is_resolved: false,
          date_resolved: '',
					resolved_by: '',
					is_scheduled: true,
					ignored: false,
					comments: 'Missing 5 cables since last Monday. ',
					school_id: '1',
					user_id: '1'
				},
				{
					issue_name: 'Colored paper',
          issue_type: 'Supplies',
          created_at: "",
          is_resolved: false,
          date_resolved: '',
					resolved_by: '',
					is_scheduled: true,
					ignored: false,
					comments: 'Completely out of yellow colored paper. Need in time for Easter.',
					school_id: '2',
					user_id: '2'
				},
				{
					issue_name: 'Tablets',
          issue_type: 'Tech',
          created_at: "",
          is_resolved: false,
          date_resolved: '',
					resolved_by: '',
					is_scheduled: true,
					ignored: false,
					comments: 'Tablet #1435 does not connect to internet, and the background image is a picture of a student. Find out who (s)he is and what they may have done to create this issue.',
					school_id: '1',
					user_id: '1'
				},
				{
					issue_name: 'Chairs',
          issue_type: 'Furniture',
          created_at: "",
          is_resolved: false,
          date_resolved: '',
					resolved_by: '',
					is_scheduled: true,
					ignored: false,
					comments:
						'In need of more chairs for the 3rd grade classrooms.',
					school_id: '3',
					user_id: '3'
				},
				{
					issue_name: "Security guards",
					issue_type: "Security",
					created_at: "",
          is_resolved: false,
					date_resolved: "",
					resolved_by: "",
					is_scheduled: true,
					ignored: 0,
					comments: "A security officer is needed for the south entrance.",
					school_id: 2,
					user_id: 4
				},
				{
					issue_name: 'Instructor',
          issue_type: 'General',
          created_at: "",
          is_resolved: false,
          date_resolved: '',
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
