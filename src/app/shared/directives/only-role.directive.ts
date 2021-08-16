import { AuthService } from './../services/auth.service';
import { Input, OnInit, Directive, ViewContainerRef, TemplateRef, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive({
  selector: '[onlyRole]'
})
export class OnlyRoleDirective {
  private subscription: Subscription[] = [];


  @Input() public onlyRole: Array<string>;

  constructor(
    private authService: AuthService,
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
  ) { }

  public ngOnInit(): void {
    console.log(this.authService.userCredential.role)

    if (this.onlyRole.indexOf(this.authService.userCredential.role) === -1) {
      this.templateRef.elementRef.nativeElement.style.display = 'hidden';
    } else {
      this.templateRef.elementRef.nativeElement.style.display = 'show';
    }
  }

  /**
   * on destroy cancels the API if its fetching.
   */
  public ngOnDestroy(): void {
    this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
