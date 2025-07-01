import { test as base } from '@playwright/test';

type BaseFixtures = {
  autoLoggerFixture: void;
};

export const test = base.extend<BaseFixtures>({
    autoLoggerFixture: [
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
    { auto: true }],
});

export { expect } from '@playwright/test';