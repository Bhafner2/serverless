# Futterplan

Java Version 17 minimum<br>
Node Version 14 minimum

## Dependency Update
`gradlew dependencyUpdates` zeigt eine Liste mit Abhängigkeiten für die neuere Versionen verfügbar sind.

## CodeGenerator
Die Api und die Dtos werden mit [openApi](api/openapi.yaml) generiert.

Generiert wird im frontend nach [client/src/app/gen](client/src/app/gen). 
Hier findet man den rest service mit dem namen *-rest-service.ts und das dto mit dem Namen *-dto.ts

Im Backend kommt es nach [server/src/gen](server/src/gen).
Hier kann man die Dto mit der endung *Dto.java finden.
Die Api jedoch ist nur eine Vorlage und macht noch nichts und muss selbst implementiert werden.

Der code wird automatisch im build step gebildet.
Man kann es aber auch manuell triggern mit: [build.cmd](api/build.cmd)

