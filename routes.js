'use strict';

module.exports = function(app) {
  app.use('/user/', require('./api/user'));

  // Handle 404 case
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(function(req, res) {
     res.status(200).json({ message: 'Page not found' });
   });
};
