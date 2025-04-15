# Fluxo de Eventos - Sistema de Automação

Sistema de automação de fluxos baseado em microsserviços, desenvolvido com TypeScript e [Clean Architecture](#arquitetura). Este projeto fornece uma plataforma robusta para automatizar fluxos de trabalho e processos de negócio de forma eficiente e escalável.

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
2. **Application Layer**: Casos de uso e lógica de aplicação
3. **Interface Adapters**: Controllers, Gateways, Presenters
4. **Infrastructure**: Express, MongoDB, BullMQ

## Tecnologias Principais

- **TypeScript**: Linguagem principal do projeto
- **Express.js**: Framework web para APIs REST
- **MongoDB** com Mongoose: Banco de dados principal
- **Redis** com BullMQ: Filas e processamento assíncrono
- **JWT**: Autenticação e autorização
- **Zod**: Validação de dados
- **Winston**: Sistema de logging

## Contribuição

1. Crie uma branch para sua feature: `git checkout -b feature/nome-da-feature`
2. Commit suas mudanças: `git commit -m 'feat: adiciona nova feature'`
3. Push para a branch: `git push origin feature/nome-da-feature`
4. Abra um Pull Request

Por favor, certifique-se de seguir nosso [guia de estilo de código](./docs/CODE_STYLE.md) e incluir testes para suas alterações. Agradecemos antecipadamente por suas contribuições!

## Licença

Este projeto está licenciado sob a [licença MIT](./LICENSE).