const puppeteer = require('puppeteer');
const fs = require('fs');

// Pegar URL do argumento da linha de comando ou usar padrão
const PRODUCT_URL = process.argv[2] || 'https://amzn.to/45Fcd4U';

async function scrapeProduct(url = PRODUCT_URL) {
  let browser;
  try {
    console.log('🚀 Iniciando scraping com Puppeteer...');
    console.log('📡 Acessando:', url);
    
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Configurar user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
    
    // Acessar página
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    console.log('✅ Página carregada');
    
    // Aguardar elementos carregarem
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Extrair dados
    const productData = await page.evaluate(() => {
      const data = {
        title: '',
        price: null,
        oldPrice: null,
        images: [],
        rating: null,
        reviewCount: null,
        asin: '',
        brand: '',
        description: '',
        monthlySales: ''
      };

      // Título
      const titleEl = document.querySelector('#productTitle') || 
                     document.querySelector('h1.a-size-large') ||
                     document.querySelector('h1');
      if (titleEl) {
        data.title = titleEl.textContent.trim();
      }

      // ASIN - extrair da URL ou do HTML
      const urlMatch = window.location.href.match(/\/dp\/([A-Z0-9]{10})/);
      if (urlMatch) {
        data.asin = urlMatch[1];
      } else {
        const asinEl = document.querySelector('[data-asin]');
        if (asinEl) {
          data.asin = asinEl.getAttribute('data-asin');
        }
      }

      // Preço atual
      const priceSelectors = [
        '.a-price-whole',
        '#priceblock_ourprice',
        '#priceblock_dealprice',
        '.a-price .a-offscreen',
        '[data-a-color="price"] .a-offscreen'
      ];
      
      for (const selector of priceSelectors) {
        const priceEl = document.querySelector(selector);
        if (priceEl) {
          const priceText = priceEl.textContent || priceEl.innerText;
          const priceMatch = priceText.match(/[\d,\.]+/);
          if (priceMatch) {
            const priceStr = priceMatch[0].replace(/\./g, '').replace(',', '.');
            const price = parseFloat(priceStr);
            if (!isNaN(price) && price > 0) {
              data.price = price;
              break;
            }
          }
        }
      }

      // Preço antigo (riscado)
      const oldPriceEl = document.querySelector('.a-price.a-text-price .a-offscreen') ||
                        document.querySelector('.basisPrice .a-offscreen');
      if (oldPriceEl) {
        const oldPriceText = oldPriceEl.textContent || oldPriceEl.innerText;
        const oldPriceMatch = oldPriceText.match(/[\d,\.]+/);
        if (oldPriceMatch) {
          const oldPriceStr = oldPriceMatch[0].replace(/\./g, '').replace(',', '.');
          const oldPrice = parseFloat(oldPriceStr);
          if (!isNaN(oldPrice) && oldPrice > 0) {
            data.oldPrice = oldPrice;
          }
        }
      }

      // Rating
      const ratingEl = document.querySelector('#acrPopover .a-icon-alt') ||
                      document.querySelector('[data-hook="rating-out-of-text"]');
      if (ratingEl) {
        const ratingText = ratingEl.textContent || ratingEl.innerText;
        const ratingMatch = ratingText.match(/([\d.]+)/);
        if (ratingMatch) {
          data.rating = parseFloat(ratingMatch[1]);
        }
      }

      // Número de avaliações
      const reviewEl = document.querySelector('#acrCustomerReviewText') ||
                      document.querySelector('[data-hook="total-review-count"]');
      if (reviewEl) {
        const reviewText = reviewEl.textContent || reviewEl.innerText;
        const reviewMatch = reviewText.match(/([\d,]+)/);
        if (reviewMatch) {
          data.reviewCount = parseInt(reviewMatch[1].replace(/,/g, ''));
        }
      }

      // Vendas mensais
      const salesEl = document.querySelector('#social-proofing-faceout-title-tk_bought');
      if (salesEl) {
        const salesText = salesEl.textContent || salesEl.innerText;
        const salesMatch = salesText.match(/([\d,]+)/);
        if (salesMatch) {
          data.monthlySales = salesMatch[1].replace(/,/g, '');
        }
      }

      // Imagens
      const imageSelectors = [
        '#landingImage',
        '#main-image',
        '#imgBlkFront',
        '[data-a-image-name="landingImage"]'
      ];
      
      const foundImages = new Set();
      
      // Imagem principal
      for (const selector of imageSelectors) {
        const imgEl = document.querySelector(selector);
        if (imgEl) {
          let imgSrc = imgEl.src || imgEl.getAttribute('data-src') || imgEl.getAttribute('data-a-dynamic-image');
          if (imgSrc) {
            // Se for JSON string (data-a-dynamic-image)
            if (imgSrc.startsWith('{')) {
              try {
                const imgObj = JSON.parse(imgSrc);
                imgSrc = Object.keys(imgObj)[0];
              } catch (e) {}
            }
            if (imgSrc.includes('media-amazon') && imgSrc.includes('/images/I/')) {
              // Normalizar URL para tamanho grande
              imgSrc = imgSrc.split('._')[0] + '._AC_SX679_.jpg';
              foundImages.add(imgSrc);
            }
          }
        }
      }

      // Imagens adicionais da galeria
      const galleryImages = document.querySelectorAll('#altImages ul li img, #imageBlock_feature_div img');
      galleryImages.forEach(img => {
        let imgSrc = img.src || img.getAttribute('data-src');
        if (imgSrc && imgSrc.includes('media-amazon') && imgSrc.includes('/images/I/')) {
          imgSrc = imgSrc.split('._')[0] + '._AC_SX679_.jpg';
          foundImages.add(imgSrc);
        }
      });

      data.images = Array.from(foundImages).slice(0, 5);

      // Marca
      const brandEl = document.querySelector('#brand') ||
                     document.querySelector('.po-brand .po-break-word') ||
                     document.querySelector('[data-asin] + a');
      if (brandEl) {
        data.brand = brandEl.textContent.trim();
      }

      // Descrição
      const descEl = document.querySelector('#productDescription') ||
                    document.querySelector('#feature-bullets');
      if (descEl) {
        data.description = descEl.textContent.trim().substring(0, 300);
      }

      return data;
    });

    // Se não encontrou preço, tentar extrair do JSON-LD
    if (!productData.price) {
      const jsonLd = await page.evaluate(() => {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        for (const script of scripts) {
          try {
            const data = JSON.parse(script.textContent);
            if (data.offers && data.offers.price) {
              return {
                price: parseFloat(data.offers.price),
                oldPrice: data.offers.priceCurrency || null
              };
            }
          } catch (e) {}
        }
        return null;
      });
      
      if (jsonLd && jsonLd.price) {
        productData.price = jsonLd.price;
      }
    }

    console.log('\n📦 Dados extraídos:');
    console.log('Título:', productData.title || 'Não encontrado');
    console.log('ASIN:', productData.asin || 'Não encontrado');
    console.log('Preço:', productData.price ? `R$ ${productData.price.toFixed(2)}` : 'Não encontrado');
    console.log('Preço antigo:', productData.oldPrice ? `R$ ${productData.oldPrice.toFixed(2)}` : 'Não encontrado');
    console.log('Rating:', productData.rating || 'Não encontrado');
    console.log('Avaliações:', productData.reviewCount || 'Não encontrado');
    console.log('Vendas mensais:', productData.monthlySales || 'Não encontrado');
    console.log('Marca:', productData.brand || 'Não encontrado');
    console.log('Imagens encontradas:', productData.images.length);
    
    if (productData.images.length > 0) {
      console.log('\n🖼️  Imagens:');
      productData.images.forEach((img, i) => {
        console.log(`  ${i + 1}. ${img}`);
      });
    }

    // Salvar dados
    fs.writeFileSync('product-data.json', JSON.stringify(productData, null, 2));
    console.log('\n💾 Dados salvos em product-data.json');
    
    return productData;
    
  } catch (error) {
    console.error('❌ Erro no scraping:', error.message);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Executar
if (require.main === module) {
  const url = process.argv[2];
  
  if (!url) {
    console.log('📖 Uso: node scraper-puppeteer.js <URL_DO_PRODUTO>');
    console.log('📖 Exemplo: node scraper-puppeteer.js https://amzn.to/45Fcd4U');
    console.log('📖 Exemplo: node scraper-puppeteer.js https://www.amazon.com.br/dp/B0D138HHGQ');
    console.log('\n⚠️  Se nenhuma URL for fornecida, será usada a URL padrão.');
    console.log('');
  }
  
  scrapeProduct(url)
    .then(() => {
      console.log('\n✅ Scraping concluído!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Erro:', error);
      process.exit(1);
    });
}

module.exports = { scrapeProduct };
