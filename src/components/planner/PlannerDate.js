import React from 'react';
import {  TextField } from '@material-ui/core';
import Planner from './Planner';

export default class PlannerDate extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: 'day'
        }
        this.setCategory = this.setCategory.bind(this)
    }
    setCategory(x) {
        this.setState({category: x})
    }
    render() {
        return (
            <div className="plans-date-view">
                <div className="plans-tab-container">
                    <ul>
                        <li 
                            value='day'
                            name='category'
                            onClick={() => this.setCategory('day')}>
                            day view
                        </li>
                        <li
                            value='week'
                            name='category'
                            onClick={() => this.setCategory('week')}>
                            week view
                        </li>
                        <li
                            value='month'
                            name='category'
                            onClick={() => this.setCategory('month')}>
                            month view
                        </li>
                    </ul>
                </div>
                <div >
                    {this.state.category === 'day' ? 
                    <DayView /> : 
                    ''}
                    {this.state.category === 'week' ? 
                    <WeekView /> : 
                    ''}
                    {this.state.category === 'month' ? 
                    <MonthView /> : 
                    ''}
                </div>
            </div>
        )
    }
}
class DayView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let newDate = new Date()
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        const todaysDate = `${year}-${month < 10 ? `0${month}` : month }-${day}`
          
        return (
            <div className="tabs-container">
                <TextField
                    id="date"
                    label="pick a day"
                    type="date"
                    defaultValue={`${todaysDate}`}
                    InputLabelProps={{
                    shrink: true,
                    }}
                /> 
                <br />
                <br />
                <Planner date={`${todaysDate}`}/>
            </div>
        )
    }
}
class WeekView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                Week
            </div>
        )
    }
}
class MonthView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
            <div>
                Month
            </div>
        )
    }
}