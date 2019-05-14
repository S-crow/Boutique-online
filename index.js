const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const departmentRoutes = require("./department");
const categoryRoutes = require("./category");
const productRoutes = require("./product");

app.use(departmentRoutes);
app.use(categoryRoutes);
app.use(productRoutes);

app.listen(process.env.PORT || 3007, () => {
    console.log("Server started");
});

