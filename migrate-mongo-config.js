const { server: { db } } = require('./config');

module.exports = {
  mongodb: {
    url: db.fullUrl(),
    databaseName: db.name,
    options: {
      useUnifiedTopology: true
    }
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js'
};
