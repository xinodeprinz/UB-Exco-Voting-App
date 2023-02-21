/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema
        .createTable('users', (table) => {
            table.increments();
            table.string('name').notNullable();
            table.string('matricule').notNullable();
            table.string('faculty').notNullable();
            table.string('department').notNullable();
            table.string('option').notNullable();
            table.string('level').notNullable();
            table.string('photo').notNullable();
            table.string('password').notNullable();
            table.timestamps();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema
        .dropTableIfExists('users');
};
