
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    memeCounter: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        defaultValue: 0
    },
    created_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.TIME,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    updated_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    deleted_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'user',
        key: 'id',
      },
    }
  }, {
    tableName: 'user',
    timestamps: false,
    paranoid: true,
    freezeTableName: true,
  });
};
