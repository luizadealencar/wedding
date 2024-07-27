import puppeteer from 'puppeteer';
import { AMAZON_URL } from '../urls.js';


export async function amazonScraper() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const productDetailsArray = [];

    for (const url of AMAZON_URL) {
        await page.goto(url);

        const productDetails = await page.evaluate(() => {
            const name = document.getElementById('productTitle')?.innerText.trim() || 'Nome não encontrado';
            const imageUrl = document.getElementById('imgTagWrapperId')?.querySelector('img')?.src || 'Imagem não encontrada';

            // Extrair o preço
            const priceSymbol = document.querySelector('.a-price-symbol')?.innerText || '';
            const priceWhole = document.querySelector('.a-price-whole')?.innerText || '';
            const priceFraction = document.querySelector('.a-price-fraction')?.innerText || '';
            let price = `${priceSymbol}${priceWhole}${priceFraction}`.trim();
            
            // Remove caracteres de nova linha e espaços extras
            price = price.replace(/\s+/g, '');

            return {
                name,
                imageUrl,
                price
            };
        });

        productDetailsArray.push({
            url,
            ...productDetails
        });
    }

    console.log(productDetailsArray);

    await browser.close();
};
