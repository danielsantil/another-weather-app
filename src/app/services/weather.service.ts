import { WeatherModel } from './../models/weather';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Unit } from '../models/weather';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private apiUrl = environment.apiBaseUrl;
    private apiKey = environment.apiKey;

    constructor(private http: HttpClient) { }

    getById(cityId: string, unit?: Unit): Promise<WeatherModel> {
        let url = `${this.apiUrl}weather?id=${cityId}`;
        if (unit) url += this.getQueryForUnit(unit);

        return this.http.get<WeatherModel>(`${url}&appid=${this.apiKey}`).toPromise();
    }

    private getQueryForUnit(unit: Unit): string {
        return '&units=' + unit;
    }
}
