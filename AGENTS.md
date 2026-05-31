<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Contributor guide

Guidance for anyone — human or otherwise — working in this repository.

## Project

Ecommerce and tailoring platform for Qasr-e-Shehbala, a premium Pakistani menswear house. See `README.md` for setup and `docs/ARCHITECTURE.md` for the system design and the reasoning behind it. Read the architecture document before making structural changes.

## Stack

Next.js (App Router, React Server Components), TypeScript, Tailwind CSS, Prisma, PostgreSQL, MDX for the blog. Authentication is a JWT session (jose) with bcrypt password hashing.

## Code style

- Self-documenting code over comments. Add a comment only to explain *why* something non-obvious is done — never to restate what the code does. No file-header blocks, no narration.
- Clear, consistent naming. Match the conventions already in the file you are editing.
- Keep components and modules small and reusable. Reuse the shared `DataTable`, form patterns, and SEO helpers rather than duplicating them.
- Run `npm run lint` and `npm run typecheck` before considering work done.

## Architecture conventions

- **Money** is stored and handled as integer paisa (`BigInt`, fields suffixed `Minor`). Never use floats for money. Format only at the view layer with `formatPKR`.
- **Customer identity** is the phone number (E.164). Email is optional.
- **Soft deletes** apply to catalog and identity records only (`deletedAt`); orders and payments are immutable financial records and are cancelled via status, never deleted.
- **Data access** lives in `src/server/<domain>/`. Storefront reads are wrapped in `safeQuery` so the site builds and renders even when the database is unreachable.
- **Structured data (JSON-LD)** must be server-rendered. Never inject it from a client component.
- **Multi-branch** is modelled with a `branchId` on location-scoped records. This is one company with locations, not multi-tenancy.
- The tailoring workflow is an explicit state machine; only legal transitions are exposed in the UI and enforced in the service layer.

## Commits

- Plain, simple English. Write messages a person would write.
- Describe what changed and why, not how.
- No tool, bot, or AI attribution of any kind in commit messages.

## Documentation

Architecture, database, SEO, and research notes live in `docs/`. Keep them current when behaviour changes.
