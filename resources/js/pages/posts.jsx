import Post from "../components/post";
import Modal from "../components/modal";
import { useState } from "react";
import sweetAlert from "../components/alert";
import Layout from '../components/layout';
import axios from '../components/axios';

const Posts = ({ initPosts }) => {
    const [postId, setPostId] = useState(null);
    const [post, setPost] = useState({});
    const [posts, setPosts] = useState(initPosts);

    const triggerModal = (id) => {
        setPostId(id);
        setPost(posts.filter(p => p.id === id).shift());
        document.getElementById("showModal").click()
    };

    const becomeACandidate = async (type) => {
        const data = { postId, type };
        const res = await axios.post("/candidates/create", data);
        setPosts(res.data.posts);
        sweetAlert({ icon: "success", title: res.data.message });
        // Close modal
        document.getElementById("closeModal").click();
    };

    return (
        <Layout>
            <Modal
                becomeACandidate={becomeACandidate}
                post={post}
            />
            <div className="section-title">
                <h1>available posts</h1>
            </div>

            <div className="row">
                {posts.length > 0 ?
                    posts.map((post, key) => (
                        <div className="col-md-6 mb-3" key={key}>
                            <Post triggerModal={triggerModal} post={post} />
                        </div>
                    )) : <div className="alert alert-info text-center">
                        No posts are available for the moment; please try again later.
                    </div>}
            </div>
        </Layout>
    );
};

export default Posts;
