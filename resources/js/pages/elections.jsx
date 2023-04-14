import Layout from '../components/layout';
import Candidate from '../components/candidate';
import styles from '../../css/modules/candidates.module.css';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import axios from '../components/axios';
import sweetAlert from '../components/alert';
import config from '../config';

const Elections = ({ initalCandidates, postNames, postName, type, canVoteForFaculty }) => {

    const [candidates, setCandidates] = useState(initalCandidates);
    const [timerColour, setTimerColour] = useState("time");
    const [time, setTime] = useState({ hours: 1, minutes: 0, seconds: 1 });
    const [showPosition, setShowPosition] = useState(false);
    const [isVotingPeriod, setIsVotingPeriod] = useState(null);
    const [canVote, setCanVote] = useState(true);

    const handlePost = (name) => {
        router.get(`/${type}/${name}/elections`);
    }

    const handleVote = async (candidateId) => {
        const data = { type, postName };
        const res = await axios.patch(`/vote/${candidateId}`, data);
        setCandidates(res.data.candidates);
        sweetAlert({ icon: 'success', title: res.data.message });
    }

    // Unchanging variables
    const startTime = new Date(
        type === 'faculty' ?
            config.facultyStartTime : config.deptStartTime
    ).getTime();
    const endTime = startTime + config.duration * 60 * 1000;
    const now = new Date().getTime();


    useEffect(() => {
        verifyPeriod();
        votingTime();

        // Checking if user can vote
        if (type === 'faculty' && !canVoteForFaculty) {
            setCanVote(false);
        }

        // Update the DOM every five seconds.
        // setTimeout(async () => {
        //     const res = await axios.get(`/${postName}/${type}/refetch-candidates`);
        //     setCandidates(res.data);
        // }, 5000);
    });

    const verifyPeriod = () => {
        if (now >= startTime && now < endTime)
            setIsVotingPeriod(true);
        else if (now < startTime)
            setIsVotingPeriod('less');
        else
            setIsVotingPeriod('more');
    }

    const votingTime = () => {
        const timeout = setTimeout(() => {
            const distance = endTime - now;
            const hours = Math.floor(
                (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            setTime({ hours, minutes, seconds });
        }, 1000);

        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) {
            clearTimeout(timeout);
            setShowPosition(true);
            sweetAlert({ icon: 'info', title: 'Time up! Voting ended.' });
        }

        if (time.hours === 0 && time.minutes < 11) {
            setTimerColour("lessTime"); //Changes the timer colour to red.
        }
    };

    return (
        <Layout>
            {type === 'faculty' && isVotingPeriod === true &&
                <div className="my-3 alert alert-info text-center">
                    Only departmental winners are eligible to vote.
                </div>}
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

            {isVotingPeriod === true && <>
                <div className="d-md-flex justify-content-between align-items-center">
                    <div className="section-title">
                        <h1>{postName.replaceAll("-", " ")} candidates</h1>
                    </div>
                    <div className={`${styles[timerColour]} mb-3 mb-md-0`}>
                        <span>voting ends in: </span>
                        <span>
                            {time.hours.toString().padStart(2, 0)}:
                            {time.minutes.toString().padStart(2, 0)}:
                            {time.seconds.toString().padStart(2, 0)}
                        </span>
                    </div>
                </div>

                {candidates.length > 0 ? (
                    <div className="row">
                        {candidates.map((candidate, key) => (
                            <div className="col-sm-6 col-xl-3 mb-3" key={key}>
                                <Candidate
                                    isElection={true}
                                    isWinner={false}
                                    candidate={candidate}
                                    handleVote={handleVote}
                                    showPosition={showPosition}
                                    canVote={canVote}
                                />
                            </div>
                        ))}
                    </div>
                ) : <div className="alert alert-info text-center">
                    There are no candidates for this post at the moment. Please try
                    again later.
                </div>}
            </>}

            {isVotingPeriod === 'less' && <div className="alert alert-info text-center">
                The elections is scheduled on the {new Date(startTime).toLocaleString()}.
                {type === 'faculty' && <span> Only winners of the departmental elections will be eligible to vote.</span>}
            </div>}

            {isVotingPeriod === 'more' && <div className="alert alert-info text-center">
                The elections toke place on the {new Date(startTime).toLocaleString()}. Check the winners page for the winners of the elections.
            </div>}
        </Layout>
    );
};

export default Elections;
