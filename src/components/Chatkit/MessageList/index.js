import React from 'react';

const EmptyMessageList = (
   <div>Empty list</div>
);

const MessageList = ({ messages = {}, user }) => {
   console.log("Messages from MessagesList", messages);

   let messageList = [];
   Object.keys(messages)
      .reverse()
      .map(k => {
         messageList.push(<li key={k}>{messages[k].text}</li>)
      });

   return (
      <ul>
         {
            messageList.length > 0 ? messageList : EmptyMessageList
         }
      </ul>
   )
};

export default MessageList;