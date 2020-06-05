import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockServerService } from '../../services/mock-server/mock-server.service';
import { WeatherService } from '../../services/open-weather/weather.service';
import { environment } from './../../../environments/environment';
import { CityView } from './../../models/city';
import { DataService } from './../../services/data.service';

@Component({
    templateUrl: './cities.component.html'
})
export class CitiesComponent implements OnInit, OnDestroy {
    cities: CityView[] = [];
    iconUrl = environment.iconsUrl;

    $settingsChange: Subscription;

    constructor(private mockServer: MockServerService, private weather: WeatherService,
        private dataService: DataService) { }

    ngOnInit(): void {
        this.getData();
        this.$settingsChange = this.dataService.settingsChanged.subscribe(_ => {
            this.getData();
        });
    }

    async getData(): Promise<void> {
        const citiesResponse = await this.mockServer.getTopCities();
        this.cities = citiesResponse.map(x => {
            const cityView: CityView = { city: x };
            this.getWeatherInfo(cityView);
            return cityView;
        });
    }

    async getWeatherInfo(cityView: CityView): Promise<void> {
        const weatherResponse = await this.weather.getById(cityView.city.id);
        cityView.weather = weatherResponse;
    }

    ngOnDestroy(): void {
        this.$settingsChange.unsubscribe();
    }

}
