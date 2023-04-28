import { Outlet } from 'react-router-dom';

import Footer from '../../Base/Footer/Footer.jsx';
import NavBar from '../../Base/NavBar/NavBar.jsx';

const RootLayout = () => {
    return (
        <main>
            <NavBar />
            <Outlet />
            <Footer />
        </main>
    );
};

export default RootLayout;
