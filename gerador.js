const fs = require('fs');
const path = require('path');

// Código de afiliado
const AFFILIATE_TAG = '123321022-20';

// Produtos para testar
const produtos = [
  {
    slug: 'air-fryer-mondial-8l',
    nome: 'Air Fryer Mondial 8L',
    subtitle: 'Fritadeira Sem Óleo - A mais vendida do Brasil',
    specs: 'Fritadeira Sem Óleo - Preto/Inox | 1900W | 110V',
    asin: 'B08XYZ123', // Substituir por ASIN real
    precoAtual: 359.10,
    precoAnterior: 499.90,
    rating: 4.7,
    reviewCount: 6802,
    monthlySales: '1 mil',
    mainImage: 'https://m.media-amazon.com/images/I/61tF0EpMeUL._AC_SX679_.jpg',
    gallery: [
      'https://m.media-amazon.com/images/I/613yPbDw4dL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/71eVqo+x+HL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/71L6qxc83VL._AC_SX679_.jpg'
    ],
    features: [
      { icon: '📦', title: 'Capacidade de 8 Litros', description: 'O maior cesto quadrado da categoria. Prepare até 25 pães de queijo ou um frango inteiro!' },
      { icon: '💨', title: '100% Sem Óleo', description: 'Reduza até 80% de gordura nas suas receitas, mantendo o sabor e a crocância!' },
      { icon: '⚡', title: '1900W de Potência', description: 'Alta potência para cozinhar mais rápido. Economize tempo na cozinha!' },
      { icon: '🌡️', title: 'Controle de Temperatura', description: 'Até 200°C ajustável. Controle preciso da temperatura ideal!' }
    ],
    benefits: [
      { title: 'Alimentação Mais Saudável', description: 'Prepare alimentos crocantes sem usar óleo. Reduza até 80% de gordura!' },
      { title: 'Versatilidade Total', description: 'Vá muito além de batata frita! Prepare legumes, carnes, peixes, lasanha, pizza e muito mais!' },
      { title: 'Economia de Tempo', description: 'Cozinhe mais rápido com a tecnologia de circulação de ar quente!' },
      { title: 'Economia de Dinheiro', description: 'Não precisa mais comprar óleo constantemente. Economize no supermercado!' }
    ],
    brand: 'Mondial',
    urgency: true
  },
  {
    slug: 'processador-alimentos-philco',
    nome: 'Processador de Alimentos Philco',
    subtitle: 'Processe, pique e rale com facilidade',
    specs: 'Processador 500W | 4 Lâminas | Batedor Incluso',
    asin: 'B08ABC123', // Substituir por ASIN real
    precoAtual: 199.90,
    precoAnterior: 299.90,
    rating: 4.5,
    reviewCount: 3420,
    monthlySales: '500',
    mainImage: 'https://m.media-amazon.com/images/I/71ABC123._AC_SX679_.jpg',
    features: [
      { icon: '⚡', title: '500W de Potência', description: 'Potência suficiente para processar qualquer alimento!' },
      { icon: '🔪', title: '4 Lâminas Inclusas', description: 'Lâminas para diferentes tipos de corte e processamento!' },
      { icon: '🧹', title: 'Fácil Limpeza', description: 'Peças removíveis e laváveis na lava-louças!' }
    ],
    benefits: [
      { title: 'Economia de Tempo', description: 'Processe grandes quantidades de alimentos em segundos!' },
      { title: 'Versatilidade', description: 'Pique, rale, processe e bata com um único aparelho!' }
    ],
    brand: 'Philco',
    urgency: true
  },
  {
    slug: 'liquidificador-mondial-1000w',
    nome: 'Liquidificador Mondial 1000W',
    subtitle: 'Potência e durabilidade para sua cozinha',
    specs: '1000W | Jarra de Vidro 1,5L | 3 Velocidades',
    asin: 'B08DEF456', // Substituir por ASIN real
    precoAtual: 149.90,
    precoAnterior: 199.90,
    rating: 4.6,
    reviewCount: 5230,
    monthlySales: '800',
    mainImage: 'https://m.media-amazon.com/images/I/71DEF456._AC_SX679_.jpg',
    features: [
      { icon: '⚡', title: '1000W de Potência', description: 'Potência suficiente para triturar gelo e frutas congeladas!' },
      { icon: '🍶', title: 'Jarra de Vidro', description: 'Jarra de vidro temperado, resistente e fácil de limpar!' },
      { icon: '🔧', title: '3 Velocidades', description: 'Controle total da velocidade para diferentes receitas!' }
    ],
    benefits: [
      { title: 'Versatilidade', description: 'Faça sucos, vitaminas, smoothies e muito mais!' },
      { title: 'Durabilidade', description: 'Motor potente e jarra de vidro para durar anos!' }
    ],
    brand: 'Mondial',
    urgency: false
  },
  {
    slug: 'geladeira-brastemp-inverse',
    nome: 'Geladeira Brastemp Inverse',
    subtitle: 'Tecnologia e economia de energia',
    specs: '375L | Inverse | Frost Free | Inox',
    asin: 'B08GHI789', // Substituir por ASIN real
    precoAtual: 2499.90,
    precoAnterior: 3299.90,
    rating: 4.8,
    reviewCount: 1250,
    monthlySales: '200',
    mainImage: 'https://m.media-amazon.com/images/I/71GHI789._AC_SX679_.jpg',
    features: [
      { icon: '❄️', title: 'Frost Free', description: 'Não precisa descongelar nunca!' },
      { icon: '🔄', title: 'Tecnologia Inverse', description: 'Freezer embaixo, geladeira em cima!' },
      { icon: '⚡', title: 'Economia de Energia', description: 'Classe A de eficiência energética!' }
    ],
    benefits: [
      { title: 'Praticidade', description: 'Acesso fácil aos alimentos mais usados!' },
      { title: 'Economia', description: 'Economize na conta de luz com eficiência energética!' }
    ],
    brand: 'Brastemp',
    urgency: true
  },
  {
    slug: 'microondas-electrolux-31l',
    nome: 'Microondas Electrolux 31L',
    subtitle: 'Praticidade e tecnologia para sua cozinha',
    specs: '31 Litros | 20L Úteis | Painel Digital | 6 Níveis de Potência',
    asin: 'B08JKL012', // Substituir por ASIN real
    precoAtual: 399.90,
    precoAnterior: 549.90,
    rating: 4.5,
    reviewCount: 2890,
    monthlySales: '600',
    mainImage: 'https://m.media-amazon.com/images/I/71JKL012._AC_SX679_.jpg',
    features: [
      { icon: '📦', title: '31 Litros', description: 'Capacidade ideal para famílias!' },
      { icon: '⚡', title: '6 Níveis de Potência', description: 'Controle total do cozimento!' },
      { icon: '⏰', title: 'Timer Digital', description: 'Timer preciso até 99 minutos!' }
    ],
    benefits: [
      { title: 'Praticidade', description: 'Aqueça e cozinhe alimentos rapidamente!' },
      { title: 'Versatilidade', description: 'Descongele, aqueça e cozinhe com um único aparelho!' }
    ],
    brand: 'Electrolux',
    urgency: true
  },
  {
    slug: 'balanca-digital-cozinha-10kg',
    nome: 'Balança Digital de Cozinha, Até 10 kg, Escala 1grama Balança de alta Precisão (Contém Pilhas)',
    subtitle: 'Alta Precisão de 1g - Ideal para Dietas, Receitas e Controle de Porções',
    specs: 'Até 10 kg | Escala 1 grama | Alta Precisão | Função Tara | Display Digital | Pilhas Inclusas',
    asin: 'B0D138HHGQ',
    affiliateLink: 'https://amzn.to/45Fcd4U', // Link de afiliado direto
    precoAtual: 15.00, // Preço real extraído
    precoAnterior: 18.59, // Preço antigo extraído
    rating: 4.6, // Rating real (ajustado conforme página)
    reviewCount: 318, // Número real de avaliações
    monthlySales: '200',
    mainImage: 'https://m.media-amazon.com/images/I/51-YsblaRkL._AC_SX679_.jpg', // Imagem real extraída
    gallery: [
      'https://m.media-amazon.com/images/I/51-YsblaRkL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/41Yaa3J3iPL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/31LEjSNgAiL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/31rqBu+B5NL._AC_SX679_.jpg',
      'https://m.media-amazon.com/images/I/413cWL2y5XL._AC_SX679_.jpg'
    ],
    features: [
      { icon: '⚖️', title: 'Alta Precisão de 1g', description: 'Mede com exatidão até 10kg, ideal para dietas, receitas e controle de porções, garantindo resultados consistentes e confiáveis.' },
      { icon: '🎨', title: 'Design Elegante', description: 'Resistente e fácil de limpar, com acabamento moderno, ideal para qualquer estilo de cozinha, mantendo sua durabilidade por anos.' },
      { icon: '🔄', title: 'Função Tara', description: 'Zere a balança com facilidade para medir ingredientes de forma independente, sem interferir no peso do recipiente utilizado.' },
      { icon: '🏋️‍♀️', title: 'Perfeita para Dietas Fitness', description: 'Controle exato de porções para otimizar sua alimentação, ajudando a atingir metas de perda de peso, ganho muscular ou saúde.' },
      { icon: '📱', title: 'Display Digital Grande', description: 'Leitura fácil e rápida dos resultados, mesmo em ambientes com pouca luz, garantindo mais praticidade no uso diário.' },
      { icon: '🍰', title: 'Versátil para Receitas', description: 'Ideal para medir ingredientes de bolos, pães, sobremesas e pratos gourmet com precisão, garantindo o sucesso nas suas receitas.' }
    ],
    benefits: [
      { title: 'Precisão Total', description: 'Com precisão de 1 grama, você pode seguir dietas e receitas com total confiança, sabendo que cada medida está correta.' },
      { title: 'Controle Nutricional', description: 'Facilita o controle de calorias, porções ou nutrientes, sendo sua aliada na jornada para uma alimentação equilibrada e saudável.' },
      { title: 'Bateria de Longa Duração', description: 'Funciona por um longo período com consumo de energia eficiente, sem necessidade de trocas frequentes de bateria.' },
      { title: 'Fácil de Armazenar e Limpar', description: 'Compacta, ela é simples de guardar e fácil de manter limpa, sem acumular resíduos ou odores.' }
    ],
    brand: 'Genérico', // Marca extraída (nas especificações técnicas aparece "Moment")
    urgency: true
  }
];

// Função para gerar estrelas
function gerarEstrelas(rating) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  let stars = '★'.repeat(fullStars);
  if (hasHalf) stars += '½';
  stars += '☆'.repeat(5 - Math.ceil(rating));
  return stars;
}

// Função para formatar preço
function formatarPreco(preco) {
  return preco.toFixed(2).replace('.', ',');
}

// Função para calcular desconto
function calcularDesconto(atual, anterior) {
  if (!anterior || anterior <= atual) return null;
  return Math.round(((anterior - atual) / anterior) * 100);
}

// Função para gerar link de afiliado
function gerarLinkAfiliado(produto) {
  // Se o produto tem um link de afiliado direto, use-o
  if (produto.affiliateLink) {
    return produto.affiliateLink;
  }
  // Caso contrário, gere o link baseado no ASIN
  return `https://www.amazon.com.br/dp/${produto.asin}?tag=${AFFILIATE_TAG}`;
}

// Função para gerar URL canônica
function gerarUrlCanonica(slug) {
  return `https://${slug}.produtosrecomendados.com.br`;
}

// Função para gerar data de validade do preço
function gerarDataValidade() {
  const data = new Date();
  data.setDate(data.getDate() + 30);
  return data.toISOString().split('T')[0];
}

// Função para substituir placeholders
function processarTemplate(template, produto) {
  const desconto = calcularDesconto(produto.precoAtual, produto.precoAnterior);
  const stars = gerarEstrelas(produto.rating);
  
  let html = template;
  
  // Substituições simples
  html = html.replace(/\{\{TITLE\}\}/g, `${produto.nome} - ${produto.subtitle} | Oferta Especial`);
  html = html.replace(/\{\{DESCRIPTION\}\}/g, `${produto.nome} - ${produto.specs}. Preço especial R$ ${formatarPreco(produto.precoAtual)}. Frete grátis. Compre na Amazon com segurança!`);
  html = html.replace(/\{\{PRODUCT_NAME\}\}/g, produto.nome);
  html = html.replace(/\{\{SUBTITLE\}\}/g, produto.subtitle);
  html = html.replace(/\{\{SPECS\}\}/g, produto.specs);
  html = html.replace(/\{\{CURRENT_PRICE\}\}/g, produto.precoAtual.toString());
  html = html.replace(/\{\{CURRENT_PRICE_FORMATTED\}\}/g, formatarPreco(produto.precoAtual));
  html = html.replace(/\{\{MAIN_IMAGE\}\}/g, produto.mainImage);
  html = html.replace(/\{\{AFFILIATE_LINK\}\}/g, gerarLinkAfiliado(produto));
  html = html.replace(/\{\{CANONICAL_URL\}\}/g, gerarUrlCanonica(produto.slug));
  html = html.replace(/\{\{BRAND\}\}/g, produto.brand);
  html = html.replace(/\{\{PRICE_VALID_UNTIL\}\}/g, gerarDataValidade());
  html = html.replace(/\{\{MONTHLY_SALES\}\}/g, produto.monthlySales);
  
  // Rating (condicional)
  if (produto.rating) {
    html = html.replace(/\{\{#RATING\}\}/g, '');
    html = html.replace(/\{\{\/RATING\}\}/g, '');
    html = html.replace(/\{\{RATING\}\}/g, produto.rating.toString());
    html = html.replace(/\{\{REVIEW_COUNT\}\}/g, produto.reviewCount.toString());
    html = html.replace(/\{\{STARS\}\}/g, stars);
  } else {
    html = html.replace(/\{\{#RATING\}\}[\s\S]*?\{\{\/RATING\}\}/g, '');
  }
  
  // Preço antigo (condicional)
  if (produto.precoAnterior) {
    html = html.replace(/\{\{#OLD_PRICE\}\}/g, '');
    html = html.replace(/\{\{\/OLD_PRICE\}\}/g, '');
    html = html.replace(/\{\{OLD_PRICE_FORMATTED\}\}/g, formatarPreco(produto.precoAnterior));
  } else {
    html = html.replace(/\{\{#OLD_PRICE\}\}[\s\S]*?\{\{\/OLD_PRICE\}\}/g, '');
  }
  
  // Desconto (condicional)
  if (desconto) {
    html = html.replace(/\{\{#DISCOUNT\}\}/g, '');
    html = html.replace(/\{\{\/DISCOUNT\}\}/g, '');
    html = html.replace(/\{\{DISCOUNT\}\}/g, desconto.toString());
  } else {
    html = html.replace(/\{\{#DISCOUNT\}\}[\s\S]*?\{\{\/DISCOUNT\}\}/g, '');
  }
  
  // Urgência (condicional)
  if (produto.urgency) {
    html = html.replace(/\{\{#URGENCY\}\}/g, '');
    html = html.replace(/\{\{\/URGENCY\}\}/g, '');
  } else {
    html = html.replace(/\{\{#URGENCY\}\}[\s\S]*?\{\{\/URGENCY\}\}/g, '');
  }
  
  // Galeria (condicional)
  if (produto.gallery && produto.gallery.length > 0) {
    let galleryHtml = '<div class="gallery">';
    produto.gallery.forEach(img => {
      galleryHtml += `<img src="${img}" alt="${produto.nome}">`;
    });
    galleryHtml += '</div>';
    
    html = html.replace(/\{\{#GALLERY\}\}/g, '');
    html = html.replace(/\{\{\/GALLERY\}\}/g, '');
    html = html.replace(/\{\{#IMAGES\}\}[\s\S]*?\{\{\/IMAGES\}\}/g, produto.gallery.map(img => `<img src="${img}" alt="${produto.nome}">`).join('\n'));
  } else {
    html = html.replace(/\{\{#GALLERY\}\}[\s\S]*?\{\{\/IMAGES\}\}[\s\S]*?\{\{\/GALLERY\}\}/g, '');
  }
  
  // Features (condicional)
  if (produto.features && produto.features.length > 0) {
    let featuresHtml = '';
    produto.features.forEach(feature => {
      featuresHtml += `
                <div class="feature">
                    <div class="feature-icon">${feature.icon}</div>
                    <h3>${feature.title}</h3>
                    <p>${feature.description}</p>
                </div>`;
    });
    
    // Substituir bloco de features
    const featuresRegex = /\{\{#FEATURES\}\}([\s\S]*?)\{\{\/FEATURES\}\}/;
    const featuresMatch = html.match(featuresRegex);
    if (featuresMatch) {
      let featuresBlock = featuresMatch[1];
      featuresBlock = featuresBlock.replace(/\{\{#ITEMS\}\}[\s\S]*?\{\{\/ITEMS\}\}/, featuresHtml);
      html = html.replace(featuresRegex, featuresBlock);
    }
  } else {
    html = html.replace(/\{\{#FEATURES\}\}[\s\S]*?\{\{\/FEATURES\}\}/g, '');
  }
  
  // Benefits (condicional)
  if (produto.benefits && produto.benefits.length > 0) {
    let benefitsHtml = '';
    produto.benefits.forEach(benefit => {
      benefitsHtml += `
                <li style="margin: 1rem 0;"><strong>${benefit.title}:</strong> ${benefit.description}</li>`;
    });
    
    // Substituir bloco de benefits
    const benefitsRegex = /\{\{#BENEFITS\}\}([\s\S]*?)\{\{\/BENEFITS\}\}/;
    const benefitsMatch = html.match(benefitsRegex);
    if (benefitsMatch) {
      let benefitsBlock = benefitsMatch[1];
      benefitsBlock = benefitsBlock.replace(/\{\{#ITEMS\}\}[\s\S]*?\{\{\/ITEMS\}\}/, benefitsHtml);
      html = html.replace(benefitsRegex, benefitsBlock);
    }
  } else {
    html = html.replace(/\{\{#BENEFITS\}\}[\s\S]*?\{\{\/BENEFITS\}\}/g, '');
  }
  
  // Galeria (condicional) - corrigir
  if (produto.gallery && produto.gallery.length > 0) {
    let galleryHtml = '<div class="gallery">';
    produto.gallery.forEach(img => {
      galleryHtml += `<img src="${img}" alt="${produto.nome}">`;
    });
    galleryHtml += '</div>';
    
    // Substituir bloco de galeria
    const galleryRegex = /\{\{#GALLERY\}\}([\s\S]*?)\{\{\/GALLERY\}\}/;
    const galleryMatch = html.match(galleryRegex);
    if (galleryMatch) {
      let galleryBlock = galleryMatch[1];
      galleryBlock = galleryBlock.replace(/\{\{#IMAGES\}\}[\s\S]*?\{\{\/IMAGES\}\}/, produto.gallery.map(img => `<img src="${img}" alt="${produto.nome}">`).join('\n'));
      html = html.replace(galleryRegex, galleryBlock);
    }
  } else {
    html = html.replace(/\{\{#GALLERY\}\}[\s\S]*?\{\{\/GALLERY\}\}/g, '');
  }
  
  return html;
}

// Gerar landing pages
function gerarLandingPages() {
  const templatePath = path.join(__dirname, 'template.html');
  const template = fs.readFileSync(templatePath, 'utf8');
  
  produtos.forEach(produto => {
    const html = processarTemplate(template, produto);
    const dirPath = path.join(__dirname, produto.slug);
    
    // Criar diretório se não existir
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    
    // Salvar index.html
    fs.writeFileSync(path.join(dirPath, 'index.html'), html, 'utf8');
    
    // Criar vercel.json
    const vercelConfig = {
      rewrites: [
        {
          source: '/(.*)',
          destination: '/index.html'
        }
      ]
    };
    fs.writeFileSync(path.join(dirPath, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');
    
    console.log(`✅ Landing page criada: ${produto.slug}`);
  });
  
  console.log(`\n🎉 ${produtos.length} landing pages criadas com sucesso!`);
  console.log('\n📋 Próximos passos:');
  console.log('1. Substituir ASINs por ASINs reais dos produtos');
  console.log('2. Atualizar imagens se necessário');
  console.log('3. Fazer deploy no Vercel');
  console.log('4. Configurar subdomínios');
}

// Executar
gerarLandingPages();
