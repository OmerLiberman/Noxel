import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CodeIcon from "@material-ui/icons/Code";
import PersonIcon from "@material-ui/icons/Person";

import MaterialTable from "material-table";
import Grid from "@material-ui/core/Grid";
import { replaceName } from "../../../../utils/strings";
import PaginationWrapper
  from '../../../../components/Pagination/PaginationWrapper';

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
      getSchools();
    }
  }, []);

  const getSchools = async () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URI}/api/clients/schools`)
      .then((res) => {
        let schoolsArray = [];
        res.data.schools.forEach((school) => {
          schoolsArray.push(school);
        });
        setSchools(schoolsArray);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      title: (
        <div>
          <center>
            <CodeIcon />
          </center>
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
      title: "מוסד",
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
      title: "משלם",
      width: "10%",
      render: ({ payer }) => {
        return (
          <Grid container direction="column" alignItems="flex-start">
            <Grid item>
              <Typography> {replaceName(payer && payer.hebName)} </Typography>
            </Grid>
            <Grid item>{replaceName(payer && payer.hebAddress)}</Grid>
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
      //field: "kids",
      width: "5%",
      render: ({ classrooms }) => {
        let kids = 0;
        classrooms.forEach((classroom) => {
          kids += classroom.kids;
        });

        return (
          <Grid container direction="column" alignItems="flex-start">
            <Grid item> {kids} </Grid>
          </Grid>
        );
      },
    },
    {
      title: "כיתות",
      field: "classrooms",
      render: ({ classrooms }) => {
        return (
          <Grid container direction="column" alignItems="flex-start">
            {classrooms.map((classroom, index) => {
              return <Grid item>{replaceName(classroom.hebName)}</Grid>;
            })}
          </Grid>
        );
      },
    },
  ];

  const options = {
    exportButton: true,
    headerStyle: {
      textAlign: "right",
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
        components={{
          Pagination: (props) => <PaginationWrapper/>,
          Toolbar: () => ''
        }}
      />
    </div>
  );
};

export default Classrooms;
