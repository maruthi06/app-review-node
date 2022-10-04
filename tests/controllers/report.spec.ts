import * as express from 'express';
import * as request from 'supertest';
import { expect } from 'chai';
import { getAllDependencires } from '../common';

let app: express.Express;

describe("Report - By Store - By Month", () => {
    before(async () => {
        const dep = await getAllDependencires();

        app = dep.app;
    });

    it('Get report Api - store == iTunes', async () => {
        const response = await request.agent(app)
            .get('/report/bymonthdb/iTunes');

        expect(response.status).to.equal(200);
        expect(response.body).to.be.an('array');
        expect(response.body).length.greaterThanOrEqual(1);
    });

});