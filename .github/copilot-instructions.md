# AI Coding Agent Instructions for ESCRIBANIA

A full-stack notary services website with React/Redux frontend and Express/MongoDB backend.

## Architecture Overview

**Frontend:** React + TypeScript + Redux (with RxJS epics) + Material-UI
**Backend:** Express + MongoDB + Mongoose with pagination
**Build:** Webpack with separate dev/prod configs

### Key Services
- **Notary Services:** Firmezas, Actas, Poderes, Escrituras, Apostillas, etc.
- **Data Models:** Clientes, Suscriptores, Telefonos, Paises, Datospaises, Prefijos
- **Page Structure:** Single landing.tsx handles contact forms + navigation; separate pages for each service

## Development Workflow

```bash
npm start              # Run dev:api + dev:client concurrently
npm run dev:api       # Backend on port 4567 (nodemon + babel-node)
npm run dev:client    # Frontend on webpack-dev-server
npm run build         # Production webpack build
npm run lint          # ESLint check
```

**Database:** MongoDB at `mongodb://127.0.0.1:27017/escribania` (configure in `back-end/config/database.config.js`)

## Frontend Patterns

### State Management (Redux + RxJS Epics)
- **Actions:** Type-safe enums in `front-end/store/actions/[entity]Actions.tsx`
- **Epics:** RxJS-based side effects in `front-end/store/epics/[entity]Epics.tsx`
  - Use `switchMap` for search/load (cancels previous requests)
  - Use `mergeMap` for create/update/delete (allows multiple concurrent operations)
  - Error handling: `catchError(() => of(failedAction()))`
- **Reducers:** `front-end/store/reducers/` update state based on action types
- **Selectors:** `useSelector((state: IState) => state.[entity])` for component access

**Example usage in components:**
```tsx
const dispatch = useDispatch()
const data = useSelector((state: IState) => state.clientes)
dispatch(loadClientes({ page: 1, limit: 25 }))
```

### Form Handling
- Two patterns used: **Local state** (`useState`) + **Redux dispatch**
- State shape: `{ fieldName: value, errField?: 'fieldName', errMessage?: 'error text' }`
- Handler pattern: `handleChange(fieldName) => (event) => setState(...)`
- Submission: Reset form after dispatch, optionally show Snackbar confirmation

### Component Structure
- Page components in `front-end/Pages/` (e.g., [landing.tsx](front-end/Pages/landing.tsx))
- Reusable components in `front-end/components/` (Autocomplete, DataTable, Dialog, etc.)
- Material-UI (MUI) for all UI; theme classes imported from module.scss files
- Autocomplete component supports async search: `onType` callback, `options` array, `onChange` for selection

## Backend Patterns

### Controller Layer (`back-end/app/controllers/`)
Each entity has CRUD operations following this structure:
- `findAll(options)` - Get paginated records
- `find(options)` - Search with filters and pagination
- `findOne(options)` - Single record by ID
- `create(options)` - Create record (callback-based)
- `createAsPromise(options)` - Create with Promise (preferred for routes)
- `update(options)` - Update record
- `delete(options)` - Soft delete (marks `isDeleted: true`, keeps record)

**Data mapping:** Controllers map request body fields → schema properties
```js
if (typeof data.Nombre !== 'undefined') updatedData['Nombre'] = data.Nombre
```

### Model Layer (`back-end/app/models/`)
- Mongoose schemas with soft-delete support via `applySoftDeleteMiddleware`
- Automatic timestamps, text indexes for search, pagination plugin
- Fields returned: virtual `_id`, `createdAt`, `updatedAt`, all custom fields
- Example: [clientes.model.js](back-end/app/models/clientes.model.js)

### Route Layer (`back-end/app/routes/`)
RESTful endpoints:
```js
GET    /api/[entity]              // List all
GET    /api/[entity]/search       // Search (query params: searchString, searchField, page, limit)
GET    /api/[entity]/:ID          // Get single
POST   /api/[entity]              // Create
PUT    /api/[entity]/:ID          // Update
DELETE /api/[entity]/:ID          // Delete (soft)
```

Registered in [app.js](back-end/app.js) via `require('app/routes/[entity].routes')(app)`

### Utilities
- **Pagination:** `back-end/app/paginate.js` - Handles mongoose-paginate-v2 with soft-delete filter
- **Errors:** `back-end/app/services/errors.service.js` - Standard error response formatting
- **Memory Cache:** `back-end/app/services/memCache.service.js` - In-memory caching for external API calls
- **Schema Utils:** `back-end/app/models/schemaUtils.js` - Soft-delete middleware

## Key Files to Reference

| File | Purpose |
|------|---------|
| [front-end/Pages/landing.tsx](front-end/Pages/landing.tsx) | Main landing page, handles contact forms, navigation |
| [front-end/store/store.tsx](front-end/store/store.tsx) | Redux + Redux DevTools + Epic middleware setup |
| [back-end/index.js](back-end/index.js) | Express server, CORS, file upload setup |
| [config/webpack.common.js](config/webpack.common.js) | Path aliases: @components, @services, @store, @helpers, @hooks |
| [back-end/app.js](back-end/app.js) | Route registration |

## Important Conventions

- **Field Names:** Follow exact schema property names (e.g., `Nombre`, `Dni`, `DataPas`)
- **API URLs:** Hardcoded as `http://127.0.0.1:4567/api/` in frontend (consider ENV vars for production)
- **Error Handling:** Controllers send status + message; epics catch and dispatch failed actions
- **Redux Dispatch:** Always reset form state after success
- **Soft Deletes:** Queries automatically filter `isDeleted: false` via middleware
- **File Uploads:** Express-fileupload middleware; files processed in `checkReq` before route handlers
- **TypeScript:** Loose mode (`strict: false` in tsconfig), use `any` when needed but prefer typed interfaces

## Testing & Validation

- **ESLint:** Run `npm run lint` before committing
- **No automated tests configured** - manual testing required
- **Console logging:** Used for debugging (see email send, validation errors in landing.tsx)

## Environment Setup

Create `.env.development` in `back-end/config/`:
```
MONGODB_URL=mongodb://127.0.0.1:27017/escribania
PORT=4567
```

## Common Tasks

**Add new entity:**
1. Create `back-end/app/models/[entity].model.js` (copy Clientes pattern)
2. Create `back-end/app/controllers/[entity].controller.js` (implement CRUD)
3. Create `back-end/app/routes/[entity].routes.js` (REST endpoints)
4. Register route in `back-end/app.js`
5. Create Redux action/epic/reducer in `front-end/store/`
6. Create page or form component referencing the entity

**Modify existing entity:**
- Update schema in model → controller field mapping → route handler → Redux action/epic → component UI
- Always maintain soft-delete pattern
- Test search/filter scenarios with pagination

**Add form submission:**
- Create local state for form data with error fields
- Dispatch Redux action on submit
- Show snackbar on success
- Clear form state after dispatch
