// src/subdescription/subdescription.controller.ts

import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CreateSubdescriptionDto } from './dto/create-subdescription.dto';
import { UpdateSubdescriptionDto } from './dto/update-subdescription.dto';
import { SubdescriptionsService } from 'src/subdescriptions/subdescriptions.service';

// TODO: guard
@Controller('subdescriptions')
export class SubdescriptionsController {
  constructor(private readonly service: SubdescriptionsService) {}

  @Post()
  create(@Body() createSubdescriptionDto: CreateSubdescriptionDto) {
    return this.service.create(createSubdescriptionDto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubdescriptionDto: UpdateSubdescriptionDto,
  ) {
    return this.service.update(id, updateSubdescriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
