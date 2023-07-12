// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

const showDate = (dateUrl, res) => {
  let date;

  if (dateUrl) {
    if (!/[^0-9$]/g.test(dateUrl)) {
      dateUrl = parseInt(dateUrl)
    }

    date = new Date(dateUrl)

    if (date.toString() === 'Invalid Date') {
      res.json({ error: 'Invalid Date' })
      return
    }
  } else {
    date = new Date()
  }

  res.json({ unix: date.getTime(), utc: date.toUTCString() })
}

// your first API endpoint... 
app.get("/api/:dateUrl", function (req, res) {
  let dateUrl = req.params.dateUrl
  showDate(dateUrl, res)
});

app.get("/api/", function (req, res) {
  showDate(null, res)
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log('http://localhost:'+listener.address().port)
});
