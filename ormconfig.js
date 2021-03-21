require('dotenv').config();

// We can setup multiple DB connections here
module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || 'rangga_api_boilerplate',
    entities: ['src/database/default/entity/*.ts'],
    synchronize: true,
    logging: false,
    migrations: ['src/database/default/migration/**/*.ts'],
    cli: {
      migrationsDir: 'src/database/default/migration',
    },
  },
];
