# 🚀 Como Deployar Landing Pages

## 📋 ESTRUTURA CRIADA

```
landing-pages/
├── balanca-digital-cozinha-10kg/
│   ├── index.html      # Landing page HTML
│   └── vercel.json     # Config Vercel
└── README.md
```

---

## 🎯 DEPLOY EM PATH DO DOMÍNIO PRINCIPAL (produtosrecomendados.com.br/balanca-digital-cozinha-10kg)

### Método 1: Deploy Direto no Vercel (Mais Rápido)

1. **Acesse o Vercel Dashboard:**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login na sua conta

2. **Criar Novo Projeto:**
   - Clique em "Add New..." → "Project"
   - Selecione "Browse" (Upload)
   - Selecione a pasta `balanca-digital-cozinha-10kg`
   - Framework Preset: **Other**
   - Clique em "Deploy"

3. **Configurar Domínio:**
   - Após o deploy, vá em **Settings** → **Domains**
   - Clique em "Add Domain"
   - Digite: `produtosrecomendados.com.br`
   - ✅ Marque "Redirect www to apex domain" (opcional)
   - Clique em "Add"

4. **Configurar Rewrite para o Path:**
   - Vá em **Settings** → **Domains**
   - Clique no domínio `produtosrecomendados.com.br`
   - Em "Path", adicione: `/balanca-digital-cozinha-10kg`
   - Ou edite o `vercel.json` na raiz do projeto principal (se já existir)

5. **Configurar DNS (se ainda não estiver configurado):**
   - No Registro.br, adicione:
     - Tipo: `A` ou `CNAME`
     - Nome: `@` (ou deixe em branco para o domínio raiz)
     - Valor: `76.76.21.21` (IP do Vercel) ou `cname.vercel-dns.com` (CNAME)

### Método 2: Usando Repositório Git

1. **Criar repositório no GitHub:**
   ```bash
   # Criar novo repositório
   mkdir balanca-digital-cozinha-10kg-deploy
   cd balanca-digital-cozinha-10kg-deploy
   git init
   
   # Copiar arquivos
   cp -r ../landing-pages/balanca-digital-cozinha-10kg/* .
   
   # Commit e push
   git add .
   git commit -m "Deploy balança digital cozinha"
   git remote add origin git@github.com:seu-usuario/balanca-digital-cozinha-10kg-deploy.git
   git push -u origin main
   ```

2. **Deploy no Vercel:**
   - Vercel Dashboard → New Project
   - Importar repositório
   - Root Directory: `/` (raiz)
   - Framework: **Other**

3. **Configurar Domínio e Path:**
   - Settings → Domains
   - Add Domain: `produtosrecomendados.com.br`
   - Configure o path `/balanca-digital-cozinha-10kg` nas configurações do domínio

### Método 3: Projeto Monorepo (Múltiplas Landing Pages)

Se você quer gerenciar múltiplas landing pages no mesmo projeto:

1. **Estrutura do projeto:**
   ```
   landing-pages/
   ├── balanca-digital-cozinha-10kg/
   │   └── index.html
   ├── outro-produto/
   │   └── index.html
   └── vercel.json
   ```

2. **vercel.json na raiz:**
   ```json
   {
     "rewrites": [
       {
         "source": "/balanca-digital-cozinha-10kg",
         "destination": "/balanca-digital-cozinha-10kg/index.html"
       },
       {
         "source": "/balanca-digital-cozinha-10kg/(.*)",
         "destination": "/balanca-digital-cozinha-10kg/$1"
       }
     ]
   }
   ```

3. **Deploy:**
   - Deploy do projeto inteiro
   - Configurar domínio: `produtosrecomendados.com.br`
   - As landing pages estarão disponíveis em:
     - `produtosrecomendados.com.br/balanca-digital-cozinha-10kg`
     - `produtosrecomendados.com.br/outro-produto`

---

## ✅ RESULTADO ESPERADO

**Landing page funcionando em:**
- ✅ `produtosrecomendados.com.br/balanca-digital-cozinha-10kg`

---

## 🎯 OPÇÃO 1: REPOSITÓRIO SEPARADO (Para Subdomínios)

### 1. Criar repositório separado no GitHub:
```
landing-pages-produtosrecomendados
```

### 2. Copiar pasta `landing-pages/`:
```bash
# Criar novo repositório
mkdir landing-pages-produtosrecomendados
cd landing-pages-produtosrecomendados
git init

# Copiar arquivos
cp -r ../Infoprodutos/landing-pages/air-fryer-mondial .
cp ../Infoprodutos/landing-pages/vercel.json .

# Commit e push
git add .
git commit -m "Landing page Air Fryer"
git remote add origin git@github.com:seu-usuario/landing-pages-produtosrecomendados.git
git push -u origin main
```

### 3. Deploy no Vercel:
- Vercel Dashboard → New Project
- Importar repositório `landing-pages-produtosrecomendados`
- Root Directory: `air-fryer-mondial`
- Framework: Other (HTML estático)

### 4. Configurar subdomínio:
- Settings → Domains
- Add Domain: `air-fryer.produtosrecomendados.com.br`

### 5. Configurar DNS no Registro.br:
- Tipo: `CNAME`
- Nome: `air-fryer`
- Valor: `cname.vercel-dns.com`

---

## 🎯 OPÇÃO 2: MESMO REPOSITÓRIO, DEPLOY SEPARADO

### 1. No Vercel, criar novo projeto:
- Vercel Dashboard → New Project
- Importar mesmo repositório
- Root Directory: `landing-pages/air-fryer-mondial`
- Framework: Other

### 2. Configurar subdomínio:
- Settings → Domains
- Add Domain: `air-fryer.produtosrecomendados.com.br`

### 3. DNS:
- Mesmo processo acima

---

## 🎯 OPÇÃO 3: UPLOAD DIRETO (Mais Rápido)

### 1. Vercel Dashboard → New Project
### 2. Deploy → Browse
### 3. Selecionar pasta `landing-pages/air-fryer-mondial`
### 4. Deploy
### 5. Configurar domínio depois

---

## ✅ RESULTADO

**Landing page funcionando em:**
- `air-fryer.produtosrecomendados.com.br`

**Site principal continua em:**
- `produtosrecomendados.com.br` (quando fizer deploy)

---

## 📝 PRÓXIMAS LANDING PAGES

**Criar nova pasta:**
```
landing-pages/
├── air-fryer-mondial/
├── outro-produto/
│   └── index.html
└── ...
```

**Cada uma vira um subdomínio:**
- `outro-produto.produtosrecomendados.com.br`

---

## 🎯 RECOMENDAÇÃO

**Use Opção 1 (Repositório Separado):**
- ✅ Organização melhor
- ✅ Deploy independente
- ✅ Não mistura com projeto principal
- ✅ Fácil de gerenciar
