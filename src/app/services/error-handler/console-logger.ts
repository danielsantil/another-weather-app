import { AppLogger } from './app-logger';

export class ConsoleLogger extends AppLogger {

    log(error: any): void {
        console.log('WeatherLogger: ' + error);
    }
}
