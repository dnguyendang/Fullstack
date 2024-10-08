const connection = require('../config/database');
const { post } = require('../routes/web');
const { getAllUsers, getUserbyUserId, updateUserbyUserId, createUser, deleteUserbyUserId } = require('../services/CRUD.service');

const getHomepage = async (req, res) => {
    let results = await getAllUsers();
    return res.render('home.ejs', { listUsers: results })
}

const getABC = (req, res) => {
    res.send('<h1>check ABC</h1>')
}

const getEyes = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    let { email, name, city } = req.body;
    let results = await createUser(email, name, city);
    res.redirect('/');
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}

const getUpdatePage = async (req, res) => {
    const userId = req.params.id; // req.params.id = /update/:id
    let result = await getUserbyUserId(userId);
    return res.render('update.ejs', { user: result })
}

const postUpdateUser = async (req, res) => {
    let { id, email, name, city } = req.body;
    await updateUserbyUserId(id, email, name, city);
    res.redirect('/');
}

const getDeletePage = async (req, res) => {
    const userId = req.params.id;
    let result = await getUserbyUserId(userId);
    return res.render('delete.ejs', { user: result });
}

const postDeleteUser = async (req, res) => {
    let id = req.body.id;
    await deleteUserbyUserId(id);
    res.redirect('/');
}

module.exports = {
    getHomepage,
    getABC,
    getEyes,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    getDeletePage,
    postDeleteUser
}