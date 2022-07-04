import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { timeout } from 'rxjs/operators'

@Controller('example-microservice-base-client')
export class ExampleMicroserviceBaseClientController {
  constructor(@Inject('NEST_SERVICE') private client: ClientProxy) {}

  // 发送消息
  @Get('message')
  accumulate(): Observable<number> {
    const pattern = { cmd: 'hello' }
    const payload = [1, 2, 3]

    return this.client.send<number>(pattern, payload).pipe(timeout(3000))
  }

  // 发布事件
  @Get('event')
  async publish() {
    this.client.emit<number>('user_created', { test: 1 })
  }
}
