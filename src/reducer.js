export default function (state = {}, action) {
    // here we will be updating the new state (state{} sets state to empty obj first time we call reducer)
    // action:

    if (action.type == "RECEIVE_FRIENDS") {
        state = Object.assign({}, state, {
            friendsList: action.friends,
            // friendRequests: action.friendRequests,
        });
        // console.log("state in IF reducer", state);
        // console.log("state in else reducer", state);
    }

    // ACCEPT_FRIEND_REQUEST -
    //clones the global state.
    // The clone should have ALL the properties of the old state but one of the objects inside the friendsWannabes array should have their accepted property set to true.
    // Do it immutably - use MAP method

    // START WORK FROM HERE
    if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            friendsList: state.friendsList.map((user) => {
                if (user.id == action.id) {
                    console.log("IF state ACCEPT", state);
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
            // console.log("IF state ACCEPT", state);
        };
    }

    if (action.type == "REMOVE_FRIEND") {
        state = {
            ...state,
            friendsList: state.friendsList.filter((user) => {
                if (user.id == action.id) {
                    // console.log("IF state ACCEPT", state);
                    return;
                } else {
                    return user;
                }
            }),
            // console.log("IF state ACCEPT", state);
        };
    }

    console.log("OUTSIDE IF state ACCEPT", state);

    return state;
}
