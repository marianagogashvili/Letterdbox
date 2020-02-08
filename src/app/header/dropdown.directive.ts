import { Directive, HostListener, HostBinding } from '@angular/core';

@Directive({
	selector: '[appDropdown]'
})
export class DropdownDirective {
	@HostBinding('class.open') open;

	@HostListener('mouseenter') mouseenter() {
		this.open = true;
	}
 
	@HostListener('mouseleave') mouseleave() {
		this.open = false;
	}


}