import React from 'react';
import { getPlanner } from '../../autho/Repository';
import ToggleReminder from '../inputs/ToggleReminder';
import {  TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import add from '../../img/icons/add.svg';
import remove from '../../img/icons/remove.svg';


export default class Planner extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myPlanner: []
        }
        this.handleToggle = this.handleToggle.bind(this)
        this.expandPanel = this.expandPanel.bind(this);
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
    handleToggle() {
        console.log('hi')
        getPlanner() 
        .then(res => (
            this.setState({myPlanner: res})
        ))
        .catch(err => (
            console.log(err)
        ))
    }
    expandPanel(x, e) {
        let panel = document.getElementById(x)
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null
            e.target.src = add
        } else {
            panel.style.maxHeight = panel.scrollHeight + '50px'
            e.target.src = remove
            }
        }
    render() {
        const myPlanner = this.state.myPlanner;
        let date = String(this.props.date)
        return (
            <div className="content-main">
                <Grid 
                    container 
                    item 
                    spacing={2}
                    justify='space-between'
                >
                {myPlanner.filter(plans => plans.created > this.props.date ).map((plans) => (
                    <Grid 
                        container
                        lg={12}
                        item
                        key={plans.id}
                        >
                        <div 
                            key={plans.id}
                            className="my-plans-container"
                            >
                            <div className="my-plans-main" >
                                <h3>{plans.title}</h3>
                                <img src={ add } className="add" alt="plus-minus" onClick={(e) => {this.expandPanel(`panel-${plans.id}`, e)}} />
                                
                            </div>
                            <div className="my-plans-content">
                            <p>{plans.content}</p>
                            </div>
                            
                            <div className="closed" id={`panel-${plans.id}`}>
                                <div
                                    className="plans-reminder">
                                    <div className="my-plans-toggle">
                                        <ToggleReminder
                                            isChecked={plans.reminder === 1 ? true: false}
                                            toggleid={plans.id}
                                            checked={this.props.checked}
                                            refreshState={this.handleToggle}
                                            name="set a reminder?"
                                            />
                                    
                                    <br />
                                    {plans.reminder === 1 ? 
                                    <TextField
                                        id="datetime-local"
                                        label="reminder time"
                                        name="reminder_time"
                                        type="datetime-local"
                                        defaultValue={plans.reminder === 1 ? `${plans.reminder_time.split('.000Z')[0]}` : '2020-09-24T10:30' }
                                        onChange={this.handleInputChange}
                                    /> : 
                                    'no reminder set'
                                    }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                ))}
                </Grid>
                <br/>
                <br/>
            </div>
        )
    }
}