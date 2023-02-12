import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styles from "../modules/about.module.css";
import { useParams } from "react-router-dom";

const About = () => {
  const { post } = useParams();
  return (
    <div className="row g-0">
      <div className="col-lg-4 col-xl-3">
        <Sidebar />
      </div>
      <div className="col-lg-8 col-xl-9">
        <Navbar />

        <main className="container-fluid my-4">
          <div className={styles.sectionTitle}>
            <h1>duties of the {post}</h1>
          </div>

          <ul className={styles.list}>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              ipsam vel dignissimos inventore, modi consequatur, ullam, eius
              doloribus similique id culpa minus reprehenderit nemo aspernatur.
              Voluptates quos ratione corrupti atque odio vero soluta illum
              aliquid aliquam repellat quaerat commodi, natus numquam ipsam
              accusamus autem dolorum at fugit! Accusamus, repellat excepturi.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              ipsam vel dignissimos inventore, modi consequatur, ullam, eius
              doloribus similique id culpa minus reprehenderit nemo aspernatur.
              Voluptates quos ratione corrupti atque odio vero soluta illum
              aliquid aliquam repellat quaerat commodi, natus numquam ipsam
              accusamus autem dolorum at fugit! Accusamus, repellat excepturi.
            </li>
            <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
              ipsam vel dignissimos inventore, modi consequatur, ullam, eius
              doloribus similique id culpa minus reprehenderit nemo aspernatur.
              Voluptates quos ratione corrupti atque odio vero soluta illum
              aliquid aliquam repellat quaerat commodi, natus numquam ipsam
              accusamus autem dolorum at fugit! Accusamus, repellat excepturi.
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default About;
