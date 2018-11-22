const url = require('url');

const RootController = require('./controllers/root');
const TemplateController = require('./controllers/template');
const NotFoundController = require('./controllers/not_found');

const routes = {
  '/': {
    'GET': RootController
  },
  '/template': {
    'POST': TemplateController
  }
};

function router(request, response) {
  const parsedUrl = url.parse(request.url);

  const routeHandler = routes[parsedUrl.pathname] &&
                       routes[parsedUrl.pathname][request.method];

  if (!routeHandler) {
    return NotFoundController(request, response);
  }

  return routeHandler(request, response);
}

module.exports = router;