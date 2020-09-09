import React from 'react';
import {  TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Toggle from '../inputs/Toggle'
import { postNote } from '../../autho/Repository'
import Button from '@material-ui/core/Button';
import Avatar from '../loggedinUser/Avatar'
import close from '../../img/icons/close.png'
import ChooseColor from '../inputs/ChooseColor'



export default class AddNote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            hashtag: '',
            checked: false,
            reminder_time: '',
            type: '',
            color: 'yellow',
            open: false
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.toggleNoteOverlay = this.toggleNoteOverlay.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this)
    }
    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value})
        }
    onChangeReminder = () => {
        this.setState({checked: this.state.checked ? false : true})
    }
    handleColorChange(colorValue) {
        this.setState({color: colorValue})
    }
    toggleNoteOverlay() {
        this.setState({open: this.state.open ? false : true})
        var app = document.getElementById('overlay')
        if(app.classList == "") {
            app.classList = "overlay"
        } else { 
            app.classList = ""
        }
    }
    toggleOverlay2() {
        this.setState({open: this.state.open ? false : true})
    }
    submitPlan(e) {
        e.preventDefault();
        postNote(this.state)
        .then(res => 
            this.toggleNoteOverlay()
        ) 
        .then(() => {
            this.props.updateState()
        })
        .catch(err => 
            alert(err)
        )
    }
    render() {
        return (
            <div >
                {this.state.open ? 
                <div className="planner-open">
                    <div className="planner-inner">
                        <img
                            onClick={this.toggleNoteOverlay}
                            src={close} 
                            className="close-icon" 
                            />
                        <div className="row align-left">
                            <Grid container item xs={12} spacing={5}>
                                <Grid item >
                                    <TextField 
                                        id="standard-basic" 
                                        label="title" 
                                        name="title"
                                        value={this.value}
                                        onChange={this.handleInputChange}
                                        />
                                </Grid>
                                <Grid item>
                                <FormControl component="fieldset" name="type" onChange={this.handleInputChange}>
                                    <FormLabel component="legend">type</FormLabel>
                                        <RadioGroup row aria-label="type" name="type" value={this.value} >
                                            <FormControlLabel value="female" control={<Radio />} label="Plan" />
                                            <FormControlLabel value="male" control={<Radio />} label="Plan 2" />
                                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                                        </RadioGroup>
                                </FormControl>
                                </Grid>    
                            </Grid>
                        </div>
                        <br />
                        <div className="row space-under">
                            <TextField
                                id="outlined-multiline-static"
                                label="plan details"
                                name="content"
                                multiline
                                rows={5}
                                fullWidth
                                defaultValue=""
                                variant="outlined"
                                onChange={this.handleInputChange}
                                />
                        </div>
                        <div className="row align-left space-under">
                        <Grid container item xs={12} spacing={1}>
                            <Grid item>
                                <Toggle
                                    checked={this.props.checked} 
                                    handleChange={this.onChangeReminder}
                                    toggleName='set a reminder?'
                                    />
                                </Grid>
                                {this.state.checked ? 
                                <Grid item >
                                    <TextField
                                        id="datetime-local"
                                        label="reminder time"
                                        name="reminder_time"
                                        type="datetime-local"
                                        defaultValue="2020-09-24T10:30"
                                        onChange={this.handleInputChange}
                                    />
                                </Grid>
                                : ''
                                }
                            </Grid>
                            <ChooseColor 
                                name="color"
                                onChange={this.handleColorChange}
                                color={this.state.color}
                            />
                        </div>
                        <Button 
                            variant="contained"
                            color="primary"
                            size="medium"
                            onClick={ this.submitPlan.bind(this)}
                            >
                            add note
                        </Button>
                    </div> 
                </div>
                : ''}
                <div className="planner-set-post">
                    <Avatar
                        hasProfileImg={this.props.userDetails.profile_pic} 
                        userData={
                            this.props.userDetails.id+
                            this.props.userDetails.fname+
                            this.props.userDetails.lname
                        }
                    />
                    <input 
                    onClick={this.toggleNoteOverlay}
                    className="planner-text-box"
                    defaultValue="add a note..."/>
                </div>
            </div>
        )
    }
}