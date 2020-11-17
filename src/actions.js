import axios from "./axios";

export async function getChatHistory(history) {
    // console.log("getChatHistory payload received from socket.js", history);
    return {
        type: "GET_HISTORY",
        chatMessages: history,
    };
}
export async function addNewMessage(newMsg) {
    // console.log("addNewMessage payload received from socket.js", newMsg);
    return {
        type: "ADD_MESSAGE",
        message: newMsg,
    };
}

export async function receiveFriends() {
    try {
        let { data } = await axios.get(`/api/getFriends`);
        // console.log("{data in receiveFriends() action axios", data);
        return {
            type: "RECEIVE_FRIENDS",
            friends: data.rows,
            receivedRequests: data.receivedRequests,
            sentRequests: data.sentRequests,
        };
    } catch (err) {
        console.log("err in receiveFriends() action axios", err);
    }
}

// return an object with a type property and the id of the user whose friendship was accepted.
export async function acceptFriend(otherId) {
    // console.log("acceptFriend dispatch clicked for user id: ", otherId);
    let buttonText = "Accept Friend Request";
    try {
        let { data } = await axios.post(`/api/friendStatus/button`, {
            buttonText,
            otherId,
        });
        // console.log("{data} in acceptFriend() action axios", data);
        return {
            type: "ACCEPT_FRIEND",
            id: data.id,
        };
    } catch (err) {
        console.log("err in acceptFriend() action axios", err);
    }
}

// unfriend - makes a POST request to the server to end the friendship. It should return an object with a type property and the id of the user whose friendship was ended.
export async function removeFriend(otherId) {
    // console.log("removeFriend dispatch clicked for user id: ", otherId);
    let buttonText = "Remove Friend";
    try {
        let { data } = await axios.post(`/api/friendStatus/button`, {
            buttonText,
            otherId,
        });
        return {
            type: "REMOVE_FRIEND",
            id: data.id,
        };
    } catch (err) {
        console.log("err in removeFriend() action axios", err);
    }
}
