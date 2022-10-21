// import { Model, INTEGER, BOOLEAN } from 'sequelize';

// import database from '.';

// import Teams from './TeamModel';

// export default class Matches extends Model {
//   id: number;
//   homeTeam: number;
//   homeTeamGoals: number;
//   awayTeam: number;
//   awayTeamGoals: number;
//   inProgress: number;
// }

// Matches.init({
//   id: {
//     type: INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//     allowNull: false,
//   },
//   homeTeam: {
//     type: INTEGER,
//     allowNull: false,
//   },
//   homeTeamGoals: {
//     type: INTEGER,
//     allowNull: false,
//   },
//   awayTeam: {
//     type: INTEGER,
//     allowNull: false,
//   },
//   awayTeamGoals: {
//     type: INTEGER,
//     allowNull: false,
//   },
//   inProgress: {
//     type: BOOLEAN,
//     allowNull: false,
//   },
// }, {
//   sequelize: database,
//   timestamps: false,
//   underscored: true,
//   modelName: 'matches',
// });

// Matches.belongsTo(Teams, { foreignKey: 'homeTeam', as: 'teamHome' });
// Matches.belongsTo(Teams, { foreignKey: 'awayTeam', as: 'teamAway' });

// Teams.hasMany(Matches, { foreignKey: 'homeTeam', as: 'teamHome' });
// Teams.hasMany(Matches, { foreignKey: 'awayTeam', as: 'teamAway' });
