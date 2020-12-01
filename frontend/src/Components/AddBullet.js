import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
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
    width: '100%', // Fix IE 11 issue.
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

export default function AddBullet() {
  const classes = useStyles();
  // const [firstLoad, setLoad] = React.useState(true);

  const [tab, setTab] = React.useState(0);
  const [dateOrder, setDateOrder] = React.useState(0);
  const [taskType, setTaskType] = React.useState('b');
  const [content, setContent] = React.useState('');

  const handleTabChange = (event) => setTab(event.target.value);
  const handleDateOrderChange = (event) => setDateOrder(event.target.value);
  const handleTaskTypeChange = (event) => setTaskType(event.target.value);
  const handleContentChange = (event) => setContent(event.target.value);

  const [message, setMessage] = React.useState('Nothing saved in the session');

  const [state, setState] = React.useState({
    important: true,
    inspirational: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  async function postBullet(toInput) {
    console.log(`in async`);
    console.log(JSON.stringify(toInput));
    const response = await fetch('/api/bullet', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(toInput), // body data type must match "Content-Type" header
    });
    const body = await response.json();
    console.log(body.id);
    setMessage(body.id ? 'Data successfully updated' : 'Data update failed');
  }

  const handleSubmit = () => {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();

    today = `${yyyy}-${mm}-${dd}`;

    console.log(`today: ${today}`);
    const toInput = {
      tab,
      dateOrder,
      taskType,
      content,
      important: state.important,
      inspirational: state.inspirational,
      createDate: today,
    };

    postBullet(toInput);
    // setName("");
    // setDepartment("");
    // setGender("");
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
                  <MenuItem value="r">Task Irrelevant</MenuItem>
                </Select>
              </FormControl>
              {/*
              <TextField
                variant="outlined"
                required
                fullWidth
                id="taskType"
                value={taskType}
                label="Task Type"
                name="taskType"
                autoComplete="taskType"
                onChange={handleTaskTypeChange}
              />
            */}
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
              {/*
              <TextField
                variant="outlined"
                required
                fullWidth
                id="important"
                value={important}
                label="important"
                name="important"
                autoComplete="important"
                onChange={handleImportantChange}
              />
        */}
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
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            preventDefault
            className={classes.submit}
            onClick={handleSubmit}
          >
            Save
          </Button>

          <Grid container justify="center">
            <Grid item>
              <Link to="/view">View all Bullets</Link>
            </Grid>
          </Grid>
        </form>
        <Typography style={{ margin: 7 }} variant="body1">
          Status: {message}
        </Typography>
      </div>
    </Container>
  );
}
