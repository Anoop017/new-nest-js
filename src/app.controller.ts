import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from "@nestjs/common";
import { AppService } from "./app.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { newUser } from "./users/user.entity";

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getAll(@Query('name') name?: string): Promise<newUser[]> {
    return this.appService.getAllUsers(name);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<newUser> {
    return this.appService.getUserById(Number(id));
  }

  @Post()
  async create(@Body() body: CreateUserDto): Promise<newUser> {
    return this.appService.createUser(body.name);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body('name') name: string
  ): Promise<newUser> {
    return this.appService.updateUser(Number(id), name);
  }

  @Patch(':id')
  async patch(
    @Param('id') id: string,
    @Body() body: UpdateUserDto
  ): Promise<newUser> {
    return this.appService.patchUser(Number(id), body.name);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.appService.deleteUser(Number(id));
  }
}