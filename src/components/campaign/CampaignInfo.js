import React, {useEffect, useState} from 'react';
import { getCampaignDetails, 
        getOutreachCalls, 
        getCandidateCallList,
        updateContacted,
        getCampaignStaff,
        getTodo,
        updateTodoCompleted } from '../../autho/Repository';
import campaign from './campaign.css'
import office from '../../img/icons/office-black.svg';
import location from '../../img/icons/location.svg';
import { Grid } from '@material-ui/core';
import phoneCalled from '../../img/icons/phone_forwarded-white.svg';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import phone from '../../img/icons/phone.svg';
import email from '../../img/icons/email_black.svg';
import note from '../../img/icons/note.svg';
import Avatar from '../loggedinUser/Avatar'


export function CampaignInfo() {
    const [campaign, setCampaign] = useState([])
    useEffect(() => {
        getCampaignDetails()
            .then(res => setCampaign(res))
            .catch(err => console.log(err))
        }, []
    )
    return (
        <Grid container item xs={12}>
            <Grid item xs={12} md={12} lg={12}>
            {campaign.map(campaign => (
                <div className="card" key={campaign.id}>
                    <div className="cardHeader">
                        {campaign.party === 'D' ? <Dem /> : <Rep />}
                        <div className="profileName">{campaign.name}</div>
                    </div>
                    <div className="cardMain">
                        <div className="card-row">   
                            <img className="campaign-icons" src={office} alt="location" />                        
                            <div className="icon-text-center">
                                {campaign.race}
                            </div>
                        </div> 
                        <div className="card-row">   
                            <img className="campaign-icons" src={location} alt="location" />                        
                            <div className="icon-text-center">
                                {campaign.zipcode} {campaign.state}
                            </div>
                        </div> 
                    </div>
                </div>
            ))}
            </Grid>
        </Grid>
    )
}

export function CampaignStaff() {
    const [staff, setStaff] = useState([])

    useEffect(() => {
        getCampaignStaff()
            .then(res => setStaff(res))
            .catch(err => console.log(err))
        }, []
    )
    return (
        <div>
            <h1>Campaign Staff</h1>
            {staff.map(staff => (
                <div key={staff.id}>
                    <div className="cardMain">
                        <div className="card-row">
                        <Avatar
                            hasProfileImg={staff.profile_pic} 
                            userData={
                                staff.id+
                                staff.fname+
                                staff.lname
                            }
                            />
                            <div className="staff-details">
                                <p>{staff.fname} {staff.lname}</p>
                                <p style={{color: '#444'}}>{staff.position}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export const CampaignCallsMade = React.forwardRef((props, ref) => {
    const [callsMade, setCallsMade] = useState([])
    const callsListRef = React.useRef()

    useEffect(() => {
        getOutreachCalls()
            .then(res => setCallsMade(res))
            .catch(err => console.log(err))
        }, []
    )
    
    const TotalCalls = () => {
        let totalCalls = 0;
        let callsReached = 0;
        for (let i = 0; i < callsMade.length; i++) {
            totalCalls += callsMade[i].calls_made
            callsReached += callsMade[i].calls_reached
        }
        return <div className="row campaign-text">
                    <p>called: {totalCalls}</p>
                    <p>answered: {callsReached}</p>
                </div>
    }
    const CallsLastWeek = () => {
        let totalCalls = 0;
        let callsReached = 0;
        var d = new Date();
        d.setDate(d.getDate() - 7)
        var month = d.toLocaleString().split('/')[0]
        var day = d.toLocaleString().split('/')[1]
        var lastWeek = `${d.toLocaleString().split('/')[2].split(',')[0]}-${month < 10 ? `0${month}` : month }-${day < 10 ? `0${day}` : day} `
        for (let i = 0; i < callsMade.length; i++) {
            if(callsMade[i].date.split('T')[0] >= Object(lastWeek)) {
                totalCalls += callsMade[i].calls_made
                callsReached += callsMade[i].calls_reached
            }
        }
    return <div className="row campaign-text">
                <p>called: {totalCalls}</p>
                <p>answered: {callsReached}</p>
            </div>
    }
    React.useImperativeHandle(ref, () => ({
        updateState(){
            getOutreachCalls()
                .then(res => setCallsMade(res))
                .then(() => callsListRef.current.updateState())

                .catch(err => console.log(err))
            }
        } 
    ));
    return (

        <div>
            <h1>Volunteer Calls Made</h1>
            <Grid container item xs={12}>
                <Grid item xs={12} md={6} >
                <div className="card">
                    <div className="cardHeader">
                        <img src={phoneCalled} className="card-header-icon" alt="phone called"/>
                        <div className="call-header">Total</div>
                    </div>
                    <div className="card-main">
                        { TotalCalls() }
                    </div>
                </div>
                </Grid>
                <Grid item xs={12} md={6}>
                <div className="card">
                    <div className="cardHeader">
                        <img src={phoneCalled} className="card-header-icon" alt="phone called"/>
                        <div className="call-header">Past Week</div>
                    </div>
                    <div className="card-main">
                        { CallsLastWeek() }
                    </div>
                </div>
                </Grid>
            </Grid>
            <hr className="hr" />
            <CallsMadeList ref={callsListRef} />
            <hr className="hr" />
            <CandidateCallList />
        </div>
        
    )
  });

export const CallsMadeList = React.forwardRef((props, ref) => {
    const [callsMade, setCallsMade] = useState([])
    const [load, loadMore] = useState(4)
    const [sortList, setSortList] = useState({
        sort: 'all'
    })

    useEffect(() => {
        getOutreachCalls()
            .then(res => setCallsMade(res.reverse()))
            .catch(err => console.log(err))
        }, []
    )
    const handleChange = (event) => {
        const name = event.target.name;
        setSortList({
          ...sortList,
          [name]: event.target.value
        })
      };
    const CallsLastWeek = () => {
        var d = new Date();
        d.setDate(d.getDate() - 7)
        var month = d.toLocaleString().split('/')[0]
        var day = d.toLocaleString().split('/')[1]
        var lastWeek = `${d.toLocaleString().split('/')[2].split(',')[0]}-${month < 10 ? `0${month}` : month }-${day < 10 ? `0${day}` : day} `
        return lastWeek
    }
    const getMonthName = (e) => {
        switch(e) {
            case '01':
                return 'Jan';
            case '02':
                return 'Feb';
            case '03':
                return 'Mar';
            case '04':
                return 'Apr';
            case '05':
                return 'May';
            case '06':
                return 'Jun';
            case '07':
                return 'Jul';
            case '08':
                return 'Aug';
            case '09':
                return 'Sept';
            case '10':
                return 'Oct';
            case '11':
                return 'Nov';
            case '12':
                return 'Dec';
            default:  
                return 'Null';
        }
    }    
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
        }));

    const classes = useStyles();

    React.useImperativeHandle(ref, () => ({
        updateState(){
            getOutreachCalls()
                .then(res => setCallsMade(res.reverse()))
                .catch(err => console.log(err))
            }
        } 
    ));
    return (
        <div>
            <h1>Volunteer Calls List</h1>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">List</InputLabel>
                <Select
                native
                value={sortList.sort}
                onChange={handleChange}
                inputProps={{
                    name: 'sort'
                  }}
                >
                <option aria-label="None" value="" />
                <option value={'all'}>All</option>
                <option value={'last Week'}>Last Week</option>
                </Select>
            </FormControl>
            {sortList.sort === 'all' ? 
                <Grid container item xs={12}>
                {callsMade.reverse().slice(0, load).map(calls => (
                    <Grid item xs={12} md={6} lg={3} key={calls.id}>
                        <div key={calls.id} className="card">
                            <div className="card-date">
                                {`${getMonthName(calls.date.split('-')[1])}-${calls.date.split('-')[2].split('T')[0]}-${calls.date.split('-')[0]}`}
                            </div>
                            <div className="card-main">
                                <div className="row campaign-text">
                                    <p>called: {calls.calls_made}</p>
                                    <p>answered: {calls.calls_reached}</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                ))}
                <div>
                    {callsMade.length > load ? 
                        <button 
                            type="button" 
                            className="load-btn" 
                            onClick={() => loadMore(load + 4)}> 
                            Load More 
                        </button>
                    : '' }
                </div>
                </Grid> 
                : 
                <Grid container item xs={12}>
                {callsMade.filter(calls => calls.date > CallsLastWeek()).map(calls => (
                    <Grid item xs={12} md={6} lg={3} key={calls.id}>
                        <div key={calls.id} className="card">
                            <div className="card-date">
                            {`${getMonthName(calls.date.split('-')[1])}-${calls.date.split('-')[2].split('T')[0]}-${calls.date.split('-')[0]}`}
                            </div>
                            <div className="card-main">
                                <div className="row campaign-text">
                                    <p>called: {calls.calls_made}</p>
                                    <p>answered: {calls.calls_reached}</p>
                                </div>
                            </div>
                        </div>
                    </Grid>
                ))}
                </Grid>
                }
        </div>
    )
})


export function Dem() {
    return (
        <div className="dem">
            D
        </div>
    )
}
export function Rep() {
    return (
        <div className="rep">
            <p className="rep-letter">R</p>
        </div>
    )
}
export function CandidateCallList() {
    const [callList, setCallList] = useState([])
    const [sortList, setSortList] = useState({
        sort: 0,
        type: 'doner',
    })
    useEffect(() => {
        getCandidateCallList()
            .then(res => setCallList(res.reverse()))
            .catch(err => console.log(err))
        }, []
    )
    const updateState = () => {
        getCandidateCallList()
            .then(res => setCallList(res.reverse()))
            .catch(err => console.log(err))
    }
    const handleChange = (event) => {
        const name = event.target.name;
        setSortList({
          ...sortList,
          [name]: event.target.value
        })
      };
    const changeContactStatus = (id, contacted) => {
        (contacted != 1 ? contacted = 1 : contacted = 0)
        updateContacted(id, contacted)
            .then(updateState)
            .catch(err => console.log(err))
    }
    const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    root: {
        width: "100%"
        },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
        textAlign: 'left'
        },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        },
    }));
    const classes = useStyles();
    return (
        <div>
            <h1>Candidate Will Call List</h1>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">contact status</InputLabel>
                <Select
                    native
                    value={sortList.sort}
                    onChange={handleChange}
                    inputProps={{
                        name: 'sort'
                    }}
                >
                    <option value={0}>not contacted</option>
                    <option value={1}>contacted</option>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">type</InputLabel>
                <Select
                    native
                    value={sortList.type}
                    onChange={handleChange}
                    inputProps={{
                        name: 'type'
                    }}
                >
                    <option value={'doner'}>doner</option>
                    <option value={'voter follow up'}>follow up</option>
                    <option value={'yard sign'}>yard sign</option>
                </Select>
            </FormControl>
            
            <div className={classes.root}>
                {callList.filter(calls => calls.contacted == sortList.sort && calls.type === sortList.type ).map(calls => (
                    <Accordion key={calls.id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={calls.id}
                            id={calls.id}
                            >
                            <Typography className={classes.heading}>{calls.name}</Typography>
                            <Typography className={classes.secondaryHeading}>{calls.type}</Typography>
                        </AccordionSummary>
                        
                        <AccordionDetails>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="cardMain">
                                <div className="card-row">   
                                    <img className="campaign-icons" src={phone} alt="phone" />                        
                                    <div className="icon-text-center">
                                        {calls.number}
                                    </div>
                                </div> 
                                <div className="card-row">   
                                    <img className="campaign-icons" src={email} alt="phone" />                        
                                    <div className="icon-text-center">
                                        {calls.email}
                                    </div>
                                </div> 
                                <div className="card-row">   
                                    <img className="campaign-icons" src={note} alt="phone" />                        
                                    <div className="icon-text-center">
                                        {calls.notes}
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="cardMain">
                            <button 
                                type="button" 
                                className="load-btn" 
                                onClick={() => changeContactStatus(calls.id, calls.contacted)}> 
                                contacted 
                            </button>
                            </div>
                        </div>
                        </AccordionDetails>
                    </Accordion>
                   
                ))}
                {callList.filter(calls => calls.contacted == sortList.sort && calls.type === sortList.type) != 0 ?
                '' : 'there is no one to reach out to with the selected parameters' }
            </div>
        </div>
    )
}


export const CandidateTodo = React.forwardRef((props, ref) => {
    const [todoList, setTodoList] = React.useState([])
    const [sortTodo, setSortTodo] = React.useState({
        completed: 0
    })

    React.useImperativeHandle(ref, () => ({
        updateState(){
            getTodo()
                .then(res => setTodoList(res))
                .catch(err => console.log(err))
            }
        } 
    ));
    
    useEffect(() => {
        getTodo()
            .then(res => setTodoList(res.reverse()))
            .catch(err => console.log(err))
        }, []
    )

    const handleChange = (event) => {
        const name = event.target.name;
        setSortTodo({
          ...sortTodo,
          [name]: event.target.value
        })
      };
    const updateState = () => {
        getTodo()
        .then(res => setTodoList(res))
        .catch(err => console.log(err))
    }
    const updateTodoList = (id, completed) => {
        (completed != 1 ? completed = 1 : completed = 0)
        const date = new Date()
        console.log(date)
        updateTodoCompleted(id, completed, date) 
            .then(updateState)
            .catch(err => console.log(err))
    }
    const getMonthName = (e) => {
        switch(e) {
            case '01':
                return 'Jan';
            case '02':
                return 'Feb';
            case '03':
                return 'Mar';
            case '04':
                return 'Apr';
            case '05':
                return 'May';
            case '06':
                return 'Jun';
            case '07':
                return 'Jul';
            case '08':
                return 'Aug';
            case '09':
                return 'Sept';
            case '10':
                return 'Oct';
            case '11':
                return 'Nov';
            case '12':
                return 'Dec';
            default:  
                return 'Null';
        }
    }
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
        root: {
            width: "100%"
            },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
            textAlign: 'left'
            },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
            },
        }));
        const classes = useStyles();
    return (
        <div>
            <h1>Candidate to do List</h1>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">completed</InputLabel>
                <Select
                    native
                    value={sortTodo.type}
                    onChange={handleChange}
                    inputProps={{
                        name: 'completed'
                    }}
                >
                    <option value={0}>incomplete</option>
                    <option value={1}>completed</option>
                </Select>
            </FormControl>
            <div className={classes.root}>
            {todoList.filter(todo => todo.completed == sortTodo.completed).map(todo => (
            <Accordion key={todo.id + 875}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={todo.id}
                    id={todo.id}
                    >
                    <Typography className={classes.heading}>{todo.title}</Typography>
                    <Typography className={classes.secondaryHeading}>
                        {`${getMonthName(todo.created.split('-')[1])}-${todo.created.split('-')[2].split('T')[0]}-${todo.created.split('-')[0]}`}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="cardMain">
                        <div className="card-row"> 
                            {todo.content}
                        </div>
                    </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="cardMain">
                    <button 
                        type="button" 
                        className="load-btn"
                        onClick={() => updateTodoList(todo.id, todo.completed)} 
                        > 
                        contacted 
                    </button>
                    </div>
                </div>
                </AccordionDetails>
            </Accordion>
            ))}
            </div>
        </div>
    )
})


export function ElectionCountdown() {
    const countDownDate = new Date("Nov 3, 2020 00:00:00").getTime();
    const x = setInterval(function() {
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        if(document.getElementById('countdown') !== null || undefined) {
            const countdown = document.getElementById('countdown')
            countdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`
            if (distance < 0) {
                clearInterval(x);
                let countdown = "Election Day!";
            } else;
        }
    }, 1000);
    return (
        <div>
            <h2>Election Countdown</h2>
            <div id="countdown"></div>
        </div>
    )
}
