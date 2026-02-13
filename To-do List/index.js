import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "",
  port: 5432,
});
db.connect();


app.get("/", async (req, res) => {
  try{
    const result = await db.query("SELECT * FROM items ORDER BY id ASC");

    res.render("index.ejs", {
    listTitle: "Today",
    listItems: result.rows,
  });
 } catch(err) {
  console.log(err);
 }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  // items.push({ title: item });
  try {
    await db.query("INSERT INTO items (title) VALUES ($1)", [item]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/edit", async(req, res) => {
  const updateditemId = req.body.updatedItemId;
  const updatedText = req.body.updatedItemTitle;
  try{
    await db.query("UPDATE items SET title = $1 WHERE id = $2", [updatedText, updateditemId]);
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});

app.post("/delete", async(req, res) => {
  const todeleteid = req.body.deleteItemId;

  try{
    await db.query("DELETE FROM items WHERE id = $1", [todeleteid]);
    res.redirect("/");
  }catch(err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
