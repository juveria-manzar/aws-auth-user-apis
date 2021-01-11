const db = require('../database');
const User = require('./User');
const { success, errResponse } = require('../authentication/AuthenticationHelpers');

module.exports.myProfile = (r, cb) => {
  cb.callbackWaitsForEmptyEventLoop = false;
  return db()
    .then(() => myProfile(r.requestContext.authorizer.principalId))
    .then(res => success(res))
    .catch(err => errResponse(err));
};

function myProfile(id) {
  return User.findById(id)
    .then(user => !user ? Promise.reject('User not found.') : user)
    .catch(err => Promise.reject(new Error(err)));
}

module.exports.allUsers =(r,cb)=>{
    cb.callbackWaitsForEmptyEventLoop = false;
    return db()
    .then(() => allUsers())
    .then(res => success(res))
    .catch(err => errResponse(err));
}

function allUsers() {
    return User.find()
      .then(users => !users ? Promise.reject('No Users Exist') : users)
      .catch(err => Promise.reject(new Error(err)));
}

module.exports.aUser = (event,context,callback)=>{
    context.callbackWaitsForEmptyEventLoop = false;
    let user_id = event.pathParameters.id;
    return db()
    .then(() => myProfile(user_id))
    .then(res => success(res))
    .catch(err => errResponse(err));   
}

function updateUser(id,body){
    return User.findByIdAndUpdate(id,JSON.parse(body))
    .then(user => !user ? Promise.reject('You are not authorized to update the user details.') : user)
    .catch(err => Promise.reject(new Error(err)));
}
module.exports.updateUser=(event,context,callback)=>{
    context.callbackWaitsForEmptyEventLoop = false;
    return db()
    .then(() => updateUser(event.requestContext.authorizer.principalId,event.body))
    .then(res => success(res))
    .catch(err => errResponse(err));      
}