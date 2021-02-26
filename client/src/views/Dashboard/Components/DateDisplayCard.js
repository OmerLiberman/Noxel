import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from "@material-ui/core";

import { replaceName } from "../../../utils/strings";
import { getBackgroundColor, textColor } from "../../../utils/colors";

import { Donut } from "../../../components/Donut/Donut";
import Spinner from "../../../components/Spinner/Spinner";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { numberToDayHeb } from "../../../utils/time";

const useStyles = makeStyles({
  root: {
    height: 130,
    fontSize: 10,
  },
});

const DateDisplayCard = () => {
  const classes = useStyles();

  const date = new Date();
  const dayNumber = date.getUTCDay();
  const dayInHeb = numberToDayHeb(dayNumber);

  return (
    <div style={{ width: "100%", padding: "5px" }}>
      <Card className={classes.root}>
        <CardHeader
          titleTypographyProps={true}
          variant="h5"
          title={<b> {"תאריך"} </b>}
          style={{
            backgroundColor: getBackgroundColor(""),
            color: textColor,
            textAlign: "center",
            fontWeight: "bold",
            padding: "5px",
          }}
        />

        <CardContent>
          <Grid container direction="column" alignItems="center">
              <Grid item style={{ fontSize: 20 }}>
                יום {dayInHeb}
              </Grid>
              <Grid item style={{ fontSize: 12 }}>
                {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
              </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default DateDisplayCard;
