import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from '../../components/Header/Header';
import AddSideDialog from './AddSideDialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Spinner from '../../components/Spinner/Spinner';
import Side from './Side';

const SideProducts = props => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [sides, setSides] = useState([]);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    if (sides.length === 0) {
      fetchData();
    }
  }, [sides]);

  const addSide = (body) => {
    axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/products/sides/`, body)
      .then(res => {
          let side = res.data.side;

          setLoading(true);
          let newSideData = {
            sid: side._id,
            name: side.hebName,
            category: side.category
          };

          let newSides = sides.splice(sides.length, 0, newSideData);
          setSides(newSides);

          console.log(`Created ${side._id}`);
          setLoading(false);
        })
    .catch(err => console.error(err));
  }

  const deleteSide = (sid) => {
    axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/products/sides/${sid}`)
      .then(() => {
          let newSides = sides.filter(side => side.sid !== sid);
          setSides(newSides);
          console.log(`Deleted ${sid}`);
        })
      .catch(err => console.error(err));
  }

  const editSide = (sid, body) => {
    axios.patch(
        `${process.env.REACT_APP_SERVER_URI}/api/products/sides/${sid}`, body)
      .then(res => {
          setLoading(true);
          let newSideData = {
            sid: res.data.side._id,
            name: res.data.side.hebName,
            category: res.data.side.category
          };

          let newSides = sides.filter(side => side.sid !== sid);
          newSides.push(newSideData);
          setSides(newSides);

          console.log(`Edited ${sid}`);
          setLoading(false);
        })
    .catch(err => console.error(err));
  }

  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/api/products/sides`)
      .then(res => {
          let sides = [];
          res.data.sides.forEach(side => {
            let newSides = {
              sid: side._id,
              name: side.hebName,
              category: side.category,
            };
            sides.push(newSides);
          });
          setSides(sides);
          setLoading(false);
        })
    .catch(err => {
          setLoading(false);
          setErrorMessage(true);
          console.log(err);
        });
  };

  return (
      <div style={{padding: '8px', direction: 'rtl'}}>

        {/* Header */}
        <Header title={'תוספות קרות'} addButtonTitle={'הוסף תוספת'} openButtonDialog={setAddDialogOpen}/>

        {/* Add dialog */}
        {
          (addDialogOpen) ?
              <AddSideDialog
                  isOpenVar={addDialogOpen}
                  isOpenFuncHandle={setAddDialogOpen}
                  handleAdd={addSide}/>
              : ''
        }

        {/* Body */}
        {
          (loading) ?
              <center>
                <CircularProgress/>
              </center>
              :
              (sides.length > 0) ?
                  <Grid container direction='row'>
                    {
                      sides.map(side => (
                          <Grid item
                                xl={3} lg={3} md={3} sm={6} xs={12}
                                style={{padding: '4px'}}>
                            <Side
                                name={side.name}
                                type={side.category}
                                sid={side.sid}
                                handleDeleteClick={deleteSide}
                                handleEditClicked={editSide}
                            />
                          </Grid>
                      ))
                    }
                  </Grid>

                  :
                  (errorMessage) ?
                      <center>
                        <div>
                          Error has been occurred.
                        </div>
                      </center>
                      :
                      (loading) ?
                          <Spinner/>
                          :
                          (sides.length > 0) ?
                              <Spinner/>
                              :
                              <center>
                                <div>
                                  No data to fetch.
                                </div>
                              </center>
        }
      </div>
  );
};

export default SideProducts;