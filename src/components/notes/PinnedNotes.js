import React from 'react'
import { getNotes } from '../../autho/Repository'
import ToggleNotesReminder from '../inputs/ToggleNotesReminder'
import {  TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core'
import pinWhite from '../../img/icons/pin_white.svg';
import remove from '../../img/icons/remove.svg';
import planner from '../planner/planner.css'
import reminder from '../../img/icons/reminder.svg'
import reminderWhite from '../../img/icons/reminder_white.svg'
import reminderSet from '../../img/icons/reminder_set.svg'
import reminderSetWhite from '../../img/icons/reminder_set_white.svg'
import ReminderToggle from '../inputs/ReminderToggle'
import ChangeColor from '../inputs/ChangeColor'
import DeletePost from '../inputs/DeletePost'
import colorWhite from '../../img/icons/color_white.svg'
import color from '../../img/icons/color.svg'
import reminderCancel from '../../img/icons/reminder_cancel.svg'

export default class PinnedNotes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            myNotes: [],
            toolId: '',
            selectedTool: ''
        }
        this.handleUpdate = this.handleUpdate.bind(this)
        this.selectedTool = this.selectedTool.bind(this)
    }
    componentDidMount() {
        getNotes() 
        .then(res => (
            this.setState({myNotes: res})
        ))
        .catch(err => (
            console.log(err)
        ))
    }
    selectedTool(x, y) {
        if (this.state.toolId === x && this.state.selectedTool === y) {
            this.setState({toolId: '', selectedTool: ''})
        } else {
            this.setState({toolId: x, selectedTool: y})
        }
    }
    handleUpdate() {
        this.props.updateState()
        
    }
    render() {
        let myNotes = this.props.myNotes;
        let date = String(this.props.date)
        let newDate = new Date()
        let mins = newDate.getMinutes()
        let hour = newDate.getHours()
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        const todaysDate = `${year}-${month < 10 ? `0${month}` : month }-${day < 10 ? `0${day}` : day}T${hour}:${mins < 10 ? `0${mins}` : mins  }:00`
        return (
            <div >
                <Grid 
                    container 
                    item 
                    spacing={2}
                    justify='space-between'
                >
                {myNotes.filter(notes => notes.pinned === this.props.pinned ).map((notes) => (
                    <Grid 
                        container
                        lg={4}
                        item
                        key={notes.id}
                        >
                        <div className="notes">
                            <div 
                                key={notes.id}
                                className="notes-container"
                                style={{backgroundColor: `${notes.color}`}}
                                >
                                <div className="notes-main">
                                    <h3 className={notes.color === 'yellow' ? 'black' : 'white' }>
                                        {notes.title}
                                    </h3>
                                    <img src={ pinWhite } className="pin-icon" alt="plus-minus"
                                     />
                                </div>
                                <div className="notes-content">
                                    <p  className={notes.color === 'yellow' ? 'black' : 'white' }>{notes.content}</p>
                                </div>
                            </div>
                            <div className="notes-tools">
                                <Grid
                                    container 
                                    item 
                                    spacing={2}
                                    justify='space-evenly'>
                                    <div style={{textAlign: 'center'}}>
                                        <img 
                                            className="reminder-icon"
                                            key={notes.id}
                                            src={ notes.reminder === 1? reminderSet : reminder }
                                            alt="reminder"
                                            name="reminder"
                                            onClick={() => this.selectedTool(notes.id, 'reminder')}
                                        />
                                        <p className="reminder-status">
                                            {notes.reminder === 1 ? 'reminder set' : 'no reminder' }
                                        </p>
                                    </div>
                                    <img 
                                        className="reminder-icon"
                                        key={notes.id}
                                        src={ color }
                                        alt="color"
                                        name="color"
                                        onClick={() => this.selectedTool(notes.id, 'color')}
                                    />
                                    <DeletePost 
                                        refreshState={this.handleUpdate}
                                        id={notes.id}/>
                                </Grid>
                                {this.state.toolId === notes.id ? 
                                    <div>
                                        {this.state.selectedTool === 'reminder' ?
                                        <div>
                                        {notes.reminder === 1 ? 
                                            <div className="reminder-select">
                                                <ReminderToggle
                                                    notificationid={notes.id}
                                                    reminderStatus={notes.reminder == 1 ? true: false}
                                                    reminderStatus={notes.reminder} 
                                                    refreshState={this.handleUpdate}
                                                    alt="reminder"
                                                />
                                                <TextField
                                                    id="datetime-local"
                                                    label="reminder time"
                                                    name="reminder_time"
                                                    type="datetime-local"
                                                    defaultValue={notes.reminder_time !== '0000-00-00 00:00:00' ? 
                                                        `${notes.reminder_time.split('.000Z')[0]}` 
                                                        : todaysDate }
                                                    onChange={this.handleInputChange}
                                                /> 
                                            </div>
                                            : 
                                            <div className="reminder-select">
                                                <ReminderToggle
                                                    notificationid={notes.id}
                                                    reminderStatus={notes.reminder == 1 ? true: false}
                                                    reminderStatus={notes.reminder} 
                                                    refreshState={this.handleUpdate}
                                                    alt="reminder"
                                                    />    
                                                <p>add a reminder</p>
                                            </div>
                                            }
                                        </div>
                                        : 
                                        <ChangeColor
                                            currentColor={notes.color}
                                            noteid={notes.id}
                                            refreshState={this.handleUpdate}
                                            />
                                        }
                                    </div>
                                : '' }
                            </div>
                        </div>
                    </Grid>
                ))}
                </Grid>
                
                <br/>
                <br/>
            </div >
        )
    }
}