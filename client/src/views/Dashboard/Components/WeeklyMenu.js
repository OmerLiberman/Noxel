import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { CardHeader } from "@material-ui/core";

import { getBackgroundColor, textColor } from "../../../utils/colors";
import Spinner from "../../../components/Spinner/Spinner";
import { BarChart } from "../../../components/BarChart/BarChart";
import {replaceName} from '../../../utils/strings';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 320,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    textAlign: "right",
    marginBottom: 12,
  },
});

const WeeklyMenu = ({ weeklyMenu, loading }) => {
  const classes = useStyles();

  let labels = [];
  let amounts = [];

  for (const [k, v] of Object.entries(weeklyMenu)) {
    labels.push(replaceName(k));
    amounts.push(v);
  }

  return (
    <div style={{ padding: "10px" }}>
      <Card className={classes.root}>
        <CardHeader
          title={<b>{"תפריט שבועי - כמויות"}</b>}
          component="div"
          style={{
            backgroundColor: getBackgroundColor(""),
            color: textColor,
            textAlign: "center",
            fontWeight: "bold",
          }}
        />

        <CardContent>
          {loading ? (
            <Spinner />
          ) : (
            <BarChart labelsArray={labels} amountsArray={amounts} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyMenu;
