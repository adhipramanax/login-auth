const bcrypt = require("bcryptjs");
const config = require("../config/config");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "superadmin",
        email: "superadmin@gmail.com",
        password: await bcrypt.hash("superadmin" + config.jwt.salt, 12),
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
