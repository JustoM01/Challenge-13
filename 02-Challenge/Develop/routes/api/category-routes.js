const router = require('express').Router();
const { Category, Product } = require('../../models');
const { findOne } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: 
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }
      })

      .then(dbCatData => {
        if (!dbCatData) {
            res.status(404).json({ message: 'No categories found.' });
            return;
        }
        res.json(dbCatData);

    })
  // be sure to include its associated Products
});

router.get('/:id', async(req, res) => {
  // find one category by its `id` value
try{
 let findOne = await Category.findOne({
    where: {
        id: req.params.id
    },
    include: [
     {
     model: Product,
     attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
]
})
res.json(findOne)
}catch(err) {
  console.error(err)
  res.status(500).json({message:err.message})
}
  // be sure to include its associated Products
  
});

router.post('/', async (req, res) => {
  // create a new category
  try {
  let newCategory = await  Category.create({
      category_name: req.body.category_name
  }) 
  res.json(newCategory) 
  } catch(err) {
    console.error(err)
    res.status(500).json({message:err.message})
  }

});


router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
