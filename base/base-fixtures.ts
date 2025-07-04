import { test as base } from '@playwright/test';

type BaseFixtures = {
  autoTimeLoggerFixture: void;
};

export const test = base.extend<BaseFixtures>({
    page: async ({ context, page }, use) => {
        await context.addCookies([
            {
                name: 'cookieconsent_status',
                value: 'dismiss',
                domain: 'localhost',
                path: '/',
                httpOnly: false,
                secure: false,
            }
        ]);
            
        await use(page);
    },
    autoTimeLoggerFixture: [
        async ({}, use) => {
            test.info().annotations.push({
                type: 'Test Start',
                description: new Date().toISOString(),
            });
                
            await use();

            test.info().annotations.push({
                type: 'Test End',
                description: new Date().toISOString(),
            });
        },
        { auto: true }
    ],
});

export function step(stepName?: string) {
  return function decorator<T extends (...args: unknown[]) => unknown>(
    target: T,
    context: ClassMethodDecoratorContext
  ) {
    return function replacementMethod(this: object, ...args: Parameters<T>): ReturnType<T> {
      const name = `${stepName || (context.name as string)} (${this.constructor.name})`;
      return test.step(name, async () => {
        return await target.apply(this, args);
      }) as ReturnType<T>;
    };
  };
}

export { expect } from '@playwright/test';