const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Review = mongoose.model("Review", {
    rating: {
      type: Number,
      min: 0,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      minlength: 0,
      maxlength: 150,
      trim: true,
      required: true
    },
    username: {
      type: String,
      minlength: 3,
      maxlength: 15,
      trim: true,
      required: true
    }
});

const Product = mongoose.model("Product", {
    title: String,
    description: String,
    price: Number,
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category"},

    reviews: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review"
        }
      ],
      averageRating: { type: Number, min: 0, max: 5 }
});

///PRODUCT///
// CREATE  
router.post("/product/create", async (req, res) => {
    try {
        if (req.body.title && req.body.description && req.body.price && req.body.category) {
          const newProduct = new Product({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
          });
  
          await newProduct.save();
          res.json({ message: "New Product created" });
        } else {
          res.status(400).json({
            error: {message: "Product Creation Error"}
          });
        }
      
    } catch (error) {
      res.status(400).json({ error: { message: "An error occurred" } });
    }
  });

  
  // READ
  router.get("/product", async (req, res) => {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (error) {
      res.status(400).json({ error: { message: "An error occurred" } });
    }
  });
  
  
  // UPDATE
  router.post("/product/update", async (req, res) => {
    try {
      const product = await Product.findById(req.body.id);
      if (product) {
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        product.category = req.body.category;
        await product.save();
        res.json({ message: "Product modified" });
      } else {
        res.status(400).json({
          error: {message: "Bad request"}
        });
      }
    } catch (error) {
      res.status(400).json({ error: { message: "An error occurred" } });
    }
  });
  
  // DELETE
  router.post("/product/delete", async (req, res) => {
    try {
        if (req.body.id) {      
            const product = await Product.findById(req.body.id)
            .find()
            .populate("product");

            await product.remove();
            res.json({ message: "Product deleted" });
      } else {
        res.status(400).json({
          error: {message: "Bad request"}
        });
      }
    } catch (error) {
      res.status(400).json({ error: { message: "An error occurred" } });
    }
  });

    // REVIEW
    //CREATE
    router.post("/review/create", async (req, res) => {
    try {
        const product = await Product.findById(req.body.product);

        const newReview = new Review({
            rating: req.body.rating,
            comment: req.body.comment,
            username: req.body.username,
          });
  
        if (product.reviews === undefined) {
        product.reviews = [];
        }
        
        product.reviews.push(newReview); 
        await product.save();
        res.json({ message: "Review of product created" });
    } catch (error) {
      res.status(400).json({ error: { message: "An error occurred" } });
    }
  });

  // UPDATE
  router.post("/review/update", async (req, res) => {
    try {
      const product = await Product.findById(req.body.id);
      if (product) {
        //product.reviews = req.body.review;
        //product.averageRating = req.body.;
    
        await product.save();
        res.json({ message: "Review of product modified" });
      } else {
        res.status(400).json({
          error: {message: "Bad request"}
        });
      }
    } catch (error) {
      res.status(400).json({ error: { message: "An error occurred" } });
    }
  });


  module.exports = router;