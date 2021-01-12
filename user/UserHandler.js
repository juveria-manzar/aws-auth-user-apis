const db = require('../database');
const User = require('./User');
const { success, errResponse } = require('../authentication/AuthenticationHelpers');

module.exports.myProfile = (event,context,callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return db()
    .then(() => myProfile(event.requestContext.authorizer.principalId))
    .then(res => success(res))
    .catch(err => errResponse(err));
};

function myProfile(id) {
  return User.findById(id)
    .then(user => !user ? Promise.reject('User not found.') : {
        statusCode: 200,
        body: {
            name:user.name,
            email:user.email,
        }
      })
    .catch(err => Promise.reject(new Error(err)));
}

module.exports.allUsers =(event,context,callback)=>{
    context.callbackWaitsForEmptyEventLoop = false;
    return db()
    .then(() => allUsers())
    .then(res => success(res))
    .catch(err => errResponse(err));
}

function allUsers() {
    return User.find()
      .then(users => !users ? Promise.reject('No Users Exist') : users.map(user=>{
          return{
            name:user.name,
            email:user.email
          }
      }))
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
    .then(user => !user ? Promise.reject('You are not authorized to update the user details.') : {
        statusCode: 201,
        message: "Data has been Updated",
      })
    .catch(err => Promise.reject(new Error(err)));
}
module.exports.updateUser=(event,context,callback)=>{
    context.callbackWaitsForEmptyEventLoop = false;
    return db()
    .then(() => updateUser(event.requestContext.authorizer.principalId,event.body))
    .then(res => success(res))
    .catch(err => errResponse(err));      
}