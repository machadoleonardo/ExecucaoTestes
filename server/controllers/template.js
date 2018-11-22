const faker = require('faker');
const extractBody = require('../utils/extract_body');

function TemplateController(request, response) {
  extractBody(request, (body) => {
  const template = body.template;
  const result = faker.fake(template);

  response.setHeader(
    'content-type', 'application/json; charset=UTF-8'
  );

  response.write(JSON.stringify({ result }));
  response.end();
 });
}

module.exports = TemplateController;