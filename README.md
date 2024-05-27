# Desafío Soft Jobs

Acá dejé el desafío de Cafetería Nancao.

Para correr los tests correr:
`npm run test`
Para correr la aplicación en modo developer correr:
`npm run dev`

# Tests

### Pasan 3 de 4 tests.

```js
Test Suites: 1 failed, 1 total
Tests:       1 failed, 3 passed, 4 total
```

### El segundo test falla debido a que entrega un 400 en vez de un 404.

```js
Expected: 404
Received: 400

      13 |     const response = await request(server).delete("/cafes/5").send();
      14 |     const status = response.statusCode;
    > 15 |     expect(status).toBe(404);
         |                    ^
      16 |   });
      17 |   it("Probar que se la ruta POST crea nuevos cafes y devuelve 201", async () => {
      18 |     const responseCurrent = await request(server).get("/cafes").send();

      at Object.toBe (tests/server.spec.js:15:20)
```
