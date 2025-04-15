# Fluxo de Eventos - Sistema de Automação

Sistema de automação de fluxos baseado em microsserviços, desenvolvido com TypeScript e [Clean Architecture](#arquitetura). Este projeto fornece uma plataforma robusta para automatizar fluxos de trabalho e processos de negócio de forma eficiente e escalável.

![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

## Estrutura do Projeto

O projeto é organizado como um monorepo usando pnpm workspaces, contendo:

- [`packages/shared`](./packages/shared): Biblioteca compartilhada entre os serviços
- [`services/api-service`](./services/api-service): Interface com o frontend e operações CRUD
- [`services/data-ingestion-service`](./services/data-ingestion-service): Recebimento de dados via webhooks e API
- [`services/event-processor-service`](./services/event-processor-service): Processamento de eventos e execução de fluxos

## Requisitos

- Node.js >= 18.0.0
- pnpm >= 8.0.0
- Docker e Docker Compose

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/edenoscherer/fluxo-de-eventos.git
cd fluxo-de-eventos
```

2. Instale as dependências:
```bash
pnpm install
```

3. Inicie os serviços de infraestrutura:
```bash
docker-compose up -d
```

> **Nota**: Certifique-se de que o Docker esteja em execução antes de executar o comando acima.

## Desenvolvimento

1. Inicie todos os serviços em modo de desenvolvimento:
```bash
pnpm dev
```

2. Para iniciar um serviço específico:
```bash
# API Service
pnpm --filter @fluxo-de-eventos/api-service dev

# Data Ingestion Service
pnpm --filter @fluxo-de-eventos/data-ingestion-service dev

# Event Processor Service
pnpm --filter @fluxo-de-eventos/event-processor-service dev
```

### Endpoints da API

Quando o serviço API estiver em execução, os seguintes endpoints estarão disponíveis:

- `GET /api/companies` - Lista todas as empresas
- `GET /api/companies/:id` - Obtém uma empresa específica
- `POST /api/companies` - Cria uma nova empresa
- `PUT /api/companies/:id` - Atualiza uma empresa existente
- `DELETE /api/companies/:id` - Remove uma empresa

## Scripts Disponíveis

- `pnpm dev`: Inicia todos os serviços em modo de desenvolvimento
- `pnpm build`: Compila todos os pacotes e serviços
- `pnpm test`: Executa os testes em todos os pacotes e serviços
- `pnpm lint`: Executa o linter em todos os pacotes e serviços
- `pnpm format`: Formata o código em todos os pacotes e serviços
- `pnpm coverage`: Gera relatórios de cobertura de testes

Você pode executar esses scripts na raiz do projeto para afetar todos os pacotes, ou dentro de um pacote específico para executar apenas nele.

## Arquitetura

O projeto segue os princípios da [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html), com as seguintes camadas:

1. **Domain Layer**: Entidades e regras de negócio
   - Contém as entidades de negócio (Company, Event, etc.)
   - Implementa validações e regras de domínio
   - Define interfaces de repositórios

2. **Application Layer**: Casos de uso e lógica de aplicação
   - Implementa casos de uso específicos (CreateCompany, ProcessEvent, etc.)
   - Orquestra fluxos de trabalho entre entidades
   - Independente de frameworks externos

3. **Interface Adapters**: Controllers, Gateways, Presenters
   - Converte dados entre o formato mais conveniente para entidades e interfaces externas
   - Implementa controladores para APIs REST
   - Adapta interfaces externas para o domínio da aplicação

4. **Infrastructure**: Express, MongoDB, BullMQ
   - Implementa detalhes técnicos e frameworks
   - Fornece implementações concretas para interfaces definidas nas camadas internas
   - Gerencia conexões com bancos de dados e serviços externos

## Tecnologias Principais

- **TypeScript**: Linguagem principal do projeto
- **Express.js**: Framework web para APIs REST
- **MongoDB** com Mongoose: Banco de dados principal
- **Redis** com BullMQ: Filas e processamento assíncrono
- **JWT**: Autenticação e autorização
- **Zod**: Validação de dados
- **Winston**: Sistema de logging

## Testes

O projeto utiliza [Vitest](https://vitest.dev/) como framework de testes. Para executar os testes:

```bash
# Executar todos os testes
pnpm test

# Executar testes com cobertura
pnpm coverage
```

## Contribuição

Para contribuir com o projeto:

1. Crie uma branch para sua feature: `git checkout -b feature/nome-da-feature`
2. Commit suas mudanças: `git commit -m 'feat: adiciona nova feature'`
3. Push para a branch: `git push origin feature/nome-da-feature`
4. Abra um Pull Request

Por favor, certifique-se de seguir nosso [guia de estilo de código](./docs/CODE_STYLE.md) e incluir testes para suas alterações. 

### Convenções de Commit

Este projeto segue as [Conventional Commits](https://www.conventionalcommits.org/pt-br/v1.0.0/):

- `feat`: Nova funcionalidade
- `fix`: Correção de bug
- `docs`: Alterações na documentação
- `style`: Formatação, ponto e vírgula ausente, etc.
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Atualizações de tarefas de build, configurações, etc.

Agradecemos antecipadamente por suas contribuições!

## Licença

Este projeto está licenciado sob a [licença MIT](./LICENSE).

---

Desenvolvido com ❤️ por [Eden Scherer](https://github.com/edenoscherer)