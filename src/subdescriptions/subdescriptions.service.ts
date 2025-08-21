import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubdescriptionDto } from './dto/create-subdescription.dto';
import { UpdateSubdescriptionDto } from './dto/update-subdescription.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ModulesService } from 'src/modules/modules.service';

@Injectable()
export class SubdescriptionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly modulesService: ModulesService,
  ) {}

  async create(data: CreateSubdescriptionDto) {
    await this.modulesService.findById(data.moduleId);
    return this.prisma.subdescription.create({
      data,
    });
  }

  async findAll(moduleId?: string) {
    return this.prisma.subdescription.findMany({
      where: moduleId ? { moduleId } : undefined,
    });
  }

  async findOne(id: string) {
    const subdescription = await this.prisma.subdescription.findUnique({
      where: { id },
    });

    if (!subdescription) {
      throw new NotFoundException(`Subdescription with ID "${id}" not found`);
    }
    return subdescription;
  }

  async update(id: string, data: UpdateSubdescriptionDto) {
    return this.prisma.subdescription.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.subdescription.delete({
      where: { id },
    });
  }
}
