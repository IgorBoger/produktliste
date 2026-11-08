import { TestBed } from '@angular/core/testing';
import { Supabase } from './supabase';

describe('Supabase', () => {
  let service: Supabase;

  beforeEach(() => {
    vi.spyOn(Supabase.prototype, 'getAllProducts').mockResolvedValue(undefined);
    vi.spyOn(Supabase.prototype, 'listensForChanges').mockImplementation(() => {});
    TestBed.configureTestingModule({
      providers: [Supabase],
    });
    service = TestBed.inject(Supabase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
