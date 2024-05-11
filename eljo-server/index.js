const express = require('express');
const { Env, EnvKeys } = require('./env');
const { EmailSender } = require('./utils/email-sender');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 100000000 }));

app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true, parameterLimit: 100000000 }));


require('./app/routes')(app);
app.get('/', (req, res) => {
  res.send('Successful response.');
});

const port = Env.get(EnvKeys.PORT)||3000

app.listen(port,async () => {
console.log(`Server running on port ${port}`)
// const sg=new EmailSender()
// await sg.addTo('alenreji100@gmail.com')
// .setSubject("LOGIN CRED")
// .setTextContent("hello your login credential for eljo solution is:")
// .setHTMLContent('<h1>hello your login credential for eljo solution is:</h1>')
// .send()

});