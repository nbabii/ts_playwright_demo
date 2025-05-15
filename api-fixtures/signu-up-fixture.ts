import { test as base } from '@playwright/test';


type SignUpFixtures = {
  signUpUser: (userInfo) => Promise<{}>;
};

export const test = base.extend<SignUpFixtures>({
  signUpUser: async ({ request }, use) => {
    const signUpUser = async (userInfo) => {
      const response = await request.post('http://localhost:3000/api/Users/', {
          data: {
            email: userInfo.email,
            password: "123123",
            passwordRepeat: "123123",
            securityQuestion: {
              id: 2,
              question: "Mother's maiden name?",
              createdAt: "2025-05-14T15:02:23.931Z",
              updatedAt: "2025-05-14T15:02:23.931Z"
            }
          }
      });

      let resp = await response.text();

      console.log(resp);

      if (!response.ok()) {
        throw new Error(`Signup failed: ${resp}`);
      }

      const data = await response.json();
      return userInfo;
    };

    await use(signUpUser);
  },
});

export { expect } from '@playwright/test';