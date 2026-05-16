
import { Context } from './Context'


class ThrowawayEmailError extends Error {

  isThrowawayEmailError = true

  sdk = 'ThrowawayEmail'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  ThrowawayEmailError
}

