const Classroom = require('../../../models/clients/class-room');
const Meal = require('../../../models/products/meal');
const Side = require('../../../models/products/side');

const getByDay = async (request, response) => {
  try {
    const elementToGet = request.params.element;
    const whereToLook = elementToGet === 'meals' ?
        'usualWeeklyMenu' :
        'usualWeeklySides';
    const dayInWeek = request.params.day;

    const classrooms = elementToGet === 'meals' ?
        await Classroom.find({}).
            select([`${whereToLook}.${dayInWeek}`, 'kids']).
            populate(`${whereToLook}.${dayInWeek}`)
        :
        await Classroom.find({}).
            select([`${whereToLook}.${dayInWeek}`, 'kids']);

    const elementsAndAmounts = {};
    const responseBody = {};

    if (elementToGet === 'meals') {
      classrooms.forEach(classroom => {
        const kids = classroom.kids;
        classroom.usualWeeklyMenu[dayInWeek] &&
        classroom.usualWeeklyMenu[dayInWeek].meals.forEach(mealId => {
          if (mealId in elementsAndAmounts) {
            elementsAndAmounts[mealId] += kids;
          } else {
            elementsAndAmounts[mealId] = kids;
          }
        });
      });

      for (const mealId in elementsAndAmounts) {
        const amount = elementsAndAmounts[mealId];
        const meal = await Meal.findById(mealId);
        const category = meal.kosherCategory;
        const hebName = meal.hebName;

        const mealDescription = {
          hebName,
          mealId,
          amount,
        };

        if (category in responseBody) {
          responseBody[category].push(mealDescription);
        } else {
          responseBody[category] = [mealDescription];
        }
      }
    }

    // elementToGet === 'sides'
    else {
      classrooms.forEach(classroom => {
        const kids = classroom.kids;
        classroom.usualWeeklySides[dayInWeek] &&
        classroom.usualWeeklySides[dayInWeek].forEach(sideId => {
          if (sideId in elementsAndAmounts) {
            elementsAndAmounts[sideId] += kids;
          } else {
            elementsAndAmounts[sideId] = kids;
          }
        });
      });

      for (const sideId in elementsAndAmounts) {
        const side = await Side.findById(sideId);
        const category = side.category;

        const sideDescription = {
          hebName: side.hebName,
          sideId,
          amount: elementsAndAmounts[sideId],
        };

        if (category in responseBody) {
          responseBody[category].push(sideDescription);
        } else {
          responseBody[category] = [sideDescription];
        }
      }
    }
    response.status(200).json({dailyReport: responseBody});
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return response.status(404).json({msg: err.message});
    }
    response.status(500).json({err: err.message});
  }
};

// todo: need to add the week option for sides
const getByWeek = async (request, response) => {
  const weekDays = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu'
  ];
  const weeklyMenuByDatesAndAmounts = {};

  try {
    for (const dayInWeek of weekDays) {
      const classrooms = await Classroom.find().
          select(['kids']).
          populate({ path: `usualWeeklyMenu.${dayInWeek}`, populate: {
            path: 'meals' }
          });

      const mealsAndAmounts = {};
      classrooms.forEach(classroom => {
        const kids = classroom.kids;
        classroom.usualWeeklyMenu[dayInWeek].meals.forEach(meal => {
          if (meal in mealsAndAmounts) {
            mealsAndAmounts[meal._id] += kids;
          } else {
            mealsAndAmounts[meal._id] = kids;
          }
        });
      });

      const mealTypesMealIdAndAmount = {};
      for (const mealId in mealsAndAmounts) {
        const amount = mealsAndAmounts[mealId];
        const meal = await Meal.findById(mealId);
        const category = meal.kosherCategory;
        const hebName = meal.hebName;

        const mealDescription = {
          hebName,
          mealId,
          amount,
        };

        if (category in mealTypesMealIdAndAmount) {
          mealTypesMealIdAndAmount[category].push(mealDescription);
        } else {
          mealTypesMealIdAndAmount[category] = [mealDescription];
        }
      }

      weeklyMenuByDatesAndAmounts[dayInWeek] = mealTypesMealIdAndAmount;
    }

    response.status(200).json({weeklyReport: weeklyMenuByDatesAndAmounts});
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return response.status(404).json({msg: err.message});
    }
    response.status(500).json({err: err.message});
  }
};

// todo: need to add the week option for sides
const getTotalsByWeek = async (request, response) => {
  const weekDays = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu'
  ];

  const weeklyMenuByMealsAndAmounts = {};

  try {
    for (const dayInWeek of weekDays) {
      const classrooms = await Classroom.find().
          select(['kids']).
          populate({ path: `usualWeeklyMenu.${dayInWeek}`, populate: { path: 'meals' }
          });

      const mealsAndAmounts = {};
      classrooms.forEach(classroom => {
        const kids = classroom.kids;
        classroom.usualWeeklyMenu[dayInWeek].meals.forEach(meal => {
          if (meal in mealsAndAmounts) {
            weeklyMenuByMealsAndAmounts[meal.hebName] += kids;
          } else {
            weeklyMenuByMealsAndAmounts[meal.hebName] = kids;
          }
        });
      });
    }

    response.status(200).json({weeklyReport: weeklyMenuByMealsAndAmounts});
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return response.status(404).json({msg: err.message});
    }
    response.status(500).json({err: err.message});
  }
};

exports.getByDay = getByDay;
exports.getByWeek = getByWeek;
exports.getTotalsByWeek = getTotalsByWeek;
