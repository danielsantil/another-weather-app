import { Injectable } from '@angular/core';
import { City } from '../../models/city';
import Cities from './cities.json';

@Injectable({
    providedIn: 'root'
})
export class MockServerService {

    getTopCities(): Promise<City[]> {
        const cities: City[] = Array.from(Cities).slice(0, 3);
        return new Promise(resolve => resolve(cities));
    }
}
