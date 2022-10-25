import { Sequelize } from 'sequelize';
import * as config from '../config/database';

export default new Sequelize(config);


// import a configuração do banco 