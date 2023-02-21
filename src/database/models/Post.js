import { Model } from "objection";
import Candidate from "./Candidate.js";

class Post extends Model {
    static tableName = 'posts';

    static relationMappings = {
        candidates: {
            relation: Model.HasManyRelation,
            modelClass: Candidate,
            join: {
                from: 'posts.id',
                to: 'candidates.post_id',
            }
        }
    };
}

export default Post;