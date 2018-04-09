import React from 'react';
import {
   Navbar,
   NavbarBrand,
   Button
} from 'reactstrap';

import './index.module.css';

const RoomHeader = ({
   state: { room, user, sidebarOpen, userListOpen },
   actions: { setSidebar, setUserList }
}) => {

   return (
      <div className="navbar_room-header">
         <Navbar light>
            <NavbarBrand>
               {room.name}
            </NavbarBrand>
         </Navbar>
      </div>
   );
};

export default RoomHeader;