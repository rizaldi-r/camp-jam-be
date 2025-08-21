import { Injectable } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResourceNotFoundException } from 'src/_common/exceptions/custom-not-found.exception';
import { ModulesService } from 'src/modules/modules.service';

@Injectable()
export class LinksService {
  constructor(
    private prisma: PrismaService,
    private readonly modulesService: ModulesService,
  ) {}

  async create(createLinkDto: CreateLinkDto) {
    await this.modulesService.findById(createLinkDto.moduleId);
    return this.prisma.link.create({
      data: createLinkDto,
    });
  }

  async findAll(moduleId?: string) {
    const where = moduleId ? { moduleId } : {};
    return this.prisma.link.findMany({
      where,
    });
  }

  async findOne(id: string) {
    const link = await this.prisma.link.findUnique({
      where: { id },
    });
    if (!link) {
      throw new ResourceNotFoundException('Instructor', 'id', id);
    }
    return link;
  }

  async update(id: string, updateLinkDto: UpdateLinkDto) {
    return this.prisma.link.update({
      where: { id },
      data: updateLinkDto,
    });
  }

  async remove(id: string) {
    return this.prisma.link.delete({
      where: { id },
    });
  }
}
