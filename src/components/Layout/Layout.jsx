import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import './Layout.css';

function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="layout-container">
        <div className="layout-content">
          <Sidebar />
          <main className="layout-main">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}

export default Layout;