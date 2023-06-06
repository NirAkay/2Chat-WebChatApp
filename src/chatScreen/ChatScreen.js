import MessageInput from "../messageInput/MessageInput";
import MsgListResult from "../msgListResult/MsgListResult";

/**
 * This component acts as the whole right side of the chat - the chat screen
 * @param "user, setUserMessages,messages,userKey,numOfChats,chatHeader,setCurrentChats" param0
 * @returns
 */
function ChatScreen({
  user,
  setUserMessages,
  messages,
  userKey,
  numOfChats,
  chatHeader,
  currentChats,
  setCurrentChats,
  isClicked,
  setIsClicked,
  mySocket
}) {

  let chatId;
  let contactPic;
  //const chatId = currentChats[userKey].id;
  //const contactPic = currentChats[userKey].user.profilePic;

  console.log("number of chats:" + numOfChats)
  if (numOfChats !== 0) {
    chatId = currentChats[userKey].id;
    contactPic = currentChats[userKey].user.profilePic;
  }

  // let chatId;
  // let contactPic;
  // if (numOfChats < userKey) {
  //   if (numOfChats === 0) {
  //     chatId = 0;
  //     contactPic = null;
  //   } else {
  //     chatId = currentChats[0].id;
  //     contactPic = currentChats[0].user.profilePic;
  //   }
  // } else {
  //   chatId = 2;
  //   contactPic = "";
  // }
  async function addMsg(msg) {
    const data = { "msg": msg }
    const addMsgRes = await fetch("http://localhost:5000/api/Chats/" + chatId + "/Messages", {
      method: "post",
      headers: {
        "authorization": "Bearer " + user.tokken, // attach the token
        "Content-Type": "application/json",
      },
      "body": JSON.stringify(data)
    });

    if (addMsgRes.ok) {
      const chatRes = await fetch("http://localhost:5000/api/Chats/" + chatId + "/Messages", {
        method: "get",
        headers: {
          "authorization": "Bearer " + user.tokken, // attach the token
          "Content-Type": "application/json",
        },
      });

      if (chatRes.ok) {
        const chatJson = await chatRes.json();
        setUserMessages(chatJson);

        const getAllChatsRes = await fetch("http://localhost:5000/api/Chats", {
          method: "get",
          headers: {
            "authorization": "Bearer " + user.tokken, // attach the token
            "Content-Type": "application/json",
          },
        });


        if (getAllChatsRes.ok) {
          const allChatsJson = await getAllChatsRes.json();
          console.log(allChatsJson);
          setCurrentChats(allChatsJson);
          mySocket.emit('clientSentMessage', { chatId: chatId, chats: allChatsJson, messages: chatJson });
        }
      }
    }

    // const currMsg = {
    //   className: "liRight",
    //   profile: user.picture,
    //   value: msg,
    //   timeAndDate: currentTimeAndDateString(),
    // };
    // setUserMessages((prevMessages) => {
    //   setCurrentChats((prevChats) => {
    //     const newChats = [...prevChats];
    //     let tempMsg;
    //     if (msg.length > 15) {
    //       tempMsg = msg.slice(0, 15);
    //       tempMsg = tempMsg + "..";
    //     } else {
    //       tempMsg = msg;
    //     }
    //     newChats[userKey] = {
    //       name: prevChats[userKey]?.name,
    //       profile: prevChats[userKey]?.profile,
    //       lastMsg: tempMsg,
    //       timeAndDate: currentTimeAndDateString(),
    //       isActive: prevChats[userKey]?.isActive,
    //     };
    //     return newChats;
    //   });
    //   const newMessages = [...prevMessages]; // Create a copy of the array
    //   newMessages[userKey] = [...prevMessages[userKey], currMsg]; // Modify the copy
    //   return newMessages; // Return the modified copy
    // });
  };

  return (
    <div className="col-8" id="theChat">
      <div className="second-color" id="topChat">
        <div id="chatHeader">{chatHeader}</div>
      </div>
      <MsgListResult user={user} messages={messages} contactPic={contactPic} />
      <MessageInput addMsg={addMsg} numberOfChats={numOfChats} isClicked={isClicked} />
    </div>
  );
}

export default ChatScreen;
