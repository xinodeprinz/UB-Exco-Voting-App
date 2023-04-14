import Layout from '../components/layout';
import Candidate from '../components/candidate';
import styles from '../../css/modules/candidates.module.css';
import { router } from '@inertiajs/react';

const Candidates = ({ candidates, postNames, postName, type }) => {

    const handlePost = (name) => {
        router.get(`/${type}/${name}/candidates`);
    }

    return (
        <Layout>
            <div className="row mb-3">
                <div className="col-sm-8 offset-sm-2 col-md-6 offset-md-3">
                    <select
                        id="post"
                        onChange={(e) => handlePost(e.target.value)}
                        className={`form-select ${styles.select}`}
                        value={postName.replaceAll(" ", "-")}
                    >
                        {postNames.map((p, i) => (
                            <option value={p.replaceAll(" ", "-")} key={i}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="section-title">
                <h1>{postName.replaceAll("-", " ")} candidates</h1>
            </div>

            {candidates.length > 0 ? (
                <div className="row">
                    {candidates.map((candidate, key) => (
                        <div className="col-sm-6 col-xl-3 mb-3" key={key}>
                            <Candidate
                                isElection={false}
                                isWinner={false}
                                candidate={candidate}
                            />
                        </div>
                    ))}
                </div>
            ) : <div className="alert alert-info text-center">
                There are no candidates for this post at the moment. Please try
                again later.
            </div>}
        </Layout>
    );
};

export default Candidates;
