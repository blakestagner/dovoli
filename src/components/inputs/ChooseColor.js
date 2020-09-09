import React, {useState } from 'react'
import colorWhite from '../../img/icons/color_white.svg'
import color from '../../img/icons/color.svg'

export default function ChooseColor(props) {

    const handleChange = (color) => {
        props.onChange(color)
    }
    
    const colors = [ 'green', 'teal', 'blue', 'yellow', 'orange', 'red']
    return (
        <div>
            <div className="color-container">
                <img
                    className="color-select-icon" 
                    style={{backgroundColor: `${props.color}`, marginRight: '5px' }}
                    src={props.color === 'yellow' ? color : colorWhite} />
                {colors.map(color => (
                    <div
                    onClick={() => handleChange(color)}
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