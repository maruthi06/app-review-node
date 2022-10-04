import * as express from 'express';
import * as request from 'supertest';
import { expect } from 'chai';
import { getAllDependencires } from '../common';

let app: express.Express;

describe("Filter - Reviews Controllers", () => {
    before(async () => {
        const dep = await getAllDependencires();

        app = dep.app;
    });

    it('Get Review Api', async () => {
        const response = await request.agent(app)
            .get('/reviews');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).length.greaterThanOrEqual(1);
    });

    it('Get Review Api - 404', async () => {
        const response = await request.agent(app)
            .get('/reviewsabc');

        expect(response.status).to.equal(404);
    });

});

describe("Store Review - COntroller", () => {

    it('store Review Api - 400', async () => {
        const review = {
            "title": "After Latest Update My Device No Longer Connects",
            "product_name": "Amazon Alexa",
            "review": "Thanks to the most recent app update, my phone and my Amazon device are no longer paired and I can't get them to work together again. You've just made my Amazon device almost completely unusable.",
            "author": "Heather Ilene",
            "rating": 5,
            reviewed_date: new Date()
        };
        const response = await request.agent(app)
            .post('/reviews')
            .send(review);

        expect(response.status).to.equal(400);
    });


    it('store Review Api - success - 201', async () => {
        const review = {
            "title": "After Latest Update My Device No Longer Connects",
            "product_name": "Amazon Alexa",
            "review": "Thanks to the most recent app update, my phone and my Amazon device are no longer paired and I can't get them to work together again. You've just made my Amazon device almost completely unusable.",
            "review_source": "MsStore",
            "author": "Heather Ilene",
            "rating": 5,
            reviewed_date: new Date()
        };
        const response = await request.agent(app)
            .post('/reviews')
            .send(review);

        expect(response.status).to.equal(201);
    });
})