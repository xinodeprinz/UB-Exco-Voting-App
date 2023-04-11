import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import styles from "../../css/modules/home.module.css";
import Layout from "../components/layout";

const Home = () => {
    return (
        <Layout>
            <div className="section-title">
                <h1>about us</h1>
            </div>

            <p className={styles.p}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
                ipsam vel dignissimos inventore, modi consequatur, ullam, eius
                doloribus similique id culpa minus reprehenderit nemo aspernatur.
                Voluptates quos ratione corrupti atque odio vero soluta illum
                aliquid aliquam repellat quaerat commodi, natus numquam ipsam
                accusamus autem dolorum at fugit! Accusamus, repellat excepturi.
            </p>

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
            </ul>
        </Layout>
    );
};

export default Home;
