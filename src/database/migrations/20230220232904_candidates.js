/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
    return knex.schema
        .createTable('candidates', (table) => {
            table.increments();
            table.integer('user_id').unsigned().references('id')
                .inTable('users').onDelete('cascade').onUpdate('cascade');
            table.integer('post_id').unsigned().references('id')
                .inTable('posts').onDelete('cascade').onUpdate('cascade');
            table.enum('type', ['faculty', 'department']);
            table.timestamps();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
    return knex.schema
        .dropTableIfExists('candidates');
};
