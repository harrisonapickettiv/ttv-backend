# Tabletop Vault

A modern GraphQL API for board game e-commerce, built with TypeScript, Apollo Server, and Prisma.

## About

Tabletop Vault showcases best practices in GraphQL API design with type-safe resolvers, efficient data loading patterns, and comprehensive test coverage. Features a complete e-commerce backend with authentication, reviews, shopping cart, and order management.

## Features

- Complete GraphQL API for games, users, reviews, cart, and orders
- JWT authentication with role-based access (customer/admin)
- Type-safe resolvers with GraphQL Code Generator
- DataLoader implementation to prevent N+1 queries
- Rich game metadata (publishers, categories, mechanics, designers)
- Comprehensive test coverage (unit tests + automated API tests)

## Tech Stack

- **Runtime:** Node.js v24
- **Language:** TypeScript (ESNext modules)
- **API:** Apollo Server v5 with GraphQL
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** JWT + bcrypt
- **Testing:** Vitest (unit tests) + Postman/Newman (API tests)
- **Dev Tools:** tsx, GraphQL Code Generator, DataLoader, ESLint, Prettier

## Quick Start

### Prerequisites

- Node.js v20+
- PostgreSQL 14+

### Installation

```bash
# Clone and install
git clone <repository-url>
cd ttv-backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your DATABASE_URL and JWT_SECRET

# Set up database
npm run prisma:migrate:dev
npm run prisma:seed

# Generate types
npm run generate

# Start development server
npm run dev
```

The API will be available at `http://localhost:4000`.

## Development

### Key Commands

```bash
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm start                # Run production server

npm run generate         # Generate Prisma + GraphQL types
npm run prisma:studio    # Open database GUI
npm run prisma:seed      # Seed database with sample data

npm run lint             # Lint code
npm run format           # Format with Prettier

npm test                 # Run unit tests (watch mode)
npm run test:once        # Run unit tests once
npm run test:ui          # Open Vitest UI
npm run test:coverage    # Generate coverage report
```

### Project Structure

```
ttv-backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Database seed script
├── src/
│   ├── index.ts               # Apollo Server entry point
│   ├── context.ts             # GraphQL context & DataLoaders
│   ├── schema/
│   │   ├── typeDefs/          # GraphQL schema files (*.graphql)
│   │   │   └── index.ts       # Schema composition
│   │   └── resolvers/         # GraphQL resolvers
│   │       ├── query/         # Query resolvers
│   │       ├── mutation/      # Mutation resolvers
│   │       └── *.ts           # Field resolvers (Game, User, etc.)
│   ├── generated/             # Generated code (Prisma + GraphQL types)
│   └── test/                  # Unit tests
│       ├── resolvers/         # Resolver unit tests
│       ├── helpers/           # Test utilities
│       └── setup.ts           # Test configuration
├── tests/
│   └── postman/               # API integration tests
├── .env                       # Environment variables
└── docker-compose.yml         # Local PostgreSQL setup
```

## Database Schema

Core entities:

- **Game** - Board games with pricing, stock, and gameplay details
- **Publisher, Category, Mechanic, Designer** - Game metadata
- **User** - Customers and admins with JWT authentication
- **Review** - User reviews with 1-5 star ratings
- **Cart & Order** - Shopping cart and purchase orders

Many-to-many relationships use explicit join tables (GameCategory, GameMechanic, GameDesigner).

## Authentication

Use JWT tokens via the Authorization header:

```graphql
# Login to get token
mutation {
  login(email: "user@example.com", password: "password123") {
    token
    user { id email role }
  }
}
```

Include token in requests: `Authorization: Bearer <token>`

## Testing

### Unit Tests

Vitest unit tests cover resolver logic with isolated database setup:

```bash
npm test              # Watch mode
npm run test:once     # Run once
npm run test:ui       # Interactive UI
npm run test:coverage # Coverage report
```

Unit tests are located in [src/test/](src/test/) and cover authentication, games, publishers, categories, reviews, cart, and orders.

### API Integration Tests

Comprehensive Postman collection with 48 automated end-to-end tests:

```bash
npm install -g newman
newman run tests/postman/api-tests.postman_collection.json
```

See [tests/README.md](tests/README.md) for details on the API test suite.

## Docker Support

Local PostgreSQL via Docker:

```bash
docker-compose up -d    # Start
docker-compose down     # Stop
```

## Architecture Highlights

- **No backend bundler** - Node.js handles ES modules natively
- **DataLoader from start** - Prevents N+1 query problems
- **GraphQL Code Generator** - Type safety between schema and resolvers
- **Explicit join tables** - Flexibility for future relationship metadata

## Deployment

Set production environment variables:

```env
DATABASE_URL="postgresql://..."
NODE_ENV=production
JWT_SECRET=strong-random-secret
```

Build and deploy:

```bash
npm run build
npm start
```

## License

MIT License - see [LICENSE](LICENSE) file.

## Author

**Harrison Alexander Pickett, IV**

Built to showcase GraphQL API design, TypeScript best practices, and modern backend development.