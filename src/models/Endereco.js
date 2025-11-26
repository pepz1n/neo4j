export default {
  id: {
    type: 'uuid',
    primary: true,
  },
  rua: {
    type: 'string',
    required: true,
  },
  numero: {
    type: 'string',
    required: true,
  },
  cidade: {
    type: 'string',
    required: true,
  },
  estado: {
    type: 'string',
    required: true,
  },
  cep: {
    type: 'string',
    required: true,
  },
};
