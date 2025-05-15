import { test as base } from '@playwright/test';


type SignUpFixtures = {
  signUpUser: (userInfo) => Promise<{}>;
};

export const test = base.extend<SignUpFixtures>({
  signUpUser: async ({ request }, use) => {
    const signUpUser = async (userInfo) => {
      const signUpResponse = await request.post('http://localhost:3000/api/Users/', {
        data: {
          email: userInfo.email,
          password: userInfo.password,
          passwordRepeat: userInfo.password,
          securityQuestion: {
            id: 2,
            question: "Mother's maiden name?",
            createdAt: "2025-05-14T15:02:23.931Z",
            updatedAt: "2025-05-14T15:02:23.931Z"
          }
        }
      });

      if (!signUpResponse.ok()) {
        throw new Error(`Users request failed: ${await signUpResponse.text()}`);
      }

      let signUpBody = await signUpResponse.json();

      const answerResponse = await request.post('http://localhost:3000/api/SecurityAnswers/', {
        data: {
          UserId: signUpBody.data.id,
          answer: "test",
          SecurityQuestionId: 2
        }
      });

      if (!answerResponse.ok()) {
        throw new Error(`SecurityAnswers request failed: ${await answerResponse.text()}`);
      }

      return userInfo;
    };

    await use(signUpUser);
  },
});

export { expect } from '@playwright/test';