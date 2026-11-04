import { TestBed } from '@angular/core/testing';
import { Products } from './products';

describe('Products', () => {
  let service: Products;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Products);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('restores the remaining products after deletion', () => {
    const remaining = service.productList().slice(1);
    const save = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    service.deleteProduct(service.productList()[0].id);
    expect(save).toHaveBeenCalledWith('products', JSON.stringify(remaining));
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(remaining));
    expect(new Products().productList()).toEqual(remaining);
  });

  it('keeps an empty list after deleting the last product and reloading', () => {
    service.productList.set([service.productList()[0]]);
    const save = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
    service.deleteProduct(service.productList()[0].id);
    expect(save).toHaveBeenCalledWith('products', '[]');
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('[]');
    expect(new Products().productList()).toEqual([]);
  });
});
