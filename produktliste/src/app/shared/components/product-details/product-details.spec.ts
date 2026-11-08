import { ProductModel } from '../../models/productmodel';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetails } from './product-details';
import { provideRouter, Router } from '@angular/router';
import { Supabase } from '../../services/supabase/supabase';

describe('ProductDetails', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;

  beforeEach(async () => {
    vi.spyOn(Supabase.prototype, 'getAllProducts').mockResolvedValue(undefined);
    vi.spyOn(Supabase.prototype, 'listensForChanges').mockImplementation(() => {});
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

  it('deletes the displayed product through Supabase and then navigates', async () => {
    const service = component.supabase;
    service.productDetail.set(new ProductModel({ id: 25, name: 'Test product' }));
    const remove = vi.spyOn(service, 'deleteProduct').mockResolvedValue(true);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    await component.deleteDetail();
    expect(remove).toHaveBeenCalledWith(25);
    expect(navigate).toHaveBeenCalledWith(['/']);
  });

  it('stays on the details page when deletion fails', async () => {
    vi.spyOn(component.supabase, 'deleteProduct').mockResolvedValue(false);
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate');
    await component.deleteDetail();
    expect(navigate).not.toHaveBeenCalled();
  });
});
