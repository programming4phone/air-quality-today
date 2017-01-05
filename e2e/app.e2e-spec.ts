import { AirQualityTodayPage } from './app.po';

describe('air-quality-today App', function() {
  let page: AirQualityTodayPage;

  beforeEach(() => {
    page = new AirQualityTodayPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
