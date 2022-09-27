'use strict';

const express = require('express');
const base64 = require('base-64');
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('sqlite:memory:');

const UserModel = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

const app = express();
app.use(express.json()); // read JSON bodies

app.post('/signup', async (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10).then(async hash => {
    let newUser = await UserModel.create({
      username: req.body.username,
      password: hash,
    });
    res.send(newUser);
  })
});

app.post('/signin', async (req, res) => {
  console.log(req.headers);

  const encodedCredentials = req.headers.authorization.split(' ')[1];
  const decodedCredentials = base64.decode(encodedCredentials);
  console.log(decodedCredentials);
  const [username, password] = decodedCredentials.split(':');

  try {
    let user = await UserModel.findOne({ where: { username } });
    let isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      res.status(200);
      res.json(user);
    }
  } catch (e) {
    res.status(401);
    res.send(e);
  }
});

module.exports = {
  app,
  sequelize
};
