import React ,{ useState,useEffect } from 'react'
import Header from "./Header";
import Search from "./Search";
import MessageList from "./MessageList";
import NewMessage from './NewMessage';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  
  const testUser = { username: "Duane" }; // test user 
  //fetching the messages from the api
  useEffect(
    ()=>{
      fetch('http://127.0.0.1:5555/messages')
      .then((r)=>r.json())
      .then((fetchedMessages) => {
        console.log("Fetched messages:", fetchedMessages);
        setMessages(fetchedMessages);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, []);

  //function to handle the new message
  function handleAddMessage(newMessage){
    setMessages([...messages,newMessage])
  }
  //deleting the message
  function handleDeleteMessage(id){
    const updatedMessages=messages.filter((message)=>message.id !== id);
    setMessages(updatedMessages)
  }
  //updating the messages
  function handleUpdateMessage(updatedMessageObj){
    const updatedMessages = messages.map((message) =>{
      if(message.id === updatedMessageObj.id){
        return updatedMessageObj;
      }else{
        return message;
      }
    })
    setMessages(updatedMessages)
  }

  //for the search functionality of filter
  const displayedMessages = messages.filter((message) => {
    return message.body.toLowerCase().includes(search.toLowerCase());
  });
  
  return (
    <main className={isDarkMode? 'dark-mode':''}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={setIsDarkMode} />
      <Search search={search} onSearchChange={setSearch} />
      <MessageList
        messages={displayedMessages}
        currentUser={testUser}
        onMessageDelete={handleDeleteMessage}
        onUpdateMessage={handleUpdateMessage}
      />
      <NewMessage currentUser={testUser} onAddMessage={handleAddMessage} />
    </main>
  )

}
export default App;
