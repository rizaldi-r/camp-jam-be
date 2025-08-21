import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateSubmissionFieldDto } from './dto/create-submission-field.dto';
import { UpdateSubmissionFieldDto } from './dto/update-submission-field.dto';
import { SubmissionFieldsService } from 'src/submission-fields/submission-fields.service';

@Controller('submission-fields')
export class SubmissionFieldsController {
  constructor(
    private readonly submissionFieldsService: SubmissionFieldsService,
  ) {}

  @Post()
  create(@Body() createSubmissionFieldDto: CreateSubmissionFieldDto) {
    return this.submissionFieldsService.create(createSubmissionFieldDto);
  }

  @Get()
  findAll(@Query('submissionTemplateId') submissionTemplateId?: string) {
    return this.submissionFieldsService.findAll(submissionTemplateId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.submissionFieldsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubmissionFieldDto: UpdateSubmissionFieldDto,
  ) {
    return this.submissionFieldsService.update(id, updateSubmissionFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.submissionFieldsService.remove(id);
  }
}
