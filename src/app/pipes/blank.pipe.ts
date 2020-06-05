import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'blank' })
export class BlankPipe implements PipeTransform {

    transform(value: any, newText: string): string {
        return value ? value : newText;
    }
}
