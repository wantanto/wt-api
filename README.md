# Assignment Tech Studio: API endpoint

## Description

- Develop API endpoint by using NestJS and Typescript to communicate with Google Map API.
- Secure API endpoint with NestJS Global Guard to authen JWT token, generate self sign certificate and implement API endpoint to request with HTTPS, and implement NestJS Global Interceptor to set response secure headers such as 'X-Content-Type-Options': 'nosniff' and other.
- Cache the search result to improve the performance.
- Do testing with jest.

## System Architecture Diagram

![System Architecture Diagram](https://raw.githubusercontent.com/wantanto/wt-api/main/Assignment%20Tech%20Studio.drawio.png)

## Installation

1. Install Node JS
2. Install Package Dependency
```bash
$ npm install
```
3. Copy and paste file .env to root directory
4. Copy and paste secrets folder to root directory

## Running the app

```bash
# watch mode
$ npm run start:dev
```

## Run unit testing

```bash
# unit tests
$ npm test
```


