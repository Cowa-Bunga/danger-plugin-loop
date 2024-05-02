"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Danger Rules for Loop node projects
 */
function loop() {
    return __awaiter(this, void 0, void 0, function* () {
        const newFiles = danger.git.created_files;
        const deletedFiles = danger.git.deleted_files.length;
        const modifiedFiles = danger.git.modified_files;
        const { additions = 0, deletions = 0 } = danger.github.pr;
        const hasRequestedForReview = !!danger.github.reviews.map((review) => review.state).length;
        const { teams: teammates, users: reviewers } = danger.github.requested_reviewers;
        const changes = additions + deletions;
        const maximumChanges = 640;
        const testChanges = modifiedFiles.filter((filepath) => filepath.includes(".spec."));
        const hasAppChanges = modifiedFiles.length > 0;
        const hasTestChanges = testChanges.length > 0;
        const author = danger.github.pr.user.login;
        // await commitlint(config.rules)
        // @ts-ignore
        // const hasPackageJsonChanged = modifiedFiles.includes("package.json")
        // if (newFiles.length > 0 && !hasPackageJsonChanged) {
        //   warn(`:exclamation: New files have been added, but the version has not been updated`)
        // }
        message(`:exclamation: If this is not just a refactor, remember to update the version`);
        message(`The PR made changes on **${modifiedFiles.length}** files`);
        message(`The PR deleted **${deletedFiles}** files`);
        message(`The PR added **${newFiles.length}** new files`);
        message(`The PR added **${additions}** and removed **${deletions}** lines.`);
        if (changes > maximumChanges) {
            warn(`:exclamation: This is a big Pull Request, we found **${changes}** changes` +
                "\n > **Warning** \n" +
                "> Pull Request size seems relatively large. We strongly advise that you break down this Pull Request into smaller ones to ease the review and merging process.");
        }
        if (!hasRequestedForReview && teammates.length === 0 && reviewers.length === 0) {
            fail("Please ask someone to review this PR!");
        }
        // Warn if there are library changes, but not tests
        //   if (hasAppChanges && !hasTestChanges) {
        //     warn(
        //       "There are library changes, but not tests. That's OK as long as you're refactoring existing code",
        //     )
        //   }
        markdown(`All new code should be in line with our [Coding Guidelines](https://cowabunga-tasks.atlassian.net/wiki/x/DgCvAQ) [Technical Checklist](https://cowabunga-tasks.atlassian.net/wiki/x/DwDNCQ)
   * Keep files small, ideally under 160 LOC
   * Ensure new code is covered by tests
   * Keep all function pure, avoid side-effects
   * Avoid data mutation
   * Prefer const over let and var
   * K.I.S.S
   * Avoid using global state, state should be local unless the data is required elsewhere, and then should be in it's own state reducer.
   * Ensure business and UI logic are kept as separate as possible
   * Ensure new features are protected by a [Feature Flag](https://cowabunga-tasks.atlassian.net/wiki/x/AgC4)
  `);
        const assignedReviewers = reviewers.reduce((acc, reviewer) => `${acc} @${reviewer.login}`, "");
        markdown(`Please review this PR: ${assignedReviewers}`);
        // markdown(`@${author} Thanks for the PR!`)
    });
}
exports.default = loop;
