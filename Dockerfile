# Dockerfile
########################################
# Stage 1 - build the app
########################################
FROM node:20-alpine AS builder
WORKDIR /app

# install deps
COPY package.json package-lock.json* ./
# if you don't have package-lock, the next copy will still work
COPY yarn.lock* pnpm-lock.yaml* ./

# install dependencies (use npm by default)
RUN npm ci --prefer-offline --no-audit --progress=false

# copy source & build
COPY . .
RUN npm run build

########################################
# Stage 2 - serve with nginx
########################################
FROM nginx:stable-alpine
# create folder and copy built files
# we will copy the dist output into nginx html root
COPY --from=builder /app/dist /usr/share/nginx/html/mitsubishi

# copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# expose port 80 (mapped to host 8080 in docker-compose)
EXPOSE 8080

# default command already provided by nginx image
