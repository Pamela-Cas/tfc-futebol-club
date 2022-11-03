import { DataTypes, Model } from 'sequelize';
import db from '.';

class Team extends Model {
  public id: number;
  public teamName: string;
}

Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'team_name',
    },
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'team',
    timestamps: false,
  },
);
export default Team;
