import {
    fetch as fetchUndici
} from 'undici';
import FormData from 'form-data';
import fakeUserAgent from 'fake-useragent';
import axios from "axios";
import fs from "fs";
import path from "path";
import querystring from "querystring";
import {
    performance
} from "perf_hooks";

const BING_URL = "https://www.bing.com";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateRandomIP = () => {
    const octet = () => Math.floor(Math.random() * 256);
    return `${octet()}.${octet()}.${octet()}.${octet()}`;
};

const generateRandomUserAgent = () => {
    const androidVersions = ['4.0.3', '4.1.1', '4.2.2', '4.3', '4.4', '5.0.2', '5.1', '6.0', '7.0', '8.0', '9.0', '10.0', '11.0'];
    const deviceModels = ['M2004J19C', 'S2020X3', 'Xiaomi4S', 'RedmiNote9', 'SamsungS21', 'GooglePixel5'];
    const buildVersions = ['RP1A.200720.011', 'RP1A.210505.003', 'RP1A.210812.016', 'QKQ1.200114.002', 'RQ2A.210505.003'];
    const selectedModel = deviceModels[Math.floor(Math.random() * deviceModels.length)];
    const selectedBuild = buildVersions[Math.floor(Math.random() * buildVersions.length)];
    const chromeVersion = `Chrome/${Math.floor(Math.random() * 80) + 1}.${Math.floor(Math.random() * 999) + 1}.${Math.floor(Math.random() * 9999) + 1}`;
    const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersions[Math.floor(Math.random() * androidVersions.length)]}; ${selectedModel} Build/${selectedBuild}) AppleWebKit/537.36 (KHTML, like Gecko) ${chromeVersion} Mobile Safari/537.36 WhatsApp/1.${Math.floor(Math.random() * 9) + 1}.${Math.floor(Math.random() * 9) + 1}`;
    return userAgent;
};

const getValidIPv4 = (ip) => {
    const match = !ip || ip.match(/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\/([0-9]|[1-2][0-9]|3[0-2]))?$/);
    if (match) {
        if (match[5]) {
            const mask = parseInt(match[5], 10);
            let [a, b, c, d] = ip.split('.').map(x => parseInt(x, 10));
            const max = (1 << (32 - mask)) - 1;
            const rand = Math.floor(Math.random() * max);
            d += rand;
            c += Math.floor(d / 256);
            d %= 256;
            b += Math.floor(c / 256);
            c %= 256;
            a += Math.floor(b / 256);
            b %= 256;
            return `${a}.${b}.${c}.${d}`;
        }
        return ip;
    }
    return undefined;
};

export class BingImageCreator {
    static HEADERS = {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "content-type": "application/x-www-form-urlencoded",
        referrer: "https://www.bing.com/images/create/",
        origin: "https://www.bing.com",
        "user-agent": fakeUserAgent() || generateRandomUserAgent(),
        "x-forwarded-for": getValidIPv4(generateRandomIP()) || generateRandomIP()
    };

    constructor({
        cookie
    }) {
        this._cookie = `_U=${cookie}`;

        if (!this._cookie) {
            throw new Error("Bing cookie is required");
        }
    }

    async fetchRedirectUrl(url, formData) {
        const response = await fetchUndici(url, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                cookie: this._cookie,
                ...BingImageCreator.HEADERS,
            },
            body: formData,
            redirect: "manual",
        });

        if (response.ok) {
            throw new Error("Request failed");
        } else {
            const redirect_url = response.headers.get("location").replace("&nfy=1", "");
            const request_id = redirect_url.split("id=")[1];
            return {
                redirect_url,
                request_id,
            };
        }
    }

    async fetchResult(encodedPrompt, redirect_url, request_id) {
        console.log("redirect_url is ", redirect_url);
        console.log("request_id is ", request_id);
        const cookie = this._cookie;
        try {
            await fetchUndici(`${BING_URL}${redirect_url}`, {
                method: "GET",
                mode: "cors",
                credentials: "include",
                headers: {
                    cookie,
                    ...BingImageCreator.HEADERS,
                },
            });
        } catch (e) {
            throw new Error(`Request redirect_url failed" ${e.message}`);
        }

        const getResultUrl = `${BING_URL}/images/create/async/results/${request_id}?q=${encodedPrompt}`;
        const start_wait = Date.now();
        let result = "";
        while (true) {
            console.log("Waiting for result...");
            if (Date.now() - start_wait > 200000) {
                throw new Error("Timeout");
            }

            await sleep(1000);
            result = await this.getResults(getResultUrl);
            if (result) {
                break;
            }
        }
        return this.parseResult(result);
    }

    async getResults(getResultUrl) {
        const response = await fetchUndici(getResultUrl, {
            method: "GET",
            mode: "cors",
            credentials: "include",
            headers: {
                cookie: this._cookie,
                ...BingImageCreator.HEADERS,
            },
        });
        if (response.status !== 200) {
            throw new Error("Bad status code");
        }
        const content = await response.text();
        if (!content || content.includes("errorMessage")) {
            return null;
        } else {
            return content;
        }
    }

    parseResult(result) {
        console.log("Parsing result...");
        const regex = /src="([^"]*)"/g;
        const matches = [...result.matchAll(regex)].map((match) => match[1]);
        const normal_image_links = matches.map((link) => link.split("?w=")[0]);
        const safe_image_links = normal_image_links.filter((link) => !/r.bing.com\/rp/i.test(link));
        safe_image_links.length !== normal_image_links.length && console.log("Detected & Removed bad images");
        const unique_image_links = [...new Set(safe_image_links)];
        if (unique_image_links.length === 0) {
            throw new Error("error_no_images");
        }
        return unique_image_links;
    }

    async fetchRedirectUrlWithRetry(url, formData, retries = 30) {
        for (let i = 0; i < retries; i++) {
            try {
                return await this.fetchRedirectUrl(url, formData);
            } catch (error) {
                console.log(`retry ${i + 1} time`);
                if (i === retries - 1) {
                    throw new Error(`Max retries reached: ${error.message}`);
                }
            }
        }
    }

    async fetchResultWithRetry(encodedPrompt, redirect_url, request_id, retries = 30) {
        for (let i = 0; i < retries; i++) {
            try {
                return await this.fetchResult(encodedPrompt, redirect_url, request_id);
            } catch (error) {
                console.log(`retry ${i + 1} time`);
                if (i === retries - 1) {
                    throw new Error(`Max retries reached: ${error.message}`);
                }
            }
        }
    }

    async getResultsWithRetry(getResultUrl, retries = 30) {
        for (let i = 0; i < retries; i++) {
            try {
                return await this.getResults(getResultUrl);
            } catch (error) {
                console.log(`retry ${i + 1} time`);
                if (i === retries - 1) {
                    throw new Error(`Max retries reached: ${error.message}`);
                }
            }
        }
    }

    async createImage(prompt) {
        const encodedPrompt = encodeURIComponent(prompt);
        let formData = new FormData();
        formData.append("q", encodedPrompt);
        formData.append("qa", "ds");
        console.log("Sending request...");
        const url = `${BING_URL}/images/create?q=${encodedPrompt}&rt=3&FORM=GENCRE`;

        try {
            const {
                redirect_url,
                request_id
            } = await this.fetchRedirectUrlWithRetry(url, formData);
            return this.fetchResultWithRetry(encodedPrompt, redirect_url, request_id);
        } catch (e) {
            console.log("retry 1 time");
            return this.fetchRedirectUrlWithRetry(url, formData)
                .then((res) => this.fetchResultWithRetry(encodedPrompt, res.redirect_url, res.request_id))
                .catch((e) => {
                    throw new Error(`${e.message}`);
                });
        }
    }
}

export class BingImage {
    constructor(config) {
        this.config = config;
        this.BING_URL = "https://www.bing.com";
    }

    createSession(authCookie) {
        const session = axios.create({
            headers: {
                accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh-TW;q=0.7,zh;q=0.6",
                "cache-control": "max-age=0",
                "content-type": "application/x-www-form-urlencoded",
                "Referrer-Policy": "origin-when-cross-origin",
                referrer: "https://www.bing.com/images/create/",
                origin: "https://www.bing.com",
                "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54",
                cookie: `_U=${authCookie}`,
                "sec-ch-ua": `"Microsoft Edge";v="111", "Not(A:Brand";v="8", "Chromium";v="111"`,
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "same-origin",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
            },
        });
        return session;
    }

    async getImages(session, prompt) {
        console.log("Sending request...");
        const urlEncodedPrompt = querystring.escape(prompt);
        const url = `${this.BING_URL}/images/create?q=${urlEncodedPrompt}&rt=3&FORM=GENCRE`; // force use rt=3
        console.log(url);
        const response = await session.post(url, {
            maxRedirects: 0,
            validateStatus: function(status) {
                return status >= 200 && status < 303;
            },
            timeout: 200000,
        });
        let redirectUrl;
        if (response.status == 200) {
            redirectUrl = response.request.res.responseUrl.replace("&nfy=1", "");
        } else if (response.status !== 302) {
            console.error(`ERROR: the status is ${response.status} instead of 302 or 200`);
            throw new Error("Redirect failed");
        }
        console.log("Redirected to", redirectUrl);
        const requestId = redirectUrl.split("id=")[1];
        await session.get(redirectUrl);
        const pollingUrl = `${this.BING_URL}/images/create/async/results/${requestId}?q=${urlEncodedPrompt}`;
        console.log("Waiting for results...");
        const startWait = performance.now();
        let imagesResponse;
        while (true) {
            if (performance.now() - startWait > 300000) {
                throw new Error("Timeout error");
            }
            console.log(".", {
                end: "",
                flush: true
            });
            imagesResponse = await session.get(pollingUrl);
            if (imagesResponse.status !== 200) {
                throw new Error("Could not get results");
            }
            if (imagesResponse.data === "") {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                continue;
            } else {
                break;
            }
        }
        if (imagesResponse.data.errorMessage === "Pending") {
            throw new Error("This prompt has been blocked by Bing. Bing's system flagged this prompt because it may conflict with their content policy. More policy violations may lead to automatic suspension of your access.");
        } else if (imagesResponse.data.errorMessage) {
            throw new Error("Bing returned an error: " + imagesResponse.data.errorMessage);
        }
        const imageLinks = imagesResponse.data
            .match(/src="([^"]+)"/g)
            .map((src) => src.slice(5, -1));
        const normalImageLinks = Array.from(new Set(imageLinks.map((link) => link.split("?w=")[0])));
        const badImages = [
            "https://r.bing.com/rp/in-2zU3AJUdkgFe7ZKv19yPBHVs.png",
            "https://r.bing.com/rp/TX9QuO3WzcCJz1uaaSwQAz39Kb0.jpg",
        ];
        for (const im of normalImageLinks) {
            if (badImages.includes(im)) {
                throw new Error("Bad images");
            }
        }
        if (normalImageLinks.length === 0) {
            throw new Error("No images");
        }
        return normalImageLinks;
    }

    async saveImages(session, links, outputDir) {
        console.log("\nDownloading images...");
        try {
            fs.mkdirSync(outputDir, {
                recursive: true
            });
        } catch (err) {
            if (err.code !== "EEXIST")
                throw err;
        }
        let imageNum = 0;
        for (const link of links) {
            try {
                const response = await session.get(link, {
                    responseType: "stream"
                });
                const outputPath = path.join(outputDir, `${imageNum}.jpeg`);
                const writer = fs.createWriteStream(outputPath);
                response.data.pipe(writer);
                await new Promise((resolve, reject) => {
                    writer.on("finish", resolve);
                    writer.on("error", reject);
                });
                imageNum += 1;
            } catch (err) {
                if (err instanceof axios.AxiosError) {
                    throw new Error("Inappropriate contents found in the generated images. Please try again or try another prompt.");
                } else {
                    throw err.message;
                }
            }
        }
    }

    async generateImagesLinks(prompt) {
        const authCookie = this.config.bingImageCookie;
        const outputDir = `${this.config.tempDir}/${prompt}`;
        if (!authCookie || !prompt) {
            throw new Error("Missing parameters");
        }
        // Create image generator session
        const session = this.createSession(authCookie);
        const imageLinks = await this.getImages(session, prompt);
        return imageLinks;
    }

    async generateImageFiles(prompt) {
        const authCookie = this.config.bingImageCookie;
        const outputDir = `${this.config.tempDir}/${prompt}`;
        if (!authCookie || !prompt) {
            throw new Error("Missing parameters");
        }
        // Create image generator session
        const session = this.createSession(authCookie);
        const imageLinks = await this.getImages(session, prompt);
        await this.saveImages(session, imageLinks, outputDir);
        // Read saved images from the output directory
        const imageFiles = fs.readdirSync(outputDir);
        const images = imageFiles.map((filename) => {
            const filePath = path.join(outputDir, filename);
            const fileData = fs.readFileSync(filePath);
            return {
                filename,
                data: fileData.toString("base64"),
            };
        });
        return images;
    }
}
