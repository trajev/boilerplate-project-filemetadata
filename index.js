var express = require('express');
var cors = require('cors');
require('dotenv').config()
let multer = require("multer");

var app = express();

app.use(cors());
app.use(express.json());
app.use( express.urlencoded({extended: true}) );
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});


const upload = multer({dest: "uploads/"});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res)=>{
  let file = req.file ;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

console.log( file );

  res.json( {name: file.originalname, type: file.mimetype, size: parseInt(file.size) } );

})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
