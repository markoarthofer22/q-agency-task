/* eslint-disable no-unused-vars */
import { useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollRestoration = ({ history, children }) => {
    const prev = useRef([]);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
    }, []);

    useEffect(() => {
        let hist = JSON.parse(sessionStorage.getItem('history')) || [];

        if (history.action === 'PUSH') {
            hist[hist.length - 1].scrollY = window.pageYOffset;
            hist.push(history.location);
        }

        if (history.action === 'POP') {
            //if (hist[hist.length - 1].pathname !== history.location.pathname) hist.pop();
            hist.pop();
        }

        if (!hist.length) hist.push(history.location);
        sessionStorage.setItem('history', JSON.stringify(hist));
    }, [history, history.location.pathname]);

    return children || null;
};

export default withRouter(ScrollRestoration);
