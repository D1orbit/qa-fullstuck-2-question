import { type Locator, type Page } from '@playwright/test';

export class WidgetPage {
  private readonly body: Locator;
  private readonly openButton: Locator;

  constructor(page: Page) {
    this.openButton = page.getByTestId('openWidget');
    this.body = page.locator(
      '[class*="widgetWrapper"] > [class*="widget__"]',
    );
  }

  async openWidget(): Promise<void> {
    await this.openButton.click();
  }

  getWidgetBody(): Locator {
    return this.body;
  }

  getPopularArticles(): Locator {
    return this.body.locator(
      '[class*="popularTitle__"] + ul[class*="articles__"] > li',
    );
  }

  async clickWriteToUs(): Promise<void> {
    await this.body.getByRole('button', { name: /написать/i }).click();
  }

  getTitle(): Locator {
    return this.body.locator('header h5');
  }
}
