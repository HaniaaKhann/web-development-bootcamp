import express from "express";
import bodyParser from "body-parser";
let posts =[];


const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {posts});
});

app.post("/submit", (req, res) => {
  const id = Date.now();
  const author = req.body.name;
  const title = req.body.title;
  const content = req.body.content;
  posts.push({id, author, title, content});
  res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
  const idToDelete = Number(req.params.id);
  posts = posts.filter(post => post.id !== idToDelete);
  res.redirect("/");
});

app.get("/edit/:id", (req, res)=> {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);

  if(!post) {
    return res.redirect("/");
  }
  res.render("edit.ejs", {post});
})

app.post("/edit/:id", (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);

  if (!post) {
    return res.redirect("/");
  }

  post.title = req.body.title;
  post.content =req.body.content;
  post.author = req.body.name;
  res.redirect("/");

})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

