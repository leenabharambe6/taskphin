const Sequelize = require('sequelize');

const db = {};

const initConnection = async () => {
    try {
        const connectionOptions = {
            host: "rain.db.elephantsql.com",
            dialect: 'postgres',
            pool: {
                "max":90,
                "min":5,
                "idle":10000,
                "acquire":10000,
                "evict":60000,
                "handleDisconnects":true
            }
        };


        const sequelize = new Sequelize("zvscpwoa", "zvscpwoa", "SCbNNwMBGGryDTWlCi38za8kzCz8_rTd", connectionOptions);

        db.sequelize = sequelize;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
};


module.exports = {
    initConnection,
    db
};
