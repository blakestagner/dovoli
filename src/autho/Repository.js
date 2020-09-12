import { getDisplayDate } from '@material-ui/pickers/_helpers/text-field-helper';
import axios from 'axios';
const BASE_URL = 'http://73.109.125.191:3010';
//const BASE_URL = 'http://localhost:3010';


export function login (data) {
    const lgnMsg = document.getElementById('loginMessage')
    return axios.post(`${BASE_URL}/api/login`, { 
        email: data.email, 
        password: data.password 
    })
    .then(response => {
        localStorage.setItem('x-access-token', response.data.token);
        localStorage.setItem('x-access-token-expiration', Date.now() + 2 * 60 * 60 * 1000);
        return response.data
    })
    .catch((err) => Promise.reject(
        lgnMsg.innerHTML = err.response.data
    ));
}

export function register (data) {
    const regMsg = document.getElementById('registrationMessage')
    return axios.post(`${BASE_URL}/api/register`, {
        fname: data.fname, 
        lname: data.lname, 
        email: data.email, 
        password: data.password
    })
    .then((res) => {
        regMsg.innerHTML = res.data
    })
    .catch((err) => {
        regMsg.innerHTML = err.response.data
    })
}
export function isAuthenticated() {
    return localStorage.getItem('x-access-token') 
    && localStorage.getItem('x-access-token-expiration') > Date.now()
}
export function getUserInfo() {
    return axios.get(`${BASE_URL}/user/data`, { 
        params: { 'x-access-token': localStorage.getItem('x-access-token')} 
       })
       .then(res => res.data)
       .catch(err => Promise.reject('Request Not Authenticated!'));
    }
export function postPlanner(data) {
    return axios.post(`${BASE_URL}/post/planner`, {
            'x-access-token': localStorage.getItem('x-access-token'),
            'title': data.title,
            'content': data.content,
            'hashtag': data.hashtag,
            'reminder': data.checked,
            'reminder_time': data.reminder_time,
            'type': data.type,} 
        )
        .then(res => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
    }
export function getPlanner() {
    return axios.get(`${BASE_URL}/api/getPlanner`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
    }
export function updateReminder(data) {
    return axios.post(`${BASE_URL}/api/plannerReminder`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        'reminder': data.checked,
        'id': data.toggleid
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
    }
//Notes
export function postNote(data) {
    return axios.post(`${BASE_URL}/post/Notes`, {
            'x-access-token': localStorage.getItem('x-access-token'),
            'title': data.title,
            'content': data.content,
            'hashtag': data.hashtag,
            'reminder': data.checked,
            'reminder_time': data.reminder_time,
            'type': data.type,
            'color': data.color} 
        )
        .then(res => res.data)
        .catch(err => Promise.reject('Request Not Authenticated!'));
    }
export function getNotes() {
    return axios.get(`${BASE_URL}/api/getNotes`, {
        params: { 'x-access-token': localStorage.getItem('x-access-token')} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
    }
export function updateNotesReminder(data) {
    return axios.post(`${BASE_URL}/api/notesReminder`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        'reminder': data.checked,
        'id': data.toggleid
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
    }
export function updateNotesReminder2(data) {
    return axios.post(`${BASE_URL}/api/notesReminder`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        'reminder': data.reminderStatus,
        'id': data.notificationid
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
    }
export function deleteNote(data) {
    return axios.delete(`${BASE_URL}/api/notesDelete`, {
        data: {'x-access-token': localStorage.getItem('x-access-token'), 'id': data} 
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
    }
export function updateNoteColor(x, y) {
    return axios.post(`${BASE_URL}/api/updateNoteColor`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        'color': x,
        'id': y
    })
    .then(res => res.data)
    .catch(err => Promise.reject('Request Not Authenticated!'));
    }

//Campign Calls Made
export function getOutreachCalls() {
    return axios.get(`${BASE_URL}/api/getOutreachCalls`, {
        params: {'x-access-token': localStorage.getItem('x-access-token')}
    })
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}

//Campaign Information
export function getCampaignDetails() {
    return axios.get(`${BASE_URL}/api/getCampaignDetails`, {
        params: {'x-access-token': localStorage.getItem('x-access-token')}
    })
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
//post volunteer calls
export function postOutreachCalls(data) {
    return axios.post(`${BASE_URL}/api/postOutreachCalls`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        'date': data.date,
        'called': data.called,
        'answered': data.answered
        }
    )
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
//post candidate calls
export function postCandidateCalls(data) {
    return axios.post(`${BASE_URL}/api/postCandidateCalls`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        'type': data.type,
        'name': data.name,
        'number': data.number,
        'email': data.email,
        'notes': data.notes
        }
    )
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
//Get Candidate Call List
export function getCandidateCallList() {
    return axios.get(`${BASE_URL}/api/getCandidateCallList`, {
        params: {'x-access-token': localStorage.getItem('x-access-token')}
    })
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
//update contacted status
export function updateContacted(x, y) {
    console.log(x, y)
    return axios.post(`${BASE_URL}/api/updateContacted`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        'id': x,
        'contacted': y
    })
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
export function getCampaignStaff() {    
    return axios.get(`${BASE_URL}/api/getCampaignStaff`, {
        params: {'x-access-token': localStorage.getItem('x-access-token')}
    })
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
export function getTodo() {    
    return axios.get(`${BASE_URL}/api/getTodo`, {
        params: {'x-access-token': localStorage.getItem('x-access-token')}
    })
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}
export function updateTodoCompleted(x, y, z) {
    return axios.post(`${BASE_URL}/api/updateTodoCompleted`, {
        'x-access-token': localStorage.getItem('x-access-token'),
        'id': x,
        'contacted': y,
        'completed_time': z
    })
    .then(res => res.data)
    .catch(err => Promise.reject(err))
}