import { Pipe, PipeTransform } from '@angular/core';
import { DataService } from './../services/data.service';

@Pipe({ name: 'temperature' })
export class TemperaturePipe implements PipeTransform {

    constructor(private dataService: DataService) { }

    transform(value: number, ...args: any[]): string {
        const unit = this.dataService.getUnit();
        return value + ' ' + unit.label;
    }
}
