# 🚀 Deploy Rápido - Balança Digital Cozinha 10kg

## Objetivo
Deployar em: `produtosrecomendados.com.br/balanca-digital-cozinha-10kg`

---

## ⚡ Método Mais Rápido (5 minutos)

### 1. Upload Direto no Vercel

1. Acesse: https://vercel.com/dashboard
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Browse"** (ou arraste a pasta)
4. Selecione a pasta `balanca-digital-cozinha-10kg`
5. **Framework Preset:** Selecione **"Other"**
6. Clique em **"Deploy"**

### 2. Configurar Domínio

1. Após o deploy, vá em **Settings** → **Domains**
2. Clique em **"Add Domain"**
3. Digite: `produtosrecomendados.com.br`
4. Clique em **"Add"**

### 3. Configurar Path (Caminho)

**Opção A - Se o domínio principal já está no Vercel:**
- No projeto do domínio principal, edite o `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/balanca-digital-cozinha-10kg",
      "destination": "https://seu-projeto-balanca.vercel.app"
    }
]
}
```

**Opção B - Se é o primeiro deploy:**
- O Vercel pode configurar automaticamente
- Ou use o método de monorepo (veja COMO_DEPLOYAR.md)

### 4. Verificar DNS (se necessário)

Se o domínio `produtosrecomendados.com.br` ainda não está apontando para o Vercel:

**No Registro.br:**
- Tipo: `A`
- Nome: `@` (ou deixe em branco)
- Valor: `76.76.21.21`

Ou:

- Tipo: `CNAME`
- Nome: `@`
- Valor: `cname.vercel-dns.com`

---

## ✅ Verificação

Após alguns minutos, acesse:
- ✅ `produtosrecomendados.com.br/balanca-digital-cozinha-10kg`

---

## 🔧 Troubleshooting

**Problema:** Página não carrega no path
- **Solução:** Verifique se o rewrite está configurado corretamente no projeto principal

**Problema:** Domínio não funciona
- **Solução:** Verifique o DNS no Registro.br (pode levar até 24h para propagar)

**Problema:** Erro 404
- **Solução:** Certifique-se de que o `vercel.json` está na pasta correta

---

## 📞 Suporte

Se tiver problemas, verifique:
1. ✅ DNS configurado corretamente
2. ✅ Domínio adicionado no Vercel
3. ✅ Rewrite configurado (se necessário)
4. ✅ Arquivo `index.html` existe na pasta
