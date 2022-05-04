import React from "react";

class ClassSingleJoke extends React.Component {
    constructor(props) {
        super(props);
        this.joke = this.props.text;
        this.votes = this.props.votes;
    }

    render() {
        return<div className="Joke">
            <div className="Joke-votearea">
                <button onClick={this.upVote}>
                    <i className="fas fa-thumbs-up" />
                </button>

                <button onClick={this.downVote}>
                    <i className="fas fa-thumbs-down" />
                </button>
                {this.votes}
                <div className="Joke-text">{this.joke}</div>
            </div>
        </div>
    }

}

export default ClassSingleJoke;