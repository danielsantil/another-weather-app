import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import { WeatherModel } from '../../models/weather';
import { DataService } from '../data.service';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private apiUrl = environment.apiBaseUrl;
    private apiKey = environment.apiKey;

    constructor(private http: HttpClient, private dataService: DataService,
        private translateService: TranslateService) { }

    getById(cityId: number): Promise<WeatherModel> {
        let url = `${this.apiUrl}weather?id=${cityId}`;
        url += '&units=' + this.dataService.getUnit().value;
        url += '&lang=' + this.translateService.currentLang;

        return this.http.get<WeatherModel>(url).toPromise();
    }
}
