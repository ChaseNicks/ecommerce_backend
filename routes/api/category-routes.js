const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// brings back category data
router.get('/', (req, res) => {
  try {

    const categoryReq = await Category.findAll({
      include: [{ model: Product}],
    });
    res.status(200).json(categoryReq);

    } catch (err) {
      res.status(500).json(err);
    }

});

// brings back category based on ID needed
router.get('/:id', (req, res) => {
  try {
    const categoryReqID = await Category.findAll({
      include: [{ model: Product }],
    });

    if (!categoryReqID) {
      res.status(404).json({ message: "No corresponding category for the requested ID"})
      return;
    }
    res.status(200).json(categoryReqID);
  } catch (err) {
    res.status(500).json(err);
  }

});


// For new categories
router.post('/', (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
