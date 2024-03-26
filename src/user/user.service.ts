import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}
    async create(createUserDto: CreateUserDto) {
        const user = await this.prisma.user.create({ data: createUserDto });
        return user;
    }

    async findAll() {
        const users = await this.prisma.user.findMany();
        return users;
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.prisma.user.update({
            where: {
                id,
            },
            data: updateUserDto,
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async remove(id: number) {
        return `This action removes a #${id} user`;
    }

    async getProfile(id: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
            include: {
                settings: true,
                notifications: true,
                wallets: true,
                projects: true,
            },
        });
        if (!user) {
            throw new NotFoundException('User not found');
        }
        const clearUser = this.removeUserFields(user);
        return {
            user: clearUser,
        };
    }

    removeUserFields(user) {
        const { id, userId, ...settings } = user.settings;
        const { id: notificationsId, userId: notificationsUserId, ...notifications } = user.notifications;
        const { name, surname, email, avatar } = user;
        const clearUser = {
            name,
            surname,
            email,
            avatar,
            settings: settings,
            notifications: notifications,
        };
        return clearUser;
    }
}
