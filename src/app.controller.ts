import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { PostDto } from './dto/post-dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return this.appService.findOne(id)
  }

  @Post()
  postOne(@Body() postDto: PostDto): PostResult {
    return this.appService.postOne(postDto)
  }
}
