import { VenmoApiClient } from "../src/client";
import { validateAccessKey } from "../src/utils";

describe("API Client", () => {
    test("Clients are created correctly", async () => {
        const key = "28735RJZ0MG3378R8HV6946Y64D077930MZO29REK1RQ7493966107H64P7764AG"
        const client: VenmoApiClient = await VenmoApiClient.init(key);
        
        expect(client.http.defaults.headers.common["User-Agent"]).toBe("Venmo/7.44.0 (iPhone; iOS 13.0; Scale/2.0)");
        expect(client.http.defaults.headers.common["Authorization"]).toBe(validateAccessKey(key));
        expect(client.http.defaults.headers["Authorization"]).toBe(validateAccessKey(key));
        expect(client.http.defaults.baseURL).toBe("https://api.venmo.com/v1");
    });

    test("Update access key works", async () => {
        const oldKey = "28735RJZ0MG3378R8HV6946Y64D077930MZO29REK1RQ7493966107H64P7764AG"
        const key = "43735JRZ0MG3378R8HV6946Y64D077930MZO29REK1RQ7493966107H64P7764AG"

        const client: VenmoApiClient = await VenmoApiClient.init(oldKey);
        client.updateAccessKey(key);

        expect(client.http.defaults.headers["Authorization"]).toBe(validateAccessKey(key));
        expect(client.http.defaults.headers.common["Authorization"]).toBe(validateAccessKey(key));
        expect(client.accessKey).toBe(validateAccessKey(key));
    })
});
