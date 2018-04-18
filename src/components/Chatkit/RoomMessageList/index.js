import React from "react";
import styled from "styled-components";

// Component
import RoomMessageListItem from "../RoomMessageListItem";

// Styled Components
const Container = styled.div`
  margin: 8px;
  display: -webkit-flex;
  -webkit-flex-direction: column;
  flex-direction: column;
`;

const ContainerList = styled.ul`
  flex: 1 1 auto;
  -webkit-flex: 1 1 auto;
  overflow-y: auto;
  min-height: 0px;
  padding: 0;
  margin: 0;
`;

const RoomDetailContainer = styled.ul`
  width: 100%;
  padding: 0;
  margin: 8px 0;
  border-bottom: 1px solid #03a9f4;

  &:hover {
    background: #fafafa;
  }
`;

const RoomDetail = styled.div`
  height: 80px;
  width: 100%;
`;

const AvatarImage = styled.img`
  height: 50px;
  width: 50px;
  float: left;
`;

const RoomMessageList = ({ rooms = [], user, messages, room, actions }) => {
  //console.log('Rooms', rooms)
  //console.log('messages', messages)

  let roomHeaders = [];
  rooms.forEach(room => {
    const messageKeys = Object.keys(messages[room.id] || {});
    const oldestMessageIdReceived = Math.max(...messageKeys);

    if (isFinite(oldestMessageIdReceived)) {
      const senderId = messages[room.id][oldestMessageIdReceived].senderId;
      const senderName =
        senderId === user.id
          ? "You"
          : messages[room.id][oldestMessageIdReceived].userStore.store.store[
              senderId
            ].name;
      const latestMessage = messages[room.id][oldestMessageIdReceived].text;

      const currentUserAvatar = user.avatarURL
        ? user.avatarURL
        : "https://image.flaticon.com/icons/svg/149/149071.svg";
      const senderAvatar =
        messages[room.id][oldestMessageIdReceived].userStore.store.store[
          senderId
        ].avatarURL;
      const avatar =
        senderId === user.id
          ? currentUserAvatar
          : senderAvatar
            ? senderAvatar
            : "https://image.flaticon.com/icons/svg/149/149071.svg";

      roomHeaders.push(
        <RoomDetailContainer key={room.id}>
          <RoomDetail>
            <AvatarImage className="rounded-circle" src={avatar} />

            <div>
              <h4>{room.name}</h4>
              <div>{`${senderName}: ${latestMessage}`}</div>
              <div style={{ float: "right", fontSize: ".9em" }}>0 mins ago</div>
            </div>
          </RoomDetail>
        </RoomDetailContainer>
      );
    }
  });

  return (
    <Container>
      <ContainerList>{roomHeaders}</ContainerList>
    </Container>
  );
};

export default RoomMessageList;
