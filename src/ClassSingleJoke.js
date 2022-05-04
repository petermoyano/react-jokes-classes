import React from "react";

class ClassSingleJoke extends React.Component{
    constructor(props){
        super(props);
        this.joke = this.props.text;
    }
    
    render(){
        return <div>{this.joke}</div>
    }
    
}

export default ClassSingleJoke;