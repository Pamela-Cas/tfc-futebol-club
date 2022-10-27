class HTTP_EXCEPTION extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export default HTTP_EXCEPTION;

/*  Se o valor inserido pelo usuário não corresponder ao tipo esperado,
  uma exceção HttpException será criada e gerada com uma mensagem personalizada com base no tipo de erro.
  https://learn.microsoft.com/pt-br/dotnet/api/system.web.httpexception?view=netframework-4.8
  Mentoria 28.1 - turma xp
  */
