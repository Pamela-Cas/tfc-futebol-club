module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('matches', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        } ,
        home_team : {
          type: Sequelize.INTEGER,
          foreingKey: true,
          allowNull: false,
          References: {
            model: 'teams',
            key: 'id',
          },
        } ,
        home_team_goals : {
          type: Sequelize.INTEGER,
          allowNull: false,
        } ,
        away_team : {
          type: Sequelize.INTEGER,
          foreingKey: true,
          allowNull: false,
          References: {
            model: 'teams',
            key: 'id',
          },
        } ,
        away_team_goals : {
          type: Sequelize.INTEGER,
          allowNull: false,
        } ,
        in_progress : {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        } ,
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('matches');
    }
  };