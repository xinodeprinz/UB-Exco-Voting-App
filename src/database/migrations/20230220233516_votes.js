/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema
        .createTable('votes', (table) => {
            table.increments();
            table.integer('candidate_id').unsigned().references('id')
                .inTable('candidates').onDelete('cascade').onUpdate('cascade');
            table.text('voters').notNullable();
            table.timestamps();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema
        .dropTableIfExists('votes');
};
