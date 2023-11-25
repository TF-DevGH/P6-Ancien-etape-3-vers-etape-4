const express = require('express');
const router = express.Router();
const multer = require('../config/multer-config');

const authorize = require('../middleware/authorize');
const authMiddleware = require('../middleware/auth');
const stuffCtrl = require('../controllers/stuff');

// Assurez-vous que le chemin statique est correct
router.use('/images', express.static('backend/images'));

router.get('/', authMiddleware, authorize, stuffCtrl.getAllThings);

// Utilisez multer.single('image') ici pour la route POST
router.post('/', authMiddleware, authorize, multer, stuffCtrl.createThing);

router.get('/:id', authMiddleware, authorize, stuffCtrl.getOneThing);

// Utilisez multer.single('image') ici pour la route PUT
router.put('/:id', authMiddleware, authorize, multer, stuffCtrl.modifyThing);

router.delete('/:id', authMiddleware, authorize, stuffCtrl.deleteThing);

module.exports = router;
