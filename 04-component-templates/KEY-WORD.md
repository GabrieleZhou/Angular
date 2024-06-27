extending build-in element with custom component with attribute
ng-content in deep
CSS scoping & ViewEncapsulation
Host element
get access to host element through inject(ElementRef)
conditional css -> ex: <div [class.status]="currentStatus === 'online'"> apply status class if pass condition
dynamic class and style binding:
<div [class]="{
  status: true,
  'status-online': currentStatus === 'online',
  'status-offline': currentStatus === 'offline',
  'status-unknown': currentStatus === 'unknown'
}"
[style]="{
  'font-size': '10rem'
}">
literal types
life cycle
template variable
effect() -> run code in the ts component when a signal value change
constructor() {
    effect(() => {
      console.log(this.currentStatus());
    })
  }
alias and transform object for input