import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import { useMediaQuery } from 'react-responsive';
// import AppMobile from './AppMobile';
// import AppTablet from './AppTablet';
// import AppDesktop from './AppDesktop';
import './index.css';

// const ResponsiveApp = () => {
//     const isMobile = useMediaQuery({ maxWidth: 600 });
//     const isTablet = useMediaQuery({ minWidth: 601, maxWidth: 1024 });

//     if (isMobile) {
//         return <AppMobile />;
//     } else if (isTablet) {
//         return <AppTablet />;
//     } else {
//         return <AppDesktop />;
//     }
// };

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
