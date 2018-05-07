import React from "react";

import { connect } from "react-redux";
import { compose } from "recompose";
import { set, del } from "object-path-immutable";
import Alert from 'react-s-alert';

// Component
import UserNavbar from "./UserNavbar";
import RoomHeader from "./RoomHeader";
import ChatMessageList from "./ChatMessageList";
import RoomUserList from "./RoomUserList";
import RoomMessageList from "./RoomMessageList";
import CreateMessageInput from "./CreateMessageInput";
import withAuthorization from "../Session/withAuthorization";
import getUrls from "get-urls";

// Styles
import "./index.css";
import { Container, Main, SideBar, ChatSection, Loader } from "./index.style.js";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

// Chatkit
import ChatManager from "../../chatkit";

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
      // User
      // --------------------------------------

      setUser: user => this.setState({ user }),

      // --------------------------------------
      // Room
      // --------------------------------------

      setRoom: room => {
         this.setState({ room, sidebarOpen: false });
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

      subscribeToRoom: room => {
         !this.state.user.roomSubscriptions[room.id] &&
            this.state.user.subscribeToRoom({
               roomId: room.id,
               hooks: {
                  onNewMessage: this.actions.addMessage,
                  onUserLeft: payload => {
                     Alert.error(`${payload.name} has left ${room.name}`, {
                        position: 'top-right',
                        effect: 'slide',
                        timeout: 3000
                     });

                     if (this.state.room.id === room.id) {
                        this.setState({
                           room
                        });
                     }
                  }
               },
               messageLimit: 1,
            })
      },

      createRoom: options =>
         this.state.user.createRoom(options).then(this.actions.joinRoom),

      createConvo: options => {
         console.log('options', options, options.user);
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

      removeUserFromRoom: ({ userId, roomId = this.state.room.id }) => {
         userId === this.state.user.id
            ? this.state.user.leaveRoom({ roomId })
            : this.state.user
               .removeUserFromRoom({ userId, roomId })
               .then(this.actions.setRoom)
      },

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

         console.log("Adding new message", payload);

         // Checking if text has any urls
         const urls = getUrls(payload.text);
         payload.urls = urls;

         this.setState(set(this.state, ["messages", roomId, messageId], payload));

         if (roomId === this.state.room.id) {
            const cursor = this.state.user.readCursor({ roomId }) || {};
            const cursorPosition = cursor.position || 0;
            cursorPosition < messageId && this.actions.setCursor(roomId, messageId);
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

         exec && exec(args);
      },

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
      const { user, room, messages, typing, ready } = this.state;
      const { createRoom, createConvo, removeUserFromRoom } = this.actions;

      if (!ready) {
         return <Loader />;
      }

      return (
         <Container>
            <Alert stack={{ limit: 3 }} />
            <Main>
               <SideBar>
                  <UserNavbar
                     user={user}
                     createRoom={createRoom} />
                  <RoomMessageList
                     user={user}
                     rooms={user.rooms}
                     messages={messages}
                     room={room}
                     actions={this.actions} />
               </SideBar>

               <ChatSection>
                  <RoomHeader
                     user={user}
                     room={room}
                     actions={this.actions}
                     typing={typing} />
                  <ChatMessageList
                     user={user}
                     messages={messages[room.id]} />
                  <CreateMessageInput
                     user={user}
                     room={room} />
               </ChatSection>

               <RoomUserList
                  user={user}
                  room={room}
                  createConvo={createConvo}
                  removeUserFromRoom={removeUserFromRoom} />
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
