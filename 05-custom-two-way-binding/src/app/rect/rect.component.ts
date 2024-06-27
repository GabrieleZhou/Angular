import { Component, EventEmitter, Input, Output, model } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding
 /*  @Input({required: true}) size!: {width: string; height: string};
  @Output() sizeChange = new EventEmitter<{width: string; height: string}>(); */ /* two way binding is just a combination of input and output, in order to work the output must have a specific name
  in order for Angular to understand: name of the input(size, in this case) + Change. */
  
  size = model.required<{width: string; height: string}>();

 /*  onReset() {
    this.sizeChange.emit({
      width: "200",
      height: "100"
    })
  } */

  onReset() {
    this.size.set({
      width: "200",
      height: "100"
    })
  }
}