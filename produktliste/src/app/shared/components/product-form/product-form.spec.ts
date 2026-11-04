import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductForm } from './product-form';
import { ActivatedRoute, convertToParamMap, provideRouter, Router } from '@angular/router';
import { Products } from '../../services/products';

describe('ProductForm', () => {
  let component: ProductForm;
  let fixture: ComponentFixture<ProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates the selected product without adding a duplicate and persists it', () => {
    const service = TestBed.inject(Products);
    const product = service.productList()[0];
    const count = service.productList().length;
    const route = TestBed.inject(ActivatedRoute);
    vi.spyOn(route.snapshot, 'paramMap', 'get').mockReturnValue(
      convertToParamMap({ id: String(product.id) }),
    );
    vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const save = vi.spyOn(Storage.prototype, 'setItem');
    component.ngOnInit();
    expect(component.productForm.getRawValue().name).toBe(product.name);
    component.productForm.patchValue({ name: 'Edited product' });
    component.onSubmit();
    expect(service.productList().length).toBe(count);
    expect(service.productList().find((p) => p.id === product.id)?.name).toBe('Edited product');
    expect(save).toHaveBeenCalledWith('products', JSON.stringify(service.productList()));
  });
});
