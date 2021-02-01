const users = [
    {
        "id": 1,
        "username": "liviuboss",
        "password": "spaimabanilor",
        "date_of_birth": "1993-04-23T00:00:00.000Z"
    },
    {
        "id": 2,
        "username": "tzanca",
        "password": "tzancatzanca",
        "date_of_birth": "1994-04-23T00:00:00.000Z"
    }
];

let maxId = 2;

module.exports = {
    getUsers: function () {
        return users;
    },
    getUser: function (id) {
        return users.find(user => user.id === parseInt(id) || user.id === id);
    },
    postUser: function (user) {
        maxId++;
        user.id = maxId;
        users.push(user);
        return this.getUser(maxId);
    }
}