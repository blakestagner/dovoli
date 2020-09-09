import React, { useState, useEffect } from 'react';
import { updateNotesReminder2 } from '../../autho/Repository'
import reminder from '../../img/icons/reminder.svg'
import reminderWhite from '../../img/icons/reminder_white.svg'
import reminderSet from '../../img/icons/reminder_set.svg'
import reminderCancel from '../../img/icons/reminder_cancel.svg'

export default function ToggleReminder(props) {
  const [state, setState] = useState({
    reminderStatus: props.reminderStatus,
    notificationid: props.notificationid
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: ! state.reminderStatus});
  };

  useEffect(() => updateDB(state), [state])
  
  const updateDB = (state) => {
    updateNotesReminder2(state)
    .then(res => {
        props.refreshState()
        props.toolInfo(props.notificationid, 'reminder')
    })
    .catch(err => {
        console.log(err)
    })
  }
  return ( 
      <div>
          <img
            className="reminder-icon"
            src={state.reminderStatus == 1 ? reminderCancel : reminder }
            onClick={handleChange}
            name="reminderStatus"
          />
        </div>
  );
}