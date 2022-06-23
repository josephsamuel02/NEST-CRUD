import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


// @Global()  -- the global makes the exportet service to be available globally
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule { }
