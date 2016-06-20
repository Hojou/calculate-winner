import { CalculateWinnerPage } from './app.po';

describe('calculate-winner App', function() {
  let page: CalculateWinnerPage;

  beforeEach(() => {
    page = new CalculateWinnerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
