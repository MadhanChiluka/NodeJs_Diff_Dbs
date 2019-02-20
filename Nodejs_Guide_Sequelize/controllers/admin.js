const Product = require('../models/product')

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', 
    {pageTitle: 'Add-Product', 
    path: '/admin/add-product', 
    // productCss:true, 
    // formsCss: true, 
    // activeProduct: true,
    editing: false
  })

    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  }

  exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    req.user.createProduct({
      title: title,
      imageUrl: imageUrl,
      price: price,
      description: description,
      userId: req.user.id
    })
    .then(res => {
      console.log(res);
      res.redirect('/');
    }).catch(err => console.log(err))
    // const product = new Product(null, title, imageUrl, price, description);
    // product.save().then(() => {
    //   res.redirect('/');
    // }).catch(err => console.log(err));
  }

  exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode){
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    req.user.getProducts({where: {id: prodId}})
    //  Product.findById(prodId)
    .then(products => {;
      const product = products[0]
      if(!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
      });
    }).catch(err => console.log(err));

    // Product.findById(prodId, product => {
    //   if(!product){
    //     return res.redirect('/');
    //   }
    //   res.render('admin/edit-product', {
    //   pageTitle: 'Edit Product', 
    //   path: '/admin/add-product', 
    //   editing: editMode,
    //   product: product
    //   })  
    // })
    
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  }

  exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc =  req.body.description;
    Product.findById(prodId).then(product => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.descriptioon = updatedDesc;
       return product.save();
    }
    ).then(res => {
      console.log('Product Updated!');
      res.redirect('/admin/products');
    }).catch(err => console.log(err));
    // const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedPrice, updatedDesc);
    // updatedProduct.save();
    // console.log(updatedProduct)
  }

  exports.getAdminProducts = (req, res, next) => {
    req.user.getProducts()
    //  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      })
    }).catch(error => console.log(error));

    // Product.fetchAllProducts((products) => {
    //     res.render('admin/products', {
    //       prods : products, 
    //       pageTitle : 'Admin Products', 
    //       path: '/admin/products', 
    //       // hasProducts: products.length > 0, 
    //       // productCss: true,
    //       // activeShop: true
    //       });
    //   })
  }

  exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId).then(product => {
      return product.destroy();
    })
    .then(res => {
      console.log('Product Destroyed');
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err));
    // Product.deleteById(prodId);
  }