const express = require('express');
const router = express.Router();
const {getTareas, postTareas, putTareas, delTareas} = require('../controllers/tareaControllers')

router.route('/').get(getTareas).post(postTareas)
router.route('/:id').put(putTareas).delete(delTareas)

module.exports = router