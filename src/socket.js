import * as io from "socket.io-client";
import { getChatHistory, addNewMessage } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatHistory", (history) => {
            // console.log("last 10 messages: ", history);
            store.dispatch(getChatHistory(history));
        });

        socket.on("addToHistory", (newMsg) => {
            // console.log("new message to add to chat: ", newMsg);
            store.dispatch(addNewMessage(newMsg));
        });
    }
};

//from encounter notes - part 10
// socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs )));
// socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));

//from encounter notes - socket demo
//listening for/receiving msgs from server
// data sent by server is stored in second arg (data)
// socket.on("welcome", (data) => {
// console.log("data sent from server: ", data);
// });

//listening for io emit from sever
// socket.on("msgSentWithIoEmit", (data) => {
// console.log("data received via io from server: ", data);
// });

//listening for broadcast emit from sever

// socket.on("msgSentWithBroadcastEmit", (data) => {
//     console.log("data received via broadcast emit from server: ", data);
// });

//sending a msg form client to the server
// socket.emit("msgFromClient", [1, 2, 3]);
