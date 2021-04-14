

class User {
    // Propriété de User
    id;
    lastname;
    firstname;
    mail;
    password;
    role;

    // constructeur d'un user a partir de data
    constructor(data){
        for (const prop in data) {
            this[prop] = data[prop]
        }
    }
};

module.exports = User;