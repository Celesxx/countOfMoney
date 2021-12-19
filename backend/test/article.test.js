// global.TextEncoder = require("util").TextEncoder;
// global.TextDecoder = require("util").TextDecoder;
// const server = require("../server");
// // const chai = require("chai");
// // const chaiHttp = require("chai-http");
// // const expect = require("chai").expect


// // chai.use(chaiHttp)
// // const requester = chai.request(server).keepOpen()


// before(done =>
// {
//     server.on("start", function()
//     {
//         done()
//     })
// })

// // after(function(done){
// //     requester.close();
// //     done()
// // })


// describe("Testing all user request", function()
// {
//     let userId = "61bf62a06a37ceb705a7879c"
//     let userToken
    

//     describe("user login", function()
//     {
//         let error, response

//         before(function(done) 
//         {
//             server.post(`/users/login/`)
//             .send(
//             {
//                 "email": "cameron@epitech.eu",
//                 "password" : "123"
//             })
//             .end(function(err, resp) 
//             {
//                 error = err
//                 response = resp
//                 userToken = resp.body.token
//                 done()
//             })
//         })

//     })



//     describe("create article", function()
//     {
//         let error, response

//         before(function(done) 
//         {
//             requester.post("/users/register")
//             .set({'x-access-token': userToken})
//             .send(
//             {
//                 "title": "Article test",
//                 "source": "https://Article.test.com",
//                 "content": "Ceci est la description du super test article",
//                 "tags": ["Crypto", "Test","Lol", "BTC"],
//                 "image": "",
//                 "visible": true,
//                 "published_at": "2021-01-01 08:30:00"
//             })
//             .end(function(err, resp) 
//             {
//                 error = err
//                 response = resp
//                 userId = resp.body.id
//                 userToken = resp.body.token
//                 done()
//             })
//         })

//         it("Is article created ?", function(){ expect(response).to.have.status(200) })
//         it("Is state equal to true ?", function(){ expect(response.body.state).is.not.null })
        
//     })


//     describe("get article with search parameter", function()
//     {
//         let error, response

//         before(function(done) 
//         {
//             requester.get(`/articles??title=First`)
//             .set({'x-access-token': userToken})
//             .end(function(err, resp) 
//             {
//                 error = err
//                 response = resp
//                 done()
//             })
//         })

//         it("Is get article ?", function(){ expect(response).to.have.status(200) })
//         it("Is state equal to true ?", function(){ expect(response.body.state).to.be.true })
//         it("Is return data object?", function(){ expect(response.body.data).to.be.a("object") })
//         it("Is return data value ?", function(){ expect(response.body.data.title).is.not.null })

//     })
    
// })
