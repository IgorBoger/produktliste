import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetails } from './product-details';
import { provideRouter, Router } from '@angular/router';
import { Supabase } from '../../services/supabase/supabase';

describe('ProductDetails', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [provideRouter([]), Supabase],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deletes the displayed product and returns to the list', () => {
    const service = component.productService;
    const product = service.productList()[0];
    service.productDetail.set(product);
    const remaining = service.productList().filter((p) => p.id !== product.id);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const save = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    fixture.nativeElement.querySelector('.btn--delete').click();
    expect(service.productList()).toEqual(remaining);
    expect(save).toHaveBeenCalledWith('products', JSON.stringify(remaining));
    expect(navigate).toHaveBeenCalledWith(['/']);
  });
});
