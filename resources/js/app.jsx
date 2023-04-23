import './bootstrap';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/modules/main.css';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/serviceWorker.js').then(reg => {
            console.log("Worker Registered", reg)
        }).catch(err => {
            console.log("Error in service worker", err)
        })
    })
}

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })
        return pages[`./pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
});