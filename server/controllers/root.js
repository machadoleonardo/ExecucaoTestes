const faker = require('faker');
const url = require('url');
const querystring = require('querystring');

function RootController(request, response) {
  const parsedUrl = url.parse(request.url);
  const parameters = querystring.parse(parsedUrl.query);

  const result = faker.fake(parameters.template);

  response.write(result);
  response.end();
}

module.exports = RootController;