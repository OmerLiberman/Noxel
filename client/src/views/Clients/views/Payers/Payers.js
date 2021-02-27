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

const Payers = () => {
  const classes = useStyles();

  const [message] = useState("");
  const [payers, setPayers] = useState([]);

  useEffect(() => {
    if (payers.length === 0) {
      getPayers();
    }
  }, []);

  const getPayers = async () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URI}/api/clients/payers`)
      .then((res) => {
        let payersArray = [];
        res.data.payers.forEach((payer) => {
          payersArray.push(payer);
        });
        setPayers(payersArray);
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
      title: "משלם",
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
      width: "5%",
      render: ({ classrooms, schools }) => {
        let kids = 0;

        if (classrooms) {
          classrooms.forEach((classroom) => {
            kids += classroom.kids;
          });
        }

        if (schools) {
          schools.forEach((school) => {
            school.classrooms.forEach((classroom) => {
              kids += classroom.kids;
            });
          });
        }

        return (
          <Grid container direction="column" alignItems="flex-start">
            <Grid item> {kids} </Grid>
          </Grid>
        );
      },
    },
    {
      title: "מספר כיתות כולל",
      width: "10%",
      render: ({ classrooms, schools }) => {

        let numOfClassrooms = 0;
        numOfClassrooms += classrooms.length;

        schools.forEach(school => {
          numOfClassrooms += school.classrooms.length;
        })

        return (
            <Grid container direction="column" alignItems="flex-start">
              <Grid item> {numOfClassrooms} </Grid>
            </Grid>
        );
      },
    },
    {
      title: "בתי ספר",
      field: "schools",
      render: ({ schools }) => {
        return (
          <Grid container direction="column" alignItems="flex-start">
            {schools.map((school, index) => {
              let result = `${school.hebName} (${school.classrooms.length} כיתות)`
              return <Grid item>{replaceName(result)}</Grid>;
            })}
          </Grid>
        );
      },
    },
    {
      title: "כיתות מחוץ לבתי ספר",
      render: ({ classrooms, schools }) => {
        return (
          <Grid container direction="column" alignItems="flex-start">
            <Grid container direction='column' alignItems='flex-start'>
              {classrooms.map((classroom, index) => {
                return <Grid item> {replaceName(classroom.hebName)}</Grid>;
              })}
            </Grid>
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
          <Typography variant="h4">{"משלמים"}</Typography>
        </div>

        <div>
          <Button
            variant="outlined"
            style={{ backgroundColor: "#012345", color: "white" }}
          >
            {"הוסף משלם"}
          </Button>
        </div>
      </div>
      <MaterialTable
        columns={columns}
        data={payers}
        style={{ direction: "rtl", color: "#012345" }}
        options={options}
      />
    </div>
  );
};

export default Payers;
