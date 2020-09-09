import React, {useState } from 'react'
import colorWhite from '../../img/icons/color_white.svg'
import color from '../../img/icons/color.svg'
import {updateNoteColor} from '../../autho/Repository'

export default function ChangeColor(props) {

    const handleChange = (color, id) => {
        updateNoteColor(color, id)
        .then(res => {
            props.refreshState()
        })
        .catch(err => {
            console.log(err)
        })
    }
    
    const colors = [ 'green', 'teal', 'blue', 'yellow', 'orange', 'red']
    return (
        <div>
            <div className="color-container" style={{margin: 'auto'}}>
                <img
                    className="color-select-icon" 
                    style={{backgroundColor: `${props.currentColor}`, marginRight: '5px' }}
                    src={props.currentColor === 'yellow' ? color : colorWhite} />
                {colors.map(color => (
                    <div
                        onClick={() => handleChange(color, props.noteid)}
                        className={props.color === color ? 'color-select selected' : 'color-select'}
                        style={{backgroundColor: color}}
                        key={color}
                        name="color">
                </div>
                ))}
            </div>
        </div>
    )
}