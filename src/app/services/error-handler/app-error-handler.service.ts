import { ErrorHandler, Injectable } from '@angular/core';
import { AppLogger } from './app-logger';

@Injectable()
export class AppErrorHandlerService extends ErrorHandler {

    constructor(private logger: AppLogger) {
        super();
    }

    handleError(error: any): void {
        if (!error) return;

        this.logger.log(error);
    }
}
