import { City } from '../../models/city';
import { Component, OnInit } from '@angular/core';
import { MockServerService } from '../../services/mock-server/mock-server.service';

@Component({
    templateUrl: './cities.component.html'
})
export class CitiesComponent implements OnInit {
    cities: City[] = [];

    constructor(private mockServer: MockServerService) { }

    async ngOnInit(): Promise<void> {
        this.cities = await this.mockServer.getTopCities();
    }

}
