import React, { useState } from 'react';
import './navbar.css'; 
import { Link, useLocation } from 'react-router-dom';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const email = location.state && location.state.email;
  
  const [showMessage, setShowMessage] = useState(false);

  const handleMouseEnter = () => {
    setShowMessage(true);
  };

  const handleMouseLeave = () => {
    setShowMessage(false);
  };



  return (
    <div className="navbar">
      <div>
        <b><h2 className='atmos-logo'><strong>ATMOS</strong></h2></b>
      </div>
      <div className="navbar-right">
        
      </div>

        {/* <div className="user" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <NotificationsActiveIcon style={{ marginRight: '25px' }} />
          User {username}
          <div className={`message-box ${showMessage ? 'show' : ''}`}>
          <div>
            <ul>
              <li>Profile</li>
              <li>Settings</li>
                <Link to="/" >Logout</Link>
            </ul>
          </div>
        </div>
        </div> */}
          <div>
       {/* <h1>Welcome to Home</h1> */}
       <div>
         {/* Your main content here */}
       </div>
       {email && (
         <div style={{ position: "absolute", top: 0, right: 0, padding: "10px" , margin: '10px', color: "black" }}>
           <p>UserEmail:- {email}</p>
         </div>
       )}
     </div>

      
    </div>
  );
}

export default Navbar;
