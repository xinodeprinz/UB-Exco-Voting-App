import './bootstrap';

import { createInertiaApp } from '@inertiajs/react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/modules/main.css';

createInertiaApp({
    resolve: name => {
        const pages = import.meta.glob('./pages/**/*.jsx', { eager: true })
        return pages[`./pages/${name}.jsx`]
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />)
    },
});