import driver from '../config/neo4j.js';

const UsuarioController = {
  async criar(req, res) {
    const { nome, email } = req.body;
    const session = driver.session();
    try {
      const result = await session.run(
        'CREATE (u:Usuario {id: randomUUID(), nome: $nome, email: $email}) RETURN u',
        { nome, email }
      );
      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      res.status(201).json(node.properties);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    } finally {
      await session.close();
    }
  },

  async listarTodos(req, res) {
    const session = driver.session();
    try {
      const result = await session.run('MATCH (u:Usuario) RETURN u');
      const usuarios = result.records.map(record => record.get('u').properties);
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    } finally {
      await session.close();
    }
  },

  async buscarPorId(req, res) {
    const { id } = req.params;
    const session = driver.session();
    try {
      const result = await session.run(
        'MATCH (u:Usuario {id: $id}) RETURN u',
        { id }
      );
      if (result.records.length === 0) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      res.json(node.properties);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    } finally {
      await session.close();
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;
    const session = driver.session();
    try {
      const result = await session.run(
        'MATCH (u:Usuario {id: $id}) SET u.nome = $nome, u.email = $email RETURN u',
        { id, nome, email }
      );
      if (result.records.length === 0) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      const singleRecord = result.records[0];
      const node = singleRecord.get(0);
      res.json(node.properties);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    } finally {
      await session.close();
    }
  },

  async deletar(req, res) {
    const { id } = req.params;
    const session = driver.session();
    try {
      const result = await session.run(
        'MATCH (u:Usuario {id: $id}) DELETE u',
        { id }
      );
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    } finally {
      await session.close();
    }
  }
};

export default UsuarioController;
