const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obtener un 200 en GET Cafes, ver que la respuesta sea un arreglo y que tenga al menos un objeto.", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
  it("Ver que al intentar eliminar un café que no existe entregue 404", async () => {
    const response = await request(server).delete("/cafes/5").send();
    const status = response.statusCode;
    expect(status).toBe(404);
  });
  it("Probar que se la ruta POST crea nuevos cafes y devuelve 201", async () => {
    const responseCurrent = await request(server).get("/cafes").send();
    // Para conseguir el listado actual y ver el último ID para asegurar que siempre añada uno nuevo.
    const response = await request(server)
      .post("/cafes")
      .send({
        id: responseCurrent.body[responseCurrent.body.length - 1].id + 1,
        nombre: "Frappucino",
      });
    const status = response.statusCode;
    expect(status).toBe(201);
    // Para ver si el ID ingresado existe actualmente con otra consulta.
    const responseNew = await request(server)
      .get(
        `/cafes/${responseCurrent.body[responseCurrent.body.length - 1].id + 1}`
      )
      .send();
    expect(responseNew.statusCode).toBe(200);
  });
  it("Probar que la actualización de cafés devuelve 400 si se envía un ID diferente al de parámetro", async () => {
    const response = await request(server).put("/cafes/3").send({
      id: 2,
      nombre: "Café con leche",
    });
    const status = response.statusCode;
    expect(status).toBe(400);
  });
});
