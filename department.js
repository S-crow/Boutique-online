const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();


mongoose.connect(
    "mongodb://localhost/boutiqueOnline",
    { useNewUrlParser: true }
  );

const Department = mongoose.model("Department", {
    title: String,
  });

//*** DEPARTMENT ***/  
// CREATE  
router.post("/department/create", async (req, res) => {
    try {
        
        if (req.body.title) {
            const newDepartment = new Department({
            title: req.body.title,
          }); 
  
          await newDepartment.save();
          res.json({ message: "New Department created" });
        } else {
          res.status(400).json({
            error: {message: "Department Creation Error"}
          });
        }
      
    } catch (error) {
      res.status(400).json({ error: { message: "department An error occurred" } });
    }
  }); 
  
  
  // READ
  router.get("/department", async (req, res) => {
    try {
      const departments = await Department.find();
      res.json(departments);
    } catch (error) {
      res.status(400).json({ error: { message: "An error occurred" } });
    }
  });
  
  // UPDATE
  router.post("/department/update", async (req, res) => {
    try {
      const department = await Department.findById(req.query.id);
      if (department) {
        department.title = req.body.title;
        await department.save();
        res.json({ message: "Department modified" });
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
  router.post("/department/delete", async (req, res) => {
    try {
        const department = await Department.findById(req.query.id);
      if (department) {
          await department.remove();

          const categories = await Category.find({
            department: req.query.id
          });
          await categories.remove();

          res.json({ message: "Department deleted" });
      } else {
        res.status(400).json({
          error: {message: "Missing id"}
        });
      }
    } catch (error) {
      res.status(400).json({ error: { message: "An error occurred" } });
    }
  });
  
  module.exports = router;