import {
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(error: ZodError) {
    const issues = error.issues;

    throw new HttpException(issues, HttpStatus.BAD_REQUEST);
  }
}
