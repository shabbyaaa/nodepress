/**
 * @file 400 HttpBadRequest error
 * @module error/bad-request
 * @author Surmon <https://github.com/surmon-china>
 */

import { HttpException, HttpStatus } from '@nestjs/common'
import * as TEXT from '@app/constants/text.constant'

/**
 * @class HttpBadRequestError
 * @classdesc 400 -> Bad request
 * @example new HttpBadRequestError('error message')
 * @example new HttpBadRequestError(new Error())
 */
export class HttpBadRequestError extends HttpException {
  constructor(error?: any) {
    super(error || TEXT.HTTP_BAD_REQUEST_TEXT_DEFAULT, HttpStatus.BAD_REQUEST)
  }
}
