import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import config from '../config'

const Head = () => {
    const [title, setTitle] = useState(config.appName);
    useEffect(() => {
        const route = window.location.pathname.replaceAll('/', '-');
        setTitle(`${config.appName} | ${route.substr(1, route.length - 1) || 'Login'}`);
    }, [title]);
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content="Vote your Exco members in the University of Buea." />
            <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=7" />
            <meta http-equiv="X-UA-Compatible" content="ie=edge" />
            <meta name="keywords" content="Exco, UB, University of Buea, Voting" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <link rel="manifest" href="/manifest.json" />
            <meta name="theme-color" content='#1b1e6d' />

            <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-icon-60x60.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-icon-72x72.png" />
            <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-icon-76x76.png" />
            <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-icon-114x114.png" />
            <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-icon-120x120.png" />
            <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-icon-144x144.png" />
            <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-icon-152x152.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-icon-180x180.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/favicons/android-icon-192x192.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="96x96" href="/favicons/favicon-96x96.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="msapplication-TileImage" content="./favicons/ms-icon-144x144.png" />
        </Helmet>
    );
}

export default Head