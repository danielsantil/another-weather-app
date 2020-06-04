import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicComponentDirective } from './../../directives/dynamic-component.directive';
import { CityDetailsTab } from './../../models/city-details-tab';
import { WeatherModel } from './../../models/weather';
import { WeatherService } from './../../services/weather.service';
import { CityInformationComponent } from './city-information/city-information.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { WeatherBaseComponent } from './weather-base-component';
import { WeatherConditionComponent } from './weather-condition/weather-condition.component';

@Component({
    templateUrl: './city-details.component.html'
})
export class CityDetailsComponent implements OnInit {
    weather: WeatherModel;
    @ViewChild(DynamicComponentDirective, { static: false }) dynamicComponent: DynamicComponentDirective;
    activeTab: CityDetailsTab;
    tabs: CityDetailsTab[] = [
        { name: 'Weather condition', component: WeatherConditionComponent },
        { name: 'Temperature', component: TemperatureComponent },
        { name: 'City information', component: CityInformationComponent },
    ];

    constructor(private route: ActivatedRoute, private weatherService: WeatherService,
        private router: Router, private componentFactory: ComponentFactoryResolver) { }

    ngOnInit(): void {
        const cityId = +this.route.snapshot.paramMap.get('id');
        this.weatherService.getById(cityId).then(res => {
            this.weather = res;
            this.changeTab(this.tabs[0]);
        }).catch(_ => this.goToOverview());
    }

    changeTab(tab: CityDetailsTab): void {
        if (!tab.component || tab === this.activeTab) return;

        this.activeTab = tab;
        const resolver = this.componentFactory.resolveComponentFactory(tab.component);
        this.dynamicComponent.viewContainer.clear();
        const componentRef = this.dynamicComponent.viewContainer.createComponent(resolver);
        (componentRef.instance as WeatherBaseComponent).model = this.weather;
    }

    goToOverview(): void {
        this.router.navigate(['/cities']);
    }
}
