import { Page } from './app.po';

describe('App', () => {
  let page: Page;

  beforeEach(() => {
    page = new Page();
  });

  describe('default screen', () => {
    beforeEach(() => {
      page.navigateTo('/');
    });

    it('deve ter um titulo dizendo Vacine.org', () => {
      page.getTitle().then(title => {
        expect(title).toEqual('Vacine.org');
      });
    });
  });
});
