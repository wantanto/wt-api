import { Controller, Get, Query } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
    constructor(private restaurantService: RestaurantService) {
    }
    
    @Get()
    restaurant(@Query('keyword') keyword: string) {
        return this.restaurantService.getRestaurant(keyword);
    }
}
