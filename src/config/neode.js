import Neode from 'neode';

const {
  NEO4J_URI = 'bolt://localhost:7687',
  NEO4J_USER = 'neo4j',
  NEO4J_PASSWORD = 'unochapeco',
} = process.env;

import Usuario from '../models/Usuario.js';
import Endereco from '../models/Endereco.js';

const instance = new Neode(NEO4J_URI, NEO4J_USER, NEO4J_PASSWORD);

instance.with({
  Usuario,
  Endereco,
});

export default instance;
