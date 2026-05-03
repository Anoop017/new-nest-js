import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller('users')
export class AppController{
  constructor(private readonly appService: AppService){}

  @Get()
  getAll(){
    return this.appService.getAllUsers()
  }

  @Post()
  create(@Body('name') name: string){
    return this.appService.createUser(name);
  }

  @Put()
  update(@Param('id') id:string @Body('name')name:string){
    return this.appService.updateUser(Number(id),name)
  }

  @patvh

}