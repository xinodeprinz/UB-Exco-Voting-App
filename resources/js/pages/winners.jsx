import Candidate from '../components/candidate';
import Layout from '../components/layout';

const Winners = ({ winners, type }) => {
    return (
        <Layout>
            <div className="section-title">
                <h1>{type} winners</h1>
            </div>

            {winners.length > 0 ? (
                <div className="row">
                    {winners.map((winner, key) => (
                        <div className="col-sm-6 col-xl-3 mb-3" key={key}>
                            <Candidate
                                isElection={false}
                                isWinner={true}
                                candidate={winner}
                            />
                        </div>
                    ))}
                </div>
            ) : <div className="alert alert-info text-center">
                Winners haven't been published yet; please check again later.
            </div>}
        </Layout>
    );
}

export default Winners