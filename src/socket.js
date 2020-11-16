import * as io from "socket.io-client";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        //listening for/receiving msgs from server
        // data sent by server is stored in second arg (data)
        socket.on("welcome", (data) => {
            // console.log("data sent from server: ", data);
        });

        //listening for io emit from sever
        socket.on("msgSentWithIoEmit", (data) => {
            // console.log("data received via io from server: ", data);
        });

        //listening for broadcast emit from sever

        socket.on("msgSentWithBroadcastEmit", (data) => {
            console.log("data received via broadcast emit from server: ", data);
        });

        //sending a msg form client to the server
        socket.emit("msgFromClient", [1, 2, 3]);
    }
};
