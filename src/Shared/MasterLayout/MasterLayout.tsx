import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';

const MasterLayout = () => {

  return (
    <div className="flex h-screen">
      <div className="flex-3" style={{backgroundColor:"#fbfbfb",borderRight:"1px solid #ccc"}}>
        {/* Sidebar on the left */}
        <div>
          <SideBar />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {/* Navbar at the top */}
        <div className="col-12 p-0">
          <NavBar />
        </div>
        {/* Main content area */}
        <div className="content-container flex-1 overflow-y-auto my-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;

