const startServer = require('./server')

// initDB().then(() => {
//   startServer()
// })
console.log(JSON.stringify(process.env))
startServer()
