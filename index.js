const express = require("express");
const app = express();
const indexRoutes = require("./routes/indexRoutes.js");
app.use(express.urlencoded({ extended: true }));
const path = require("path");

const port = 1337;


app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use('/Images', express.static(path.join(__dirname, 'Images')));
app.use(indexRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});

