import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { hash, compare, genSalt } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PASSWORD_OR_LOGIN_INCORRECT } from './auth.constants';

import {
    User,
    Prisma,
  } from '@prisma/client'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}
    async register(input: Prisma.UserCreateInput) {
        const salt = await genSalt(10);

        const newUserData = {
            name: input.name || 'Unknown user',
            email: input.email,
            password: await hash(input.password, salt),
        };

        const user = await this.prisma.user.create({
            data: {
                ...newUserData,
                settings: {
                    create: {},
                },
                notifications: {
                    create: {},
                },
            },
            include: {
                settings: true,
                notifications: true,
            },
        });

        const tokens = await this.issueTokenPair(user.id);

        return {
            user: this.returnUserFields(user),
            ...tokens,
        };
    }

    async login(
        where: Prisma.UserWhereUniqueInput,
        password: string
        ) {
        const user = await this.prisma.user.findUnique({
            where,
            include: {
                settings: true,
                notifications: true,
                wallets: true,
                projects: true,
            },
        });
        if (!user) {
            throw new UnauthorizedException(PASSWORD_OR_LOGIN_INCORRECT);
        }
        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException(PASSWORD_OR_LOGIN_INCORRECT);
        }
        const tokens = await this.issueTokenPair(user.id);
        const clearUser = this.removeUserFields(user);
        return {
            user: clearUser,
            ...tokens,
        };
    }

    async issueTokenPair(id: string) {
        const data = {
            id,
        };
        const refreshToken = await this.jwtService.signAsync(data, {
            expiresIn: '7d',
        });

        const accessToken = await this.jwtService.signAsync(data, {
            expiresIn: '15m',
        });

        return {
            refreshToken,
            accessToken,
        };
    }

    returnUserFields(user) {
        return {
            name: user.name,
            email: user.email,
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

    async getNewTokens(refreshToken) {
        const result = await this.jwtService.verifyAsync(refreshToken);
        if (!result) {
            throw new UnauthorizedException();
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: result.id,
            },
        });
        const tokens = await this.issueTokenPair(user.id);
        return {
            user: this.returnUserFields(user),
            ...tokens,
        };
    }
}
