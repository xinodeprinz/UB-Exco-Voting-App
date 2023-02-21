import Post from "../database/models/Post.js";
import Candidate from "../database/models/Candidate.js";

export const getUser = (req, res) => {
    return res.json(req.user);
}

export const posts = async (req, res, next) => {
    const posts = await Post.query();
    const user = req.user;
    for (let post of posts) {
        post.isFacultyCandidate = false;
        post.isDepartmentCandidate = false;

        post.description = post.description.split('|').shift();
        const isDepartment = await Candidate.query().where('post_id', post.id)
            .where('user_id', user.id).where('type', 'department');
        const isFaculty = await Candidate.query().where('post_id', post.id)
            .where('user_id', user.id).where('type', 'faculty');

        if (isDepartment.length > 0) post.isDepartmentCandidate = true;
        if (isFaculty.length > 0) post.isFacultyCandidate = true;

        post.departmentCandidates = (await Candidate.query().where('post_id', post.id)
            .where('type', 'department')).length;
        post.facultyCandidates = (await Candidate.query().where('post_id', post.id)
            .where('type', 'faculty')).length;
    }
    return res.json(posts)
}

export const getProductByName = async (req, res, next) => {
    const name = req.params.name.replaceAll('-', ' ');
    const [post] = await Post.query().where('name', name);
    if (!post) return res.status(404).json({ message: "Post not found." });
    post.description = post.description.split('|');
    return res.json(post);
}