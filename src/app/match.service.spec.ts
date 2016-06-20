/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import { MatchService } from './match.service';

describe('Match Service', () => {
  beforeEachProviders(() => [MatchService]);

  it('should ...',
      inject([MatchService], (service: MatchService) => {
    expect(service).toBeTruthy();
  }));
});
