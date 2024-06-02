import React, { useState } from 'react';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';

const ChatComponent = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  return (
    <div>
      <ChatRoomList onSelectRoom={handleSelectRoom} />
      {selectedRoom && <ChatRoom key={selectedRoom.roomID} room={selectedRoom} />}
    </div>
  );
};

export default ChatComponent;
