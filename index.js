import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.post("/weather", async (req,res)=>{
  const city = req.body.city;
  try {
    const result =  await axios.get(`https://api.openweathermap.org/data/2.5/weather`, 
    {
      params: {
        q: city,
        units: "metric",
        appid:API_KEY
      }
    }
  );
    console.log(result.data)
    res.render("index", {weather: result.data, error: null} );
  } catch (error) {
    res.render("index.ejs", { weather: null, error: "City not found. Please Try again" });
  }
});


app.get("/", async (req,res) =>{
  res.render("index", {weather: null, error: null});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
