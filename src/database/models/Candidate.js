import { Model } from "objection";

class Candidate extends Model {
    static tableName = 'candidates';
}

export default Candidate;