import { TestBed } from '@angular/core/testing';

import { AuthguardService } from './authguard.service';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthguardService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      FormsModule,
      HttpClientModule,
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: AuthguardService = TestBed.get(AuthguardService);
    expect(service).toBeTruthy();
  });
});