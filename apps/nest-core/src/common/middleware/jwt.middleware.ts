import { AuthService } from '@app/nest-core/module/auth/auth.service'
import { Injectable, NestMiddleware } from '@nestjs/common'

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  use(req: any, res: any, next: (error?: Error | any) => void) {
    const { headers } = req

    const token = headers.token

    next()
  }
}
