const axios = require('axios');
const id = 'idFromERP'
const tamanho = 'sizeFromERP'
const cor = 'colorFromErp'


jest.mock('axios');

describe('Conferir API de Estoque', () => {

  test('Retornar 200 e quantidade_disponivel numérica', async () => {

    axios.get.mockResolvedValue({
      status: 200,
      data: {
        produto_id: 123,
        cor: 'azul',
        tamanho: 'M',
        quantidade_disponivel: 15
      }
    });

    const response = await axios.get(
      `/api/v1/produtos/${id}/estoque?cor=${cor}&tamanho=${tamanho}`
    );

    expect(response.status).toBe(200);

    expect(response.data)
      .toHaveProperty('quantidade_disponivel');

    expect(typeof response.data.quantidade_disponivel)
      .toBe('number');

    expect(response.data.quantidade_disponivel)
      .toBeGreaterThanOrEqual(0);

  });

});