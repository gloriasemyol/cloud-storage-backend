# Stage 1: Build the application using Maven
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app
COPY . .
# If your project files are inside a subfolder (e.g., backend or cloud-storage-backend), 
# change '.' below to that folder name. If pom.xml is nested, adjust accordingly.
RUN mvn clean package -DskipTests

# Stage 2: Run the application using OpenJDK runtime
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]