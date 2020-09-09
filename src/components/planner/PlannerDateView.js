import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Box } from '@material-ui/core';
import Planner from './Planner';
import {  TextField } from '@material-ui/core';

function PlannerDateView(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

PlannerDateView.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  appBar: {
    margin: '0 auto',
  },
  tabs: {
    backgroundColor: "#fff",
    color: '#000',
  }
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const todaysDate = () => {
    let newDate = new Date()
    let mins = newDate.getMinutes();
    let hour = newDate.getHours();
    let day = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
  return `${year}-${month < 10 ? `0${month}` : month }-${day}T${hour}:${mins}`
  }

  return (
    <div className={classes.root}>
      <AppBar 
        className={classes.appBar}
        position="static">
        <Tabs 
            className={classes.tabs}
            value={value} 
            onChange={handleChange} 
            aria-label="simple tabs example"
            centered>
          <Tab label="Day" {...a11yProps(0)} />
          <Tab label="Week" {...a11yProps(1)} />
          <Tab label="Month" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <PlannerDateView value={value} index={0}>
          <TextField
            id="datetime-local"
            label="select a day"
            name="reminder_time"
            type="datetime-local"
            defaultValue={`${todaysDate()}`}
          />
          <br />
          <br />
        <Planner />
      </PlannerDateView>
      <PlannerDateView value={value} index={1}>
        Item Two
      </PlannerDateView>
      <PlannerDateView value={value} index={2}>
        Item Three
      </PlannerDateView>
    </div>
  );
}