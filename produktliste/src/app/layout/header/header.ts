import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [RouterLink],
  selector: 'main-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private changeDetector = inject(ChangeDetectorRef);

  path = '';
  btn_text = 'Neues Produkt';

  ngOnInit() {
    this.updateHeader();

    this.router.events.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateHeader();
      }
    });
  }

  private updateHeader() {
    const url = this.router.parseUrl(this.router.url);
    this.path = url.root.children['primary']?.segments[0]?.path ?? '';

    this.btn_text =
      this.path === 'details' || this.path === 'productform' ? 'zurück zur Liste' : 'Neues Produkt';
    this.changeDetector.markForCheck();
  }
}
