import { RssReaderPage } from './app.po';

describe('rss-reader App', () => {
  let page: RssReaderPage;

  beforeEach(() => {
    page = new RssReaderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
