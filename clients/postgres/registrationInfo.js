const BasePG = require("./basePGClient");
const { db } = require('./db.provider');

class Registration extends BasePG{
    async registerUser(email, password) {
        const res = await db.sequelize.query(`insert into users (email, password) values('${email}', '${password}')`);
        console.log(res)
        return res;
      }
      async fetchUser(email) {
        const res = await db.sequelize.query(`select password from users where email ='${email}'`);
        console.log(res)
        return res[0][0];
      }
}

module.exports = new Registration();