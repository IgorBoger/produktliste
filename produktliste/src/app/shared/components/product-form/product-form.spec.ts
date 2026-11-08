import { ProductModel } from '../../models/productmodel';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductForm } from './product-form';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { Supabase } from '../../services/supabase/supabase';

describe('ProductForm', () => {
  let component: ProductForm;
  let fixture: ComponentFixture<ProductForm>;

  beforeEach(async () => {
    vi.spyOn(Supabase.prototype, 'getAllProducts').mockResolvedValue(undefined);
    vi.spyOn(Supabase.prototype, 'listensForChanges').mockImplementation(() => {});
    await TestBed.configureTestingModule({
      imports: [ProductForm],
      providers: [provideRouter([]), Supabase],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the selected product through Supabase and then navigates', async () => {
    const service = TestBed.inject(Supabase);
    const product = new ProductModel({ id: 25, name: 'Original product', description: 'A valid product description', specs: 'Valid product specifications', stock: 1, price: 10, created_at: '2026-10-20' });
    service.productList.set([product]);
    const route = TestBed.inject(ActivatedRoute);
    vi.spyOn(route.snapshot, 'paramMap', 'get').mockReturnValue(convertToParamMap({ id: String(product.id) }));
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const update = vi.spyOn(service, 'updateProduct').mockResolvedValue(true);
    component.ngOnInit();
    expect(component.productForm.getRawValue().name).toBe(product.name);
    component.productForm.patchValue({ name: 'Edited product' });
    await component.onSubmit();
    expect(update).toHaveBeenCalledWith(expect.objectContaining({ id: 25, name: 'Edited product', created_at: product.created_at }));
    expect(navigate).toHaveBeenCalledWith(['/']);
  });
});
