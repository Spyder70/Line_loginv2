import dotenv from "dotenv";
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import qs from 'qs';
global.__dirname = path.resolve();
import * as menuBounds from './Richmenus/menubounds.js';
dotenv.config();

const corsOptions = {
  allowedHeaders: ['Origin', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'], 
  origin: ['http://localhost:5173'],
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}
const app = express();
app.use(express.json());
app.use(cors(corsOptions)); // CORS to enable run our backend in other ports also

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// To check the database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
  } else {
    console.log('Connected to the database!');
  }
});

app.post('/wayne_ent', (req, res) => {
  const formData = req.body.formData;

  const sql = 'INSERT INTO clubs (form_data) VALUES (?)';

  connection.query(sql, [JSON.stringify(formData)], (err, result) => {
    if (err) {
      console.error('Error saving form data:', err);
      res.status(500).json({ error: 'Internal Server Error', message: err.message });
    } else {
      console.log('Form data saved successfully');
      res.status(200).json({ success: true });
    }
  });
});

app.get('/clubs', (req, res)=>{
   connection.query('SELECT * from clubs', (err, result)=>{
    if(err){
      res.send(err);
    }else if(result){
      res.send(result);
    }})
})

app.get('/club/:id', (req, res)=>{
  connection.query(`SELECT * from clubs where id =(?)`,[req.params.id], (err, result)=>{
    if(err){
      res.send(err);
    }else if(result){
      res.send(result);
    }
  })
})

app.post('/create/:clubid', (req, res)=>{
  const form = req.body.form;
  const formData = req.body.formData;
  connection.query(`create table if not exists group${req.params.clubid}(
    id INT primary key auto_increment
    ${form.map((item, index)=>(index!==0 ? `${item.name.replace(/\s/g, '_')} VARCHAR (40)` : null)).join(',')}
  );`, (err, result)=>{
    if(err){
      res.send(err);
    }else if(result){
      res.send(result);
    }
  });
})
app.post('/insert/:clubid', (req, res)=>{
  const form = req.body.form;
  const formData = req.body.formData;
  connection.query(`INSERT INTO group${req.params.clubid} (${form.map((item,index)=>(index!==0 ? `${item.name.replace(/\s/g, '_')}` : null)).join(',').slice(1)}) 
  VALUES (${formData.map((item,index)=>(index!==0 ? `?` : null)).join(',').slice(1)});`,formData.map((item, index)=> ((typeof item) === "object" ? JSON.stringify(item) : item)).slice(1), (err, result)=>{
    if(err){
      res.send(err);
    }else if(result){
      res.send(result);
    }
  });
});

app.get('/clubdata/:id', (req,res)=>{
  connection.query(`SELECT * FROM group${req.params.id}` ,(err, result)=>{
    if (err){
      res.send(err);
    }else if(result){
      res.send(result);
    }
  })
})

app.post('/richmenu1/:type', (req,res)=>{
  const type = req.params.type;
  const urls = req.body.uris;
  const config = {
    headers: {
      "Authorization":"Bearer WYpFxegG/Aj/UprPcZ7eon/b+OgKPRdxc5hrcypBYzymBoh23Xt7ESVfL8oBuND8C6q08aNrLmtTwBMMcMJ717BfIjtRP6cwMPWs1SeDi4OP7eXn1Cf2lxF9X7i8qbWgTWxwgTm275Ojt8gxy7eVGQdB04t89/1O/w1cDnyilFU",
      "Content-Type": "application/json",
    },
  };

  const data = {
    size: {
      width: 2500,
      height: 1686,
    },
    selected: false,
    name: "Test the default rich menu",
    chatBarText: "Tap to open",
    areas: urls.map((url, index)=>(
      {
        bounds: {
          x: menuBounds[`areas_${urls.length}_${type}`][index].x,
          y: menuBounds[`areas_${urls.length}_${type}`][index].y,
          width: menuBounds[`areas_${urls.length}_${type}`][index].width,
          height: menuBounds[`areas_${urls.length}_${type}`][index].height,
        },
        action: {
          type: "uri",
          label: `Tap area ${index}`,
          uri: url
        }
      }
    )) 
  };
  
  axios
    .post("https://api.line.me/v2/bot/richmenu", data, config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
    });
})

app.post('/richmenu2/:id', (req,res)=>{
  const richMenuId = req.body.menuId;
  const imageName = req.body.imageName;
  const imageUrl = `./Frontend/public/Images/Areas-${req.params.id}/type-${imageName}.jpeg`;
  const imageBuffer = fs.readFileSync(imageUrl);
  const channelAccessToken = 'WYpFxegG/Aj/UprPcZ7eon/b+OgKPRdxc5hrcypBYzymBoh23Xt7ESVfL8oBuND8C6q08aNrLmtTwBMMcMJ717BfIjtRP6cwMPWs1SeDi4OP7eXn1Cf2lxF9X7i8qbWgTWxwgTm275Ojt8gxy7eVGQdB04t89/1O/w1cDnyilFU';
  const apiUrl = `https://api-data.line.me/v2/bot/richmenu/${richMenuId}/content`;
  const headers = {
    'Authorization': `Bearer ${channelAccessToken}`,
    'Content-Type': 'image/png',
  };

  axios.post(apiUrl, imageBuffer, { headers })
  .then(response => {
    console.log(response);
    res.send('success');
  })
  .catch(error => {
    console.log(error);
    res.status(200).json(error);
  });
})

app.post('/richmenu3', (req,res)=>{
  const richMenuId = req.body.menuId;
  const channelAccessToken = 'WYpFxegG/Aj/UprPcZ7eon/b+OgKPRdxc5hrcypBYzymBoh23Xt7ESVfL8oBuND8C6q08aNrLmtTwBMMcMJ717BfIjtRP6cwMPWs1SeDi4OP7eXn1Cf2lxF9X7i8qbWgTWxwgTm275Ojt8gxy7eVGQdB04t89/1O/w1cDnyilFU';

const url = `https://api.line.me/v2/bot/user/all/richmenu/${richMenuId}`;

const headers = {
  'Authorization': `Bearer ${channelAccessToken}`,
};

axios.post(url, null, { headers })
  .then(response => {
    res.send(response.data);
  })
  .catch(error => {
    res.send(error.response.data);
  });
});

app.get('/images/:id', (req,res)=>{
  fs.readdir(path.join(__dirname, `/Frontend/public/Images/Areas-${req.params.id}`), (err, files)=>{
    if(err){
      res.send(err);
    }else{
      res.send(files.map(file=> file));
    }
  })
})

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});