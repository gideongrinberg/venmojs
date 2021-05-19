import * as utils from "../src/utils";

describe("Utility Functions", () => {
    test("getRandomDeviceID returns a valid result", () => {
        const regex = /^[0-9]+-([0-9]+([a-zA-Z]+[0-9]+)+)-([0-9]+([a-zA-Z]+[0-9]+)+)-([0-9]+([a-zA-Z]+[0-9]+)+)-([0-9]+([a-zA-Z]+[0-9]+)+)$/gm;
        const randomID = utils.getRandomDeviceID();

        expect(randomID.match(regex)?.length).toBe(1);
    });

    test("validateAccessKey validates a proper access key.", () => {
        expect(
            utils.validateAccessKey(
                "28735RJZ0MG3378R8HV6946Y64D077930MZO29REK1RQ7493966107H64P7764AG"
            )
        ).toBe(
            "Bearer 28735RJZ0MG3378R8HV6946Y64D077930MZO29REK1RQ7493966107H64P7764AG"
        );
    });

    test("getPhoneModelFromJson works properly with integers.", () => {
        expect(utils.getPhoneModelFromJson(JSON.stringify({ id: 0 }))).toBe(
            utils.PhoneModel.Other
        );
        expect(utils.getPhoneModelFromJson(JSON.stringify({ id: 1 }))).toBe(
            utils.PhoneModel.iPhone
        );
        expect(utils.getPhoneModelFromJson(JSON.stringify({ id: 4 }))).toBe(
            utils.PhoneModel.Android
        );
    });

    test("getPhoneModelFromJson works properly with strings.", () => {
        expect(utils.getPhoneModelFromJson(JSON.stringify({ id: "0" }))).toBe(
            utils.PhoneModel.Other
        );
        expect(utils.getPhoneModelFromJson(JSON.stringify({ id: "1" }))).toBe(
            utils.PhoneModel.iPhone
        );
        expect(utils.getPhoneModelFromJson(JSON.stringify({ id: "4" }))).toBe(
            utils.PhoneModel.Android
        );
    });
});
