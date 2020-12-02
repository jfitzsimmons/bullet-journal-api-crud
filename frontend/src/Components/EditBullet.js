import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import StarIcon from '@material-ui/icons/Star';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(7),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
  },
}));

export default function EditBullet(props) {
  const classes = useStyles();
  const [date, setDate] = useState('2020-11-27');
  const [tab, setTab] = useState(0);
  const [dateOrder, setDateOrder] = useState(0);
  const [taskType, setTaskType] = useState('b');
  const [content, setContent] = useState('');

  const [state, setState] = useState({
    important: false,
    inspirational: false,
  });

  const { taskId } = props;

  const handleTabChange = (event) => setTab(event.target.value);
  const handleDateOrderChange = (event) => setDateOrder(event.target.value);
  const handleTaskTypeChange = (event) => setTaskType(event.target.value);
  const handleContentChange = (event) => setContent(event.target.value);

  const [message, setMessage] = useState('Nothing saved in the session');

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  async function getBulletById(bId) {
    console.log(`by id`);
    console.log(bId);
    const response = await fetch(`/api/bullet/${bId}`);
    const body = await response.json();
    console.log(body);
    setContent(body.content);
    setTab(body.tab);
    setDateOrder(body.dateOrder);
    setTaskType(body.taskType);
    setState({
      important: body.important,
      inspirational: body.inspirational,
    });
    setDate(body.createDate);
  }

  useEffect(() => {
    console.log(`mount/update id: ${taskId}`);
    if (taskId) {
      getBulletById(taskId);
    }
  }, []);

  async function putBullet(toInput) {
    console.log(`put`);
    console.log(JSON.stringify(toInput));
    const response = await fetch('/api/bullet', {
      method: 'PUT',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(toInput),
    });
    const body = await response.json();
    console.log(body.id);
    setMessage(body.id ? 'Data successfully updated' : 'Data update failed');
  }

  const handleSubmit = () => {
    const toInput = {
      id: taskId,
      tab,
      dateOrder,
      taskType,
      content,
      important: state.important,
      inspirational: state.inspirational,
      createDate: date,
    };

    putBullet(toInput);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <GroupIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a Bullet
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="tab"
                value={tab}
                label="Tab"
                name="tab"
                autoComplete="tab"
                onChange={handleTabChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="dateOrder"
                name="dateOrder"
                variant="outlined"
                required
                fullWidth
                value={dateOrder}
                id="dateOrder"
                label="Date Order"
                onChange={handleDateOrderChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">
                  Type of Task
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="taskType"
                  value={taskType}
                  onChange={handleTaskTypeChange}
                >
                  <MenuItem value="b">Task Incomplete</MenuItem>
                  <MenuItem value="n">Note</MenuItem>
                  <MenuItem value="e">Event</MenuItem>
                  <MenuItem value="c">Task Complete</MenuItem>
                  <MenuItem value="m">Task Migrated</MenuItem>
                  <MenuItem value="s">Task Scheduled</MenuItem>
                  <MenuItem value="i">Task Irrelevant</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                multiline
                rows={2}
                rowsMax={4}
                required
                fullWidth
                id="content"
                value={content}
                label="content"
                name="content"
                autoComplete="content"
                onChange={handleContentChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<NewReleasesOutlinedIcon />}
                    checkedIcon={<NewReleasesIcon />}
                    name="important"
                    checked={state.important}
                    onChange={handleChange}
                  />
                }
                label="important"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<StarBorderOutlinedIcon />}
                    checkedIcon={<StarIcon />}
                    name="inspirational"
                    checked={state.inspirational}
                    onChange={handleChange}
                  />
                }
                label="inspirational"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            preventdefault="true"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
    </Container>
  );
}

EditBullet.propTypes = {
  taskId: PropTypes.number.isRequired,
};
