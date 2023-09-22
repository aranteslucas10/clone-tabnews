function status(request, response) {
  // response.status(200).send("api/status aparentemente está funcionando!");
  response
    .status(200)
    .json({ msg: "api/status aparentemente está funcionando!" });
}

export default status;
