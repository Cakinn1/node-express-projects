// usually you add whatever the middleware is to a different file like this then export
// and use it in the main file/whatever file it is needed in

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  // this will push us to the block of code where logger is being
  // excuted
  next();
};

module.exports = logger;
