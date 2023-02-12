import Navbar from "../components/navbar";
import Post from "../components/post";
import Sidebar from "../components/sidebar";
import styles from "../modules/posts.module.css";

const Posts = () => {
  return (
    <div className="row g-0">
      <div className="col-lg-4 col-xl-3">
        <Sidebar />
      </div>
      <div className="col-lg-8 col-xl-9">
        <Navbar />

        <main className="container-fluid my-4">
          <div className={styles.sectionTitle}>
            <h1>available posts</h1>
          </div>

          <div className="row">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div className="col-md-6 mb-3" key={i}>
                <Post />
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Posts;
