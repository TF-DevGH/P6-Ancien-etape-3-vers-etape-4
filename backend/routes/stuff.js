const express = require('express');
const router = express.Router();
const multer = require('../config/multer-config');

const authorize = require('../middleware/authorize');
const authMiddleware = require('../middleware/auth');
const stuffCtrl = require('../controllers/sauce');

// Assurez-vous que le chemin statique est correct
router.use('/images', express.static('backend/images'));

router.get('/', authMiddleware, authorize, stuffCtrl.getAllSauces);

// Utilisez multer.single('image') ici pour la route POST
router.post('/', authMiddleware, authorize, multer, stuffCtrl.createSauce);

router.get('/:id', authMiddleware, authorize, stuffCtrl.getOneSauce);

// Utilisez multer.single('image') ici pour la route PUT
router.put('/:id', authMiddleware, authorize, multer, stuffCtrl.modifySauce);

router.delete('/:id', authMiddleware, authorize, stuffCtrl.deleteSauce);

module.exports = router;
