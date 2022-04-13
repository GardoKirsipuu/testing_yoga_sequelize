let chai = require('chai');
let chaiHttp = require('chai-http');
var expect  = require("chai").expect;
const {request} = require('http');
chai.use(chaiHttp);

describe('Creating and deleting article POST', () => {

	it('Create article with correct data', (done) => {
		var url = "http://localhost:3000"

		chai.request(url).post('/admin/article/create')
			.send({ id: 10,
					name: 'test name',
					slug: 'test-slug',
					image: 'test-image',
					body: 'test body' })
			.end(function(err, res){
				//if err throw err;
				expect(res.statusCode).to.equal(200)
				done();
		})
	})

	it('Delete article', (done) => {
		var url = "http://localhost:3000"

		chai.request(url).post('/admin/article/delete/10')
			.end(function(err, res){
				//if err throw err;
				expect(res.statusCode).to.equal(200)

				done();
		})
	})
	
})