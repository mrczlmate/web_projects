# ----------- FRONTEND IMAGE -------------
FROM node:20-alpine AS frontend

WORKDIR /app
COPY frontend/ ./
RUN npm install && npm run build
RUN npm install -g serve

# ----------- BACKEND BUILD IMAGE -------------
FROM maven:3.9.5-eclipse-temurin-17-alpine AS backend

WORKDIR /app
COPY tasktracker/ ./tasktracker/
WORKDIR /app/tasktracker
RUN mvn clean package -DskipTests

# ----------- BACKEND RUNTIME IMAGE -------------
FROM eclipse-temurin:17-jdk-alpine AS backend-runtime

WORKDIR /app
COPY --from=backend /app/tasktracker/target/tasktracker-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
