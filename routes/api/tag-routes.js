const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Brings back tag data
router.get('/', (req, res) => {
});

// Brings back tag data based on ID
router.get('/:id', (req, res) => {
});

// Create a new tag
router.post('/', (req, res) => {

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
