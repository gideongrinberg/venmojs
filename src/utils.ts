/**
 * The different phone models defined by the Venmo API.
 */
enum PhoneModel {
    iPhone,
    Android,
    Other,
}

/**
 * Gets a phone model from app info JSON.
 * @param appJson The app info JSON to parse.
 * @returns The phone model from the app json.
 */
function getPhoneModelFromJson(appJson: string): PhoneModel {
    const phone = JSON.parse(appJson)["id"];

    if (phone == 1) {
        return PhoneModel.iPhone;
    } else if (phone == 4) {
        return PhoneModel.Android;
    } else {
        return PhoneModel.Other;
    }
}

/**
 * Get a random device ID for logging in.
 * @returns A random device ID.
 */
function getRandomDeviceID(): string {
    const BASE_DEVICE_ID = "88884260-05O3-8U81-58I1-2WA76F357GR9";

    let chars = [...BASE_DEVICE_ID];
    let result: string[] = [];

    chars.forEach((char, index) => {
        if (isNumeric(char)) {
            result.push(getRandomArbitrary(0, 9).toString());
        } else if (char === "-") {
            result.push("-");
        } else {
            // Random uppercase letter. I <3 JS.
            result.push(
                String.fromCharCode(65 + Math.floor(Math.random() * 26))
            );
        }
    });

    return result.join("");
}

function validateAccessKey(key: string): string {
    const regex = /^(Bearer)?(.+)$/gm;
    if (key.match(regex) != null) {
        // @ts-ignore
        return `Bearer ${key.match(regex)[0].replace(" ", "")}`;
    } else {
        throw Error();
    }
}

function isNumeric(s: string): boolean {
    // @ts-ignore
    return !isNaN(s - parseFloat(s));
}

function getRandomArbitrary(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
}

export {
    PhoneModel,
    getPhoneModelFromJson,
    getRandomDeviceID,
    validateAccessKey,
};
