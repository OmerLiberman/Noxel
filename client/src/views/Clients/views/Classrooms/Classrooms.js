import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CodeIcon from "@material-ui/icons/Code";
import PersonIcon from "@material-ui/icons/Person";
import Grid from "@material-ui/core/Grid";

import MaterialTable from "material-table";
import { replaceName } from "../../../../utils/strings";
import PaginationWrapper from "../../../../components/Pagination/PaginationWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  header: {
    fontSize: "18px",
    fontWeight: "bold",
  },
}));

const Classrooms = () => {
  const classes = useStyles();

  const [message] = useState("");
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
    if (classrooms.length === 0) {
      getClassrooms();
    }
  }, []);

  const getClassrooms = async () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URI}/api/clients/classrooms`)
      .then((res) => {
        let classroomsArray = [];
        res.data.classrooms.forEach((classroom) => {
          classroomsArray.push(classroom);
        });
        setClassrooms(classroomsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: (
        <div>
          <CodeIcon />
        </div>
      ),
      field: "code",
      render: ({ code }) => (
        <Grid container direction="column" alignItems="flex-start">
          <Grid item> {code} </Grid>
        </Grid>
      ),
    },
    {
      title: "כיתה",
      width: "10%",
      render: ({ hebName, hebAddress }) => {
        return (
          <Grid container direction="column" alignItems="flex-start">
            <Grid item>
              <Typography> {replaceName(hebName)} </Typography>
            </Grid>
            <Grid item>{replaceName(hebAddress)}</Grid>
          </Grid>
        );
      },
    },
    {
      title: (
        <div>
          <PersonIcon />
        </div>
      ),
      field: "kids",
      width: "5%",
      render: ({ kids }) => (
        <Grid container direction="column" alignItems="flex-start">
          <Grid item> {kids} </Grid>
        </Grid>
      ),
    },
    {
      title: "יום א",
      width: "10%",
      render: ({ usualWeeklyMenu, usualWeeklySides }) => {
        return (
          <Grid container direction="column" alignItems="flex-start">
            <b> מזון חם</b>
            {usualWeeklyMenu &&
              usualWeeklyMenu.Sun &&
              usualWeeklyMenu.Sun.meals.map((meal, key) => {
                return <Grid item> - {replaceName(meal.hebName)} </Grid>;
              })}
            <b> תוספות </b>
            {usualWeeklySides &&
              usualWeeklySides.Sun.map((side, key) => {
                return <Grid item> - {replaceName(side.hebName)} </Grid>;
              })}
          </Grid>
        );
      },
    },
    {
      title: "יום ב",
      width: "10%",
      render: ({ usualWeeklyMenu, usualWeeklySides }) => {
        return (
          <Grid container direction="column" alignItems="flex-start">
            <b>מזון חם</b>
            {usualWeeklyMenu &&
              usualWeeklyMenu.Mon &&
              usualWeeklyMenu.Mon.meals.map((meal, key) => {
                return <Grid item> - {replaceName(meal.hebName)} </Grid>;
              })}
            <b>תוספות</b>
            {usualWeeklySides &&
              usualWeeklySides.Mon.map((side, key) => {
                return <Grid item> - {replaceName(side.hebName)} </Grid>;
              })}
          </Grid>
        );
      },
    },
    {
      title: "יום ג",
      width: "10%",
      render: ({ usualWeeklyMenu, usualWeeklySides }) => {
        return (
          <Grid container direction="column" alignItems="flex-start">
            <b> מזון חם</b>
            {usualWeeklyMenu &&
              usualWeeklyMenu.Tue &&
              usualWeeklyMenu.Tue.meals.map((meal, key) => {
                return <Grid item> - {replaceName(meal.hebName)} </Grid>;
              })}
            <b> תוספות</b>
            {usualWeeklySides &&
              usualWeeklySides.Tue.map((side, key) => {
                return <Grid item> - {replaceName(side.hebName)} </Grid>;
              })}
          </Grid>
        );
      },
    },
    {
      title: "יום ד",
      width: "10%",
      render: ({ usualWeeklyMenu, usualWeeklySides }) => {
        return (
          <Grid container direction="column" alignItems="flex-start">
            <b> מזון חם</b>
            {usualWeeklyMenu &&
              usualWeeklyMenu.Wed &&
              usualWeeklyMenu.Wed.meals.map((meal, key) => {
                return <Grid item> - {replaceName(meal.hebName)} </Grid>;
              })}
            <b> תוספות </b>
            {usualWeeklySides &&
              usualWeeklySides.Wed.map((side, key) => {
                return <Grid item> - {replaceName(side.hebName)} </Grid>;
              })}
          </Grid>
        );
      },
    },
    {
      title: "יום ה",
      width: "10%",
      render: ({ usualWeeklyMenu, usualWeeklySides }) => {
        return (
          <Grid container direction="column" alignItems="flex-start">
            <b> מזון חם </b>
            {usualWeeklyMenu &&
              usualWeeklyMenu.Thu &&
              usualWeeklyMenu.Thu.meals.map((meal, key) => {
                return <Grid item> - {replaceName(meal.hebName)} </Grid>;
              })}
            <b> תוספות </b>
            {usualWeeklySides &&
              usualWeeklySides.Thu.map((side, key) => {
                return <Grid item> - {replaceName(side.hebName)} </Grid>;
              })}
          </Grid>
        );
      },
    },
  ];

  const options = {
    exportButton: false,
    headerStyle: {
      textAlign: "right",
    },
    initialPage: 1,
    pageSize: 5,
    pageSizeOptions: [],
    paginationType: "stepped",
    showTitle: false,
  };

  return (
    <div>
      {/* Header */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          direction: "rtl",
          alignItems: "baseline",
        }}
      >
        <div style={{ textAlign: "right" }}>
          <Typography variant="h4">{"כיתות וגנים"}</Typography>
        </div>

        <div>
          <Button
            variant="outlined"
            style={{ backgroundColor: "#012345", color: "white" }}
          >
            {"הוסף כיתה"}
          </Button>
        </div>
      </div>
      <MaterialTable
        columns={columns}
        data={classrooms}
        style={{ direction: "rtl", color: "#012345" }}
        options={options}
        components={{
          Pagination: (props) => <PaginationWrapper />,
          Toolbar: () => ''
        }}
      />
    </div>
  );
};

export default Classrooms;
