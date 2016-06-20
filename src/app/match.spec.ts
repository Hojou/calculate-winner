/* tslint:disable:no-unused-variable */

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';
import {Match} from './match';

describe('Match', () => {
  it('should create an instance', () => {
    expect(new Match(null, null)).toBeTruthy();
  });
});
