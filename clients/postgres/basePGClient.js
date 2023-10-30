// prisma-example.js

const { PrismaClient } = require('@prisma/client');

class BasePG {
    constructor() {
        this.prisma = new PrismaClient();
    }
}

module.exports = BasePG;
