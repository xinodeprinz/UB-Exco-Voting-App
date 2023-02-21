// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
import { knexSnakeCaseMappers } from 'objection';
const knexConfig = {

  development: {
    client: 'mysql',
    connection: {
      database: 'voting_knex',
      user: 'root',
      password: '',
      port: 3306,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'migrations',
    },
    seeds: {
      directory: './seeds',
    },
    ...knexSnakeCaseMappers,
  },
};

export default knexConfig;
