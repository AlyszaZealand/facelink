# Feedback Opgave: FaceLink

# npm dependencies
- jest - deprecated (not jest-cli)
- axios
- joi
- supertest
- express
- morgen
- mongoose

# Arkitektur (lag og filopsætning)
```
project-root/
├── src/
│   ├── config/          # Konfiguration af MongoDB
│   ├── controllers/     # Håndterer server request og respons baseret på ruten
│   ├── middleware/      # Validering af input
│   ├── models/          # Beskriver brugerens MongoDB-schema og gemmer data
│   ├── routes/          # Bestemmer URL og HTTP-metode
│   └── app.js           # Konfiguration af express app
├── tests/               
│   └── api/             # Endpoint test
├── server.js            # Starter server og definerer port
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

# Data Flow
```
POST /users
↓
validation middleware
↓
users route
↓
users controller
↓
User model
↓
MongoDB
```

# Gennemgang
```
- User model
    - Definerer schema for User objektet
    - Indeholder metoder til at interagere med MongoDB
- User controller
    - Håndterer logik for at oprette en ny bruger
    - Validerer input og kalder User model for at gemme data
- Routes
    - Definerer endpoint for at oprette en ny bruger
    - Knytter endpoint til User controller og validation middleware
- Validation middleware
    - Tjekker om input data er korrekt formateret
    - Returnerer fejlbeskeder, hvis data ikke er korrekt formateret
- App
    - Konfigurerer express app med routes og middleware
- Server
    - Starter express server og lytter på en specificeret port

```
## EXTRA:
```
- User model
- User controller 
- Routes
- Validation middleware
- App 
- Jest test eller Supertest (måske slet)
    - Kræver require.main === module
    - behøver ikke at starte serveren, men kan teste app direkte
- node:test
    - Modeltester kan køres direkte mod modellen
    - API-tester kan importere app.js uden server.js
    - (supertest bruges oven i node:test til at sende HTTP-request til app.js, mens test af User-modellen kun skal importere User-modellen.)
- Server 
- Postman test
    - Test af hele dataflowet fra POST /users til MongoDB
    - Test af validering middleware med forskellige input data
    - model → controller → route → middleware → app → server → POST /users fra Postman → MongoDB
```

# Definér endpointets kontrakt
- POST /users
- Input: JSON med name og email
- Succes: 201 Created med den nye bruger
- Manglende eller ugyldige felter: 400 Bad Request
- Email findes allerede: eksempelvis 409 Conflict
- Databasefejl: 500 Internal Server Error

# Test disse scenarier
- Gyldigt navn og email opretter en bruger
- Den returnerede bruger har et _id
- posts starter som []
- Manglende navn afvises
- Manglende email afvises
- Ugyldig email afvises
- Samme email kan ikke oprettes to gange
- Brugeren kan ses i MongoDB efter requesten

# readme ændringer
- Din README kan derfor udvides med en tydelig kravspecifikation: 
- input, output, statuskoder, valideringsregler, MongoDB-model og testscenarier. 
- Start praktisk med MongoDB-forbindelsen og User-modellen, derefter endpointet og til sidst tests.

# Mønster
- Controller: modtager request og sender response
- Service: indeholder forretningslogik
    - det kan give mening, men det er ikke nødvendigt i dit nuværende projekt.
      - Et service-lag er især nyttigt, når:
      - forretningslogikken bliver større
      - flere controllers bruger den samme logik
      - du vil teste logikken uden HTTP-request/response
      - controllerne skal holdes simple
      - du senere får flere modeller eller eksterne services
      - Lige nu er projektet lille, og controlleren er overskuelig. Derfor er det helt acceptabelt at have logikken direkte i userController.js.
- Model: kommunikerer med databasen

# Tests
Start med Node.js' indbyggede testværktøj (node:test) og eventuelt Supertest

* En servicetest undersøger forretningslogikken, mens en API-test undersøger HTTP-request, statuskode og response. Du skal kunne forklare forskellen.

- De forskellige værktøjer har forskellige formål:
- Jest: Et testframework. Det er ikke generelt deprecated.
- Joi: Bruges til validering af data, ikke som testframework.
- Supertest: Bruges til at teste HTTP-endpoints i eksempelvis Express.
- Axios: Bruges til HTTP-kald, men er ikke et testframework.

```
Servicetest tester forretningslogikken direkte i en service-funktion uden at sende en HTTP-anmodning.
API-test tester hele HTTP-endepunktet, eksempelvis at en POST-request til /users:
•
sender JSON med Content-Type: application/json
•
giver status 201 ved succes eller 400 ved ugyldigt input
•
returnerer det forventede JSON-objekt
•
får middleware og controller til at spille sammen
Kort sagt: en servicetest tester hvad der sker, mens en API-test også tester hvordan det hænder via HTTP.

når du sender en HTTP-request gennem Postman til din Express-server og kontrollerer statuskode, headers og response, laver du en manuel API-test.

Jeg har ingen Service-test i mit projekt.
Jeg har en model test som tester om mongoose-modellen kan validere et brugerdokument korrekt. 
Jeg har en API-test som tester om POST /users returnerer 201 Created med den nye bruger, når input er gyldigt, og 400 Bad Request, når input er ugyldigt.
```
Lav disse 3 test med node:test.
```
Kan jeg oprette en bruger med gyldigt navn og email?
Bliver en bruger uden email afvist?
Kan jeg oprette to brugere med samme email?
```

# Oprette en brugerprofil (POST /users)
Input data:
```
{ 
  "name": "John Doe", 
  "email": "john.doe@example.com" 
} 
```
Output data:
![img.png](images/post-users-success.png)



