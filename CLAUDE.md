# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

`avni-media` is a media viewer application for the Avni ecosystem. It consists of three sub-projects:

- **`client/`** — Next.js 13 frontend (port 3000), base path `/avni-media`
- **`server/`** — NestJS 9 backend (port 3010), handles download jobs and S3 access
- **`scripts/`** — AWS Lambda function (`S3ThumbnailCreator`) that auto-generates thumbnails on S3 upload

## Development Commands

Both `client/` and `server/` use NVM (Node v19.8.1) and have their own Makefiles.

### Client

```bash
cd client
nvm use
make deps                    # npm install
make start-local-staging     # run against staging IDP
make start-local-prerelease  # run against prerelease IDP
npm run test                 # run Jest tests
npm run build                # production build
```

### Server

```bash
cd server
nvm use
make deps                    # npm install
make start-local-staging     # run against staging DB/IDP
make start-local-prerelease
npm run test                 # unit tests
npm run test:e2e             # end-to-end tests
npm run test:cov             # with coverage
npm run build                # tsc compile
```

### Root-level (CI packaging)

```bash
make deps        # install scripts/ dependencies
make prod        # build + zip client & server for production
make staging     # build + zip for staging
```

## Environment Setup

Copy the appropriate template from `client/env-templates/` and `server/env-templates/` to `.env` in each sub-project before running locally. Templates are named by environment (e.g., `development.template`, `local-staging.template`).

Server requires: PostgreSQL (`avni_media` database), AWS credentials (S3 read/write, zip upload bucket).

## Architecture

### Request Flow

The client `middleware.js` is the routing layer:
- Requests matching `/web/*` or `/location/*` → proxied to `NEXT_PUBLIC_WEB_MIDDLEWARE` (avni-server)
- Requests matching `/etl/*` or `/media/*` → proxied to `NEXT_PUBLIC_ETL_MIDDLEWARE` (avni-etl)
- The media viewer backend itself is called directly via `NEXT_PUBLIC_MEDIA_VIEWER`

### Client Structure

- `pages/index.tsx` — main image gallery with search/filter/pagination
- `pages/downloadList.tsx` — tracks async download job status
- `components/` — UI components (ImageList, ImageCarousel, Pagination, etc.)
- `service/MediaSearchService.ts` — calls avni-etl for media search
- `utils/helpers.tsx` — auth helpers (JWT from URL params in dev, localStorage)

### Server Structure

- `src/media-viewer/` — REST controller + service for download job management
  - `POST /media-viewer/requestDownload` — save a new download request
  - `GET /media-viewer/download` — create a zip of media and upload to S3
  - `GET /media-viewer/allData` — list downloads for a user
- `src/s3/s3.Service.ts` — presigned URL generation and S3 uploads
- `src/entity/` — TypeORM entity: `DownloadJobs` (status, JSONB metadata, zip_url)
- `src/tasks/` — scheduled NestJS tasks for async download processing

### Lambda (scripts/)

`scripts/S3ThumbnailCreator/index.mjs` — triggered on S3 `ObjectCreated` events, creates 200×200px thumbnails stored in a `/thumbnails/` prefix within the same bucket.

## Deployment

Deployed via CircleCI with approval gates for staging, prerelease, and production. The `deploy/install.sh` script sets up PM2 on the target EC2 instance. Client runs as a Next.js server, backend runs as a compiled NestJS app, both managed by PM2 under the `avni-media-user` account.
