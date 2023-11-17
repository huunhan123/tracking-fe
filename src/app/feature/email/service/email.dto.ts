export type EmailSenderDto = {
  id: string,
  email: string,
  password: string,
}

export type EmailTemplateDto = {
  id: string,
  name: string,
  url: string,
}

export type EmailDestinationDto = {
  id: string,
  name: string,
  email: string,
}