import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, Col } from 'reactstrap';

import './index.module.css';

const RoomList = ({ user, rooms = [], messages, current, actions }) => {
   console.log('RoomList-User', user);
   //console.log('RoomList-Rooms', rooms);
   //console.log('RoomList-Messages', messages);

   let roomGroupItems = [];
   rooms.map((room) => {

      const roomId = room.id;
      const messageKeys = Object.keys(messages[roomId] || {});
      const latestMessage = messageKeys.length > 0 && messages[room.id][messageKeys.pop()];
      const firstUser = room.users.find(x => x.id !== user.id);

      console.log('Room', room);
      console.log('latestMessage', latestMessage);
      console.log('messageKeys', messageKeys);

      roomGroupItems.push(
         <ListGroupItem
            key={roomId}
            onClick={e => console.log('Room Clicked', roomId)}>

            <div className="pageHolder">
               <div className="">
                  <img
                     className="rounded-circle avatar-room"
                     src="https://image.flaticon.com/icons/svg/149/149071.svg"
                     alt="Template" />
               </div>

               <div className="room-details room-details_left">
                  <span>{room.name}</span>
                  <span>
                     {
                        latestMessage ? latestMessage.text : "-Message Goes Here"
                     }
                  </span>
               </div>

               <div className="room-details room-details_right" style={{ float: 'right' }}>
                  <span>
                     15:30
                  </span>
                  <span className="badge badge-primary">
                     4
                  </span>
               </div>
            </div>

         </ListGroupItem>
      )
   });

   return (
      <ListGroup >
         {
            roomGroupItems
         }
      </ListGroup>
   );
};

export default RoomList;