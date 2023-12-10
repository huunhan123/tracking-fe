export type EmailSenderDto = {
  id: string,
  email: string,
  password: string,
  tag: string,
  nextTime: number,
}

export type EmailTemplateDto = {
  id: string,
  name: string,
  url: string,
  tag: string,
}

export type EmailDestinationDto = {
  id: string,
  name: string,
  email: string,
  tag: string,
}

export type EmailLinkDto = {
  id: string,
  link: string,
  tag: string,
}

export type EmailSubjectDto = {
  id: string,
  subject: string,
  greeting: boolean,
  tag: string,
}