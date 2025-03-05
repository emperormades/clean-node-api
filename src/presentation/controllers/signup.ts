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
      // eslint-disable-next-line @typescript-eslint/prefer-destructuring, @typescript-eslint/no-unsafe-assignment
      const { email, password, passwordConfirmation } = httpRequest.body
      const isValid = this.emailValidator.isValid(String(email))
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
    } catch {
      return serverError()
    }
  }
}
