var testData = [
    {
      'id': 5,
      'nome': 'Teste',
      'email': 'teste2@teste.com',
      'cpf': '02404019562',
      'telefone': '71999114791',
      'cep': null,
      'logradouro': null,
      'bairro': null,
      'cidade': null,
      'complemento': null,
      'ponto_referencia': null,
      'usuario_id': 5,
      'em_dia': false,
    },
    {
      'id': 6,
      'nome': 'Tais',
      'email': 'tais@tais.com',
      'cpf': '32787677720',
      'telefone': '71999658076',
      'cep': '40231305',
      'logradouro': null,
      'bairro': null,
      'cidade': null,
      'complemento': null,
      'ponto_referencia': null,
      'usuario_id': 5,
      'em_dia': true,
    },
  ],
  counts = testData.reduce(
    (c, { em_dia: key }) => ((c[key] = (c[key] || 0) + 1), c),
    {},
  );

console.log(counts);
