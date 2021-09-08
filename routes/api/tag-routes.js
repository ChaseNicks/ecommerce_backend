const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// Route to get all tags in database
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'taggedProducts' }]
    });
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to find a single tag by its 'id' value
router.get('/:id', async (req, res) => {
  try {
    const singleTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'taggedProducts' }]
    });

    if (!singleTagData) {
      res.status(404).json({ message: 'No tag found with this id.' });
      return;
    }

    res.status(200).json(singleTagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a single tag based on its 'id' value
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    );

    res.status(201).json(updatedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a single tag based on its 'id' value
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deletedTag) {
      res.status(404).json({ message: 'There is no tag with that id' });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (error) {
    res.status(500).json(err);
  }
});

module.exports = router;
