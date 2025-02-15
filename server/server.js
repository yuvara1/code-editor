const mysql = require('mysql2/promise');

const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 5000;


app.use(cors());
app.use(express.json());

// GET endpoint to read file content
app.get('/read', (req, res) => {
     const filename = req.query.fileName;
     fs.readFile(`${filename}`, 'utf8', (err, data) => {
          if (err) {
               console.error('Error reading file:', err);
               res.status(500).send('Error reading file');
          } else {
               res.send(data);
          }
          console.log(req)
     });
});


// POST endpoint to append data to file
app.post('/appendFile', (req, res) => {
     const dataToAppend = req.body.content;

     const filePath = req.body.fileName;
     fs.writeFile(`${filePath}`, dataToAppend, (err) => {
          if (err) {
               console.error('Error appending to file:', err);
               res.status(500).send('Error appending to file');
          } else {
               res.send('Data deleted to file successfully');
               console.log('Data appended:', dataToAppend);
          }
     })

});

app.post('/set', (req, res) => {
     const path = req.body.con;

     fs.readFile(path, 'utf8', (err, data) => {
          if (err) {
               console.error('Error reading file:', err);
               res.status(500).send('Error reading file');
          } else {
               res.send(data);
          }
          console.log(req)
     });

});

const db = mysql.createPool({
     host: 'localhost',
     user: 'root',
     password: 'Yuvaraj@1',
     database: 'editor'
});


app.get('/users', async (req, res) => { // Make the handler async
     try {
          const name = req.query.name;
          const [rows] = await db.query(`SELECT * FROM editor.userinfo WHERE Name = "${name}"`); // Await the query
          res.json(rows);
          console.log('Data fetched successfully');
     } catch (error) {
          console.error('Error fetching users:', error);
          res.status(500).send('Error fetching users');
     }
});

app.listen(port, () => {
     console.log(`Server listening on port ${port}`);
});


