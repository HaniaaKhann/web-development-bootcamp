import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;

app.set("view engine", "ejs"); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "BooksDatabase",
  password: "",
  port: 5432,
});

db.connect();

// HOME - READ ALL BOOKS

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM books ORDER BY created_at DESC");
    res.render("index.ejs", { books: result.rows });
  } catch (err) {
    console.log(err);
    res.send("Error loading books.");
  }
});


// SHOW ADD FORM

app.get("/add", (req, res) => {
  res.render("add.ejs");
});


// ADD NEW BOOK

app.post("/add", async (req, res) => {
  const { title, author, rating, notes, isbn, date_read } = req.body;

  try {
    await db.query(
      "INSERT INTO books (title, author, rating, notes, isbn, created_at) VALUES ($1, $2, $3, $4, $5, $6)",
      [title, author, rating, notes, isbn, date_read]
    );
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send("Error adding book.");
  }
});


// SHOW EDIT FORM (PREFILLED)

app.get("/edit/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const result = await db.query("SELECT * FROM books WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return res.send("Book not found.");
    }

    res.render("edit.ejs", { book: result.rows[0] }); 
  } catch (err) {
    console.log(err);
    res.send("Error loading edit page.");
  }
});


// UPDATE BOOK

app.post("/edit/:id", async (req, res) => {
  const id = req.params.id;
  const { title, author, rating, notes, isbn } = req.body;

  try {
    await db.query(
      "UPDATE books SET title = $1, author = $2, rating = $3, notes = $4, isbn = $5 WHERE id = $6",
      [title, author, rating, notes, isbn, id]
    );

    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send("Error updating book.");
  }
});


// DELETE BOOK

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await db.query("DELETE FROM books WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send("Error deleting book.");
  }
});

app.get("/api/book/:isbn", async (req, res) => {
  const isbn = req.params.isbn;

  try {
    const response = await axios.get(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
    );

    const bookData = response.data;

    res.json({
      title: bookData.title,
      publish_date: bookData.publish_date,
      publishers: bookData.publishers
    });

  } catch (error) {
    console.log(error.message);
    res.status(404).json({ error: "Book not found" });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

