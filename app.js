const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

// set security HTTP header
app.use(helmet())

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// limit requests from same API
const limiter = rateLimit({
  max: 100, // istek sayısı
  windowMs: 60 * 60 * 1000, // 1 saat
  message: 'too many requests from this IP, please try again in an hour!'
})
app.use('/api', limiter)

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))

// data sanitization againt NoSQL query injection
app.use(mongoSanitize())

// data sanitization againt XSS
app.use(xss())

// prevent parameter pollution
app.use(hpp({
  whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'maxGroupSize', 'difficulty', 'price']
}))

// serving static files
app.use(express.static(`${__dirname}/public`))


app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

module.exports = app
