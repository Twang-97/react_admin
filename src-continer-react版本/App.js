import React, { Component } from 'react'



export default class App extends Component {
    constructor(props) {
        super(props)
        this.selectRef = React.createRef()
    }
    state = {
        count: 0
    }

    add = () => {
        const number = this.selectRef.current.value
        this.setState({ count: this.state.count + number * 1 })
    }

    subtraction = () => {
        const number = this.selectRef.current.value
        this.setState({ count: this.state.count - number * 1 })
    }

    incrementOfAdd = () => {
        const { count } = this.state
        if (count % 2 === 1) {
            const number = this.selectRef.current.value
            this.setState({ count: count + number * 1 })
        }
    }

    incrementAsync = () => {
        setTimeout(() => {
            const number = this.selectRef.current.value
            this.setState({ count: this.state.count + number * 1 })
        }, 1000)
    }


    render() {
        const { count } = this.state
        return (
            <div>
                <h2>click {count} times</h2>
                <select ref={this.selectRef}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.add}>+</button>&nbsp;
                <button onClick={this.subtraction}>-</button>&nbsp;
                <button onClick={this.incrementOfAdd}>increment of add</button>&nbsp;
                <button onClick={this.incrementAsync}>increment async</button>
            </div>
        )
    }
}