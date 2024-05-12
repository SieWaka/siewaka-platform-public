const signupRequestMail = (firstName: string, lastName: string) =>
  `
¡Hola!
${firstName} ${lastName} solicitó sumarse para colaborar con Sie Waka.
Ingresá a ${process.env.BASE_URL} para más información.
`;

export default signupRequestMail;
