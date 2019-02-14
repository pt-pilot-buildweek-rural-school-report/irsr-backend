
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('schools').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('schools').insert([
        {school_name: 'Inuman Elementary School', country: 'Philippines', city: 'Antipolo City', address: 'Sitio Inuman, Marcos Highway'},
        {school_name: 'Escuela Liceo Frances', country: 'Ecuador', city: 'Guayaquil', address: 'Coronel 2301 y Azuay'},
        {school_name: 'Seeds of Africa Elementary School', country: 'Ethiopia', city: 'Adama', address: 'P.O BOX 5643'},
      ]);
    });
};
