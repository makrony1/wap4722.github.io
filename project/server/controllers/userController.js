const express = require("express");
const User = require("../models/user");

const getAuthenticate = (req, res, next) => {
  //console.log(req.body);
  let user = User.getAuthenticate(req.body.userId, req.body.password);
  if(user== null){
    res.status(401).json({success: false});
  }else{
    res.status(200).json({accessToken: `${user.id}-${user.name}-${Date.now().toString()}`});
  }
   
};

module.exports = {getAuthenticate};
