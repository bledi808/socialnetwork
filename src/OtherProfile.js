import React from "react";
import axios from "./axios";
import FriendButton from "./FriendButton";

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
            <div id="profile">
                {/* {this.state.error && (
                    <h3 id="other-profile-container">
                        this user does not exist
                    </h3>
                )} */}
                {!this.state.error && (
                    <div id="picture-bio-layout">
                        <div id="picture-bio-layout">
                            <div id="other-image-container">
                                <img
                                    className="profile-image"
                                    src={this.state.imgUrl || "/default.jpg"}
                                />
                            </div>
                        </div>
                        <div id="bio">
                            <h2 id="bio-name">
                                {this.state.first} {this.state.last}
                            </h2>
                            <div id="bio-bio">
                                {this.state.bio && (
                                    <div id="bio-text">{this.state.bio}</div>
                                )}
                                <div id="bio-buttons-div">
                                    <FriendButton
                                        otherId={this.props.match.params.id}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
