import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectService {
    constructor(private prisma: PrismaService) {}
    async create(createProjectDto: CreateProjectDto) {
        const userId = '4dc3e94b-71aa-45c7-ad36-3089724aba78';
        const walletId = '4dc3e94b-71aa-45c7-ad36-3089724aba78';
        const { name, link, currencies } = createProjectDto;
        const project = await this.prisma.project.create({ data: { name, link, currencies, userId } });
        return project;
    }

    async findAllByUserId(userId: string) {
        const projects = await this.prisma.project.findMany({ where: { userId } });
        return projects;
    }

    // async findAllByWalletId(walletId: string) {
    //     const projects = await this.prisma.project.findMany({ where: { walletId } });
    //     return projects;
    // }

    // async findAllByUserIdAndWalletId(userId: string, walletId: string) {
    //     const projects = await this.prisma.project.findMany({ where: { userId, walletId } });
    //     return projects;
    // }

    // async findOneByUserIdAndWalletId(userId: string, walletId: string) {
    //     const project = await this.prisma.project.findFirst({ where: { userId, walletId } });
    //     return project;
    // }

    // async findOneByUserIdAndWalletIdAndName(userId: string, walletId: string, name: string) {
    //     const project = await this.prisma.project.findFirst({ where: { userId, walletId, name } });
    //     return project;
    // }

    // async findOneByUserIdAndWalletIdAndLink(userId: string, walletId: string, link: string) {
    //     const project = await this.prisma.project.findFirst({ where: { userId, walletId, link } });
    //     return project;
    // }

    async findAll() {
        return `This action returns all project`;
    }

    async findOne(id: number) {
        return `This action returns a #${id} project`;
    }

    async update(id: number, updateProjectDto: UpdateProjectDto) {
        return `This action updates a #${id} project`;
    }

    async remove(id: number) {
        return `This action removes a #${id} project`;
    }
}
