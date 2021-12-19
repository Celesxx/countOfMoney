global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;
const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);
const expect = require("chai").expect;
const requester = chai.request(server).keepOpen();

after(function(){
    requester.close();
})


describe("Testing all user request", function()
{
    let userId, userToken
    let userEmail = "mochaTest@epitech.eu"
    
    describe("user register", function()
    {
        let error, response

        before(function(done) 
        {
            requester.post("/users/register")
            .send(
            {
                "email": "mochaTest@epitech.eu",
                "username" : "mochaTest",
                "role" : "admin",
                "password" : "123"
            })
            .end(function(err, resp) 
            {
                error = err
                response = resp
                userId = resp.body.id
                userToken = resp.body.token
                done()
            })
        })

        it("Is return user ?", function(){ expect(response).to.have.status(200) })
        it("Is return user token ?", function(){ expect(response.body.token).is.not.null })
        it("Is return user id ?", function() { expect(response.body.id).is.not.null })
        
    })


    describe("user logout", function()
    {
        let error, response

        before(function(done) 
        {
            requester.post(`/users/logout/${userId}`)
            .set({'x-access-token': userToken})
            .end(function(err, resp) 
            {
                error = err
                response = resp
                done()
            })
        })

        it("Is logout ?", function(){ expect(response).to.have.status(200) })
        it("Is state equal to true ?", function(){ expect(response.body.state).to.be.true })        
    })
    




    describe("user login", function()
    {
        let error, response

        before(function(done) 
        {
            requester.post(`/users/login/`)
            .set({'x-access-token': userToken})
            .send(
            {
                "email": "mochaTest@epitech.eu",
                "password" : "123"
            })
            .end(function(err, resp) 
            {
                error = err
                response = resp
                userToken = resp.body.token
                done()
            })
        })

        it("Is logged ?", function(){ expect(response).to.have.status(200) })
        it("Is state equal to true ?", function(){ expect(response.body.auth).to.be.true })
        it("Is return user token ?", function() { expect(response.body.token).is.not.null })

    })

    describe("get users", function()
    {
        let error, response

        before(function(done) 
        {
            requester.get(`/users`)
            .set({'x-access-token': userToken})
            .end(function(err, resp) 
            {
                error = err
                response = resp
                done()
            })
        })

        it("Is logged ?", function(){ expect(response).to.have.status(200) })
        it("Is state equal to true ?", function(){ expect(response.body.state).to.be.true })

    })

    describe("get users by id", function()
    {
        let error, response

        before(function(done) 
        {
            requester.get(`/users/profile/${userId}`)
            .set({'x-access-token': userToken})
            .end(function(err, resp) 
            {
                error = err
                response = resp
                done()
            })
        })

        it("Is logged ?", function(){ expect(response).to.have.status(200) })
        it("Is state equal to true ?", function(){ expect(response.body.state).to.be.true })
        it("Is return data object?", function(){ expect(response.body.data).to.be.a("object") })
        it("Is return data value ?", function(){ expect(response.body.data.email).is.not.null })
                
    })

    describe("get users by mail", function()
    {
        let error, response

        before(function(done) 
        {
            requester.get(`/users/getUserByMail?email=${userEmail}`)
            .set({'x-access-token': userToken})
            .end(function(err, resp) 
            {
                error = err
                response = resp
                done()
            })
        })

        it("Is logged ?", function(){ expect(response).to.have.status(200) })
        it("Is state equal to true ?", function(){ expect(response.body.state).to.be.true })
        it("Is return data value ?", function(){ expect(response.body.data.email).is.not.null })
                
    })

    describe("update users by id", function()
    {
        let error, response

        before(function(done) 
        {
            requester.put(`/users/profile/${userId}`)
            .set({'x-access-token': userToken})
            .send(
                {
                    "email": "mochaTest@epitech.eu",
                    "username" : "MOCHATEST",
                    "role" : "admin",
                    "password" : "123"
                })
            .end(function(err, resp) 
            {
                error = err
                response = resp
                done()
            })
        })

        it("Is updated ?", function(){ expect(response).to.have.status(200) })
        it("Is state equal to true ?", function(){ expect(response.body.state).to.be.true })
                
    })


    describe("delete users by id", function()
    {
        let error, response

        before(function(done) 
        {
            requester.delete(`/users/${userId}`)
            .set({'x-access-token': userToken})
            .end(function(err, resp) 
            {
                error = err
                response = resp
                done()
            })
        })

        it("Is deleted ?", function(){ expect(response).to.have.status(200) })
        it("Is state equal to true ?", function(){ expect(response.body.state).to.be.true })
                
    })
    
})
