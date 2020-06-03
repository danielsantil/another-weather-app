import { ConsoleLogger } from './services/error-handler/console-logger';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CitiesComponent } from './components/cities/cities.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AppErrorHandlerService } from './services/error-handler/app-error-handler.service';
import { AppLogger } from './services/error-handler/app-logger';

export function getErrorHandler(logger: AppLogger): AppErrorHandlerService {
  return new AppErrorHandlerService(logger);
}

@NgModule({
  declarations: [
    AppComponent,
    CitiesComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ConsoleLogger,
    { provide: ErrorHandler, useFactory: getErrorHandler, deps: [ConsoleLogger] }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
