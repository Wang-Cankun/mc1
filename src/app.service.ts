import { Injectable, NotFoundException } from '@nestjs/common'
import { PostDto } from './dto/post-dto'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Microservice example'
  }

  findOne(id: string): string {
    if (id === '1') {
      return 'Found ID: ' + id
    } else {
      throw new NotFoundException()
    }
  }

  postOne(data: PostDto): PostResult {
    return {
      id: data.id,
      timestamp: new Date()
    }
  }
}
