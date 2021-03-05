import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { fetchTodayMeals } from "../../redux/actions/meals";
import { fetchTodaySides } from "../../redux/actions/sides";
import {
  fetchKidsNum,
  fetchClassroomsNum,
  fetchSchoolsNum,
} from "../../redux/actions/stats";
import { fetchWeeklyMeals } from "../../redux/actions/meals";

import { DateDisplay } from "./Components/DateDisplay";
import Grid from "@material-ui/core/Grid";
import FoodSectionCard from "./Components/FoodSectionCard";
import SaladsCard from "./Components/SaladsCard/SaladsCard";
import NumberDisplayCard from "./Components/NumberDisplayCard";
import WeeklyMenu from "./Components/WeeklyMenu";
import DateDisplayCard from "./Components/DateDisplayCard";

const Dashboard = ({
  fetchTodayMeals,
  todayMeals,
  fetchTodaySides,
  todaySides,
  kidsNum,
  fetchKidsNum,
  classroomsNum,
  fetchClassroomsNum,
  schoolsNum,
  fetchSchoolsNum,
  weeklyMealsMenu,
  fetchWeeklyMeals,
  username
}) => {
  const [loading, setLoading] = useState(true);

  const [meat, setMeat] = useState({
    meatMeals: null,
    loadingMeatMeals: true,
  });
  const [vegi, setVegi] = useState({
    vegiMeals: null,
    loadingVegiMeals: true,
  });
  const [parve, setParve] = useState({
    parveMeals: null,
    loadingParveMeals: true,
  });
  const [salads, setSalads] = useState({
    saladsElements: null,
    loadingSalads: true,
  });
  const [weeklyMenu, setWeeklyMenu] = useState({
    value: null,
    loading: true,
  });

  useEffect(() => {
    const f = async () => {
      await fetchTodayMeals();
      await fetchTodaySides();
      await fetchKidsNum();
      await fetchClassroomsNum();
      await fetchSchoolsNum();
      await fetchWeeklyMeals();
    };
    f().then((r) => setLoading(false));
  }, []);

  const saladsValues = todaySides && todaySides.salad;
  const spreads = todaySides && todaySides.spread;
  const plastics = todaySides && todaySides.plastic;
  const breads = todaySides && todaySides.bread;

  return (
    <div style={{ direction: "rtl" }}>
      <center>
        <DateDisplay name={username}/>
      </center>
      <Grid
        container
        style={{
          width: "100%",
          paddingTop: "10px",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
          <DateDisplayCard name={username}/>
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
          <NumberDisplayCard
            title={"מוסדות"}
            value={schoolsNum.value}
            loading={schoolsNum.loading}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
          <NumberDisplayCard
            title={"כיתות"}
            value={classroomsNum.value}
            loading={classroomsNum.loading}
          />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={6} xs={6}>
          <NumberDisplayCard
            title={"ילדים"}
            value={kidsNum.value}
            loading={kidsNum.loading}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <FoodSectionCard
            title={"ירק"}
            type={"vegi"}
            meals={todayMeals.vegi}
            loading={loading}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <FoodSectionCard
            title={"פחמימה"}
            type={"parve"}
            meals={todayMeals.parve}
            loading={loading}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={4} sm={6} xs={12}>
          <FoodSectionCard
            title={"בשר"}
            type={"meat"}
            meals={todayMeals.meat}
            loading={loading}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <SaladsCard
            salads={saladsValues}
            spreads={spreads}
            plastics={plastics}
            breads={breads}
            loading={loading}
          />
        </Grid>
        <Grid
          item
          xl={12}
          lg={12}
          md={12}
          sm={12}
          xs={12}
          style={{ minHeight: 330 }}
        >
          <WeeklyMenu
            weeklyMenu={weeklyMealsMenu}
            loading={weeklyMealsMenu.loading}
          />
        </Grid>
        {/*<Grid item xl={4} lg={4} md={4} sm={12} xs={12}>*/}
        {/*  <RequestCard />*/}
        {/*</Grid>*/}
      </Grid>
    </div>
  );
};

Dashboard.propTypes = {
  todayMeals: PropTypes.object,
  fetchTodayMeals: PropTypes.func.isRequired,
  todaySides: PropTypes.object,
  fetchTodaySides: PropTypes.func.isRequired,
  kidsNum: PropTypes.object,
  fetchKidsNum: PropTypes.func.isRequired,
  classroomsNum: PropTypes.object,
  fetchClassroomsNum: PropTypes.func.isRequired,
  schoolsNum: PropTypes.object,
  fetchSchoolsNum: PropTypes.func.isRequired,
  weeklyMealsMenu: PropTypes.object,
  fetchWeeklyMeals: PropTypes.func.isRequired,
  username: PropTypes.string
};

const mapStateToProps = (state) => ({
  todayMeals: state.meals.dailyReport,
  todaySides: state.sides.dailyReport,
  weeklyMealsMenu: state.meals.weeklyReport,
  kidsNum: state.stats.kids,
  classroomsNum: state.stats.classrooms,
  schoolsNum: state.stats.schools,
  username: state.auth && state.auth.user && state.auth.user.username
});

export default connect(mapStateToProps, {
  fetchTodayMeals,
  fetchTodaySides,
  fetchWeeklyMeals,
  fetchKidsNum,
  fetchClassroomsNum,
  fetchSchoolsNum,
})(Dashboard);
