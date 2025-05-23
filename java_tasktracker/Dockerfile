# ----------- FRONTEND STAGE -------------
FROM node:20-alpine AS frontend

WORKDIR /app
COPY frontend/ ./frontend/
WORKDIR /app/frontend

RUN npm install
RUN npm run build


# ----------- BACKEND STAGE -------------
FROM maven:3.9.5-eclipse-temurin-17-alpine AS backend

WORKDIR /app
COPY tasktracker/ ./tasktracker/
WORKDIR /app/tasktracker

RUN mvn clean package -DskipTests


# ----------- FINAL RUNTIME IMAGE -------------
FROM eclipse-temurin:17-jdk-alpine

# Set environment variables
ENV SPRING_PROFILES_ACTIVE=prod \
    JAVA_OPTS=""

WORKDIR /app

# Copy backend jar
COPY --from=backend /app/tasktracker/target/*.jar app.jar

# Copy built frontend to static resources (optional, if serving via Spring)
COPY --from=frontend /app/frontend/dist/ /app/static/

# Expose the port Spring Boot runs on
EXPOSE 8080

CMD java $JAVA_OPTS -jar app.jar
