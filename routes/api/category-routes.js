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
    const categoryReqID = await Category.findByPk(req.params.id, {
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

// updated category based on ID
router.put('/:id', (req, res) => {
  try {
    const updatedCategory = await Category.update({
      category_name: req.body.category_name,
    }, {
    where: {
        id: req.params.id,
    },
  });
  if (!updatedCategory) {
    res.status(404).json({ message: "No category found with the referenced id"});
    return;
  }
  res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err)
  }
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const deleteCategory = await Category.delete({ 
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).json({ message: "No category found with the referenced id"});
      return;
    } 
      res.status(200).json(deleteCategory);
    } catch (err) {
        res.status(500).json(err);
  }
});

module.exports = router;
