function somar(numero1, numero2) {
  if (typeof numero1 !== "number" || typeof numero2 !== "number") {
    return "Erro";
  }
  return numero1 + numero2;
}

function dividir(numero1, numero2) {
  if (typeof numero2 !== "number" || typeof numero1 !== "number") {
    return "Erro";
  }
  return numero1 / numero2;
}

exports.somar = somar;
exports.dividir = dividir;
