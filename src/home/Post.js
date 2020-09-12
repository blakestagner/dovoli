import React from 'react'
import home from './home.css';
import {  TextField } from '@material-ui/core';
import { postOutreachCalls, postCandidateCalls } from '../autho/Repository'
import Button from '@material-ui/core/Button';
import Avatar from '../components/loggedinUser/Avatar';
import close from '../img/icons/close.png';
import phoneCallWhite from '../img/icons/phone_callback-white.svg';
import flagWhite from '../img/icons/flag-white.svg';
import phoneCallback from '../img/icons/phone_forwarded-white.svg';
import { Grid } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import todo from '../img/icons/todo.svg';


export default class Post extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            content: '',
            hashtag: '',
            checked: false,
            reminder_time: '',
            openedPost: '',
            open: false
        }
    }
    handleInputChange(event) {
        this.setState({[event.target.name]: event.target.value})
        }
    onChangeReminder = () => {
        this.setState({checked: this.state.checked ? false : true})
    }

    toggleOverlay(e) {
        this.setState({open: this.state.open ? false : true, openedPost: e})
        var app = document.getElementById('overlay')
        if(app.classList == "") {
            app.classList = "overlay"
        } else { 
            app.classList = ""
        }
    }
    render() {
        return (
            <div >
                <div className="planner-set-post">
                    <Grid 
                        container 
                        direction="row"
                        justify="center"
                        alignItems="center">
                        <Grid>
                        <div style={{marginLeft: '-10px', height: '60px'}}>
                            <Avatar
                                hasProfileImg={this.props.userDetails.profile_pic} 
                                userData={
                                    this.props.userDetails.id+
                                    this.props.userDetails.fname+
                                    this.props.userDetails.lname
                                }
                                />
                            </div>
                        </Grid>
                        <Grid>
                        <img
                            alt="phone call"
                            src={todo} 
                            className="post-icon" 
                            onClick={() => this.toggleOverlay('log volunteer calls')}/>
                            <span className="tooltip">candidate to do</span>
                        </Grid>
                        <Grid>
                        <img
                            alt="phone call"
                            src={phoneCallWhite} 
                            className="post-icon" 
                            onClick={() => this.toggleOverlay('log volunteer calls')}/>
                            <span className="tooltip">Log Call to Voter</span>
                        </Grid>
                        <Grid>
                            <img
                                alt="phone call back"
                                src={phoneCallback} 
                                className="post-icon"
                                onClick={() => this.toggleOverlay('log candidate calls')}/>
                                <span className="tooltip">Candidate call back</span>
                        </Grid>
                        <Grid>
                            <img
                                alt="flag"
                                src={flagWhite} 
                                className="post-icon" />
                                <span className="tooltip">Yard Sign</span>
                        </Grid>
                    </Grid>
                    {this.state.openedPost === 'log volunteer calls' ? 
                        <PostVolunteerCalls 
                            updateState={this.props.updateState}
                            toggle={() => this.toggleOverlay('')}/> : ''}
                    {this.state.openedPost === 'log candidate calls' ? 
                        <PostCandidateCalls 
                            updateState={this.props.updateState}
                            toggle={() => this.toggleOverlay('')}/> : ''}
                </div>
            </div>
        )
    }
}
export const PostVolunteerCalls = (props) => {
    const [postVolCall, setVolCall] = React.useState({
        date: '2020-09-01',
        called: '',
        answered: ''
    });
    const handleChange = (event) => {
      setVolCall({...postVolCall, [event.target.name]: event.target.value});
    };
    const submitCalls = () => {
        console.log(postVolCall)
        postOutreachCalls(postVolCall)
        .then(res => {
            props.updateState()
            props.toggle()
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div className="post-open">
            <div className="planner-inner">
                <img
                    alt="toggle close"
                    onClick={props.toggle}
                    src={close} 
                    className="close-icon" 
                    /><h1>Log Volunteer Calls</h1>    
                <div className="row align-left space-under">
                    <Grid container item xs={12} spacing={5}>
                        <Grid item>
                            <TextField 
                                id="called" 
                                label="# people called?" 
                                name="called"
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item>
                            <TextField 
                                id="answered" 
                                label="# People Answered?" 
                                name="answered"
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="date"
                                label="when?"
                                name="date"
                                type="date"
                                defaultValue="2020-09-10"
                                onChange={handleChange}
                                InputLabelProps={{
                                shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
                <div className="row align-left space-under">
                    <Grid container item xs={12} spacing={5}>
                        <Grid item>
                            <Button 
                                variant="contained"
                                color="primary"
                                size="medium"
                                onClick={ submitCalls }
                                >
                                post calls
                            </Button>
                        </Grid>
                    </Grid>
                    
                </div>
            </div>      
        </div>
    )
}
export const PostCandidateCalls = (props) => {
    const [candidateCalls, setCandidateCalls] = React.useState({
        type: '',
        name: '',
        number: '',
        email: '',
        notes: ''
    });
    const handleChange = (event) => {
        setCandidateCalls({...candidateCalls, [event.target.name]: event.target.value});
    };
    const submitCalls = () => {
        console.log(candidateCalls)
        postCandidateCalls(candidateCalls)
        .then(res => {
            props.updateState()
            props.toggle()
        })
        .catch(err => {
            console.log(err)
        })
    }
    const useStyles = makeStyles((theme) => ({
        formControl: {
            
            minWidth: 120,
        },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));
    const classes = useStyles();
    return (
        <div className="post-open">
            <div className="planner-inner">
                <img
                    alt="toggle"
                    onClick={props.toggle}
                    src={close} 
                    className="close-icon" 
                    /><h1>Log Volunteer Calls</h1>    
                <div className="row align-left space-under">
                    <Grid container item xs={12} spacing={5}>
                        <Grid item>
                            <TextField 
                                id="name" 
                                label="# Persons Name" 
                                name="name"
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item>
                            <TextField 
                                id="number" 
                                label="Persons #" 
                                name="number"
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item>
                            <TextField 
                                id="email" 
                                label="email" 
                                name="email"
                                onChange={handleChange}
                                />
                        </Grid>
                        <Grid item>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="age-native-simple">List</InputLabel>
                                <Select
                                    native
                                    name="type"
                                    value={candidateCalls.type}
                                    onChange={handleChange}
                                    inputProps={{
                                        type: 'sort'
                                    }}
                                    >
                                    <option aria-label="None" value="" />
                                    <option value={'doner'}>doner</option>
                                    <option value={'voter follow up'}>folllow up</option>
                                    <option value={'yard sign'}>yard sign</option>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
                <div className="row space-under">
                    <TextField
                        id="outlined-multiline-static"
                        label="notes"
                        name="notes"
                        multiline
                        rows={5}
                        fullWidth
                        defaultValue=""
                        variant="outlined"
                        onChange={handleChange}
                        />
                </div>
                <div className="row space-under">
                    <Grid container item xs={12} spacing={5}>
                        <Grid item>
                            <Button 
                                variant="contained"
                                color="primary"
                                size="medium"
                                onClick={ submitCalls }
                                >
                                post calls
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </div>      
        </div>
    )
}