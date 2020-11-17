import * as io from "socket.io-client";
import { getChatHistory, chatMessage } from "./actions"; // add these later

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatHistory", (rows) => {
            console.log("last 2 messages", rows);
            store.dispatch(getChatHistory(rows));
        });

        socket.on("addToHistory", (newMsg) => {
            //this will be a new obj, evenytually we need to dispatch an action to add the obj to redux global state
            console.log("new message to add to chat");
        });

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
    }
};
