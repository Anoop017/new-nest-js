import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";



@Controller('users')
export class AppController{
  constructor(private readonly appService: AppService){}

  @Get()
  getAll(@Query('name')name?:string){
    return this.appService.getAllUsers(name)
  }

  @Post()
  create(@Body() body:CreateUserDto){
    return this.appService.createUser(body.name);
  }

  @Put(':id')
  update(@Param('id') id:string, @Body('name')name:string){
    return this.appService.updateUser(Number(id),name)
  }

  @Patch(':id')
  patch(
    @Param('id')id:string,
    @Body() body:UpdateUserDto
  ){
    return this.appService.patchUser(Number(id),body.name)
  }

  @Delete(':id')
  delete(@Param('id')id:string){
    return this.appService.deleteUser(Number(id))
  }

}