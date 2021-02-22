import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { PostDto } from './dto/post-dto'
import { GrpcMethod } from '@nestjs/microservices'

interface INumberArray {
  data: number[]
}
interface ISumOfNumberArray {
  sum: number
}

@Controller()
export class AppController {
  private logger = new Logger('AppController')

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

  @GrpcMethod('AppController', 'Accumulate')
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray {
    this.logger.log(`Adding ${numberArray.data}`)
    return { sum: this.appService.accumulate(numberArray.data) }
  }
}
