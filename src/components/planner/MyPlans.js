import React from 'react';
import { getPlanner } from '../../autho/Repository'
import Planner from '../../components/planner/Planner'

export default class MyPlans extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myPlanner: []
        }
    }
    componentDidMount() {
        getPlanner() 
        .then(res => (
            this.setState({myPlanner: res})
        ))
        .catch(err => (
            console.log(err)
        ))
    }
    render() {
        return (
            <div>
                <h1>My Plans</h1>
                <Planner />
            </div>
        )
    }
}