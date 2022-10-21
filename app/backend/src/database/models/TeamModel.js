import { INTEGER, STRING, Model } from 'sequelize';
import database from '.';

export default class Team extends Model {
  id!: number;
  teamName: string;
  teamHome: any;
}

Team.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  { underscored: true,
    sequelize: database,
    tableName: 'teams',
    modelName: 'Team',
    timestamps: false,
  },
);