import Navbar from "../components/navbar";
import Post from "../components/post";
import Sidebar from "../components/sidebar";
// import styles from "../modules/posts.module.css";
import Modal from "../components/modal";
import { useEffect, useState } from "react";
import axios from "../components/axios";
import sweetAlert from "../components/alert";

const Posts = () => {
  const [postId, setPostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const triggerModal = (id) => {
    setPostId(id);
    const showModal = document.getElementById("showModal");
    showModal.click();
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const { data } = await axios.get("/posts");
    setPosts(data);
    setIsLoading(false);
  };

  const becomeACandidate = async (type) => {
    const data = { postId, type };
    const res = await axios.post("/candidates/create", data);
    sweetAlert({ icon: "success", title: res.data.message });
    // Close modal
    document.getElementById("closeModal").click();
  };

  return (
    <div className="row g-0">
      <Modal becomeACandidate={becomeACandidate} />
      <div className="col-lg-4 col-xl-3">
        <Sidebar />
      </div>
      <div className="col-lg-8 col-xl-9">
        <Navbar isLoading={isLoading} />

        <main className="container-fluid my-4">
          <div className="section-title">
            <h1>available posts</h1>
          </div>

          <div className="row">
            {posts &&
              posts.map((post, key) => (
                <div className="col-md-6 mb-3" key={key}>
                  <Post triggerModal={triggerModal} post={post} />
                </div>
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Posts;
