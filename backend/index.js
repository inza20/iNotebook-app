const connectToMongo= require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();

const app = express()
const port = 5000


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(cors())
app.use(express.json())    
//to use request.body , you’ll have to use a middleware - app.use()

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

// app.get('/api/v1/login', (req, res) => {
//     res.send('Hello login!')
// })

// app.get('/api/v1/signup', (req, res) => {
//     res.send('Hello signup!')
// })

app.listen(port, () => {
    console.log(`Backend listening on port ${port}`)
})