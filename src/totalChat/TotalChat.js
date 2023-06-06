import ChatScreen from "../chatScreen/ChatScreen";
import { useState } from "react";
import React from "react";
import LogoutBtn from "../logoutBtn/LogoutBtn";
import ChatsMenu from "../chatsMenu/ChatsMenu.js";
import { io } from 'socket.io-client';

/**
 * This component manage the total chat screen, creates a chat menu and a chat screen
 * @param {mod,modFun,user,setUserMessages,UserMessages,currentChats,setCurrentChats,numOfChats,setNumOfChats,}
 * @returns
 */
const TotalChat = ({
  mod,
  modFun,
  user,
  setUserMessages,
  UserMessages,
  currentChats,
  setCurrentChats,
  numOfChats,
  setNumOfChats,
  currChat,
  setCurrChat,
  isClicked,
  setIsClicked,
  mySocket,
}) => {
  document.body.style.backgroundImage = 'none';

  mySocket.off('newMsg');
  mySocket.on('newMsg', function (response) {
    console.log(currentChats[currChat].id);
    console.log("A new message!");
    if (currentChats[currChat].id === response.chat.id && isClicked) {
      console.log("1");
      console.log(UserMessages);
      setUserMessages((prevMsgs) => {
        let tempMsgs = [...prevMsgs];
        tempMsgs.unshift(response.msg);
        return tempMsgs;
      });
      console.log("2");
      console.log(UserMessages);
    }
    console.log("3");
    let tempChats = [...currentChats];
    console.log("4");
    let flag = false;
    console.log("5");
    let updatedChats = tempChats.map((chat) => {
      console.log("6");
      if (chat.id === response.chat.id) {
        console.log("7");
        chat.lastMessage = { id: response.msg.id, created: response.msg.created, content: response.msg.content };
        console.log("8");
        flag = true;
      }
      return chat;
    })
    if (flag) {
      console.log("9");
      setCurrentChats(updatedChats);
      console.log("10");
    } else {
      console.log("11");
      console.log(currentChats);
      setCurrentChats((prevChats) => [...prevChats, response.chat]);
      console.log("12");
      console.log(currentChats);
    }
  });

  mySocket.off('updateChat');
  mySocket.on('updateChat', function (response) {
    console.log("in updateChat");
    if (currentChats[currChat].id === response.chatId && isClicked) {
      setUserMessages(response.messages);
    }
    setCurrentChats(response.chats);
  })


  const [currChatUserName, setCurrChatUserName] = useState("chat screen");
  if (mod.mod === 1) {
    document.body.style.backgroundColor = "black";
  } else {
    document.body.style.backgroundColor = "#F3E8FF";
  }

  /**
   * This function handle the change of screen mode - light or dark and changes the css file accordingly
   */
  function handleOnChange() {
    if (mod.mod === 0) {
      document.body.style.backgroundColor = "black";
    } else {
      document.body.style.backgroundColor = "#F3E8FF";
    }
    modFun(mod.mod === 0 ? { mod: 1 } : { mod: 0 });
    updateCssLink();
  }

  /**
   * This function update the css link of this document according to the screen mode(light or dark)
   */
  function updateCssLink() {
    const link = document.getElementById("cssLink");
    if (mod.mod) {
      link.href = "./index.css";
    } else {
      link.href = "./chats_dark_mode.css";
    }
  }
  return (
    <>
      <LogoutBtn />
      <div className="container" id="main-container">
        <div className="row border-fourth-color" id="mainRow">
          <ChatsMenu
            user={user}
            setUserMessages={setUserMessages}
            myMessages={UserMessages}
            setCurrChat={setCurrChat}
            currChat={currChat}
            setChatsHeader={setCurrChatUserName}
            handleOnChange={handleOnChange}
            setNumOfChats={setNumOfChats}
            numOfChats={numOfChats}
            setCurrentChats={setCurrentChats}
            currentChats={currentChats}
            mod={mod}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
          <ChatScreen
            user={user}
            setUserMessages={setUserMessages}
            messages={UserMessages}
            userKey={currChat}
            numOfChats={numOfChats}
            chatHeader={currChatUserName}
            currentChats={currentChats}
            setCurrentChats={setCurrentChats}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            mySocket={mySocket}
          />
        </div>
      </div>
    </>
  );
};

export default TotalChat;
