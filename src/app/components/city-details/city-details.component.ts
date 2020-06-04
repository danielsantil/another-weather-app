import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from './../../../environments/environment';
import { DynamicComponentDirective } from './../../directives/dynamic-component.directive';
import { CityDetailsTab } from './../../models/city-details-tab';
import { WeatherModel } from './../../models/weather';
import { DataService } from './../../services/data.service';
import { WeatherService } from './../../services/weather.service';
import { CityInformationComponent } from './city-information/city-information.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { WeatherBaseComponent } from './weather-base-component';
import { WeatherConditionComponent } from './weather-condition/weather-condition.component';

@Component({
    templateUrl: './city-details.component.html'
})
export class CityDetailsComponent implements OnInit, OnDestroy {
    @ViewChild(DynamicComponentDirective, { static: false }) dynamicComponent: DynamicComponentDirective;
    weather: WeatherModel;
    iconUrl = environment.iconsUrl;
    activeTab: CityDetailsTab;
    tabs: CityDetailsTab[] = [
        { name: 'Weather condition', component: WeatherConditionComponent },
        { name: 'Temperature', component: TemperatureComponent },
        { name: 'City information', component: CityInformationComponent },
    ];
    $settingsChange: Subscription;

    constructor(private route: ActivatedRoute, private weatherService: WeatherService,
        private router: Router, private componentFactory: ComponentFactoryResolver,
        private dataService: DataService) { }

    ngOnInit(): void {
        const cityId = +this.route.snapshot.paramMap.get('id');
        this.getData(cityId, 0);

        this.$settingsChange = this.dataService.settingsChanged.subscribe(_ => {
            this.getData(cityId, this.tabs.indexOf(this.activeTab));
        });
    }

    getData(cityId: number, tabIndex: number): void {
        this.weatherService.getById(cityId).then(res => {
            this.weather = res;
            this.changeTab(this.tabs[tabIndex]);
        }).catch(_ => this.goToOverview());
    }

    changeTab(tab: CityDetailsTab): void {
        if (!tab.component) return;

        this.activeTab = tab;
        const resolver = this.componentFactory.resolveComponentFactory(tab.component);
        this.dynamicComponent.viewContainer.clear();
        const componentRef = this.dynamicComponent.viewContainer.createComponent(resolver);
        (componentRef.instance as WeatherBaseComponent).model = this.weather;
    }

    goToOverview(): void {
        this.router.navigate(['/cities']);
    }

    ngOnDestroy(): void {
        this.$settingsChange.unsubscribe();
    }
}
