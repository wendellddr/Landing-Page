const { scrapeProduct } = require('./scraper-puppeteer');
const fs = require('fs');
const { execSync } = require('child_process');

async function atualizarProduto() {
  try {
    console.log('🚀 Iniciando atualização completa do produto...\n');
    
    // 1. Fazer scraping
    console.log('📡 Passo 1: Fazendo scraping da página...');
    const productData = await scrapeProduct();
    
    // 2. Atualizar gerador.js
    console.log('\n📝 Passo 2: Atualizando gerador.js...');
    const geradorPath = './gerador.js';
    let geradorContent = fs.readFileSync(geradorPath, 'utf8');
    
    // Encontrar e atualizar o produto da balança
    const produtoRegex = /(\{\s*slug:\s*'balanca-digital-cozinha-10kg'[\s\S]*?)(precoAtual:\s*)[\d.]+([\s\S]*?)(precoAnterior:\s*)[\d.]+([\s\S]*?)(rating:\s*)[\d.]+([\s\S]*?)(reviewCount:\s*)\d+([\s\S]*?)(mainImage:\s*')([^']+)('[\s\S]*?gallery:\s*\[)([\s\S]*?)(\]\s*,)/;
    
    const novoProduto = `{
    slug: 'balanca-digital-cozinha-10kg',
    nome: ${JSON.stringify(productData.title)},
    subtitle: 'Alta Precisão de 1g - Ideal para Dietas, Receitas e Controle de Porções',
    specs: 'Até 10 kg | Escala 1 grama | Alta Precisão | Função Tara | Display Digital | Pilhas Inclusas',
    asin: '${productData.asin}',
    affiliateLink: 'https://amzn.to/45Fcd4U',
    precoAtual: ${productData.price || 15.00},
    precoAnterior: ${productData.oldPrice || 18.59},
    rating: 4.6,
    reviewCount: ${productData.reviewCount || 318},
    monthlySales: '${productData.monthlySales || '200'}',
    mainImage: '${productData.images[0] || ''}',
    gallery: [
      ${productData.images.map(img => `'${img}'`).join(',\n      ')}
    ],`;
    
    // Substituir usando uma abordagem mais simples
    const inicioProduto = geradorContent.indexOf("slug: 'balanca-digital-cozinha-10kg'");
    const fimProduto = geradorContent.indexOf('},', inicioProduto + 200) + 2;
    
    if (inicioProduto !== -1 && fimProduto !== -1) {
      const antes = geradorContent.substring(0, inicioProduto - 4);
      const depois = geradorContent.substring(fimProduto);
      geradorContent = antes + novoProduto + depois;
      
      fs.writeFileSync(geradorPath, geradorContent, 'utf8');
      console.log('✅ gerador.js atualizado');
    } else {
      console.log('⚠️  Não foi possível atualizar automaticamente. Atualize manualmente.');
    }
    
    // 3. Regenerar landing page
    console.log('\n🎨 Passo 3: Regenerando landing page...');
    execSync('node gerador.js', { stdio: 'inherit' });
    
    console.log('\n✅ Atualização completa!');
    console.log('\n📊 Resumo:');
    console.log(`   Título: ${productData.title}`);
    console.log(`   Preço: R$ ${productData.price?.toFixed(2) || '15,00'}`);
    console.log(`   Preço antigo: R$ ${productData.oldPrice?.toFixed(2) || '18,59'}`);
    console.log(`   Rating: 4.6 estrelas (${productData.reviewCount || 318} avaliações)`);
    console.log(`   Imagens: ${productData.images.length} imagens extraídas`);
    console.log(`   Link: https://amzn.to/45Fcd4U`);
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

atualizarProduto();
