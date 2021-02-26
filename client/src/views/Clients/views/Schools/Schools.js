import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CodeIcon from '@material-ui/icons/Code';
import PersonIcon from '@material-ui/icons/Person';

import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";

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
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    if (schools.length === 0) {
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
        setSchools(classroomsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const replaceUnderScores = (s) => {
    return s.replace(/-/g, " ");
  };

  const columns = [
    {
      title: <div>
        <center> <CodeIcon/> </center>
      </div>,
      field: "code",
      render: ({code}) =>
          <Grid container direction='column' alignItems='center'>
            <Grid item> {code} </Grid>
          </Grid>
    },
    {
      title: "כיתה",
      width: "10%",
      render: ({hebName,hebAddress}) => {
        return <Grid container direction='column' alignItems='center'>
          <Grid item>
            <Typography> {replaceUnderScores(hebName)} </Typography>
          </Grid>
          <Grid item>
            {replaceUnderScores(hebAddress)}
          </Grid>
        </Grid>
      }
    },
    {
      title: <div>
        <PersonIcon/>
      </div>,
      field: "kids",
      width: "5%",
      render: ({kids}) =>
          <Grid container direction='column' alignItems='center'>
            <Grid item> {kids} </Grid>
          </Grid>
    },
    {
      title: "יום א",
      width: "10%",
      render: ({ usualWeeklyMenu, usualWeeklySides }) => {
        return (
          <Grid container direction='column' alignItems='flex-start'>
              <b> מזון חם</b>
              {usualWeeklyMenu &&
              usualWeeklyMenu.Sun &&
              usualWeeklyMenu.Sun.meals.map((meal) => {
                return <Grid item> - {replaceUnderScores(meal.hebName)} </Grid>;
              })}
              <b> תוספות </b>
              {usualWeeklySides &&
              usualWeeklySides.Sun.map((side) => {
                return <Grid item> - {replaceUnderScores(side.hebName)} </Grid>;
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
            <Grid container direction='column' alignItems='flex-start'>
            <b>מזון חם</b>
            {usualWeeklyMenu &&
              usualWeeklyMenu.Mon &&
              usualWeeklyMenu.Mon.meals.map((meal) => {
                return <Grid iten> - {replaceUnderScores(meal.hebName)} </Grid>;
              })}
            <b>תוספות</b>
            {usualWeeklySides &&
              usualWeeklySides.Mon.map((side) => {
                return <Grid item> - {replaceUnderScores(side.hebName)} </Grid>;
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
            <Grid container direction='column' alignItems='flex-start'>
            <b> מזון חם</b>
            {usualWeeklyMenu &&
              usualWeeklyMenu.Tue &&
              usualWeeklyMenu.Tue.meals.map((meal) => {
                return <Grid item> - {replaceUnderScores(meal.hebName)} </Grid>;
              })}
            <b> תוספות</b>
            {usualWeeklySides &&
              usualWeeklySides.Tue.map((side) => {
                return <Grid item> - {replaceUnderScores(side.hebName)} </Grid>;
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
            <Grid container direction='column' alignItems='flex-start'>
            <b> מזון חם</b>
            {usualWeeklyMenu &&
              usualWeeklyMenu.Wed &&
              usualWeeklyMenu.Wed.meals.map((meal) => {
                return <Grid item> - {replaceUnderScores(meal.hebName)} </Grid>;
              })}
            <b> תוספות </b>
            {usualWeeklySides &&
              usualWeeklySides.Wed.map((side) => {
                return <Grid item> - {replaceUnderScores(side.hebName)} </Grid>;
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
            <Grid container direction='column' alignItems='flex-start'>
           <b> מזון חם </b>
            {usualWeeklyMenu &&
              usualWeeklyMenu.Thu &&
              usualWeeklyMenu.Thu.meals.map((meal) => {
                return <Grid item> - {replaceUnderScores(meal.hebName)} </Grid>;
              })}
             <b> תוספות </b>
            {usualWeeklySides &&
              usualWeeklySides.Thu.map((side) => {
                return <Grid item> - {replaceUnderScores(side.hebName)} </Grid>;
              })}
          </Grid>
        );
      },
    },
    // {
    //   title: "שינוים",
    //   field: "changes",
    //   render: ({changes}) =>
    //       <Grid container direction='column' alignItems='center'>
    //         <Grid item> {changes && changes.length} </Grid>
    //       </Grid>
    // },
  ];

  const options = {
    exportButton: true,
    headerStyle: {
      textAlign: 'right'
    },
    initialPage: 1,
    pageSize: 10,
    pageSizeOptions: false,
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
          <Typography variant="h4">{"בתי ספר"}</Typography>
        </div>

        <div>
          <Button
            variant="outlined"
            style={{ backgroundColor: "#012345", color: "white" }}
          >
            {"הוסף בית ספר"}
          </Button>
        </div>
      </div>
      <MaterialTable
        columns={columns}
        data={schools}
        style={{ direction: "rtl", color: "#012345" }}
        options={options}
      />
    </div>
  );
};

export default Classrooms;