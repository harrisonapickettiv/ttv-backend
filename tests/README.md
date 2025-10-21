# Tests

This directory contains test suites for the Tabletop Vault API.

## Postman API Tests

The `postman/` directory contains automated API test collections that can be run using Postman or Newman (Postman's CLI tool).

### Collection: api-tests.postman_collection.json

A comprehensive automated test suite covering all API endpoints with 48 tests organized into 6 sections:

1. **Setup** - Extracts IDs from existing data
2. **Authentication** - Tests customer and admin login flows
3. **Queries** - Tests all GraphQL queries with nested data
4. **Customer Mutations** - Tests customer operations (reviews, cart, orders)
5. **Admin Mutations** - Tests admin CRUD operations for all entities
6. **Cleanup** - Removes all test data created during the run

#### Prerequisites

- API server running on `http://localhost:4000`
- Database seeded with initial data (run `npm run seed`)
- Postman desktop app or Newman CLI installed

#### Running Tests with Postman Desktop

1. Open Postman
2. Click **Import** in the top left
3. Select `tests/postman/api-tests.postman_collection.json`
4. Click on the imported collection
5. Click **Run** to open the Collection Runner
6. Click **Run Tabletop Vault API Tests**
7. View test results in the runner interface

#### Running Tests with Newman CLI

Install Newman globally:

```bash
npm install -g newman
```

Run the collection:

```bash
newman run tests/postman/api-tests.postman_collection.json
```

Run with detailed output:

```bash
newman run tests/postman/api-tests.postman_collection.json --reporters cli,json
```

#### Test Features

- **Automatic ID Chaining**: Tests automatically extract IDs from responses and use them in subsequent requests
- **Role-Based Testing**: Tests both customer and admin authentication and permissions
- **Full CRUD Coverage**: Creates, reads, updates, and deletes all entity types
- **Nested Relationships**: Tests games with categories, mechanics, and designers
- **Assertions**: Each test includes proper validation of response data
- **Self-Cleaning**: Cleanup section removes all test data after execution

#### Environment Variables

The collection uses collection variables that are automatically set during test execution. No manual configuration required. The tests will:

- Extract IDs from existing publishers, categories, mechanics, and designers
- Store authentication tokens after login
- Chain IDs between create, update, and delete operations

#### Troubleshooting

**Tests failing with "Not authenticated" errors:**
- Ensure the authentication tests run before other tests
- Check that JWT tokens are being saved correctly in collection variables

**Tests failing with "Cannot return null" errors:**
- Ensure the database is seeded with initial data: `npm run seed`
- The Setup section relies on existing publishers, categories, mechanics, and designers

**Newman command not found:**
- Install Newman globally: `npm install -g newman`
- Or run it with npx: `npx newman run tests/postman/api-tests.postman_collection.json`

#### Notes

- Tests should be run in order as later tests depend on IDs extracted from earlier tests
- The collection creates test data with specific names (prefixed with "Test" or "Customer Test")
- Cleanup section should always run to maintain a clean test environment
- Tests assume default server port 4000 and localhost
