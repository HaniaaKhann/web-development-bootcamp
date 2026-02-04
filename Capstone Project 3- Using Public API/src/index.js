import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port=3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res)=>{
    res.render("index.ejs", {content: "Generate a random joke..."});
});


app.post("/get-joke", async(req, res)=>{
    try{
        const result = await axios.get(`https://v2.jokeapi.dev/joke/${req.body.category}`);
        res.render("index.ejs", { data :result.data
        });
    } catch (error){
        console.log(error.response.data);
    }
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);

});