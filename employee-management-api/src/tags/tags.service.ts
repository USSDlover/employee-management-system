import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag } from './tag.model';
import { CreateTagDto } from './create-tag.dto';
import { UpdateTagDto } from './update-tag.dto';

@Injectable()
export class TagsService {
  constructor(@InjectModel('Tag') private readonly tagModel: Model<Tag>) {}

  async create(createTag: CreateTagDto): Promise<Tag> {
    const createdTag = new this.tagModel({ ...createTag });
    return createdTag.save();
  }

  async update(updatedTagDto: UpdateTagDto): Promise<Tag> {
    return this.tagModel
      .findByIdAndUpdate(updatedTagDto.id, updatedTagDto)
      .exec();
  }

  async delete(userId: string): Promise<Tag> {
    return this.tagModel.findByIdAndDelete(userId).exec();
  }

  async findAll(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }
}
