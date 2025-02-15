const isAuthenticated = (req, res, next) => {
  if (req.session.user){
    console.log('isAuthenticated');
    next();
  } else {
    console.log('Unauthorized');
    res.status(401).send('Unauthorized');
  }
    
}


module.exports = { isAuthenticated }