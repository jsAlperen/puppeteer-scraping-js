const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const url = require('url');

const visitedPages = new Set();
const saveDir = 'site_kopya';

if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true });
}

function getResourcePath(resource, baseDomain) {
    const parsedUrl = new URL(resource, baseDomain);
    return parsedUrl.pathname; // URL'den sadece yol kısmını al
}

async function downloadPage(browser, pageUrl, baseDomain) {
    if (visitedPages.has(pageUrl)) return;
    visitedPages.add(pageUrl);
    
    const page = await browser.newPage();
    console.log(`📥 ${pageUrl} adresine bağlanılıyor...`);
    await page.goto(pageUrl, { waitUntil: 'networkidle2', timeout: 60000  });
    
    const pagePath = pageUrl.replace(/https?:\/\//, '').replace(/\W/g, '_') + '.html';
    const content = await page.content();
    fs.writeFileSync(path.join(saveDir, pagePath), content);
    console.log(`✅ Sayfa kaydedildi: ${pagePath}`);
    
    // Kaynakları indir
    const resources = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('link[rel="stylesheet"], img, script'))
            .map(el => el.href || el.src)
            .filter(src => src);  // Null veya undefined olanları filtrele
    });
    
    for (let resource of resources) {
        if (!resource.startsWith('http') && !resource.startsWith('/')) continue;  // Yalnızca geçerli URL'leri işle
        
        // Kaynak URL'si mutlak değilse base domain ile tamamla
        const fullResourceUrl = resource.startsWith('/') ? baseDomain + resource : resource;
        const resourcePath = getResourcePath(fullResourceUrl, baseDomain);
        
        // Kaynağın kaydedileceği dizini oluştur
        const resourceDir = path.join(saveDir, path.dirname(resourcePath));
        if (!fs.existsSync(resourceDir)) {
            fs.mkdirSync(resourceDir, { recursive: true });
        }

        // Kaynağı indir ve kaydet
        const filePath = path.join(saveDir, resourcePath);
        try {
            const response = await axios.get(fullResourceUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(filePath, response.data);
            console.log(`📂 İndirildi: ${filePath}`);
        } catch (error) {
            console.log(`❌ İndirilemedi: ${fullResourceUrl}`);
        }
    }
    
    // Dahili linkleri bul ve sadece aynı domain içindeki sayfalara yönlen
    const links = await page.evaluate(baseDomain => {
        return Array.from(document.querySelectorAll('a'))
            .map(a => a.href)
            .filter(href => href.startsWith(baseDomain));
    }, baseDomain);
    
    for (let link of links) {
        await downloadPage(browser, link, baseDomain);
    }
    
    await page.close();
}

(async () => {
    const urlToDownload = 'https://jsalperen.com';  // Buraya ana URL'yi yaz
    const baseDomain = new URL(urlToDownload).origin; // Ana domaini belirle
    const browser = await puppeteer.launch({ headless: true });
    await downloadPage(browser, urlToDownload, baseDomain);
    await browser.close();
    console.log('✅ Tüm sayfalar ve dosyalar başarıyla kaydedildi.');
})();
