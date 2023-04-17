import BaseHttpError from './BaseHttpError';

export default class BadRequest extends BaseHttpError {
  constructor(message: string) {
    super(message, 400)
  }
}