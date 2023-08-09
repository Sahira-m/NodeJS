/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';


import { WinstonModule } from 'nest-winston';
import { transports, format } from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');
// import { main } from "../prisma/seed"

/*import { GraphQLServer } from 'graphql-yoga'
import { createContext } from './context'
import { permissions } from './permissions'*/


async function bootstrap() {
  process.env.DATABASE_URL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?schema=${process.env.DB_SCHEMA}&sslmode=prefer`;
  process.env.SHADOW_DATABASE_URL = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}?schema=dbmigration&sslmode=prefer`;
  console.log("Hello");
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
    rawBody: true,
     logger: WinstonModule.createLogger({
      transports: [
        // let's log errors into its own file
        //  on daily rotation (error only)
        new DailyRotateFile({
          // %DATE will be replaced by the current date
          filename: `logs/%DATE%-error.log`,
          level: 'error',
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false, // don't want to zip our logs
          maxFiles: '30d', // will keep log until they are older than 30 days
        }),
        // logging all level
        new DailyRotateFile({
          filename: `logs/%DATE%-combined.log`,
          format: format.combine(format.timestamp(), format.json()),
          datePattern: 'YYYY-MM-DD',
          zippedArchive: false,
          maxFiles: '15d',
        }),
        // we also want to see logs in our console
        new transports.Console({
          format: format.combine(
            format.cli(),
            format.splat(),
            format.timestamp(),
            format.printf((info) => {
              return `${info.timestamp} ${info.level}: ${info.message}`;
            }),
            // format.prettyPrint(),
          ),
        }),
      ],
    }),
  });
  console.log(1);
  //console.log(PrismaService);
  const prismaService = app.get(PrismaService,{ strict: false });
  //console.log(prismaService);
   console.log(2);
  await prismaService.enableShutdownHooks(app);
  console.log(3);
 
  const config = new DocumentBuilder()
    .setTitle('Service Example')
    .setDescription('Service that can be used for boiler plating')
    .setVersion('1.0')
    .addTag('example')
    .addTag('default')
    .addBearerAuth()
    .build();
  //console.log("config is",config);
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  /* console.log(" \napp is", app);
  console.log("\ndoc is", document);
  console.log("\nconfig is ", config); */
  console.log("\n Docs",document);
  await app.startAllMicroservices();
  await app.listen(8000);
  console.log('http://localhost:8000/api/auth');
  // http://localhost:8080`

}
bootstrap();
