# KashPages Architecture

## System Overview

KashPages is built using a modern, scalable architecture that emphasizes performance, real-time collaboration, and developer experience.

## Architecture Layers

### 1. Presentation Layer (Frontend)

**Framework:** Next.js 14 with App Router

**Key Features:**
- Server Components for optimal performance
- Client Components for interactivity
- Streaming SSR for instant page loads
- Automatic code splitting

**Component Structure:**
```
components/
├── builder/         # Page builder specific components
│   ├── Canvas         # Main editing canvas
│   ├── Sidebar        # Left/right sidebars
│   ├── Toolbar        # Top toolbar with actions
│   └── Preview        # Device preview modes
├── common/          # Shared components
├── layout/          # Layout wrappers
└── ui/              # Primitive UI components
```

### 2. State Management

**Solution:** Zustand

**Stores:**
- `auth-store`: User authentication state
- `builder-store`: Page building state with undo/redo
- `collaboration-store`: Real-time collaboration data
- `ui-store`: UI state (sidebars, modals, etc.)

**Benefits:**
- Minimal boilerplate
- No context provider hell
- Built-in DevTools support
- TypeScript-first design

### 3. Backend Services

**Firebase Services:**

#### Authentication
- Email/Password authentication
- Google OAuth
- Session management
- Role-based access control

#### Firestore Database
- NoSQL document database
- Collections:
  - `users`: User profiles and settings
  - `pages`: Landing page documents
  - `templates`: Template library
  - `analytics`: Page metrics

#### Realtime Database
- Low-latency real-time sync
- Collaboration features:
  - User presence
  - Cursor tracking
  - Selection sharing
  - Change broadcasting

#### Storage
- Media file uploads
- User-generated content
- Automatic optimization

### 4. Media Management

**Cloudinary Integration:**
- Image optimization
- Responsive images
- CDN delivery
- Transformation API
- Video hosting

### 5. Drag & Drop System

**@dnd-kit Library:**

**Features:**
- Sortable sections
- Draggable elements
- Touch support
- Accessibility
- Custom drag overlays

**Implementation:**
```typescript
// Sensors
- PointerSensor: Mouse/touch interactions
- KeyboardSensor: Accessibility

// Collision Detection
- ClosestCorners algorithm
- Custom collision detection for nested items

// Drag Overlays
- Visual feedback during drag
- Preview of dragged item
```

## Data Flow

### Page Building Flow

```
User Action
    ↓
Zustand Store Update
    ↓
Component Re-render
    ↓
Autosave (debounced)
    ↓
Firestore Update
    ↓
Realtime Broadcast (if collaborating)
    ↓
Other Users' State Update
```

### Real-time Collaboration Flow

```
User A Makes Change
    ↓
Local State Update (optimistic)
    ↓
Broadcast to Realtime DB
    ↓
User B Receives Update
    ↓
Conflict Resolution (if needed)
    ↓
User B State Update
```

## Security Architecture

### Authentication Flow

```
User Login
    ↓
Firebase Auth
    ↓
JWT Token Generation
    ↓
Store in httpOnly Cookie
    ↓
Middleware Validation
    ↓
Route Access Granted
```

### Firestore Security Rules

```javascript
// Users can only read/write their own data
match /users/{userId} {
  allow read: if request.auth.uid == userId;
  allow write: if request.auth.uid == userId;
}

// Pages: owner has full access, collaborators have read/write
match /pages/{pageId} {
  allow read: if resource.data.userId == request.auth.uid
              || request.auth.uid in resource.data.collaborators;
  allow write: if resource.data.userId == request.auth.uid;
  allow delete: if resource.data.userId == request.auth.uid;
}

// Admin only
match /templates/{templateId} {
  allow read: if true;
  allow write: if request.auth.token.role == 'admin';
}
```

## Performance Optimizations

### 1. Code Splitting
- Route-based splitting (Next.js automatic)
- Dynamic imports for heavy components
- Lazy loading of builder features

### 2. Image Optimization
- Next/Image component
- Cloudinary transformations
- WebP format with fallbacks
- Lazy loading with blur placeholder

### 3. Caching Strategy
- React Server Components caching
- SWR for data fetching
- Service Worker for offline support
- CDN caching (Vercel Edge)

### 4. Database Optimization
- Firestore indexes for common queries
- Pagination for large datasets
- Batch operations where possible
- Real-time listeners cleanup

### 5. Bundle Optimization
- Tree shaking
- Minification
- Compression (gzip/brotli)
- Font optimization

## Scalability Considerations

### Horizontal Scaling
- Stateless architecture
- Firebase auto-scaling
- CDN distribution
- Edge functions

### Database Scaling
- Firestore automatic scaling
- Data sharding for large collections
- Read replicas via CDN
- Caching layer

### Real-time Scaling
- Realtime Database automatic scaling
- Connection pooling
- Rate limiting
- Graceful degradation

## Monitoring & Observability

### Logging
- Client-side error tracking
- Server-side logging
- Firebase Analytics
- Custom event tracking

### Performance Monitoring
- Web Vitals tracking
- Firebase Performance Monitoring
- Lighthouse CI integration
- Real User Monitoring (RUM)

### Alerts
- Error rate thresholds
- Performance degradation
- Database usage limits
- API rate limits

## Deployment Architecture

### Production Environment

```
GitHub Repository
    ↓
Vercel CI/CD Pipeline
    ↓
Build & Test
    ↓
Deploy to Vercel Edge
    ↓
Firebase Services (Backend)
    ↓
Cloudinary (Media)
```

### Environment Strategy
- Development: Local with Firebase emulators
- Staging: Preview deployments on Vercel
- Production: Main branch auto-deploy

## Future Architecture Improvements

1. **Micro-frontends**: Split builder into independent modules
2. **GraphQL Layer**: Replace REST with GraphQL for flexible queries
3. **WebSockets**: Upgrade from Realtime DB to WebSocket for lower latency
4. **Edge Computing**: Move more logic to edge for better performance
5. **AI Integration**: Add AI-powered content suggestions
6. **Plugin System**: Allow third-party extensions
7. **Multi-region**: Deploy to multiple regions for global performance