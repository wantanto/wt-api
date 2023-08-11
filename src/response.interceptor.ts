import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Response as ExpressResponse } from 'express';

@Injectable()
export class ResponseHeader implements NestInterceptor {
    intercept(context:ExecutionContext, next:CallHandler): Observable<any> {
        // Set response headers to secure API
        const ResponseObj:ExpressResponse = context.switchToHttp().getResponse();
        ResponseObj.setHeader('Content-Type', 'application/json' );
        ResponseObj.setHeader('X-Content-Type-Options', 'nosniff' );
        ResponseObj.setHeader('X-Frame-Options', 'DENY' );
        ResponseObj.setHeader('X-XSS-Protection', '1; mode=block' );
        ResponseObj.setHeader('Content-Security-Policy', "script-src 'self'" );
        ResponseObj.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload' );
        ResponseObj.setHeader('cache-control', 'no-cache, no-store, must-revalidate' );
        ResponseObj.setHeader('pragma', 'no-cache' );
        return next.handle();
    }
}