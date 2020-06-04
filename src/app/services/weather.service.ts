import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Unit } from '../models/weather';
import { environment } from './../../environments/environment';
import { WeatherModel } from './../models/weather';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private apiUrl = environment.apiBaseUrl;
    private apiKey = environment.apiKey;

    constructor(private http: HttpClient, private dataService: DataService) { }

    getById(cityId: number, unit?: Unit): Promise<WeatherModel> {
        let url = `${this.apiUrl}weather?id=${cityId}`;
        if (!unit) unit = this.dataService.getUnit().value;
        url += this.getQueryForUnit(unit);

        return this.http.get<WeatherModel>(`${url}&appid=${this.apiKey}`).toPromise();
    }

    private getQueryForUnit(unit: Unit): string {
        return '&units=' + unit;
    }
}
