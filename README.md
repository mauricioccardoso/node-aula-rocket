# Cadastro de carro

**RF**
Deve ser possível cadastrar um novo carro.

**RN**
Não deve ser possível cadastrar um carro com uma placa já existente.
O carro deve ser cadastrado, por padrão, com disponibilidade.
O usuário responsavel pelo cadastro deve ser um usuário administrador

# Listagem de carros

**RF**
Deve ser possivel lista todos os carros disponíveis.
Deve ser possível lista todos os carros disponíveis pelo nome da categoria.
Deve ser possível lista todos os carros disponíveis pelo nome da marca.
Deve ser possível lista todos os carros disponíveis pelo nome da carro.

**RN**
O usuário não precisa estar logado no sistema.

# Cadastro de especificação no carro

**RF**
Deve ser possivel cadastrar uma especificação para um carro.

**RN**
Não deve ser possível cadastrar uma especificação para um carro não cadastrado.
Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro.
O usuário responsavel pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
Deve ser possível cadastrar a imagem do carro.

**RNF**
Utilizar o multer para upload dos arquivos

**RN**
O usuário deve poder cadastrar mais de um imagem para o mesmo carro.
O usuário responsável pelo cadastro deve ser uma usuário administrador.

# Aluguel de carro

**RF**
Deve ser possível cadastrar um aluguel.

**RN**
O aluguel deve ter duração minima de 24 horas.
Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
