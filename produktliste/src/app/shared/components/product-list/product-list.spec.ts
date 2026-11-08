import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductList } from './product-list';
import { provideRouter } from '@angular/router';
import { Supabase } from '../../services/supabase/supabase';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;

  beforeEach(async () => {
    vi.spyOn(Supabase.prototype, 'getAllProducts').mockResolvedValue(undefined);
    vi.spyOn(Supabase.prototype, 'listensForChanges').mockImplementation(() => {});
    await TestBed.configureTestingModule({
      imports: [ProductList],
      providers: [provideRouter([]), Supabase],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
