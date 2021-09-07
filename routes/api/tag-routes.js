const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Brings back tag data
router.get('/', (req, res) => {
  try {
    const tagRequest = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "tagged_Products"}],
    });
    res.status(200).json(tagRequest);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Brings back tag data based on ID
router.get('/:id', (req, res) => {
  try {
    const tagReqID = await Tag.findByPk({
      include: [{  model: Product, through: ProductTag, as: "tagged_Products" }],
    });

    if (!tagReqID) {
      res.status(404).json({ message: "No corresponding tag for the requested ID"})
      return;
    }
    res.status(200).json(tagReqID);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new tag
router.post('/', (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  try {
    const updatedTag = await Tag.update({
      tag_name: req.body.tag_name,
    }, {
    where: {
        id: req.params.id,
    },
  });
  if (!updatedTag) {
    res.status(404).json({ message: "No tag found with the referenced id"});
    return;
  }
  res.status(200).json(updatedTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const deleteTag = await Tag.delete({ 
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).json({ message: "No category found with the referenced id"});
      return;
    } 
      res.status(200).json(deleteTag);
    } catch (err) {
        res.status(500).json(err);
  }
});

module.exports = router;
