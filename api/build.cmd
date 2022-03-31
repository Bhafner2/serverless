cd ../server
START "build backend" gradlew openApiGenerate

cd ../client
START "build frontend" npm run openapi:build
