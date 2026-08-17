# Build Stage
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN chmod +x mvnw || true
COPY . .

RUN ./mvnw clean package -DskipTests

# Runtime Stage
FROM eclipse-temurin:24-jre

WORKDIR /app

COPY target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]