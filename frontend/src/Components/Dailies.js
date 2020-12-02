import React from 'react';
import '../App.css';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import GroupIcon from '@material-ui/icons/Group';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import StarIcon from '@material-ui/icons/Star';
import EventIcon from '@material-ui/icons/Event';
import AssignmentIcon from '@material-ui/icons/Assignment';
import NoteIcon from '@material-ui/icons/Note';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import RemoveFromQueueIcon from '@material-ui/icons/RemoveFromQueue';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import EditBullet from './EditBullet';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 600,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: `10px`,
    height: '100%',
    width: '99%',
    marginTop: theme.spacing(7),
  },
  link: {
    color: 'rgba(0,0,0,0.65)',
    textDecoration: 'none',
    marginLeft: '10%',
    alignSelf: 'flex-start',
    '&:hover': {
      color: 'rgba(0,0,0,1)',
    },
  },
  strike: {
    textDecoration: 'line-through',
  },
}));

export default function SimpleTable() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [data, upDateData] = React.useState([]);
  const [taskId, setTaskId] = React.useState(0);
  const [firstLoad, setLoad] = React.useState(true);
  let isLoading = true;

  function groupBy(arr, prop) {
    const map = new Map(Array.from(arr, (obj) => [obj[prop], []]));
    arr.forEach((obj) => map.get(obj[prop]).push(obj));
    return Array.from(map.values());
  }

  async function sampleFunc() {
    const response = await fetch('/api/bullet');
    const body = await response.json();

    const result = groupBy(body, 'createDate');

    upDateData(result);
  }

  if (firstLoad) {
    sampleFunc();
    setLoad(false);
  }

  function TaskType(type) {
    switch (type.value) {
      case 'n':
        return <NoteIcon />;
      case 'e':
        return <EventIcon />;
      case 'c':
        return <AssignmentTurnedInIcon />;
      case 'm':
        return <RemoveFromQueueIcon />;
      case 's':
        return <ScheduleIcon />;
      default:
        return <AssignmentIcon />;
    }
  }

  const toggleDrawer = (anchor, open, id) => (event) => {
    if (open) {
      setTaskId(id);
    }
    setState({ ...state, [anchor]: open });
  };

  if (data) isLoading = false;

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <GroupIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Dailies
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <List className={classes.root} subheader={<li />}>
          {data.map((day) => (
            <li key={`section-${day[0].id}`} className={classes.listSection}>
              <ul className={classes.ul}>
                <ListSubheader>{`I'm sticky ${day[0].createDate}`}</ListSubheader>
                {day.map((task) => (
                  <ListItem
                    key={`task-${task.id}`}
                    className={`tabbed${task.tab} ${
                      task.taskType === 'i' ? classes.strike : ''
                    }`}
                  >
                    <TaskType value={task.taskType} />
                    {task.important && <NewReleasesIcon />}
                    {task.inspirational && <StarIcon />}
                    <ListItemText primary={`Item ${task.content}`} />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={toggleDrawer('left', true, task.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </ul>
            </li>
          ))}
        </List>
      )}
      <Link className={classes.link} to="/">
        {' '}
        <Typography align="left">
          &#x2190; Head back to save data
        </Typography>{' '}
      </Link>
      <div>
        <SwipeableDrawer
          anchor="left"
          open={state.left}
          onClose={toggleDrawer('left', false, 1)}
          onOpen={toggleDrawer('left', true, 1)}
        >
          <EditBullet taskId={taskId} />
        </SwipeableDrawer>
      </div>
    </div>
  );
}
