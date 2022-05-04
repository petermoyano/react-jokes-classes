import React from "react";
import ClassSingleJoke from "./ClassSingleJoke";
import axios from "axios";
import { flushSync } from "react-dom"

class ClassJokes extends React.Component {
    static defaultProps = {
        jokesToGet: 3
    };

    constructor(props) {
        super(props);
        this.state = { jokes: [] }; // initial state
        this.vote = this.vote.bind(this);
        this.generateNewJokes = this.generateNewJokes.bind(this); //otherwise this will be undefined!

    }
    componentDidMount() {
        if (this.state.jokes.length < this.props.jokesToGet) {
            this.getJokes();
        }
    }
    componentDidUpdate() {
        if (this.state.jokes.length < this.props.jokesToGet) {
            this.getJokes();
        }
    }

    vote(id, delta) {
        flushSync(() =>
            this.setState(st => ({
                jokes: st.jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j)
            })));
    }

    generateNewJokes() {
        this.setState(st => ({ jokes: [] }))
    }

    async getJokes() {
        let j = [...this.state.jokes];
        let seenJokes = new Set();
        try {
            while (j.length < this.props.jokesToGet) {
                let res = await axios.get("https://icanhazdadjoke.com", { headers: { Accept: "application/json" } });
                let { status, ...jokeObj } = res.data;
                if (!seenJokes.has(jokeObj.id)) {
                    seenJokes.add(jokeObj.id);
                    j.push({ ...jokeObj, votes: 0 });
                } else {
                    console.error("duplicate found!");
                }
            }
            this.setState({ jokes: j });
            console.log(this.state.jokes)
        } catch (e) {
            console.log(e);
        }
    }


    render() {
        return <div>
            <button className="JokeList-getmore" onClick={this.generateNewJokes}>
                Get New Class Jokes
            </button>
            <h1>Same thing but with classes</h1>
            {this.state.jokes.map(j => (
                <ClassSingleJoke text={j.joke} key={j.id} votes={j.votes} vote={this.vote} id={j.id} />))}
        </div>
    }
}

export default ClassJokes;