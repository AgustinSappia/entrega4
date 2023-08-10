const mongoose = require('mongoose')
const chai = require('chai')
const { createHash, passwordValidation } = require('../src/utils')
const createStatsCollector = require('mocha/lib/stats-collector')
const UserDTO = require('../src/dto/User.dto')

const expect = chai.expect

describe('TEsting de Bcrypt', ()=> {
    it('El servicio deve devolver un haseo efectivo del password', async ()=>{
        const  password = 'pass123456'
        const hasedPass = await createHash(password)
        console.log(hasedPass) 
        expect(hasedPass).to.not.equal(password)
    })
    it('El servicio poder comparar de manera efectiva el password con el hash', async ()=>{
        const  password = 'pass123456'
        const hasedPass = await createHash(password)
        const userDbMock = {password: hasedPass}
        const isValidPAss = await passwordValidation(userDbMock, password)
        expect(isValidPAss).to.be.true
    })

})
describe('Testing DTo', ()=> {
    it('El servicio debe devolver uun usuario con fullname y menos campos', async ()=>{
        let userMock = {
            first_name: 'Fede1',
            last_name: 'Osandón1',
            email: 'o1@gmail.com',
            password: '123456'
        }

        const userDtoResult = UserDTO.getUserTokenFrom(userMock)
        expect(userDtoResult).to.have.property('name', `${userMock.first_name} ${userMock.last_name}`)
        expect(userDtoResult).to.not.have.property('first_name')
        expect(userDtoResult).to.not.have.property('last_name')
    })
    

})

