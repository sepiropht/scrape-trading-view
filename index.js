const url = 'https://fr.tradingview.com/symbols/EURUSD/'
const fs = require('fs')
const puppeteer = require('puppeteer')

scrape()

setInterval(scrape, 1000 * 30)

async function scrape() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url)
  await page.waitForSelector('.js-symbol-change-pt')
  const element = await page.$('.js-symbol-change-pt')
  const text = await (await element.getProperty('textContent')).jsonValue()
  console.log(text)
  fs.writeFileSync('data.txt', text.split('').slice(1, 6).join(''))
  await browser.close()
}
