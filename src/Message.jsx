import React, { useState } from "react";
import EditMessage from "./EditMessage";

function Message({ message, currentUser, onMessageDelete, onUpdateMessage }) {
  const [isEditing, setIsEditing] = useState(false);//state variable isediting

  const { id, username, body, created_at: createdAt } = message; //destructures the message prop 

  const timestamp = new Date(createdAt).toLocaleTimeString(); //converts to human readable string

  const isCurrentUser = currentUser.username === username; //checks whether it's the same user 

  function handleDeleteClick() {
    fetch(`http://127.0.0.1:5555/messages/${id}`, {
      method: "DELETE",
    });

    onMessageDelete(id);
  }
// called when the edit button is clicked
  function handleUpdateMessage(updatedMessage) {
    setIsEditing(false);
    onUpdateMessage(updatedMessage);
  }

  return (
    <li>
      <span className="user">{username}</span>
      <span className="time">{timestamp}</span>
      {isEditing ? (
        <EditMessage
          id={id}
          body={body}
          onUpdateMessage={handleUpdateMessage}
        />
      ) : (
        <p>{body}</p>
      )}
      {isCurrentUser ? (
        <div className="actions">
          <button onClick={() => setIsEditing((isEditing) => !isEditing)}>
            <span role="img" aria-label="edit">
              ✏️
            </span>
          </button>
          <button onClick={handleDeleteClick}>
            <span role="img" aria-label="delete">
              🗑
            </span>
          </button>
        </div>
      ) : null}
    </li>
  );
}

export default Message;
