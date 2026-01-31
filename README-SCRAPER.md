# 📖 Como Usar o Scraper

## 🚀 Uso Básico

O script `scraper-puppeteer.js` aceita a URL do produto como parâmetro:

```bash
node scraper-puppeteer.js <URL_DO_PRODUTO>
```

## 📝 Exemplos

### Com link encurtado (amzn.to):
```bash
node scraper-puppeteer.js https://amzn.to/45Fcd4U
```

### Com link completo da Amazon:
```bash
node scraper-puppeteer.js https://www.amazon.com.br/dp/B0D138HHGQ
```

### Com link de afiliado:
```bash
node scraper-puppeteer.js https://www.amazon.com.br/dp/B0D138HHGQ?tag=seu-tag-20
```

## ⚠️ Sem URL

Se você não passar nenhuma URL, o script usará a URL padrão:
```bash
node scraper-puppeteer.js
# Usa: https://amzn.to/45Fcd4U
```

## 📦 O que o Scraper Extrai

- ✅ Título do produto
- ✅ Preço atual
- ✅ Preço antigo (se houver)
- ✅ Rating (estrelas)
- ✅ Número de avaliações
- ✅ Vendas mensais
- ✅ ASIN
- ✅ Marca
- ✅ Imagens (até 5 imagens)
- ✅ Descrição

## 💾 Resultado

Os dados são salvos em `product-data.json` e também exibidos no console.

## 🔄 Fluxo Completo

1. **Extrair dados:**
   ```bash
   node scraper-puppeteer.js https://amzn.to/SEU_LINK
   ```

2. **Atualizar gerador.js manualmente** com os dados do `product-data.json`

3. **Gerar landing page:**
   ```bash
   node gerador.js
   ```

## 🎯 Dicas

- Use links de afiliado para rastrear melhor
- O script funciona com links encurtados (amzn.to) e links completos
- Se o preço não for encontrado, verifique se o produto está disponível
- As imagens são normalizadas para tamanho grande (AC_SX679)
