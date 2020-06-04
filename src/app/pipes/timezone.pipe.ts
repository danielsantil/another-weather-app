import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'timezone' })
export class TimezonePipe implements PipeTransform {
    transform(value: number, ...args: any[]): string {
        const hours = value / 60 / 60;
        return hours < 0 ? 'UTC' + hours : 'UTC+' + hours ;
    }
}
