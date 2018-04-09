import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { set, del } from 'object-path-immutable';
import { Row, Col } from 'reactstrap';

// Component
import UserNavbar from './UserNavbar';
import RoomList from './RoomList';
import RoomHeader from './RoomHeader';
import MessageList from './MessageList';
import CreateMessage from './CreateMessage';
import JoinRoom from './JoinRoom';
import CreateRoomForm from './CreateRoomForm';
import withAuthorization from '../Session/withAuthorization';

import './index.css';

// Chatkit
import ChatManager from '../../chatkit';

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
      }
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
         this.setState({ room, sidebarOpen: false })
         this.actions.scrollToEnd()
      },

      removeRoom: room => this.setState({ room: {} }),

      joinRoom: room => {
         this.actions.setRoom(room)
         this.actions.subscribeToRoom(room)
         this.state.messages[room.id] &&
            this.actions.setCursor(
               room.id,
               Object.keys(this.state.messages[room.id]).pop()
            )
      },

      subscribeToRoom: room =>
         !this.state.user.roomSubscriptions[room.id] &&
         this.state.user.subscribeToRoom({
            roomId: room.id,
            hooks: { onNewMessage: this.actions.addMessage },
         }),

      createRoom: options =>
         this.state.user.createRoom(options).then(this.actions.joinRoom),

      createConvo: options => {
         if (options.user.id !== this.state.user.id) {
            const exists = this.state.user.rooms.find(
               x =>
                  x.name === options.user.id + this.state.user.id ||
                  x.name === this.state.user.id + options.user.id
            )
            exists
               ? this.actions.joinRoom(exists)
               : this.actions.createRoom({
                  name: this.state.user.id + options.user.id,
                  addUserIds: [options.user.id],
                  private: true,
               })
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
         this.setState(set(this.state, ['messages', roomId, messageId], payload));

         if (roomId === this.state.room.id) {
            const cursor = this.state.user.readCursor({ roomId }) || {}
            const cursorPosition = cursor.position || 0
            cursorPosition < messageId && this.actions.setCursor(roomId, messageId)
            this.actions.scrollToEnd()
         }
      },

      runCommand: command => {
         const commands = {
            invite: ([userId]) => this.actions.addUserToRoom({ userId }),
            remove: ([userId]) => this.actions.removeUserFromRoom({ userId }),
            leave: ([userId]) =>
               this.actions.removeUserFromRoom({ userId: this.state.user.id }),
         }
         const name = command.split(' ')[0]
         const args = command.split(' ').slice(1)
         const exec = commands[name]
         exec && exec(args).catch(console.log)
      },

      scrollToEnd: e =>
         setTimeout(() => {
            const elem = document.querySelector('#messages')
            elem && (elem.scrollTop = 100000)
         }, 0),

      // --------------------------------------
      // Typing Indicators
      // --------------------------------------

      isTyping: (room, user) =>
         this.setState(set(this.state, ['typing', room.id, user.id], true)),

      notTyping: (room, user) =>
         this.setState(del(this.state, ['typing', room.id, user.id])),

      // --------------------------------------
      // Presence
      // --------------------------------------

      setUserPresence: () => this.forceUpdate(),
   }

   componentDidMount = async () => {
      ChatManager(this).then((res) => {
         this.setState({
            ready: true
         })
      });
   }

   render() {
      const {
         user,
         room,
         messages,
         ready
      } = this.state;

      console.log('Room id', room.id);

      if (!ready) {
         return <div />
      }

      return (
         <div>
            <Row>
               <Col md="3" className="chatkit_col-3">
                  <UserNavbar user={user} />
                  <RoomList user={user}
                     rooms={user.rooms}
                     messages={messages} />
               </Col>

               <Col md="9" className="chatkit_col-9">
                  <RoomHeader state={this.state} actions={this.actions} />
                  {
                     room.id ? (
                        <Row>
                           <Col>
                              <MessageList
                                 user={user}
                                 messages={messages[room.id]} />
                              <CreateMessage state={this.state} actions={this.actions} />
                           </Col>
                        </Row>
                     ) : <JoinRoom />
                  }
               </Col>
            </Row>
         </div>
      );
   };
};

const mapStateToProps = (state) => ({
   authUser: state.sessionState.authUser
});

const authCondition = (authUser) => !!authUser;

export default compose(
   withAuthorization(authCondition),
   connect(mapStateToProps)
)(ChatkitView);