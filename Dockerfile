
# ---------- Stage 1: Build the application ----------
FROM eclipse-temurin:24-jdk AS builder

WORKDIR /app

# Copy Maven wrapper and pom first (better Docker caching)
COPY .mvn .mvn
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline

# Copy source code
COPY src src

# Build the JAR
RUN ./mvnw clean package -DskipTests

# ---------- Stage 2: Run the application ----------
FROM eclipse-temurin:24-jre

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]