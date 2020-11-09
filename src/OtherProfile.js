import React from "react";
import axios from "./axios";
import ProfilePic from "./ProfilePic";

export default class OtherProfile extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        // console.log("this.props.match", this.props.match);
        // console.log("this.props.match", this.props.match.params);
        // console.log("this.props.match", this.props.match.params.id);
        axios
            .get(`/api/user/${this.props.match.params.id}`)
            .then(({ data }) => {
                console.log("{data} from user/:id", data);
                if (data.success) {
                    if (this.props.match.params.id == data.userId) {
                        this.props.history.push("/");
                    } else {
                        this.setState({
                            first: data.rows.first,
                            last: data.rows.last,
                            imgUrl: data.rows.url,
                            bio: data.rows.bio,
                        });
                    }
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log("err in axios OtherProfile comp", err);
            });
        //we also want to check if we are attempting to access our own profile - in which case we want to be routed back to "/"... below this is hardcoded using example own ID = 7 ... we will run comparison for :id / {id}
        // if (this.props.match.params.id == 7) {
        //     this.props.history.push("/");
        // }
    }

    render() {
        return (
            <>
                {this.state.error && <h3>this user does not exist</h3>}
                {!this.state.error && (
                    <div id="other-profile-container">
                        <div id="profile">
                            <h3>
                                Other Profile: {this.state.first}{" "}
                                {this.state.last}
                            </h3>
                            <p>Bio: {this.state.bio}</p>

                            <div id="picture-bio-layout">
                                <div id="picture">
                                    <ProfilePic
                                        imgUrl={this.state.imgUrl}
                                        first={this.state.first}
                                        last={this.state.last}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    }
}
