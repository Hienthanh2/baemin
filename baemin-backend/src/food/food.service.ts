import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodListDto } from './dto/food-list.dto';

@Injectable()
export class FoodService {
  constructor(private prismaService: PrismaService) {}

  async getFoodList(foodQuery: FoodListDto) {
    const { page, size, categoryId, keyword = '' } = foodQuery;

    const foodList = await this.prismaService.food.findMany({
      take: +size,
      skip: (page - 1) * size,
      where: {
        food_category_id: +categoryId,
        name: {
          contains: keyword,
        },
      },
    });

    return foodList;
  }

  async getFoodCategoryList() {
    return this.prismaService.food_category.findMany();
  }
}
