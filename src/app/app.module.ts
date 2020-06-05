import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesComponent } from './components/cities/cities.component';
import { CityDetailsComponent } from './components/city-details/city-details.component';
import { CityInformationComponent } from './components/city-details/city-information/city-information.component';
import { TemperatureComponent } from './components/city-details/temperature/temperature.component';
import { WeatherConditionComponent } from './components/city-details/weather-condition/weather-condition.component';
import { SettingsComponent } from './components/settings/settings.component';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';
import { BlankPipe } from './pipes/blank.pipe';
import { TemperaturePipe } from './pipes/temperature.pipe';
import { TimezonePipe } from './pipes/timezone.pipe';
import { AppErrorHandlerService } from './services/error-handler/app-error-handler.service';
import { AppLogger } from './services/error-handler/app-logger';
import { ConsoleLogger } from './services/error-handler/console-logger';
import { OpenWeatherInterceptor } from './services/open-weather/open-weather-interceptor';

export function getErrorHandler(logger: AppLogger): AppErrorHandlerService {
  return new AppErrorHandlerService(logger);
}

export function getTranslationLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    CityDetailsComponent,
    SettingsComponent,
    TemperaturePipe,
    TimezonePipe,
    BlankPipe,
    DynamicComponentDirective,
    WeatherConditionComponent,
    TemperatureComponent,
    CityInformationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: getTranslationLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ConsoleLogger,
    { provide: ErrorHandler, useFactory: getErrorHandler, deps: [ConsoleLogger] },
    { provide: HTTP_INTERCEPTORS, useClass: OpenWeatherInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
