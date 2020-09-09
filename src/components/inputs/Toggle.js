import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

export default function Toggle(props) {
    const [state, setState] = React.useState({
        checked: false,
      });

      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        props.handleChange()
      };

      return (
        <div>
          <FormControlLabel
            control={
              <Switch
                name="checked"
                checked={state.checked}
                onClick={handleChange}
                color="primary"
                value={state.checked}
              />
            }
            label={props.toggleName}
          />
          </div>
      );
}