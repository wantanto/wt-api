import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Keyword } from './keyword.entity';
import { Restaurant } from './restaurant.entity';


@Injectable()
export class RestaurantService {
    cacheArray: Keyword[] = []
    constructor(private readonly httpService: HttpService) { }

    async getRestaurant(keyword: string) {
        // search keyword from cache and get result from cache
        const inCache = this.cacheArray.find(item => item.keyword === keyword)
        if (inCache) {
            return inCache.restaurantResult;
        } else {
            // if keyword not found in cache then get new result from Google API
            const { data } = await firstValueFrom(
                this.httpService.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=Restaurants ${keyword}&key=${process.env.GOOGLE_MAP_KEY}`).pipe()
            );
            // inject new result into cache
            const cache = new Keyword();
            cache.keyword = keyword;
            cache.restaurantResult = [];
            data.results.forEach(element => {
                let restaurant = new Restaurant();
                restaurant.name = element.name;
                restaurant.address = element.formatted_address;
                restaurant.rating = element.rating;
                restaurant.lat = element.geometry.location.lat;
                restaurant.lng = element.geometry.location.lng;
                cache.restaurantResult.push(restaurant);
            });
            this.cacheArray.push(cache);
            return cache.restaurantResult;
        }
    }
}
