import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantController } from './restaurant.controller';
import { RestaurantService } from './restaurant.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { Restaurant } from './restaurant.entity';
import { Keyword } from './keyword.entity';

describe('RestaurantController', () => {
  let controller: RestaurantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantController],
      providers: [RestaurantService, {
        // mock data to test getting restaurant endpoint
        provide: HttpService, useValue: {
          get: jest.fn(() => of({
            data: {
              "results": [
                {
                  "formatted_address": "G floor,Foodcourt (Gateway Bangsue) ,Pracharaj2 Rd, Bang Sue, Bangkok 10800, Thailand",
                  "geometry": {
                    "location": {
                      "lat": 13.8061101,
                      "lng": 100.5240377
                    }
                  },
                  "name": "Naikun Pochana",
                  "rating": 4
                }
              ]
            }
          }))
        }
      }],
    }).compile();

    controller = module.get<RestaurantController>(RestaurantController);
  });

  it('should be defined', () => {
    expect(controller.restaurant('test')).toBeDefined(); // test api endpoint working and return data
    expect(controller.restaurant('test')).toMatchObject(new Keyword()) // test api endpoint working and return data exact match with data constructure
  });
});


