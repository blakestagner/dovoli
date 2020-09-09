import React, { useState, useEffect } from 'react';
import { deleteNote } from '../../autho/Repository'
import delete_icon from '../../img/icons/delete_icon.svg'


export default function DeletePost(props) {
  const handleChange = (x) => {
    deleteNote(x)
      .then(() => {
        props.refreshState()
      })
      .catch(err => {
        console.log(err)
      })
  };
  return ( 
      <div>
          <img
            className="color-icon"
            src={delete_icon}
            onClick={() => { handleChange(props.id) }}
            name="delete"
          />
        </div>
  );
}