import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { Component } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

@Component({ template: '' })
class TestPage {}

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([
        { path: '', component: TestPage },
        { path: 'productform', component: TestPage },
        { path: 'details/:name', component: TestPage },
      ])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates text, icon, style and destination after navigation', async () => {
    const router = TestBed.inject(Router);

    for (const path of ['/productform', '/', '/details/Apfel', '/']) {
      await router.navigateByUrl(path);
      await fixture.whenStable();

      const button: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
      const isList = path === '/';
      expect(button.textContent?.trim()).toBe(isList ? 'Neues Produkt' : 'zurück zur Liste');
      expect(button.getAttribute('href')).toBe(isList ? '/productform' : '/');
      expect(button.classList.contains('btn--primary')).toBe(isList);
      expect(button.classList.contains('btn--secondary')).toBe(!isList);
      expect(button.querySelector('svg')?.getAttribute('width')).toBe(isList ? '14' : '12');
    }
  });
});
