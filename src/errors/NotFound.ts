import BaseHttpError from './BaseHttpError';

export default class NotFound extends BaseHttpError {
  constructor(message: string) {
    super(message, 404)
  }
}