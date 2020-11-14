export default function (state = {}, action) {
    // here we will be updating the new state (state{} sets state to empty obj first time we call reducer)
    // action:

    if (action.type == "RECEIVE_FRIENDS") {
        state = Object.assign({}, state, {
            friendsList: action.friends,
        });
        console.log("state in IF reducer", state);
    } else {
        console.log("state in else reducer", state);
    }

    return state;
}
