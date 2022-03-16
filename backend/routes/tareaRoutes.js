const express = require('express');
const router = express.Router();
const {getTareas, postTareas, putTareas, delTareas} = require('../controllers/tareaControllers')
const {protect} = require ('../middleware/authMiddleware')

router.route('/').get(protect, getTareas).post(protect, postTareas)
router.route('/:id').put(protect, putTareas).delete(protect, delTareas)

module.exports = router