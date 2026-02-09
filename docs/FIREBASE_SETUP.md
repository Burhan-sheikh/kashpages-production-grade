# Firebase Setup Guide

## Prerequisites

- Google account
- Firebase CLI installed (`npm install -g firebase-tools`)
- Node.js 18+ installed

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name: `kashpages-production` (or your preferred name)
4. Enable Google Analytics (recommended)
5. Click "Create project"

## Step 2: Register Web App

1. In Firebase Console, click the web icon (</>)
2. Register app name: "KashPages Web"
3. Check "Also set up Firebase Hosting" (optional)
4. Click "Register app"
5. Copy the Firebase configuration object

## Step 3: Enable Authentication

1. Navigate to **Authentication** > **Sign-in method**
2. Enable **Email/Password**
   - Toggle "Enable"
   - Save

3. Enable **Google**
   - Toggle "Enable"
   - Enter project support email
   - Save

4. Configure authorized domains:
   - Add `localhost` for development
   - Add your production domain

## Step 4: Create Firestore Database

1. Navigate to **Firestore Database**
2. Click "Create database"
3. Select **Start in production mode** (we'll add rules later)
4. Choose location (select closest to your users)
5. Click "Enable"

### Create Collections

Create these collections manually or they'll be created automatically:

- `users`
- `pages`
- `templates`
- `analytics`

### Add Firestore Indexes

```javascript
// In Firebase Console > Firestore > Indexes

// Index 1: User pages sorted by update time
Collection: pages
Fields:
  - userId (Ascending)
  - updatedAt (Descending)

// Index 2: Published pages sorted by publish date
Collection: pages
Fields:
  - status (Ascending)
  - publishedAt (Descending)

// Index 3: Templates by category and downloads
Collection: templates
Fields:
  - category (Ascending)
  - downloads (Descending)
```

## Step 5: Enable Realtime Database

1. Navigate to **Realtime Database**
2. Click "Create Database"
3. Select location (same as Firestore)
4. Start in **locked mode** (we'll add rules next)
5. Click "Enable"

## Step 6: Configure Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isSignedIn() {
      return request.auth != null;
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
    
    function isAdmin() {
      return request.auth.token.role == 'admin';
    }
    
    // Users collection
    match /users/{userId} {
      allow read: if isSignedIn();
      allow write: if isOwner(userId) || isAdmin();
    }
    
    // Pages collection
    match /pages/{pageId} {
      allow read: if resource.data.status == 'published' 
                  || isOwner(resource.data.userId)
                  || request.auth.uid in resource.data.collaborators
                  || isAdmin();
      
      allow create: if isSignedIn() && isOwner(request.resource.data.userId);
      
      allow update: if isOwner(resource.data.userId) 
                    || request.auth.uid in resource.data.collaborators;
      
      allow delete: if isOwner(resource.data.userId) || isAdmin();
    }
    
    // Templates collection
    match /templates/{templateId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Analytics collection
    match /analytics/{docId} {
      allow read: if isAdmin();
      allow write: if isAdmin();
    }
  }
}
```

### Realtime Database Rules

```json
{
  "rules": {
    "presence": {
      "$pageId": {
        "$userId": {
          ".read": "auth != null",
          ".write": "auth != null && auth.uid == $userId"
        }
      }
    },
    "cursors": {
      "$pageId": {
        "$userId": {
          ".read": "auth != null",
          ".write": "auth != null && auth.uid == $userId"
        }
      }
    },
    "selections": {
      "$pageId": {
        "$userId": {
          ".read": "auth != null",
          ".write": "auth != null && auth.uid == $userId"
        }
      }
    },
    "changes": {
      "$pageId": {
        ".read": "auth != null",
        ".write": "auth != null"
      }
    }
  }
}
```

## Step 7: Enable Firebase Storage

1. Navigate to **Storage**
2. Click "Get Started"
3. Review security rules
4. Click "Next"
5. Select location (same as other services)
6. Click "Done"

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
      allow delete: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 8: Get Service Account Key (for Admin SDK)

1. Go to **Project Settings** > **Service Accounts**
2. Click "Generate new private key"
3. Download the JSON file
4. Extract these values for your `.env.local`:
   - `project_id`
   - `private_key`
   - `client_email`

## Step 9: Configure Environment Variables

Create `.env.local` file:

```bash
# Firebase Client Config
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-default-rtdb.firebaseio.com

# Firebase Admin SDK (Server-side)
FIREBASE_ADMIN_PROJECT_ID=your-project-id
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
```

## Step 10: Test Connection

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test authentication
# Navigate to http://localhost:3000/auth/signup
```

## Step 11: Deploy Security Rules (Optional)

Create `firebase.json`:

```json
{
  "firestore": {
    "rules": "firestore.rules",
    "indexes": "firestore.indexes.json"
  },
  "database": {
    "rules": "database.rules.json"
  },
  "storage": {
    "rules": "storage.rules"
  }
}
```

Deploy rules:

```bash
firebase login
firebase use --add  # Select your project
firebase deploy --only firestore:rules
firebase deploy --only database
firebase deploy --only storage
```

## Troubleshooting

### Common Issues

**Issue:** "Firebase: Error (auth/unauthorized-domain)"
**Solution:** Add your domain to authorized domains in Firebase Console

**Issue:** "Permission denied" errors in Firestore
**Solution:** Check security rules and ensure user is authenticated
**Issue:** Realtime Database not syncing
**Solution:** Verify database URL in environment variables

**Issue:** "Quota exceeded" errors
**Solution:** Upgrade to Blaze (pay-as-you-go) plan

## Best Practices

1. **Never commit** `.env.local` to version control
2. **Use Firebase Emulators** for local development
3. **Set up quota alerts** in Firebase Console
4. **Enable App Check** for production (prevents abuse)
5. **Regularly review** Firebase usage and costs
6. **Backup Firestore** data regularly
7. **Monitor security rules** with Firebase Console

## Next Steps

- Set up Cloudinary (see CLOUDINARY_SETUP.md)
- Configure custom domain
- Set up monitoring and alerts
- Enable Firebase Performance Monitoring