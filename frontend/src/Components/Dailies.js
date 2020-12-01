import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
}));

export default function SimpleTable() {
  const classes = useStyles();

  const [data, upDateData] = React.useState([]);
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
                  <ListItem key={`task-${task.id}`}>
                    <ListItemText primary={`Item ${task.content}`} />
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
    </div>
  );
}
