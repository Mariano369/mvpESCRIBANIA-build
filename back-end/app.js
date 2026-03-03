const dotenv = require('dotenv')
dotenv.config({ path: `${__dirname}/config/.env.development` })

const express = require('express')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')

const app = express()
app.set('filesFolder', __dirname + '/../dist/img')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, XMLHttpRequest, authorization, *')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(fileupload())

const dbConfig = require('./config/database.config.js')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// Connecting to the database
mongoose.set('strictQuery', false)
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err)
    // process.exit();
  })

require('./app/routes/suscriptores.routes.js')(app)
require('./app/routes/paises.routes.js')(app)
require('./app/routes/datospaises.routes.js')(app)

const nodemailer = require('nodemailer')
const transport = {
  host: 'smtp.gmail.com',
  port: '465',
  auth: {
    user: 'marianomartingl@gmail.com',
    pass: 'jmls irsm gfxm trnk',
  },
}
app.use(express.json())
const transporter = nodemailer.createTransport(transport)
transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('All works fine, congratz!')
  }
})
app.set('sendEmail', async function (emailDetails, extra) {
  return new Promise((resolve, reject) => {
    const mail = {
      from: emailDetails.name,
      to: emailDetails.email,
      subject: emailDetails.subject,
      html: emailDetails.message,
    }

    if (emailDetails.bcc) mail.bcc = emailDetails.bcc

    if (typeof addICal === 'function' && extra && extra.sendWithIcal) {
      addICal(mail, extra)
    }

    transporter.sendMail(mail, (err, data) => {
      if (err) {
        console.log('err', err)
        reject({ msg: 'fail' })
      } else {
        console.log('data', data)
        resolve({ msg: 'success' })
      }
    })
  })
})
app.post('/api/sendEmail', async (req, res, next) => {
  try {
    const name = req.body.name
    const email = req.body.email
    const message = req.body.messageHtml
    const subject = req.body.subject
    const result = await app.get('sendEmail')({ name, email, message, subject }, req.body.extra)
    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ msg: 'fail', error: 'Internal Server Error' })
  }
})

app.use('/images', express.static(__dirname + '/../dist/img'))

module.exports = app
