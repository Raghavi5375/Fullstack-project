const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const collection = require("./mongodb")

const templatePath = path.join(__dirname, '../templates')

app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', templatePath)
app.use(express.urlencoded({ extended: false }))


app.get('/', (req, res) => {
    res.render('front')
})
app.get('/first', (req, res) => {
    res.render('first')
})
app.get('/login', (req, res) => {
    res.render('login')
})
app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/home', (req, res) => {
    res.render('home')
})
app.get('/results', (req, res) => {
    res.render('results')
})
app.get('/adm', (req, res) => {
    res.render('adm')
})
app.get('/addpodcast', (req, res) => {
    res.render('addpodcast')
})

app.get('/namasteindia', (req, res) => {
    res.render('namasteindia')
})
app.get('/tedtalksdaily', (req, res) => {
    res.render('tedtalksdaily')
})
app.get('/masalapodcast', (req, res) => {
    res.render('masalapodcast')
})
app.get('/thebigfatindianghotala', (req, res) => {
    res.render('thebigfatindianghotala')
})
app.get('/mahabarath', (req, res) => {
    res.render('mahabarath')
})
app.get('/ranvvershow', (req, res) => {
    res.render('ranvvershow')
})
app.get('/truestory', (req, res) => {
    res.render('truestory')
})
app.get('/decodeoil', (req, res) => {
    res.render('decodeoil')
})
app.get('/chanakyaniti', (req, res) => {
    res.render('chanakyaniti')
})
app.get('/mymythpat', (req, res) => {
    res.render('mymythpat')
})
app.get('/meditatewithgurudev', (req, res) => {
    res.render('meditatewithgurudev')
})
app.get('/modernlove', (req, res) => {
    res.render('modernlove')
})
app.get('/dilkholestarsbole', (req, res) => {
    res.render('dilkholestarsbole')
})
app.get('/everylittlething', (req, res) => {
    res.render('everylittlething')
})


app.post('/signup', async (req, res) => {

    const data = {
        name:req.body.name,
        password:req.body.password
    }
    const checking = await collection.findOne({ name: req.body.name })
   try{
    if (checking && checking.name === req.body.name && checking.password===req.body.password) {
        res.send('<script>alert("user details already exists"); window.location.href="/first";</script>');
    }
    else{
        await collection.insertMany([data])
    }
   }
   catch {
    res.send('<script>alert("wrong details"); window.location.href="/first";</script>');
}
    res.render("home", {
        naming: req.body.name
    })
})

app.post('/login', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.render("home")
        }
        else {
            res.send('<script>alert("Incorrect password"); window.location.href="/first";</script>');
        }
    } 
    catch (e) {
        res.send('<script>alert("wrong details"); window.location.href="/first";</script>');
    }
})


app.listen(3000, () => {
    console.log('port connected');
})