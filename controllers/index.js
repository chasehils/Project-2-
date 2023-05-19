// middleman, collects and exports all the controller 
// functions from different modules, making them 
// accessible to other parts of application 

const guitarsCtrl = require('./guitars');
const usersCtrl = require('./users');
const reviewsCtrl = require('./reviews');


module.exports = {
  guitarsCtrl,
  usersCtrl,
  reviewsCtrl,
}