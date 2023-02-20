import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styles from "../modules/about.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../components/axios";

const About = () => {
  const { post } = useParams();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const res = await axios.get(`/posts/name/${post}`);
    setData(res.data);
    setIsLoading(false);
  };
  return (
    <div className="row g-0">
      <div className="col-lg-4 col-xl-3">
        <Sidebar />
      </div>
      <div className="col-lg-8 col-xl-9">
        <Navbar isLoading={isLoading} />

        <main className="container-fluid my-4">
          <div className="section-title">
            <h1>duties of the {post.replaceAll("-", " ")}</h1>
          </div>

          <ul className={styles.list}>
            {data &&
              data.description.map((text, key) => <li key={key}>{text}</li>)}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default About;
