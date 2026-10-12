import { test, expect } from '@playwright/test';
import { WidgetPage } from './widget.page';

test.describe('Виджет поддержки Учи.ру', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({ page }) => {
    widgetPage = new WidgetPage(page);
    await page.addLocatorHandler(
      page.locator('._UCHI_COOKIE__button'),
      async (button) => {
        await button.click();
      },
    );

    await page.goto('/', { waitUntil: 'domcontentloaded' });
  });

  test('открывается по нажатию кнопки', async () => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible();
  });

  test('показывает правильный заголовок при обращении в поддержку', async () => {
    await widgetPage.openWidget();

    await widgetPage.getPopularArticles().first().click();
    await widgetPage.clickWriteToUs();

    await expect(widgetPage.getTitle()).toHaveText('Связь с поддержкой');
  });

  test('показывает список популярных статей с непустым названием', async () => {
    await widgetPage.openWidget();

    const firstArticle = widgetPage.getPopularArticles().first();
    await expect(firstArticle).toBeVisible();
    await expect(firstArticle).not.toHaveText(/^\s*$/);
  });
});
