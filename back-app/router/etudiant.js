var express = require('express');
var router = express.Router();
var productControllers = require('../controlleurs/etudiant.controlleur');

router.post('/', productControllers.createEtudiant);
router.get('/', productControllers.getEtudiant);
router.get('/:id', productControllers.getEtudiantById);
router.put('/:id', productControllers.updateEtudiant);
router.delete('/:id', productControllers.deleteEtudiant);

module.exports = router;