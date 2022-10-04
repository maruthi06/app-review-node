import { expect } from "chai";
import { ReviewsDb } from "../src/models";
import { Logger, DbConnection } from "../src/services";
import { getAllDependencires } from "./common";

const reviews = [
    {
        "title": "Excelente",
        "product_name": "Amazon Alexa",
        "review": "Pero deberia de poder cambiarle el idioma a alexa",
        "review_source": "iTunes",
        "author": "WarcryxD",
        "rating": 4,
        "reviewed_date": new Date()
    },
    {
        "title": "Need to be able to delete devices",
        "product_name": "Amazon Alexa",
        "review": "Cannot fix connection glitches without this-also fix connection glitches \n\nSmart things sees my light and Alexa doesn’t :(\n\n*update new devices “unresponsive” each day...they are working fine in SmartThings. No way to delete disabled devices. Very poor.",
        "review_source": "MsStore",
        "author": "Ranchorat",
        "rating": 1,
        "reviewed_date": new Date()
    },
    {
        "title": "Hey jeff@ why are you doing this?",
        "product_name": "Amazon Alexa",
        "review": "Does Jeff not actually use this app him self? Because there is no way I would let this app roll into qa in its current form, let alone give it to uncle B,\n\nThe google home app is sitting on 4.4 stars, just saying",
        "review_source": "iTunes",
        "author": "lowccr",
        "rating": 1,
        "reviewed_date": new Date()
    },
    {
        "title": "The smart home section is very poor",
        "product_name": "Amazon Alexa",
        "review": "I added Koogeek smart plugs to Alexa. I was able to control 3 devices via Alexa, which was really good. But after some weeks the connection was lost. I tried to disable and re-enable with no success. I finally decided to reset the koogeek device. I decided that the best approach would be to delete the smart device from the Alexa app and re-discover the device.  I was horrified to discover that there is NO way to delete a device from the app. \n\nI contacted amazon help and I got a instructions to use a trash icon which does not show on either my iPod or iPad. \n\nI can see why this app is rated 2.4.",
        "review_source": "iTunes",
        "author": "Nogales Family",
        "rating": 1,
        "reviewed_date": new Date()
    }
];

let reviewModel: ReviewsDb;

describe('App Initilization', function () {
    before(async () => {
        const dep = await getAllDependencires();
        reviewModel = dep.reviewDb;
        await reviewModel.deleteAll();
    });

    it('adding reviews to test db', async function () {
        const res = await reviewModel.storeReviews(reviews);
        expect(res.acknowledged).to.equal(true);
    });
});