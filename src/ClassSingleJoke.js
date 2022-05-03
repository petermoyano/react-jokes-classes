import React from "react";

class ClassSingleJoke extends React.Component{
    constructor(props){
        super(props);
        this.t = this.props.t
    }
    render(){
        return <h2>Another smaller test {this.t}</h2>
    }
    
}

export default ClassSingleJoke;