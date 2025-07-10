import { expect, test } from "../base/base-fixtures"
import { FeedBackPage } from "../pages/feedback-page";
import { FeedbackRating } from "../types/enums";

test.describe("E2E Customer Feedback", () => {

    test("should allow user to send feedback", async ({ page }) => {
        const feedbackPage = new FeedBackPage(page);

        await feedbackPage.open();

        await expect(feedbackPage.getRatingSlider, "Incorrect Default Rating").toHaveAttribute("aria-valuetext", "1★")

        await feedbackPage.enterComment("TEST TEST TSSSS");
        await feedbackPage.setRatingWithKeys(FeedbackRating.FOUR_STARS);
        // OR await feedbackPage.selectRating(FeedbackRating.FOUR_STARS);

        await expect(feedbackPage.getRatingSlider, "Incorrect rating was selected").toHaveAttribute("aria-valuetext", "4★")

        await feedbackPage.calculateCaptchaAndSubmit();

        await expect(feedbackPage.getFeedbackSentMsg, "Feedback was not submitted").toHaveText("Thank you for your feedback.");
    });

});