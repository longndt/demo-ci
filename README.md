# Student Manager REST API

Simple Node.js + Express REST API for managing students with automated CI/CD pipeline.

## Features

- REST API for managing students
- Comprehensive test coverage
- Automated CI/CD pipeline with GitHub Actions

## API Endpoints

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get single student
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

## Quick Start

### Setup

```bash
npm install
npm start
```

Server runs on `http://localhost:3000`

### Testing

```bash
npm test
```

### Build

```bash
npm run build
```

---

## 📚 Full CI/CD Workflow Demo

### Step 1: Initialize Git Repository

```bash
# Create a new folder
mkdir devops-ci
cd devops-ci

# Initialize git
git init

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/devops-ci.git
```

### Step 2: Create Initial Commit

```bash
# Stage all files
git add .

# Commit
git commit -m "Initial commit: REST API with tests"

# Push to main branch
git push -u origin main
```

### Step 3: Create Feature Branch for Tests

```bash
# Create and checkout new branch
git checkout -b develop/failing-test

# Make changes to test file (intentionally break a test)
# Edit __tests__/app.test.js
```

### Step 4: Add a Failing Test

In `__tests__/app.test.js`, add this failing test:

```javascript
test('intentional failing test', async () => {
  expect(true).toBe(false);  // This will fail!
});
```

### Step 5: Commit and Push (Trigger CI Pipeline)

```bash
git add __tests__/app.test.js
git commit -m "add failing test"
git push -u origin develop/failing-test
```

**Result:** GitHub Actions workflow will run and **FAIL** ❌
- You can see the failure in GitHub Actions tab

### Step 6: Fix the Failing Test

Update the test in `__tests__/app.test.js`:

```javascript
test('intentional failing test - now fixed', async () => {
  expect(true).toBe(true);  // Now it passes!
});
```

### Step 7: Commit and Push Fix (Trigger CI Pipeline Again)

```bash
git add __tests__/app.test.js
git commit -m "fix failing test"
git push origin develop/failing-test
```

**Result:** GitHub Actions workflow will run and **PASS** ✅
- You can see the success in GitHub Actions tab
- All tests pass
- Build completes successfully

### Step 8: Create Pull Request

1. Go to GitHub repository
2. Click "Compare & pull request" (or create PR manually)
3. Set:
   - Base: `main`
   - Compare: `develop/failing-test`
4. Click "Create pull request"

### Step 9: Merge to Main

Once PR is approved:
```bash
git checkout main
git pull origin main
git merge develop/failing-test
git push origin main
```

Or merge directly on GitHub UI

---

## 🔄 CI/CD Workflow Overview

```
┌─────────────────────────────────────────────────────────┐
│              Push Code to GitHub                         │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│      GitHub Actions Triggered Automatically              │
└──────────────────┬──────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────────────────┐
│  1. Checkout code                                        │
│  2. Setup Node.js environment                           │
│  3. Install dependencies (npm ci)                       │
│  4. Run tests (npm test)                                │
│  5. Build application (npm run build)                   │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
        ▼                     ▼
    ✅ PASS              ❌ FAIL
    Merge OK          Fix & Retry
```

## 📊 Workflow Status

Monitor your CI/CD pipeline:
- Go to **Actions** tab on GitHub
- See all workflow runs
- Click on a run to see detailed logs
- Check which tests passed/failed


