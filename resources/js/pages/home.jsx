import React from "react";
import Layout from "../components/layout";
import { DefaultPlayer as Video } from "react-html5video";
import "react-html5video/dist/styles.css";

const Home = ({ video }) => {
    const { protocol, host } = window.location;
    const server = `${protocol}//${host}`;

    return (
        <Layout>
            <div className="section-title">
                <h1>ongoing campaigns</h1>
            </div>

            {video ? (
                <Video //autoPlay loop muted
                    controls={[
                        "PlayPause",
                        "Seek",
                        "Time",
                        "Volume",
                        "Fullscreen",
                    ]}
                    // poster="http://sourceposter.jpg"
                    style={{ height: "80vh" }}
                    preload="metadata"
                    onCanPlayThrough={() => {
                        // Do stuff
                    }}
                >
                    <source
                        src={`${server}/storage/${video.url}`}
                        type="video/mp4"
                    />
                    {/* <track label="English" kind="subtitles" srcLang="en" src="http://source.vtt" default /> */}
                </Video>
            ) : (
                <div className="alert alert-info text-center">
                    There are no ongoing campaigns at the moment.
                </div>
            )}
        </Layout>
    );
};

export default Home;
