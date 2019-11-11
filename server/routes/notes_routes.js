const router = require('express').Router();

const notes_controller = require('../controllers/notes_controller')

router.get('/test',notes_controller.test);

router.post('/create',notes_controller.create);

router.get('/:id',notes_controller.notes_details);

router.put('/update/:id',notes_controller.notes_update);

router.delete('/delete/:id',notes_controller.notes_delete);

module.exports = router;