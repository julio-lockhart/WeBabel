import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { compose } from "recompose";
import { set, del } from "object-path-immutable";

// Component
import UserNavbar from "./UserNavbar";
import RoomHeader from "./RoomHeader";
import ChatMessageList from "./ChatMessageList";
import RoomMessageList from "./RoomMessageList";
import CreateMessageInput from "./CreateMessageInput";
import withAuthorization from "../Session/withAuthorization";

import "./index.css";

// Chatkit
import ChatManager from "../../chatkit";

// Styled Components
const Container = styled.div`
  display: flex;
  height: 100vh;
  font-size: 16px;
  font-family: "Roboto", sans-serif;
  margin: 0;
`;

const Main = styled.div`
  display: flex;
  margin: auto;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow: hidden;
`;

const SideBar = styled.aside`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 700px) {
    position: absolute;
    left: 0;
    top: 4.8rem;
    bottom: 0;
    transform: translateX(-100%);
    transition: transform 0.2s ease-out;
    box-shadow: 0 0 0.38rem rgba(0, 0, 0, 0.1);
  }
`;

const ChatSection = styled.div`
  flex: 4 0 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

class ChatkitView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: props.authUser,
      user: {},
      room: {},
      messages: {},
      typing: {},
      ready: false
    };
  }

  actions = {
    // --------------------------------------
    // UI
    // --------------------------------------

    setSidebar: sidebarOpen => this.setState({ sidebarOpen }),
    setUserList: userListOpen => this.setState({ userListOpen }),

    // --------------------------------------
    // User
    // --------------------------------------

    setUser: user => this.setState({ user }),

    // --------------------------------------
    // Room
    // --------------------------------------

    setRoom: room => {
      this.setState({ room, sidebarOpen: false });
      this.actions.scrollToEnd();
    },

    removeRoom: room => this.setState({ room: {} }),

    joinRoom: room => {
      this.actions.setRoom(room);
      this.actions.subscribeToRoom(room);
      this.state.messages[room.id] &&
        this.actions.setCursor(
          room.id,
          Object.keys(this.state.messages[room.id]).pop()
        );
    },

    subscribeToRoom: room =>
      !this.state.user.roomSubscriptions[room.id] &&
      this.state.user.subscribeToRoom({
        roomId: room.id,
        hooks: { onNewMessage: this.actions.addMessage }
      }),

    createRoom: options =>
      this.state.user.createRoom(options).then(this.actions.joinRoom),

    createConvo: options => {
      if (options.user.id !== this.state.user.id) {
        const exists = this.state.user.rooms.find(
          x =>
            x.name === options.user.id + this.state.user.id ||
            x.name === this.state.user.id + options.user.id
        );
        exists
          ? this.actions.joinRoom(exists)
          : this.actions.createRoom({
              name: this.state.user.id + options.user.id,
              addUserIds: [options.user.id],
              private: true
            });
      }
    },

    addUserToRoom: ({ userId, roomId = this.state.room.id }) =>
      this.state.user
        .addUserToRoom({ userId, roomId })
        .then(this.actions.setRoom),

    removeUserFromRoom: ({ userId, roomId = this.state.room.id }) =>
      userId === this.state.user.id
        ? this.state.user.leaveRoom({ roomId })
        : this.state.user
            .removeUserFromRoom({ userId, roomId })
            .then(this.actions.setRoom),

    // --------------------------------------
    // Cursors
    // --------------------------------------

    setCursor: (roomId, position) =>
      this.state.user
        .setReadCursor({ roomId, position: parseInt(position, 10) })
        .then(x => this.forceUpdate()),

    // --------------------------------------
    // Messages
    // --------------------------------------

    addMessage: payload => {
      const roomId = payload.room.id;
      const messageId = payload.id;
      this.setState(set(this.state, ["messages", roomId, messageId], payload));

      if (roomId === this.state.room.id) {
        const cursor = this.state.user.readCursor({ roomId }) || {};
        const cursorPosition = cursor.position || 0;
        cursorPosition < messageId && this.actions.setCursor(roomId, messageId);
        this.actions.scrollToEnd();
      }
    },

    runCommand: command => {
      const commands = {
        invite: ([userId]) => this.actions.addUserToRoom({ userId }),
        remove: ([userId]) => this.actions.removeUserFromRoom({ userId }),
        leave: ([userId]) =>
          this.actions.removeUserFromRoom({ userId: this.state.user.id })
      };
      const name = command.split(" ")[0];
      const args = command.split(" ").slice(1);
      const exec = commands[name];
      exec && exec(args).catch(console.log);
    },

    scrollToEnd: e =>
      setTimeout(() => {
        const elem = document.querySelector("#messages");
        elem && (elem.scrollTop = 100000);
      }, 0),

    // --------------------------------------
    // Typing Indicators
    // --------------------------------------

    isTyping: (room, user) =>
      this.setState(set(this.state, ["typing", room.id, user.id], true)),

    notTyping: (room, user) =>
      this.setState(del(this.state, ["typing", room.id, user.id])),

    // --------------------------------------
    // Presence
    // --------------------------------------

    setUserPresence: () => this.forceUpdate()
  };

  componentDidMount = async () => {
    ChatManager(this).then(res => {
      this.setState({
        ready: true
      });
    });
  };

  render() {
    const { user, room, messages, ready } = this.state;

    if (!ready) {
      return <div />;
    }

    return (
      <Container>
        <Main>
          <SideBar>
            <UserNavbar user={user} />
            <RoomMessageList
              user={user}
              rooms={user.rooms}
              messages={messages}
              room={room}
              actions={this.actions}
            />
          </SideBar>

          <ChatSection>
            <RoomHeader room={room} />
            <ChatMessageList user={user} messages={messages[room.id]} />
            <CreateMessageInput user={user} room={room} />
          </ChatSection>
        </Main>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser
});

const authCondition = authUser => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(ChatkitView);
