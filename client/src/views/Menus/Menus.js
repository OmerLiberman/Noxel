import React, {useEffect, useState} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Menu from './Menu';
import axios from 'axios';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AddMenuDialog from './AddMenuDialog';

const Menus = props => {
  const [menus, setMenus] = useState([]);
  const [meals, setMeals] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const handleAddButtonClick = (event) => {
    event.preventDefault();
    setAddDialogOpen(true);
  }

  useEffect(() => {
    if (menus.length === 0) {
      fetchMenus();
    }
    if (meals.length === 0) {
      fetchMeals();
    }
  }, [menus, meals]);

  const addMenu = (body) => {
    console.log(body);
    axios.post(`${process.env.REACT_APP_SERVER_URI}/api/products/menus/`, body)
    .then(res => {
      let menu = res.data.menu;

      let newMenuData = {
        mid: menu._id,
        name: menu.hebName,
        description: menu.hebDescription,
        meals: menu.meals
      };

      let newMenus = menus.splice(menus.length, 0, newMenuData);
      setMenus(newMenus);

      console.log(`Created ${menu._id}`);
    }).catch(err => console.error(err));
  }

  const deleteMenu = (mid) => {
    axios.delete(`${process.env.REACT_APP_SERVER_URI}/api/products/menus/${mid}`)
    .then(() => {
      let newMenus = meals.filter(menu => menu.mid !== mid);
      setMenus(newMenus);
      console.log(`Deleted ${mid}`);
    })
    .catch(err => console.error(err));
  }

  const editMenu = (mid, body) => {
    axios.patch(`${process.env.REACT_APP_SERVER_URI}/api/products/menus/${mid}`, body)
    .then(res => {
      let menuResp = res.data.menu;
      let newMenuData = {
        mid: menuResp._id,
        name: menuResp.hebName,
        description: menuResp.hebDescription,
        meals: menuResp.meals
      };

      let newMenus = menus.filter(menu => menu.mid !== mid);
      newMenus.push(newMenuData);
      setMenus(newMenus);

      console.log(`Edited ${mid}`);
    })
    .catch(err => console.error(err));
  }

  const fetchMeals = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/api/products/meals`)
    .then(res => {
      let meals = [];
      res.data.meals.forEach(meal => {
        let new_meal = {
          mid: meal._id,
          name: meal.hebName,
          category: meal.kosherCategory,
          description: meal.description,
          ingredients: meal.ingredients
        };
        meals.push(new_meal);
      });
      setMeals(meals);
      setLoading(false);
    })
    .catch(err => {
      setLoading(false);
      setErrorMessage(true);
      console.log(err);
    });
  };

  const fetchMenus = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/api/products/menus`)
      .then(res => {
          let menus = [];
          res.data.menus.forEach(menu => {
            let newMenu = {
              mid: menu._id,
              name: menu.hebName,
              meals: menu.meals,
              description: menu.hebDescription,
            };
            menus.push(newMenu);
          });
          setMenus(menus);
          setLoading(false);
        })
      .catch(err => {
          setLoading(false);
          setErrorMessage(true);
          console.log(err);
        });
  };

  return (
      <div style={{padding: '8px'}}>

        {/* Header */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          direction: 'rtl',
          alignItems: 'baseline'
        }}>
          <div style={{textAlign: 'right'}}>
            <Typography variant="h4">
              {'תפריטים'}
            </Typography>
          </div>

          <div>
            <Button
                variant="outlined"
                style={{backgroundColor: '#012345', color: 'white'}}
                onClick={handleAddButtonClick}>
              {'הוסף תפריט'}
            </Button>
          </div>
        </div>

        {/* Add menu dialog */}
        {
          (addDialogOpen) ?
              <AddMenuDialog
                  isOpenVar={addDialogOpen}
                  isOpenFuncHandle={setAddDialogOpen}
                  handleAdd={addMenu}
                  meals={meals}
              />
              : ''
        }


        {/* Body */}
        {
          (loading) ?
              <center>
                <CircularProgress/>
              </center>
              :
              (menus.length > 0) ?
                  <div>
                    {
                      menus.map(menu => (
                          <div style={{padding: '4px'}}>
                            <Menu
                                name={menu.name}
                                description={menu.description}
                                mid={menu.mid}
                                menusMeals={menu.meals}
                                allMeals={meals}
                                handleDeleteClick={deleteMenu}
                                handleEditClicked={editMenu}
                            />
                          </div>
                      ))
                    }
                  </div>
                  :
                  (errorMessage) ?
                      <center>
                        <div>
                          Error has been occurred.
                        </div>
                      </center>
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

export default Menus;
