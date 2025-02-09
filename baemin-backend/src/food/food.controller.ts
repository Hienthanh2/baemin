import { Controller, Get, Query } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodListDto } from './dto/food-list.dto';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get()
  getFoodList(@Query() foodQuery: FoodListDto) {
    return this.foodService.getFoodList(foodQuery);
  }

  @Get('food-category')
  getFoodCategoryList() {
    return this.foodService.getFoodCategoryList();
  }
}
