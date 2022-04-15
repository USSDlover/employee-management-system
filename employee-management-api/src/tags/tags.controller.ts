import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './create-tag.dto';
import { UpdateTagDto } from './update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async createUser(
    @Body('tag') createTagDto: CreateTagDto,
  ): Promise<{ id: string }> {
    const generatedId = await this.tagsService.create(createTagDto);
    return { id: generatedId._id };
  }

  @Delete()
  async deleteTag(@Body('id') tagId: string): Promise<any> {
    return this.tagsService.delete(tagId);
  }

  @Patch()
  async patchTag(@Body('tag') updateTagDto: UpdateTagDto): Promise<any> {
    return this.tagsService.update(updateTagDto);
  }

  @Get()
  getAllUsers() {
    return this.tagsService.findAll();
  }
}
