import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Users from "../views/Users/Users";
import Drivers from "../views/Drivers/Drivers";
import Meals from "../views/Meals/Meals";
import Menus from "../views/Menus/Menus";
import RawMaterials from "../views/RawMaterials/RawMaterials";
import Reports from "../views/Reports/Reports";
import Stamps from "../views/Stamps/Stamps";
import SideProducts from "../views/SideProducts/SideProducts";
import { Changes } from "../views/Changes/Changes";
import SignIn from "../views/SignIn/SignIn";
import Dashboard from "../views/Dashboard/Dashboard";
import { NotFound } from "../views/NotFound/NotFound";
import Classrooms from "../views/Clients/views/Classrooms/Classrooms";
import Schools from "../views/Clients/views/Schools/Schools";
import Payers from "../views/Clients/views/Payers";

// import MainLayout from '../layouts/MainLayout';

import PrivateRoute from "./PrivateRoute";

export const Routes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/users" component={Users} />
      <PrivateRoute exact path="/drivers" component={Drivers} />
      <PrivateRoute exact path="/meals" component={Meals} />
      <PrivateRoute exact path="/menus" component={Menus} />
      <PrivateRoute exact path="/raw-materials" component={RawMaterials} />
      <PrivateRoute exact path="/reports" component={Reports} />
      <PrivateRoute exact path="/stamps" component={Stamps} />
      <PrivateRoute exact path="/clients/classrooms" component={Classrooms} />
      <PrivateRoute exact path="/clients/schools" component={Schools} />
      <PrivateRoute exact path="/clients/payers" component={Payers} />
      <PrivateRoute exact path="/side-products" component={SideProducts} />
      <PrivateRoute exact path="/changes" component={Changes} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/" component={<Redirect to="/dashboard" />} />
      <Route exact path="/login" component={SignIn} />
      <Route component={NotFound} />
    </Switch>
  );
};