# Docker Deployment

## Quick Start

Clone the repository and run:

```bash
docker compose -f docker/docker-compose.yml up -d
```

The app will be available at `http://localhost:3000`.

## Configuration

### Environment Variables

| Variable | Default                 | Description                               |
| -------- | ----------------------- | ----------------------------------------- |
| `PORT`   | `3000`                  | Port the server listens on                |
| `ORIGIN` | `http://localhost:3000` | Required by SvelteKit for CSRF protection |

### Custom Origin

For production deployment behind a domain, edit the `ORIGIN` in `docker-compose.yml`:

```yaml
environment:
  - ORIGIN=https://sudoku.example.com
```

## Commands

```bash
# Build and start
docker compose -f docker/docker-compose.yml up -d

# View logs
docker compose -f docker/docker-compose.yml logs -f

# Stop
docker compose -f docker/docker-compose.yml down

# Rebuild after code changes
docker compose -f docker/docker-compose.yml up --build -d
```
