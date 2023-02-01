
const express = require('express');
const morgan = require('morgan');
const config = require('config')
const winston = require('winston')

require('express-async-errors')

const genreRouter = require('./routes/genre_routes');
const customerRouter = require('./routes/customer_routes');
const movieRouter = require('./routes/movie_routes')
const rentalRouteer = require('./routes/rental_routes')
const userRouter = require('./routes/user_routes')
const authRouter = require('./routes/auth_route')
const errorMiddleware = require('./middleware/errorMiddleware')





if(!config.get('jwtPrivateKey')){
    console.log('FATAL Error : jwtPrivateKey env not set')
    process.exit(1)
}
const app = express();




app.use(express.json())
//app.use(morgan('tiny'));
//winston.add(new winston.transports.MongoDB({ db : 'mongodb://127.0.0.1/movie-app'}));


app.use('/api/genres' , genreRouter);
app.use('/api/customers' , customerRouter);
app.use('/api/movies' , movieRouter)
app.use('/api/rentals' , rentalRouteer)
app.use('/api/users' , userRouter)
app.use('/api/auth' , authRouter)

app.use(errorMiddleware)

const server = app.listen(5000, ()  => {
    console.log('Server listening on port 5000');
})


module.exports = server
