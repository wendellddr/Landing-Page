# 🚀 Deploy: produtosrecomendados.com.br/balanca-digital-cozinha-10kg

## 📋 Passo a Passo Completo

### Opção 1: Deploy Manual (Recomendado para iniciantes)

1. **Acesse o Vercel:**
   - Vá para: https://vercel.com/dashboard
   - Faça login

2. **Criar Novo Projeto:**
   - Clique em **"Add New..."** → **"Project"**
   - Clique em **"Browse"** ou arraste a pasta
   - Selecione a pasta `balanca-digital-cozinha-10kg` (esta pasta)
   - **Framework Preset:** Selecione **"Other"**
   - Clique em **"Deploy"**

3. **Aguardar Deploy:**
   - Aguarde alguns segundos
   - Você receberá uma URL temporária tipo: `balanca-digital-cozinha-10kg-xxxxx.vercel.app`

4. **Configurar Domínio:**
   - No projeto recém-criado, vá em **Settings** → **Domains**
   - Clique em **"Add Domain"**
   - Digite: `produtosrecomendados.com.br`
   - Clique em **"Add"**

5. **Configurar Path (IMPORTANTE):**
   
   **Se você já tem um projeto principal no Vercel para `produtosrecomendados.com.br`:**
   
   - Vá para o projeto principal no Vercel
   - Edite o arquivo `vercel.json` (ou crie se não existir)
   - Adicione este rewrite:
   ```json
   {
     "rewrites": [
       {
         "source": "/balanca-digital-cozinha-10kg",
         "destination": "https://balanca-digital-cozinha-10kg-xxxxx.vercel.app"
       },
       {
         "source": "/balanca-digital-cozinha-10kg/(.*)",
         "destination": "https://balanca-digital-cozinha-10kg-xxxxx.vercel.app/$1"
       }
     ]
   }
   ```
   - Substitua `xxxxx` pela URL do seu projeto
   - Faça um novo deploy do projeto principal

   **Se este é o primeiro projeto no domínio:**
   - O Vercel pode servir diretamente se você configurar o Root Directory corretamente
   - Ou use a estrutura de monorepo (veja COMO_DEPLOYAR.md)

6. **Configurar DNS (se ainda não estiver):**
   - Acesse o Registro.br
   - Vá em **DNS** → **Registros**
   - Adicione:
     - **Tipo:** `A`
     - **Nome:** `@` (ou deixe em branco)
     - **Valor:** `76.76.21.21`
   - Ou use CNAME:
     - **Tipo:** `CNAME`
     - **Nome:** `@`
     - **Valor:** `cname.vercel-dns.com`

7. **Aguardar Propagação:**
   - DNS pode levar de alguns minutos a 24 horas
   - Verifique em: https://dnschecker.org

---

### Opção 2: Deploy via CLI (Para desenvolvedores)

```bash
# Instalar Vercel CLI (se ainda não tiver)
npm i -g vercel

# Entrar na pasta
cd balanca-digital-cozinha-10kg

# Fazer login
vercel login

# Deploy
vercel

# Deploy em produção
vercel --prod

# Adicionar domínio
vercel domains add produtosrecomendados.com.br
```

---

## ✅ Resultado Final

Após completar os passos, sua landing page estará disponível em:

🌐 **https://produtosrecomendados.com.br/balanca-digital-cozinha-10kg**

---

## 🔍 Verificação

1. Acesse a URL acima
2. Verifique se a página carrega corretamente
3. Teste os botões e links
4. Verifique no mobile

---

## ⚠️ Problemas Comuns

### Página não carrega no path
- Verifique se o rewrite está configurado no projeto principal
- Certifique-se de que o domínio está apontando para o Vercel

### Erro 404
- Verifique se o `vercel.json` está na pasta correta
- Certifique-se de que o `index.html` existe

### DNS não funciona
- Aguarde até 24 horas para propagação
- Verifique se os registros DNS estão corretos no Registro.br

---

## 📞 Precisa de Ajuda?

Consulte:
- `DEPLOY_RAPIDO.md` - Guia rápido
- `../COMO_DEPLOYAR.md` - Guia completo com todas as opções
