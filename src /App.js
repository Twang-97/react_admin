import React, { Component } from 'react'
import propTypes from 'prop-types'

import { increament, decreament } from './redux/actions'



export default class App extends Component {
    static propTypes = {
        store: propTypes.object.isRequired
    }


    add = () => {
        const number = this.selectRef.current.value
        this.props.store.dispatch(increament(number))
    }

    subtraction = () => {
        const number = this.selectRef.current.value
        this.props.store.dispatch(decreament(number))
    }

    incrementOfAdd = () => {
        const count = this.props.store.getState()
        if (count % 2 === 1) {
            const number = this.selectRef.current.value
            this.props.store.dispatch(increament(number))
        }
    }

    incrementAsync = () => {
        setTimeout(() => {
            const number = this.selectRef.current.value
            this.props.store.dispatch(increament(number))
        }, 1000)
    }


    render() {
        const count = this.props.store.getState()
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