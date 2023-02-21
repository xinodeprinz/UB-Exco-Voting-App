import { Model } from "objection";

class Vote extends Model {
    static tableName = 'votes';
}

export default Vote;