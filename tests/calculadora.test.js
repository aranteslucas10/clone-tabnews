const calculadora = require("../models/calculadora");

test("Somar 2 + 2 deveria retornar 4", () => {
  const resultado = calculadora.somar(2, 2);
  expect(resultado).toBe(4);
});

test("Somar 5 + 100 deveria retornar 105", () => {
  const resultado = calculadora.somar(5, 100);
  expect(resultado).toBe(105);
});

test("Somar 'banana' + 100 deveveria retornar 'Erro'", () => {
  const resultado = calculadora.somar("banana", 100);
  expect(resultado).toBe("Erro");
});

test("Somar 100 + 'banana' deveria retornar 'Erro", () => {
  const resultado = calculadora.somar(100, "banana");
  expect(resultado).toBe("Erro");
});

test("Somar 'banana' + 'banana' deveria retornar 'Erro'", () => {
  const resultado = calculadora.somar("banana", "banana");
  expect(resultado).toBe("Erro");
});

test("Somar 1.5 + 0.5 deveria retornar 2", () => {
  const resultado = calculadora.somar(1.5, 0.5);
  expect(resultado).toBe(2);
});

test("Somar -1 + -1 deveria retornar -2", () => {
  const resultado = calculadora.somar(-1, -1);
  expect(resultado).toBe(-2);
});

test("Somar sem argumento deveria retornar 'Erro'", () => {
  const resultado = calculadora.somar();
  expect(resultado).toBe("Erro");
});

test("Dividir 1 / 1 deveria retornar 1", () => {
  const resultado = calculadora.dividir(1, 1);
  expect(resultado).toBe(1);
});

test("Dividir 1 / 'banana' deveria retornar 'Erro'", () => {
  const resultado = calculadora.dividir(1, "banana");
  expect(resultado).toBe("Erro");
});

test("Dividir 'banana' / 1 deveria retornar 'Erro'", () => {
  const resultado = calculadora.dividir("banana", 1);
  expect(resultado).toBe("Erro");
});
