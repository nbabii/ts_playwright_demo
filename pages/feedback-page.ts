import { type Page, type Locator } from "@playwright/test";
import { BasePage, step } from "../base/base-page";
import { FeedbackRating } from "../types/enums";

export class FeedBackPage extends BasePage {
    readonly getCommentTextArea: Locator;
    readonly getRatingSlider: Locator;
    readonly getRatingStars: Locator
    readonly getCaptcha: Locator;
    readonly getCaptchaResult: Locator;
    readonly getSubmitBtn: Locator;
    readonly getFeedbackSentMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.getCommentTextArea = page.getByRole("textbox", { name: "Field for entering the comment or the feedback"});
        this.getRatingStars = page.locator("[class*='mdc-slider__tick-mark--']");
        this.getCaptcha = page.locator("#captcha");
        this.getCaptchaResult = page.getByRole("textbox", { name: "Field for the result of the CAPTCHA code" });
        this.getRatingSlider = page.getByRole("slider");
        this.getSubmitBtn = page.getByRole("button", { name: "Button to send the review" });
        this.getFeedbackSentMsg = page.locator("[id *='mat-snack-bar-container'] .mdc-snackbar__label");
    }

    @step("Open Customer Feedback Page")
    async open() {
        await this.page.goto("/#/contact");
        await this.closeWlcmBannerIfPresent();
    }

    @step("Enter feedback comment")
    async enterComment(comment: string) {
        await this.getCommentTextArea.fill(comment);
    }

    @step("Select feedback rating")
    async selectRating(rating: FeedbackRating) {
        await this.getRatingStars.nth(rating).click({ force: true });
    }

    @step("Set feedback using keyboard")
    async setRatingWithKeys(rating: FeedbackRating) {
        await this.getRatingSlider.focus();
        for (let i = 0; i < rating; i++)
            await this.getRatingSlider.press("ArrowRight");
    }

    @step("Calculate captcha and submit")
    async calculateCaptchaAndSubmit() {
        const c = await this.getCaptcha.textContent();
        await this.getCaptchaResult.fill(eval(c ? c : "").toString());
        await this.getSubmitBtn.click();
    }
}