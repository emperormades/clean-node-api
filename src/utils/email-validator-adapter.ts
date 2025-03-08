import type { EmailValidator } from '../presentation/contracts'

export class EmailValidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
