const express = require('express');
const app = express();

// clients routes
app.use('/clients/classrooms', require('./routes/clients/class-room'));
app.use('/clients/schools', require('./routes/clients/school'));
app.use('/clients/payers', require('./routes/clients/payer'));

// products routes
app.use('/products/ingredients', require('./routes/products/ingredient'));
app.use('/products/meals', require('./routes/products/meal'));
app.use('/products/menus', require('./routes/products/menu'));
app.use('/products/sides', require('./routes/products/side'));

// reports routes
app.use('/reports', require('./routes/reports/reports'));

// users routes
app.use('/users', require('./routes/users/user'));
app.use('/users/drivers', require('./routes/users/driver'));

// changes routes
app.use('/changes', require('./routes/changes/change'));

// auth routes
app.use('/auth', require('./routes/auth/auth'));

// stats
app.use('/stats', require('./routes/stats/stats'));

module.exports = app;
