import { INTEGER, STRING, Model } from 'sequelize';
import database from '.';

export default class User extends Model {
  id!: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  underscored: true, // se por um acaso tiver algo em camelCase - passa para o banco com underscored
  sequelize: database,
  tableName: 'users',
  timestamps: false,
});