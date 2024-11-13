const express = require('express');
const router = express.Router();
const { createProperty, getProperties, getProperty, updateProperty, deleteProperty } = require('../controllers/propertyController');
const auth = require('../middleware/auth');

router.post('/', auth, createProperty);
router.get('/', getProperties);
router.get('/:id', getProperty);
router.put('/:id', auth, updateProperty);
router.delete('/:id', auth, deleteProperty);

module.exports = router;