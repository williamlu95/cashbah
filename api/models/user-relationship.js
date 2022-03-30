import { DataTypes } from 'sequelize';

export const RELATIONSHIP_TYPE = Object.freeze({
  ACTIVE: 'active',
  PENDING: 'pending',
  BLOCKED: 'blocked',
});

export default (sequelize) => sequelize.define('user_relationship', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM(Object.values(RELATIONSHIP_TYPE)),
    defaultValue: RELATIONSHIP_TYPE.PENDING,
  },
});
