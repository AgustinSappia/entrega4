const chai = require('chai')
const supertest = require('supertest')

const expect = chai.expect
const requester = supertest('http://localhost:8080')

let qwe = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpcnN0X25hbWUiOiJxd2UiLCJsYXN0X25hbWUiOiJxd2UiLCJlbWFpbCI6InF3ZSIsInJvbCI6ImFkbWluIiwiYWdlIjoxMzQsImNhcnQiOiI2NDgxMTZmOWVjOTU0NGE3M2I4YmMxN2QifSwiaWF0IjoxNjkxNjExNjQ0LCJleHAiOjE2OTE2OTgwNDR9.SdLkRAqyJyXv_CMEjUtJyW710xP9INrX1CDVX-V3wWQ"



describe('Testing', ()=>{
    let cookie
    describe('Test de Session', ()=>{
        it('El servicio debe registrar un usuario correctamente', async ()=>{
            let userMock = {
                first_name: 'pruebaSuper',
                last_name: 'pruebon',
                email: 'prueba@gmail.com',
                password: '123456',
                age: 23
            }
            const {_body} = await requester.post('/api/session/register').send(userMock)
            console.log(_body)
            expect(_body).to.be.ok
        })
        it('El servicio debe loguear un usuario correctamente y devolver una cookie', async ()=>{
            let userMock = {
                email: 'prueba@gmail.com',
                password: '123456'
            }

            const result = await requester.post('/api/session/login3').send(userMock)
            const cookieResult = result.headers['set-cookie'][0]
            //console.log(cookieResult)
            expect(cookieResult).to.be.ok
            // seteado en cookie el jwt
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }

             expect(cookie.name).to.be.ok.and.eql('tokenCookie')
             expect(cookie.value).to.be.ok
        })
        it('Debe enviar el jwt del usuario y consultar la ruta current', async ()=>{
            const {_body} = await requester.get('/api/session/current').set('Cookie', [`${cookie.name}=${cookie.value}`])
            expect(_body.email).to.be.equal('prueba@gmail.com')
        })
    })

    describe("test de products",()=>{

        it('El endpoint de Post /api/products debe crear un producto correctamente', async ()=>{
            const productMock = {
                title: 'prueba', 
                description: 'prueba',
                price: 25,
                thumbnail: "asdasd",
                code: "prueba123",
                stock: 32,
            }
            const {statusCode, _body, ok} = await requester.post('/api/products').set("Cookie",[`${cookie.name}=${cookie.value}`]).send(productMock)
            expect(_body).to.have.property('newProduct')
        })
        it('El endpoint de GET /api/products debe traer todas los productos correctamente', async ()=>{
            const {statusCode, ok} = await requester.get('/api/products').set("Cookie",[`${cookie.name}=${cookie.value}`])
            // no hay respuesta porque el endpoint esta renderizando /products
            expect(ok).to.be.equal(true)
            expect(statusCode).to.be.equal(200)
        })
        it('El endpoint de GET by id debe traer un producto', async ()=>{
            let pid = '64d42b43f714a4b2cb0b07a1'
            const response = await requester.get(`/api/products/${pid}`).set("Cookie",[`${cookie.name}=${cookie.value}`])
            console.log(response.body)
            expect(response.statusCode).to.equal(200)
            expect(response.body).to.have.property('_id')
            expect(response.body._id).to.equal(pid)
        })
    })

    describe("test de cart",()=>{

        it('El endpoint de GET /api/cart debe traer todas los carts correctamente', async ()=>{
            const {statusCode, _body, ok} = await requester.get('/api/cart').set("Cookie",[`${cookie.name}=${cookie.value}`])
            console.log(_body)
            expect(ok).to.be.equal(true)
            expect(statusCode).to.be.equal(200)
        })
        it('El endpoint de GET by id debe traer un carrito', async ()=>{
            let cid = '645ff5f7d43ade4e65d5993e'
            const response = await requester.get(`/api/cart/${cid}`).set("Cookie",[`${cookie.name}=${cookie.value}`])
            console.log(response.body)
            expect(response.statusCode).to.equal(200)
            expect(response.body)

        })

        it('el endpoint de delete product by id debe eliminar un producto alojado en un cart', async()=>{
            let cid = '645ff5f7d43ade4e65d5993e'
            let pid = '6462aa510a734227d9b2aa4b'
            const response = await requester.delete(`/api/cart/${cid}/products/${pid}`).set("Cookie",[`${cookie.name}=${cookie.value}`])
            expect(response.statusCode).to.equal(200)
            expect(response.body)           
        })
    })   

    
})