import { WariUIModule } from './ui.module';

describe('UiModule', () => {
  let uiModule: WariUIModule;

  beforeEach(() => {
    uiModule = new WariUIModule();
  });

  it('should create an instance', () => {
    expect(uiModule).toBeTruthy();
  });
});
