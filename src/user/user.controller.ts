import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UsePipes,
    ValidationPipe,
    ParseUUIDPipe,
    BadRequestException,
    UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from './decorators/user.decorator';

import {
    ApiCreatedResponse,
    ApiResponse,
    ApiBody,
    ApiTags,
  } from '@nestjs/swagger'
import { ManyUsersDto, UserProfileDto } from './user.schema';
import { MAMY_USERS_DESC, ME_DESC } from './user.constants';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Post()
    // @UsePipes(new ValidationPipe())
    // create(@Body() createUserDto: CreateUserDto) {
    //   return this.userService.create(createUserDto);
    // }
    @ApiResponse({
        status: 200,
        type: ManyUsersDto,
        description: MAMY_USERS_DESC,
      })
    @UseGuards(JwtAuthGuard)
    @Get('many')
    findAll() {
        return this.userService.findAll();
    }

    @ApiResponse({
        status: 200,
        type: UserProfileDto,
        description: ME_DESC,
      })
    @UseGuards(JwtAuthGuard)
    @Get('me')
    getProfile(@User() user) {
        return this.userService.getProfile(user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    // @Auth()
    @UsePipes(new ParseUUIDPipe())
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @Patch(':id')
    // @Auth()
    @UsePipes(new ValidationPipe())
    update(@Param('id', ParseUUIDPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
        if (!updateUserDto.email && !updateUserDto.password && !updateUserDto.name) {
            throw new BadRequestException('одно из полей name, email, password обязательны');
        }
        return this.userService.update(id, updateUserDto);
    }

    //тут нужно добавить возможность удалять сотрудника
    @Delete(':id')
    @Auth()
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
}
