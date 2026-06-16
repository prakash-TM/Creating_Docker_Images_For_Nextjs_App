# Dockerizing a Next.js Application for Beginners

## Introduction

This guide explains how to create a Docker image for a Next.js application and run it inside a Docker container.

By the end of this tutorial, you will learn how to:

- Create a Dockerfile for a Next.js application
- Build a Docker image
- Run a Docker container
- Access the application from your browser
- Understand common Docker commands

---

# Prerequisites

Make sure the following tools are installed:

- Docker Desktop
- Node.js (optional for local development)
- A Next.js application

Verify Docker installation:

```bash
docker --version
```

Example output:

```bash
Docker version 28.x.x
```

---

# Project Structure

Example Next.js project:

```text
day2_creating_images_for_nextjs_app/
│
├── app/
├── public/
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── .npmrc
├── .dockerignore
└── Dockerfile
```

---

# Step 1: Create .dockerignore

Create a file named `.dockerignore`.

```text
node_modules
.next
.git
.env*
*.md
```

Why?

These files are not needed inside the image and will increase image size.

---

# Step 2: Create pnpm-workspace.yaml

Create:

```yaml
onlyBuiltDependencies:
  - sharp
  - unrs-resolver
```

This allows pnpm to execute required build scripts.

---

# Step 3: Create .npmrc

Create:

```ini
audit=false
verifyStoreIntegrity=false
minimumReleaseAge=0
```

---

# Step 4: Create Dockerfile

```dockerfile
FROM node:22-alpine

RUN apk add --no-cache libc6-compat vips-dev

RUN corepack enable
RUN corepack prepare pnpm@10.17.1 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml* pnpm-workspace.yaml .npmrc ./

RUN pnpm install --no-frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"]
```

---

# Step 5: Build Docker Image

Navigate to the project directory.

```bash
cd day2_creating_images_for_nextjs_app
```

Build the image:

```bash
docker build --no-cache -t day2_nextjs_app .
```

Explanation:

| Option          | Description          |
| --------------- | -------------------- |
| docker build    | Build an image       |
| --no-cache      | Ignore cached layers |
| -t              | Tag image            |
| day2_nextjs_app | Image name           |
| .               | Current directory    |

Successful output:

```bash
Successfully tagged day2_nextjs_app:latest
```

---

# Step 6: Verify Image

List all Docker images:

```bash
docker images
```

Example:

```bash
REPOSITORY          TAG       IMAGE ID
day2_nextjs_app     latest    abc123xyz
```

---

# Step 7: Run Container

Run the container and expose port 3000.

```bash
docker run -p 3000:3000 day2_nextjs_app
```

Explanation:

```bash
-p HOST_PORT:CONTAINER_PORT
```

Example:

```bash
-p 3000:3000
```

means:

```text
Browser → localhost:3000
Docker Container → port 3000
```

---

# Step 8: Open Application

Open:

```text
http://localhost:3000
```

You should see your Next.js application running.

---

# Step 9: Run Container in Background

```bash
docker run -d -p 3000:3000 --name nextjs-app day2_nextjs_app
```

Options:

| Option | Description    |
| ------ | -------------- |
| -d     | Detached mode  |
| --name | Container name |

---

# Step 10: View Running Containers

```bash
docker ps
```

Example:

```bash
CONTAINER ID   IMAGE             PORTS
abc123         day2_nextjs_app   0.0.0.0:3000->3000/tcp
```

---

# Step 11: View Logs

```bash
docker logs nextjs-app
```

---

# Step 12: Stop Container

```bash
docker stop nextjs-app
```

---

# Step 13: Remove Container

```bash
docker rm nextjs-app
```

---

# Step 14: Remove Image

```bash
docker rmi day2_nextjs_app
```

---

# Useful Docker Commands

### List Images

```bash
docker images
```

### List Running Containers

```bash
docker ps
```

### List All Containers

```bash
docker ps -a
```

### Remove Container

```bash
docker rm <container-id>
```

### Remove Image

```bash
docker rmi <image-id>
```

### View Logs

```bash
docker logs <container-name>
```

### Open Shell Inside Container

```bash
docker exec -it <container-name> sh
```

Example:

```bash
docker exec -it nextjs-app sh
```

---

# Common Errors

## Error 1

```text
Cannot connect to localhost:3000
```

Solution:

Run with port mapping:

```bash
docker run -p 3000:3000 day2_nextjs_app
```

---

## Error 2

```text
ERR_PNPM_IGNORED_BUILDS
```

Solution:

Create:

```yaml
pnpm-workspace.yaml
```

```yaml
onlyBuiltDependencies:
  - sharp
  - unrs-resolver
```

---

## Error 3

```text
pnpm version mismatch
```

Solution:

Pin pnpm version:

```dockerfile
RUN corepack prepare pnpm@10.17.1 --activate
```

---

# Conclusion

In this tutorial you learned:

✅ Create a Dockerfile

✅ Build a Docker image

✅ Run a Docker container

✅ Expose application ports

✅ View logs

✅ Stop and remove containers

✅ Fix common Next.js + pnpm Docker issues

You now have a fully Dockerized Next.js application running on:

```text
http://localhost:3000
```
