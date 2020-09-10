import React, {useEffect, useState, useRef} from 'react';
import { getCampaignDetails, getOutreachCalls, getCandidateCallList } from '../../autho/Repository';
import campaign from './campaign.css'
import office from '../../img/icons/office-black.svg';
import location from '../../img/icons/location.svg';
import { Grid } from '@material-ui/core';
import phoneCalled from '../../img/icons/phone_forwarded-white.svg';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';


export function CampaignInfo() {
    const [campaign, setCampaign] = useState([])
    useEffect(() => {
        getCampaignDetails()
            .then(res => setCampaign(res))
            .catch(err => console.log(err))
        }, []
    )
    return (
        <div className="profile">
            {campaign.map(campaign => (
                <div className="card" key={campaign.id}>
                    <div className="cardHeader">
                        {campaign.party === 'D' ? <Dem /> : <Rep />}
                        <div className="profileName">{campaign.name}</div>
                    </div>
                    <div className="cardMain">
                        <div className="card-row">   
                            <img className="campaign-icons" src={office} alt="location" />                        
                            <div className="campaign-text">
                                {campaign.race}
                            </div>
                        </div> 
                        <div className="card-row">   
                            <img className="campaign-icons" src={location} alt="location" />                        
                            <div className="campaign-text">
                                {campaign.zipcode} {campaign.state}
                            </div>
                        </div> 
                    </div>
                </div>
            ))}
        </div>
    )
}

export function CampaignCallsMade() {
    const [callsMade, setCallsMade] = useState([])
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

    return (
        <div>
            <h1>Volunteer Calls Made</h1>
            <Grid container item xs={12}>
                <Grid item xs={12} md={6}>
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
            <CallsMadeList />
            <hr className="hr" />
            <CandidateCallList />
        </div>
    )
}

export function CallsMadeList() {
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
                    <Grid item xs={12} md={6} key={calls.id}>
                        <div key={calls.id} className="card">
                            <div className="card-date">
                                {calls.date.split('T')[0]}
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
                    <Grid item xs={12} md={6} key={calls.id}>
                        <div key={calls.id} className="card">
                            <div className="card-date">
                                {calls.date.split('T')[0]}
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
}


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
        sort: 0
    })

    useEffect(() => {
        getCandidateCallList()
            .then(res => setCallList(res.reverse()))
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
    return (
        <div>
            <h1>Candidate Will Call List</h1>
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
                    <option value={0}>not contacted</option>
                    <option value={1}>contacted</option>
                </Select>
            </FormControl>
            <Grid container item xs={12}>
                <div className="card col-xs-12 col-sm-12 col-md-12 col-lg-12"> 
                    <div className="cardMain">
                    {callList.filter(calls => calls.contacted == sortList.sort ).map(calls => (
                        <Grid item key={calls.id} lg={12}>
                            <div className="row campaign-text">
                                {calls.name} - {calls.number} - {calls.type}
                            </div>
                        </Grid>
                    ))}
                    </div>
                </div>
            </Grid>
        </div>
    )
}



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
