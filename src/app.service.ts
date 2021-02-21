import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Microservice example';
  }

  findOne(id: string): string {
    if (id === '1') {
      return 'Found ID: ' + id;
    } else {
      throw new NotFoundException();
    }
  }
}
