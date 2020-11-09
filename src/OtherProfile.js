import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                console.log("{data} from user/:id", data);
                if (
                    !data.success ||
                    this.props.match.params.id == data.userId
                ) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        first: data.rows.first,
                        last: data.rows.last,
                        imgUrl: data.rows.url,
                        bio: data.rows.bio,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios OtherProfile comp", err);
            });
    }

    render() {
        return (
            <>
                {this.state.error && (
                    <h3 id="other-profile-container">
                        this user does not exist
                    </h3>
                )}
                {!this.state.error && (
                    <div id="other-profile-container">
                        <div id="other-profile">
                            <h3>
                                Other Profile: {this.state.first}{" "}
                                {this.state.last}
                            </h3>
                            {this.state.bio && <p>Bio: {this.state.bio}</p>}
                        </div>
                        <div id="other-img-container">
                            <img
                                id="other-img"
                                src={this.state.imgUrl || "/default.jpg"}
                            />
                        </div>
                    </div>
                )}
            </>
        );
    }
}
