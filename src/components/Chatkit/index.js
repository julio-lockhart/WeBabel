import React from "react";
import io from "socket.io-client";
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

// Styles
import "./index.css";
import { Container, Main, SideBar, ChatSection, Loader } from "./index.style.js";
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

// Chatkit
import ChatManager from "../../chatkit";

const API_URL = "http://localhost:3001";
let socket = null;
// Regex to pull URLs from a string
let re = /\b(?:https?:\/\/)(\S+)\b/g;

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

   componentDidMount = async () => {
      try {
         socket = io(`${API_URL}/server-IO`);
      } catch (ex) {
         console.log(ex);
      }

      ChatManager(this).then(res => {
         this.setState({
            ready: true
         });
      });
   };

   // --------------------------------------
   // Chatkit Actions
   // --------------------------------------

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
               }
            });
      },

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

      removeUserFromRoom: ({ userId, roomId = this.state.room.id }) => {
         userId === this.state.user.id
            ? this.state.user.leaveRoom({ roomId })
            : this.state.user
               .removeUserFromRoom({ userId, roomId })
               .then(this.actions.setRoom)
      },

      // --------------------------------------
      // Messages
      // --------------------------------------

      addMessage: payload => {
         const roomId = payload.room.id;
         const messageId = payload.id;

         // Extract any urls 
         let match;
         let urls = [];
         while ((match = re.exec(payload.text)) !== null) {
            urls.push(match[0]);
         }

         payload.urls = urls;

         const userId = this.state.user.id;
         socket.emit("send_payload", { userId: userId, payload: payload });

         this.setState(set(this.state, ["messages", roomId, messageId], payload));
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

   render() {
      const { user, room, messages, typing, ready } = this.state;
      const { createRoom, createConvo, removeUserFromRoom } = this.actions;

      if (!ready) {
         return <Loader />;
      }

      // If there are no rooms, only show the empty empty
      // message list and the dropdown.
      if (user.rooms.length === 0) {
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
               </Main>
            </Container>
         )
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
