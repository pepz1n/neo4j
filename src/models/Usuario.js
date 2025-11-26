export default {
  id: {
    type: 'uuid',
    primary: true,
  },
  nome: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
    unique: true,
  },
  enderecos: {
    type: 'relationship',
    target: 'Endereco',
    relationship: 'TEM_ENDERECO',
    direction: 'out',
    eager: true,
  },
};
