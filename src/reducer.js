export default function (state = {}, action) {
    // if (action.type == "RECEIVE_FRIENDS") {
    //     state = Object.assign({}, state, {
    //         friendsList: action.friends,
    //     });
    // }

    if (action.type == "RECEIVE_FRIENDS") {
        state = {
            ...action.friends,
            loggedInUser: action.id,
        };
        // return (friendsWithId = {
        //     ...state.friendsList,
        //     loggedInUser: action.id,
        // });
    }
    // if (action.type == "RECEIVE_FRIENDS") {
    //     state = Object.assign({}, state, {
    //         friendsList: action.friends,
    //         // loggedInUser: action.id,
    //     });
    //     state = {
    //         ...state,
    //         friendsList: state.friendsList.map((user) => {
    //             console.log("IF state ACCEPT", state);
    //             return {
    //                 ...user,
    //                 loggedInUser: action.id,
    //             };
    //             // console.log("state in IF reducer", state);
    //         }),

    //         // console.log("state in else reducer", state);
    //     };
    // }

    // updates state with ACCEPT friend
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

    //updates state with REMOVE friend; REJECT firend request; CANCEL sent request
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
