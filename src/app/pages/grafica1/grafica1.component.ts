import { Component } from '@angular/core';



@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labels1: string[] = ['Pan', 'Refrescos', 'Tacos'];
  public labels2: string[] = ['Maíz', 'Trigo', 'Arroz'];
  public labels3: string[] = ['Atún', 'Camarón', 'Pulpo'];
  public labels4: string[] = ['Res', 'Cerdo', 'Pollo'];

  public data1: any = [10, 15, 40];
  public data2: any = [54, 63, 51];
  public data3: any = [68, 69, 70];
  public data4: any = [77, 35, 23];

}
