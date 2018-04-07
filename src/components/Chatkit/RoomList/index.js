import React from 'react';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

import './roomList.css';

const RoomList = ({ user, rooms, messages }) => {
   console.log('RoomList-User', user);
   //console.log('RoomList-Rooms', rooms);
   //console.log('RoomList-Messages', messages);



   //let rooms = [];
   return (
      <div className="roomList">
         <ListGroup>


            {/* <ListGroupItem>
               <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
               <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
               </ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
               <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
               <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
               </ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
               <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
               <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
               </ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
               <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
               <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
               </ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
               <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
               <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
               </ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
               <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
               <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
               </ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
               <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
               <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
               </ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
               <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
               <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
               </ListGroupItemText>
            </ListGroupItem>

            <ListGroupItem>
               <ListGroupItemHeading>List group item heading</ListGroupItemHeading>
               <ListGroupItemText>
                  Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.
               </ListGroupItemText>
            </ListGroupItem> */}

         </ListGroup>
      </div>
   );
}

export default RoomList;