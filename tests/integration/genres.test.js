
const request = require('supertest')

const mongooseConnection = require('../../mongoConnection')
const {GenreModel} = require('../../models/genreModel');

let server;

describe('/api/genres' , () => {
    
    beforeEach(() => {
        server = require('../../index') 
    })

    afterEach( async () => {
        server.close()
        await GenreModel.remove({})
    })

    afterAll(() => {
        mongooseConnection.connection.close()
    })

    describe('GET /' , () => {
        it('Should return all genres' , async () => {
             await GenreModel.insertMany([
                { name : 'Action'},
                { name : 'Comdey'}
             ])

            const res = await request(server).get('/api/genres')
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(2)
        })  
    }) 

    describe('GET /:id' , () => {
        it('Should return all genres' , async () => {
              const genre = new GenreModel({ name : 'Thriller'})

              await genre.save()

              const res = await request(server).get('/api/genres/' + genre._id)

              expect(res.status).toBe(200)
              expect(res.body._id).toBe(genre._id)
        })  
    }) 
})  