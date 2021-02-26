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

const useStyles = makeStyles({
  root: {
    height: 130,
    fontSize: 10
  },
});

// each meal: {hebName mealId amount}
const NumberDisplayCard = ({ title, value, loading }) => {
  const classes = useStyles();

  return (
    <div style={{ width: "100%", padding: "5px" }}>
      <Card className={classes.root}>

        <CardHeader
          titleTypographyProps={true}
          variant='h5'
          title={ <b> {title} </b> }
          style={{
            backgroundColor: getBackgroundColor(""),
            color: textColor,
            textAlign: "center",
            fontWeight: "bold",
            padding: '5px'
          }}
        />

        <CardContent>
          {loading ? (
            <Spinner />
          ) : (
            <Grid container direction="row" alignItems="baseline">
              <Grid item style={{ width: "100%" }}>
                <Typography align="center" variant="h4">
                  {value}
                </Typography>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default NumberDisplayCard;
