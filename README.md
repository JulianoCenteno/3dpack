# PACK 3D — Site Estático

Projeto estático puro otimizado para **GitHub + Vercel**.

## Estrutura

```
pack3d/
├── index.html        # Página principal
├── style.css         # Estilos (sem dependências externas)
├── script.js         # Interações (vanilla JS puro)
├── vercel.json       # Configuração de headers e cache
└── images/           # Todos os assets locais
    ├── *.webp        # Imagens otimizadas
    ├── *.jpg / *.png
    └── *.ttf         # Fontes locais (Inter + Barlow Condensed)
```

## Como usar

### Localmente
Abra `index.html` diretamente no navegador — nenhum servidor necessário.

### GitHub + Vercel
1. Faça push deste repositório para o GitHub
2. Importe no [Vercel](https://vercel.com)
3. Framework: **Other** (sem framework)
4. Build command: *(deixe em branco)*
5. Output directory: `.` (raiz)

## Personalização

### Trocar links de checkout
No `index.html`, substitua `#checkout` e `#checkout-premium` pelas URLs reais do Hotmart/Kiwify.

### Inserir VSL (VTurb)
No `index.html`, localize o comentário:
```html
<!-- COLE AQUI O SCRIPT DA VTURB -->
```
E cole o script da VTurb neste local.

## Tecnologias
- HTML5 semântico
- CSS3 puro (sem frameworks)
- JavaScript vanilla (sem jQuery, sem bibliotecas)
- Fontes locais (Inter + Barlow Condensed)
- Lazy loading nativo em todas as imagens
