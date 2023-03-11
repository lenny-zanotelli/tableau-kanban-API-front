const express = require('express');
const path = require('path');

/* -------------- Controllers -------------- */

const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');

/* -------------- Routes -------------- */

const router = express.Router();

router.get('/', (req, res) => {
  let filePath = path.join(__dirname, "../assets/index.html")
  res.sendFile(filePath);
});

/** Lists */
router.get('/lists', listController.getAllLists);
router.get('/lists/:id', listController.getOneList);
router.post('/lists', listController.createList);
router.put('/lists/:id', listController.modifyList);
router.delete('/lists/:id', listController.deleteList);

/* Cards */
router.get('/lists/:id/cards', cardController.getCardsInList);
router.get('/cards/:id', cardController.getOneCard);
router.post('/cards', cardController.createCard);
router.put('/cards/:id', cardController.modifyCard);
router.delete('/cards/:id', cardController.deleteCard);


/* Tags */
router.get('/tags', tagController.getAllTags);
router.get('/tags/:id', tagController.getOneTag);
router.post('/tags', tagController.createTag);
router.put('/tags/:id', tagController.modifyTag);
router.delete('/tags/:id', tagController.deleteTag);
router.post('/cards/:id/tags', tagController.associateTagToCard);
router.delete('/cards/:cardId/tags/:tagId', tagController.removeTagFromCard);


module.exports = router;