import { DataTypes } from 'sequelize';
import sequelize from './sequelize';
import User from './user';

export const RELATIONSHIP_TYPE = Object.freeze({
  ACTIVE: 'active',
  PENDING: 'pending',
  BLOCKED: 'blocked',
});

const UserRelationship = sequelize.define('user_relationship', {
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

UserRelationship.belongsTo(User, { foreignKey: 'relatedFromUserId', as: 'relatedFrom' });
UserRelationship.belongsTo(User, { foreignKey: 'relatedToUserId', as: 'relatedTo' });

export default UserRelationship;
