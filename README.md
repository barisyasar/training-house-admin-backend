# Training House Admin Backend

A NestJS backend application with Prisma and PostgreSQL for managing exercise data.

## Features

- **Exercise Management**: Create, read, update, and delete exercises
- **Multi-language Support**: Turkish and English translations
- **Exercise Types**: Time-based, rep-based, and rest exercises
- **Equipment & Body Parts**: Track exercise equipment and target body parts
- **GIF Support**: Multiple resolution GIFs for exercises

## Tech Stack

- **NestJS** - Node.js framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **TypeScript** - Type safety

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Database Setup

1. Install PostgreSQL and create a database
2. Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/training_house_db?schema=public"
```

3. Generate Prisma client and push schema to database:

```bash
pnpm prisma:generate
pnpm prisma:push
```

### 3. Run the Application

```bash
# Development
pnpm start:dev

# Production
pnpm build
pnpm start:prod
```

## API Endpoints

### Exercises

- `GET /exercises` - Get all exercises
- `GET /exercises/:id` - Get exercise by ID
- `POST /exercises` - Create new exercise
- `PUT /exercises/:id` - Update exercise
- `DELETE /exercises/:id` - Delete exercise

## Database Schema

The application uses the following main entities:

- **Exercise**: Main exercise entity with type and measurement info
- **ExerciseTranslation**: Multi-language support for exercise names and descriptions
- **ExerciseStep**: Step-by-step instructions for exercises
- **ExerciseEquipment**: Equipment needed for exercises
- **ExerciseTargetBodyPart**: Target body parts for exercises
- **ExerciseGif**: GIF files in different resolutions

## Exercise Types

### Time-based Exercise

```typescript
{
  type: 'exercise',
  measurementType: 'time',
  duration: 30, // seconds
  // ... other fields
}
```

### Rep-based Exercise

```typescript
{
  type: 'exercise',
  measurementType: 'reps',
  reps: 10,
  isEachSide: false,
  // ... other fields
}
```

### Rest Period

```typescript
{
  type: 'rest',
  measurementType: 'time',
  duration: 60, // seconds
  // ... other fields
}
```

## Development

### Prisma Commands

```bash
# Generate Prisma client
pnpm prisma:generate

# Push schema changes to database
pnpm prisma:push

# Create and run migrations
pnpm prisma:migrate

# Open Prisma Studio
pnpm prisma:studio
```

### Code Quality

```bash
# Lint code
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test
```
# training-house-admin-backend
