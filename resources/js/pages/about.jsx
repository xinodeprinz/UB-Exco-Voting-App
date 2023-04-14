import styles from "../../css/modules/about.module.css";
import Layout from '../components/layout';

const About = ({ post }) => {

    return (
        <Layout>
            <div className="section-title">
                <h1>duties of the {post.name}</h1>
            </div>

            <ul className={styles.list}>
                {post.description.map((text, key) => <li key={key}>{text}</li>)}
            </ul>
        </Layout>
    );
};

export default About;
