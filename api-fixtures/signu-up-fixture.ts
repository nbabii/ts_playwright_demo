import { test as base } from '@playwright/test';
import { UserInfo } from '../types/user.types';


type SignUpFixtures = {
  signUpUser: (userInfo: UserInfo) => Promise<object>;
};

export const test = base.extend<SignUpFixtures>({
  signUpUser: async ({ request }, use) => {
    const signUpUser = async (userInfo) => {
      const time = new Date().toISOString()

      const signUpResponse = await request.post('http://localhost:3000/api/Users/', {
        data: {
          email: userInfo.email,
          password: userInfo.password,
          passwordRepeat: userInfo.password,
          securityQuestion: {
            id: 2,
            question: "Mother's maiden name?",
            createdAt: time,
            updatedAt: time
          }
        }
      });

      if (!signUpResponse.ok()) {
        throw new Error(`Users request failed: ${await signUpResponse.text()}`);
      }

      const signUpBody = await signUpResponse.json();

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

      console.log(userInfo);

      return userInfo;
    };

    await use(signUpUser);
  },
});

export { expect } from '@playwright/test';