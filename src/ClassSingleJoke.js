import React from "react";

class ClassSingleJoke extends React.Component {
    constructor(props) {
        super(props);
        this.joke = this.props.text;
        this.id = this.props.id;
        this.votes = this.props.votes;

        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
    }

    upVote() { this.props.vote(this.id, +1)}
    downVote() {this.props.vote(this.id, -1)}
    render() {
        return<div className="Joke">
            <div className="Joke-votearea">
                <button onClick={this.upVote}>
                    <i className="fas fa-thumbs-up" />
                </button>

                <button onClick={this.downVote}>
                    <i className="fas fa-thumbs-down" />
                </button>
                {this.props.votes}
                <div className="Joke-text">{this.joke}</div>
            </div>
        </div>
    }

}

export default ClassSingleJoke;