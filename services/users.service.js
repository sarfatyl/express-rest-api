const UserModel = require('../models/user.model');

class UsersService {

    constructor() {
        this._users = [];
    }

    getUsers() {
        return this._users;
    }

    getSingleUser(id) {
        return this._users.find(function(user) {
            return user.id == id;
        })
    }

    createUser(firstName, lastName) {
        const id = this._users.length;
        const newUser = new UserModel(id, firstName, lastName);
        this._users.push(newUser);
        return newUser;
    }

    deleteUser(id) {
        let indexInArray = 0;
        this._users.find(function (user, index) {
            indexInArray = index;
            return user.id == id;
        });
        this._users.splice(indexInArray, 1);
        return 'Deleted'
    }

    // {firstName: 'some new value'}
    updateUser(id, firstName, lastName) {
        const user = this._users.find(function (user) {
            return user.id == id;
        });
        const newUser =  new UserModel(id,firstName,lastName);
        Object.assign(user, newUser);
        return user;
    }
}

const instance = new UsersService();
Object.freeze(instance);

module.exports =  instance;
