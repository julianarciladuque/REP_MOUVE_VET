import { Module } from '@nestjs/common';
import { HrServiceController } from './hr-service.controller';
import { HrServiceService } from './hr-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Role } from './entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',      // o el nombre del contenedor si estás dentro de Docker Compose
      port: 5431,
      username: 'postgres',
      password: '123456789',
      database: 'postgres',
      entities: [Employee,Role],
      synchronize: true, // ⚠️ solo para desarrollo
    }),
    TypeOrmModule.forFeature([Employee,Role]),],
  controllers: [HrServiceController],
  providers: [HrServiceService],
})
export class HrServiceModule {}
