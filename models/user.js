'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      // define association here
      this.hasMany(Post, { foreignKey: 'userId', as: 'post' })
    }
    toJSON() {
      return { ...this.get(), id: undefined }
    } // untuk nyembunyiin kolom id ketika di return response
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // untuk validasi input
          notNull: { msg: 'User must have a name' },
          notEmpty: { msg: 'name cannot be empty' },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // untuk validasi input
          notNull: { msg: 'User must have an email' },
          notEmpty: { msg: 'email cannot be empty' },
          isEmail: { msg: 'Must be a vald email address' },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // untuk validasi input
          notNull: { msg: 'User must have a role' },
          notEmpty: { msg: 'role cannot be empty' },
        },
      },
    },
    {
      sequelize,
      tableName: 'users',
      modelName: 'User',
    }
  )
  return User
}
