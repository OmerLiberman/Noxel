const express = require('express');
const {check} = require('express-validator');

const ReportsController = require('../../controllers/reports/reports');

const router = express.Router();

router.get('/day/:day/:element', ReportsController.getByDay);

router.get('/week/:element', ReportsController.getByWeek);

router.get('/week/totals/:element', ReportsController.getTotalsByWeek);

module.exports = router;