const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


const Category = mongoose.model("Category", {
    title: String,
    description: String,
    department: {type: mongoose.Schema.Types.ObjectId, ref: "Department"}
});

//CATEGORY // 
// CREATE  
router.post("/category/create", async (req, res) => {
    try {
  
      if (req.body.title && req.body.description && req.body.department) {
          const newCategory = new Category({
            title: req.body.title,
            description: req.body.description,
            department: req.body.department
          });
          await newCategory.save();
          res.json({ message: "New Category created" });
        } else {
          res.status(400).json({
            error: {message: "Category Creation Error"}
          });
        }
      
    } catch (error) {
      res.status(400).json({ error: { message: "An error occurred" } });
    }
  });
  
  
  // READ
  router.get("/category", async (req, res) => {
    try {
      const categories = await Category.find().populate("department");
      res.json(categories);
    } catch (error) {
      res.status(400).json({ error: { message: "An error occurred" } });
    }
  });
  
  
  // UPDATE
  router.post("/category/update", async (req, res) => {
    try {
      const category = await Category.findById(req.query.id);
      const department = await Department.findById(req.body.department);

      if (category && department) {
        category.title = req.body.title;
        category.description = req.body.description;
        category.department = req.body.department;
        await category.save();
        res.json({ message: "Category modified" });
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
  router.post("/category/delete", async (req, res) => {
    try {
        const category = await Category.findById(req.query.id);
      if (category) {  
          await category.remove();
          res.json({ message: "Category deleted" });
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