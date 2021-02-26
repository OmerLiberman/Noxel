import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {CardHeader, Typography} from '@material-ui/core';
import {getBackgroundColor, textColor} from '../../utils/colors';
import Card from '@material-ui/core/Card';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
  },
  paper: {
    width: 200,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}));

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const TransferList = ({allClassrooms, driversClassrooms}) => {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([0, 1, 2, 3]);
  const [right, setRight] = React.useState([4, 5, 6, 7]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (classrooms, title) => {
    console.log(classrooms, typeof classrooms);

    return <Paper className={classes.paper}>
      {/* Header for card */}
      <CardHeader title={<b>{title}</b>}
                  component='div'
                  style={{
                    backgroundColor: getBackgroundColor(''),
                    color: textColor, textAlign: 'center', fontWeight: 'bold'
                  }}/>

      {/* Items */}
      <List dense component="div" role="list">
        {classrooms.map((classroom, index) => {
          const value = classroom.hebName;
          const labelId = `transfer-list-item-${value}-label`;

          return (
              <ListItem key={value} role="listitem" button
                        onClick={handleToggle(value)}>
                <ListItemIcon>
                  <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{'aria-labelledby': labelId}}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`List item ${value + 1}`}/>
              </ListItem>
          );
        })}
        <ListItem/>
      </List>
    </Paper>
  };

  return (
      <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>

        <Grid item>{customList(allClassrooms, 'כיתות')}</Grid>

        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
            >
              ≫
            </Button>
            <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
            >
              &gt;
            </Button>
            <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
            >
              &lt;
            </Button>
            <Button
                variant="outlined"
                size="small"
                className={classes.button}
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
            >
              ≪
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList(right)}</Grid>
        <Grid item>{customList(right)}</Grid>
        <Grid item>{customList(right)}</Grid>

        <Grid item>
          <Button
              onClick={() => console.log("Save")}
              style={{backgroundColor: '#012345', color: 'white'}}>
            שמור
          </Button>
        </Grid>
      </Grid>
  );
}

export default TransferList;