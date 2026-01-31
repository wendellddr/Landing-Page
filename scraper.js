const https = require('https');
const http = require('http');
const { URL } = require('url');

// URL do produto (link encurtado que redireciona)
const PRODUCT_URL = 'https://amzn.to/45Fcd4U';

// Função para seguir redirects
function followRedirects(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects === 0) {
      reject(new Error('Too many redirects'));
      return;
    }

    const parsedUrl = new URL(url);
    const client = parsedUrl.protocol === 'https:' ? https : http;
    
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      maxRedirects: 0
    };

    const req = client.request(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Seguir redirect
        const redirectUrl = res.headers.location.startsWith('http') 
          ? res.headers.location 
          : `${parsedUrl.protocol}//${parsedUrl.hostname}${res.headers.location}`;
        return followRedirects(redirectUrl, maxRedirects - 1).then(resolve).catch(reject);
      }

      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ url: res.responseUrl || url, html: data });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// Função para extrair dados do HTML
function extractProductData(html) {
  const data = {
    title: '',
    price: null,
    oldPrice: null,
    images: [],
    rating: null,
    reviewCount: null,
    asin: '',
    brand: '',
    description: ''
  };

  try {
    // Extrair título
    const titleMatch = html.match(/<span[^>]*id="productTitle"[^>]*>([^<]+)<\/span>/i) ||
                      html.match(/<h1[^>]*class="[^"]*product-title[^"]*"[^>]*>([^<]+)<\/h1>/i) ||
                      html.match(/<title>([^<]+)<\/title>/i);
    if (titleMatch) {
      data.title = titleMatch[1].trim();
    }

    // Extrair ASIN
    const asinMatch = html.match(/ASIN["\s:]+([A-Z0-9]{10})/i) ||
                      html.match(/\/dp\/([A-Z0-9]{10})/i) ||
                      html.match(/asin["\s:]+([A-Z0-9]{10})/i);
    if (asinMatch) {
      data.asin = asinMatch[1];
    }

    // Extrair preço atual
    const pricePatterns = [
      /<span[^>]*class="[^"]*a-price-whole[^"]*"[^>]*>([^<]+)<\/span>/i,
      /<span[^>]*id="priceblock_[^"]*"[^>]*>R\$\s*([\d,\.]+)<\/span>/i,
      /R\$\s*([\d]{1,3}(?:\.[\d]{3})*(?:,[\d]{2})?)/i,
      /"price":\s*"([^"]+)"/i,
      /"lowPrice":\s*"([^"]+)"/i
    ];

    for (const pattern of pricePatterns) {
      const match = html.match(pattern);
      if (match) {
        const priceStr = match[1].replace(/\./g, '').replace(',', '.');
        const price = parseFloat(priceStr);
        if (!isNaN(price) && price > 0) {
          data.price = price;
          break;
        }
      }
    }

    // Extrair preço antigo
    const oldPriceMatch = html.match(/<span[^>]*class="[^"]*a-price[^"]*a-text-price[^"]*"[^>]*>R\$\s*([\d,\.]+)<\/span>/i);
    if (oldPriceMatch) {
      const oldPriceStr = oldPriceMatch[1].replace(/\./g, '').replace(',', '.');
      const oldPrice = parseFloat(oldPriceStr);
      if (!isNaN(oldPrice) && oldPrice > 0) {
        data.oldPrice = oldPrice;
      }
    }

    // Extrair rating
    const ratingMatch = html.match(/"ratingValue":\s*"([\d.]+)"/i) ||
                       html.match(/class="[^"]*a-icon-alt[^"]*"[^>]*>([\d.]+)\s*de\s*5/i) ||
                       html.match(/([\d.]+)\s*de\s*5\s*estrelas/i);
    if (ratingMatch) {
      data.rating = parseFloat(ratingMatch[1]);
    }

    // Extrair número de avaliações
    const reviewMatch = html.match(/"reviewCount":\s*"([\d]+)"/i) ||
                       html.match(/([\d,]+)\s*(?:avaliações|reviews|comentários)/i);
    if (reviewMatch) {
      data.reviewCount = parseInt(reviewMatch[1].replace(/,/g, ''));
    }

    // Extrair imagens
    const imagePatterns = [
      /<img[^>]*id="landingImage"[^>]*src="([^"]+)"/i,
      /<img[^>]*data-src="([^"]*media-amazon[^"]+)"/gi,
      /<img[^>]*src="([^"]*media-amazon[^"]+images\/I\/[^"]+\.(?:jpg|png|webp))"/gi,
      /"hiRes":"([^"]*media-amazon[^"]+images\/I\/[^"]+\.(?:jpg|png|webp))"/gi
    ];

    const foundImages = new Set();
    for (const pattern of imagePatterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        let imgUrl = match[1];
        // Limpar URL
        imgUrl = imgUrl.replace(/\\u002F/g, '/').replace(/\\/g, '');
        if (imgUrl.includes('media-amazon') && imgUrl.includes('/images/I/')) {
          // Remover parâmetros de tamanho e adicionar tamanho grande
          imgUrl = imgUrl.split('._')[0] + '._AC_SX679_.jpg';
          foundImages.add(imgUrl);
        }
      }
    }

    data.images = Array.from(foundImages).slice(0, 5); // Máximo 5 imagens

    // Extrair marca
    const brandMatch = html.match(/"brand":\s*"([^"]+)"/i) ||
                      html.match(/<a[^>]*class="[^"]*brand[^"]*"[^>]*>([^<]+)<\/a>/i) ||
                      html.match(/Marca:\s*<[^>]*>([^<]+)<\/[^>]*>/i);
    if (brandMatch) {
      data.brand = brandMatch[1].trim();
    }

    // Extrair descrição
    const descMatch = html.match(/"description":\s*"([^"]+)"/i) ||
                     html.match(/<div[^>]*id="productDescription"[^>]*>([\s\S]*?)<\/div>/i);
    if (descMatch) {
      data.description = descMatch[1].replace(/<[^>]+>/g, '').trim().substring(0, 200);
    }

  } catch (error) {
    console.error('Erro ao extrair dados:', error.message);
  }

  return data;
}

// Função principal
async function scrapeProduct() {
  try {
    console.log('🔍 Iniciando scraping do produto...');
    console.log('📡 Acessando:', PRODUCT_URL);
    
    const result = await followRedirects(PRODUCT_URL);
    console.log('✅ Página carregada:', result.url);
    
    const productData = extractProductData(result.html);
    
    console.log('\n📦 Dados extraídos:');
    console.log('Título:', productData.title || 'Não encontrado');
    console.log('ASIN:', productData.asin || 'Não encontrado');
    console.log('Preço:', productData.price ? `R$ ${productData.price.toFixed(2)}` : 'Não encontrado');
    console.log('Preço antigo:', productData.oldPrice ? `R$ ${productData.oldPrice.toFixed(2)}` : 'Não encontrado');
    console.log('Rating:', productData.rating || 'Não encontrado');
    console.log('Avaliações:', productData.reviewCount || 'Não encontrado');
    console.log('Marca:', productData.brand || 'Não encontrado');
    console.log('Imagens encontradas:', productData.images.length);
    
    if (productData.images.length > 0) {
      console.log('\n🖼️  Imagens:');
      productData.images.forEach((img, i) => {
        console.log(`  ${i + 1}. ${img}`);
      });
    }

    // Salvar dados em JSON
    const fs = require('fs');
    fs.writeFileSync('product-data.json', JSON.stringify(productData, null, 2));
    console.log('\n💾 Dados salvos em product-data.json');
    
    return productData;
  } catch (error) {
    console.error('❌ Erro no scraping:', error.message);
    throw error;
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  scrapeProduct().catch(console.error);
}

module.exports = { scrapeProduct, extractProductData };
