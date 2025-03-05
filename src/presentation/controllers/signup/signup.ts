import type { AddAccount } from '../../../domain/usecases'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers'
import type {
  Controller,
  EmailValidator,
  HttpRequest,
  HttpResponse
} from '../../interfaces'

interface SignUpControllerParams {
  emailValidator: EmailValidator
  addAccount: AddAccount
}

export class SignUpController implements Controller{
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor({ emailValidator, addAccount }: SignUpControllerParams) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { name, email, password, passwordConfirmation } = httpRequest.body
      const isValid = this.emailValidator.isValid(String(email))
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      this.addAccount.add({ name, email, password })
    } catch {
      return serverError()
    }
  }
}
