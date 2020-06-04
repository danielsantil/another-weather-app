import { WeatherModel } from './weather';
import { Coordinates } from './coordinates';

export class City {
    id: number;
    name: string;
    state: string;
    country: string;
    coord: Coordinates;
}

export class CityView {
    city: City;
    weather?: WeatherModel;
}