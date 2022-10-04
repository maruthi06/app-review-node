import { expect } from 'chai';

import { ReviewsModel } from "../../src/models";
import { getAllDependencires } from '../common';
const reviews = require('../../src/models/data.json');

let reviewModel: ReviewsModel;

const newReview = {
    "review": "Pero deberia de poder cambiarle el idioma a alexa",
    "author": "MKM",
    "review_source": "MsStore",
    "rating": 4.5,
    "title": "Excelente",
    "product_name": "Amazon Alexa",
    "reviewed_date": new Date("2022-01-12T02:27:03.000Z")
};

describe("Review Model Test Cases", () => {

    before(async () => {
        const dep = await getAllDependencires();
        reviewModel = dep.reviewModel;
    });

    it("Get All Reviews", () => {
        const result = reviewModel.getReviews();

        expect(result.length).to.equal(reviews.length);
    });

    it("Add to review", () => {
        const result = reviewModel.getReviews();

        reviewModel.storeReviews(newReview);

        const result2 = reviewModel.getReviews();

        expect(result.length).to.equal(result2.length);
    });

    it("Filter by date", () => {
        const result = reviewModel.getReviews({ date: "2022-01-12" });
        expect(result).to.deep.equal([newReview]);
    });

    it("Filter by rating", () => {
        const result = reviewModel.getReviews({ rating: 4.5 });

        expect(result).to.deep.equal([newReview]);
    });

    it("Filter by store", () => {
        const result = reviewModel.getReviews({ source: "MsStore" });

        expect(result).to.deep.equal([newReview]);
    });

    it("Filter by store, date & rating", () => {
        const result = reviewModel.getReviews({ source: "MsStore", date: "2022-01-12", rating: 4.5 });

        expect(result).to.deep.equal([newReview]);
    });
});