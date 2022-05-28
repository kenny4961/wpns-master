const express = require("express");
const log = console.log;
const app = express();
const path = require("path");
const sendmail = require("./mail");
const PORT = 8080;
const routes = require("./routes/index");
const v = require("./routes/virtual");
const c = require("./routes/contact")
const a=require("./routes/about")
const iO = require("./routes/in")
app.set("view engine", "ejs")
log('loaded');

const epp=require("./mail")
// data Rendering
app.use(
  express.urlencoded({
    extended: false,
  }));
app.use(express.json());
//For sending the email


app.post('/email',  (req, res) => {
  const { subject, email, text } = req.body;
  console.log('Data: ', req.body);
  
  sendmail(email, subject, text, function(err, data) {
    if (err) {
      res.status(500).json({ message:'Internal Errorr'})
    } else {
      res.json({ message: 'Email Sent!' })
      console.log('mail sent');
   }
  });

});


app.post('/sent',  (req, res) => {
  const { subject, sent, text } = req.body;
  console.log('Data: ', req.body);
  
  epp(sent, subject, text, function(err, data) {
    if (err) {
      res.status(500).json({ message: 'Internal EEEErrorr' })
      console.log('not sent')
    } else {
      res.json({ message:'Email Sent!'})
   }
  });

});


//serveing Files
app.use("/", routes);
app.use("/virtual", v);
app.use("/index", routes);
app.use("/contact", c);
app.use("/About", a);
app.use("/In-Office", iO);

app.use("/public", express.static("public"));



app.listen(PORT, () => {
  log("Server is starting on PORT", 8080);
});
