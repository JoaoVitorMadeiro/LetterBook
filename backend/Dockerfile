# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copy project files
COPY . .

# Build all modules
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
ARG SERVICE_NAME
# Example usage: docker build --build-arg SERVICE_NAME=Gateway -t letterbook-gateway .

# Copy the specific jar based on the SERVICE_NAME argument
# We assume the jar is in target/ and follows standard naming or we use wildcard
COPY --from=build /app/${SERVICE_NAME}/target/*.jar app.jar

ENV PORT=8080
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
