import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import { CardHeader } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";

import { getBackgroundColor, textColor } from "../../../utils/colors";
import Spinner from "../../../components/Spinner/Spinner";
import { BarChart } from "../../../components/BarChart/BarChart";

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
    labels.push(k);
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

        <CardActions style={{ justifyContent: "center" }}>
          <Button size="small" variant="outlined">
            ראה פירוט
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default WeeklyMenu;
