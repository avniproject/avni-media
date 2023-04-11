import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DownloadJobs } from './entity/media.entity';

@Injectable()
export class AppService {
  private name : string
  getHello(): string {
    return 'Hello World!';
  }

}


  

