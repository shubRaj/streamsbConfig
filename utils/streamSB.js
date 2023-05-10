import puppeteer from 'puppeteer'
async function getConfig() {
    const browser = await puppeteer.launch()
    let resp = {};
    try {
        const page = await browser.newPage()

        await page.setRequestInterception(true)

        page.on('request', (request) => {
            if (request.url().includes("sources") || (request.headers()["accept"].includes("application/json") && Object.keys(request.headers()).includes("watchsb"))) {
                resp = {
                    source: request.url(),
                    header: request.headers()
                }
                request.abort()
            } else request.continue()
        })

        await page.goto('https://sbasian.pro/e/bc05v29dt85y.html')
    }
    finally {
        await browser.close()
    }
    return resp;
}
export {getConfig as streamSB};