import createError from 'http-errors';
import Candidate from "../database/models/Candidate.js";
import Post from "../database/models/Post.js";
import User from "../database/models/User.js";
import Vote from "../database/models/Vote.js";

export const createCandidate = async (req, res, next) => {
    const { postId, type } = req.body;
    const user = req.user;

    const [candidate] = await Candidate.query().where('user_id', user.id)
        .where('post_id', postId).where('type', type);

    let message = "";

    if (!candidate) {
        await Candidate.query().insert({
            user_id: user.id,
            post_id: postId,
            type,
            created_at: new Date(),
            updated_at: new Date(),
        });
        message = `You are now a ${type} candidate.`;
    } else {
        await Candidate.query().deleteById(candidate.id);
        message = `You are not still a ${type} candidate.`;
    }
    return res.status(201).json({ message });
}

export const getCandidates = async (req, res, next) => {
    const { user } = req;
    const { type, postName } = req.params;
    const [post] = await Post.query().where('name', postName.replaceAll('-', ' '));
    if (!post) return next(new createError[404]);
    const cands = await Candidate.query()
        .where('post_id', post.id).where('type', type);

    let candidates = [];
    for (let c of cands) {
        const cUser = await User.query().findById(c.user_id);
        if (cUser.faculty === user.faculty) {
            cUser.candidate_id = c.id;
            const vote = await Vote.query().findOne('candidate_id', c.id);

            let voters = [];
            if (vote) voters = JSON.parse(vote.voters);
            cUser.votes = voters.length;
            cUser.hasVoted = voters.includes(user.id) ? true : false;

            candidates.push(cUser);
        }
    }

    return res.json(candidates);
}

export const voteCandidate = async (req, res, next) => {
    const { candidateId } = req.params;
    const voter = req.user;

    try {
        const candidate = await Candidate.query().findById(candidateId);
        if (!candidate) return next(new createError[404]);
        const vote = await Vote.query().findOne('candidate_id', candidate.id);

        if (vote) {
            const voters = JSON.parse(vote.voters);
            if (!voters.includes(voter.id)) {
                voters.push(voter.id);
            } else {
                const index = voters.indexOf(voter.id);
                voters.splice(index, 1);
            }
            vote.voters = JSON.stringify(voters);
            await Vote.query().updateAndFetchById(vote.id, vote);
        } else {
            await Vote.query().insert({
                candidate_id: candidate.id,
                voters: JSON.stringify([voter.id]),
                created_at: new Date(),
                updated_at: new Date(),
            });
        }

        // Returning response.
        const newVote = await Vote.query().findOne('candidate_id', candidateId);
        const newVoters = JSON.parse(newVote.voters);
        const hasVoted = newVoters.includes(voter.id) ? true : false;
        return res.json({ votes: newVoters.length, hasVoted });
    } catch (error) {
        return res.status(500).json(error);
    }
}

