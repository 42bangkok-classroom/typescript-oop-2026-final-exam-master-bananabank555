import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';


@Controller('users') 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  test() {
    return this.userService.test();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('fields') fields?: string
  ) {
    const parsedFields = fields ? fields.split(',') : undefined;
    
    return this.userService.findOne(id, parsedFields);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}