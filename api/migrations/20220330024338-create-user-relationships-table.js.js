module.exports = {
  async up(queryInterface, { DataTypes }) {
    return queryInterface.createTable('user_relationships', {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      relatedFromUserId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      relatedToUserId: {
        allowNull: false,
        type: DataTypes.UUID,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      type: {
        type: DataTypes.ENUM(['active', 'pending', 'blocked']),
        defaultValue: 'pending',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  async down(queryInterface) {
    return queryInterface.dropTable('user_relationships');
  },
};
