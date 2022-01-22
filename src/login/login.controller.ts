import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateLoginDto } from './dto/create-login.dot';

@ApiTags('登录')
@Controller('login')
export class LoginController {
  constructor(private readonly service: LoginService) {}

  @ApiOperation({ summary: '登录' })
  @Post('login')
  login(@Body() post: CreateLoginDto): string {
    console.log(post);
    return this.service.getHello();
  }

  @ApiOperation({ summary: '获取登录信息' })
  @Get('getInfo')
  getLoginInfo(@Query() post: CreateLoginDto): string {
    return this.service.getHello();
  }
}