import neode from '../config/neode.js';

const EnderecoController = {
  async criar(req, res) {
    const { usuarioId, rua, numero, cidade, estado, cep } = req.body;
    try {
      const usuario = await neode.find('Usuario', usuarioId);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      const endereco = await neode.create('Endereco', {
        rua,
        numero,
        cidade,
        estado,
        cep,
      });

      await usuario.relateTo(endereco, 'enderecos');

      res.status(201).json(await endereco.toJson());
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async listarPorUsuario(req, res) {
    const { usuarioId } = req.params;
    try {

      const usuario = await neode.find('Usuario', usuarioId);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }

      const result = await neode.cypher(
        'MATCH (u:Usuario {id: $usuarioId})-[:TEM_ENDERECO]->(e:Endereco) RETURN e',
        { usuarioId }
      );

      const enderecos = result.records.map(record => {
        return record.get('e').properties;
      });

      res.json(enderecos);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { rua, numero, cidade, estado, cep } = req.body;
    try {
      const endereco = await neode.find('Endereco', id);
      if (!endereco) {
        return res.status(404).json({ erro: 'Endereço não encontrado' });
      }
      await endereco.update({ rua, numero, cidade, estado, cep });
      res.json(await endereco.toJson());
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const endereco = await neode.find('Endereco', id);
      if (endereco) {
        await endereco.delete();
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};

export default EnderecoController;
