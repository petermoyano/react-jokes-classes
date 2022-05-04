import React from "react";
import ClassSingleJoke from "./ClassSingleJoke";
import axios from "axios";

class ClassJokes extends React.Component {
    static defaultProps = {
        numJokesToGet: 10
    };

    constructor(props) {
        super(props);
        this.state = { jokes: [] }; // initial state
        /* this.generateNewJokes = this.generateNewJokes.bind(this); */ //otherwise this will be undefined!

    }
    componentDidMount() {
        if (this.state.jokes.length < this.props.jokesToGet) {
            console.log("Running getJokes!")
            this.getJokes();
        }
    }
    componentDidUpdate() {
        if (this.state.jokes.length < this.props.jokesToGet) {
            this.getJokes();
        }
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
                    console.log("pushing", jokeObj)
                } else {
                    console.error("duplicate found!");
                }
            }
            this.setState({jokes: j});
            console.log(this.state.jokes)
        } catch (e) {
            console.log(e);
        }
    }
    
render(){
    return <div>
        <h1>Same thing but with classes</h1>
        {this.state.jokes.map(j => (<ClassSingleJoke text={j.joke} key={j.id}/>))}
    </div>
}
}

export default ClassJokes;