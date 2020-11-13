//action creator - a function that returns an object (which we call ACTION)

import axios from "./axios";

export async function receiveFriends() {
    (async () => {
        try {
            let { data } = await axios.get(`/api/getFriends`);
            console.log("{data in receiveFriends() action axios", data.rows);
            if (data.success) {
                return {
                    type: "RECEIVE_FRIENDS",
                    friends: data.rows,
                };
            }
        } catch (err) {
            console.log("err in in Friends useEffect() axios", err);
        }
    })();
}
