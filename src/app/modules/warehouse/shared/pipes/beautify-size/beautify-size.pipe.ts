import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautifySize'
})
export class BeautifySizePipe implements PipeTransform {

  transform(sizeInBytes: number): string {
    if (sizeInBytes <= 1024) return `${sizeInBytes} B`;
    const aMultiples = ["KB", "MB", "GB", "TB"];
    for (let nMultiple = 0, nApprox = sizeInBytes as number / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        var sOutput = nApprox.toFixed(1) + " " + aMultiples[nMultiple];
    }
    return sOutput;
  }

}
