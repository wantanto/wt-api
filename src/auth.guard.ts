import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Set jwt authen to verfity secret
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const jwt = require('jsonwebtoken');

    try {
      jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = JSON.parse(JSON.stringify(request.headers));
    const [type, token] = headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

