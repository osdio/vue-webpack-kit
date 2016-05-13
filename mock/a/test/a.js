module.exports = {
  '/test': function (req, res, next) {
    res.json({
      test: 'ok'
    });
    next();
  }
};
