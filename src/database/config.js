import knex from "knex";
import knexConfig from "./knexfile.js";
import { Model } from "objection";

const config = () => {
    const db = knex(knexConfig.development);
    Model.knex(db);
}

export default config;