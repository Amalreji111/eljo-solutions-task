const express = require('express');
const { Env, EnvKeys } = require('./env');
const app = express();

// app.use((req, res, next) => {
//   console.log('Time: ', Date.now());
//   next();
// });

app.get('/', (req, res) => {
  res.send('Successful response.');
});

const port = Env.get(EnvKeys.PORT)||3000
app.listen(port, () => {
console.log(`Server running on port ${port}`)
// console.log('')
});