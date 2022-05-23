import React, { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';

import logo from './logo.svg';
import myData from './intents.json';

import APIConfig from './api/APIConfig';

function App() {
  const [result, setResult] = useState("");
  const [context, setContext] = useState("");

  useEffect(() => {
    addResponseMessage('Welcome to this **awesome** chat!');
  }, []);

  const firstUpdate = useRef(true);
  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const botMessage = responseMessage(result);
    addResponseMessage(botMessage);

  }, [result]);

  function responseMessage(tagMessage) {
    const result =  myData["intents"].find(obj => {
      return obj["tag"] === tagMessage;
    });
    setContext(result["context"][0])
    const randomResponse = Math.floor(Math.random() * (result["responses"].length - 1))
    return result["responses"][randomResponse]
  }

  function postChatBot(data) {
    APIConfig.post("katana-ml/api/v1.0/assistant", data).then(
      // Pengembalian Response Data jika berhasil
      response => {
        setResult(response.data[0].intent);
      } 
    );
  }



  const handleNewUserMessage = (newMessage) => {
    // Now send the message throught the backend API
    const data = {"sentence": newMessage}
    if (context === ""){
      postChatBot(data);
    }
    else{
      addResponseMessage(responseMessage(context));
    }
  };

    return (
      <div className="App">
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          profileAvatar={logo}
          title="My new awesome title"
          subtitle="And my cool subtitle"
        />
      </div>
    );
}

export default App;
