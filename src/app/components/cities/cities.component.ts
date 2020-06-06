import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MockServerService } from '../../services/mock-server/mock-server.service';
import { WeatherService } from '../../services/open-weather/weather.service';
import { environment } from './../../../environments/environment';
import { WeatherModel } from './../../models/weather';
import { DataService } from './../../services/data.service';

@Component({
    templateUrl: './cities.component.html'
})
export class CitiesComponent implements OnInit, OnDestroy {
    iconUrl = environment.iconsUrl;
    data: WeatherModel[] = [];

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
        this.data = [];
        const citiesResponse = await this.mockServer.getTopCities();

        // in order to keep the elements order, we first create each object and add it to the array.
        // later, each item is replaced by its full version and keep the initial index
        this.data = citiesResponse.map(x => {
            const entry = new WeatherModel();
            entry.id = x.id;
            return entry;
        });

        this.fillData();
    }

    private fillData(): void {
        this.data.forEach(async city => {
            const response = await this.weather.getById(city.id);
            const index = this.data.indexOf(this.data.find(x => x.id === city.id));
            this.data.splice(index, 1, response);
        });
    }

    ngOnDestroy(): void {
        this.$settingsChange.unsubscribe();
    }

}
