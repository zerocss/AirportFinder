import { AirportfinderPage } from './app.po';

describe('airportfinder App', function() {
  let page: AirportfinderPage;

  beforeEach(() => {
    page = new AirportfinderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
