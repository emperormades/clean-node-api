import { InvalidParamError, MissingParamError } from '../errors'
import { badRequest, serverError } from '../helpers'
import type {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from '../interfaces'

export class SignUpController implements Controller{
  private readonly emailValidator: EmailValidator

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(String(httpRequest.body.email))
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch {
      return serverError()
    }
  }
}
