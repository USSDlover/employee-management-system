FROM node:16.13.0 AS builder
WORKDIR /employee-management-api
COPY employee-management-api/package*.json ./
RUN npm ci -q
COPY employee-management-api .
RUN npm run build
WORKDIR /employee-management
COPY employee-management/package*.json ./
RUN npm ci -q
COPY employee-management .
RUN npm run build

FROM node:16.3.0-alpine
WORKDIR /employee-management-api
COPY --from=builder /employee-management-api ./
CMD ["npm", "run", "start:prod"]
