import neode from '../config/neode.js';

const UsuarioController = {
  async criar(req, res) {
    const { nome, email } = req.body;
    try {
      const usuario = await neode.create('Usuario', {
        nome,
        email,
      });
      const json = await usuario.toJson();
      console.log('Usuario criado:', json);
      res.status(201).json(json);
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async listarTodos(req, res) {
    try {
      const usuarios = await neode.all('Usuario');
      res.json(await usuarios.toJson());
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async buscarPorId(req, res) {
    const { id } = req.params;
    try {
      const usuario = await neode.find('Usuario', id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      res.json(await usuario.toJson());
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
      const usuario = await neode.find('Usuario', id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado' });
      }
      await usuario.update({ nome, email });
      res.json(usuario.toJson());
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  },

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const usuario = await neode.find('Usuario', id);
      if (usuario) {
        await usuario.delete();
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ erro: error.message });
    }
  }
};

export default UsuarioController;
