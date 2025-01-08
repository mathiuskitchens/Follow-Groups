import BottomNav from '../BottomNav';
import PropTypes from 'prop-types';
import TopNav from '../TopNav';
import { Outlet } from 'react-router';

const Layout = ( ) => {
  return (
    <>
      <div>
        <TopNav />
      </div>
      <main>
        <Outlet />
      </main>
      <footer>
        <BottomNav />
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
