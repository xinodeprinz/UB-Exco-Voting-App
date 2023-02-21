/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { name: "Hello", email: 'example@gmail.com', channel_id: 1 },
    { name: "Hello", email: 'example2@gmail.com', channel_id: 2 },
    { name: "Hello", email: 'example@3gmail.com', channel_id: 3 },
  ]);
};
