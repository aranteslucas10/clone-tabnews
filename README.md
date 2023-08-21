# clone-tabnews

Aprimorando meus conhecimentos com a implementação do https://www.tabnews.com.br feita no https://curso.dev

## Dependências

- nodejs lts/hydrogen
- next@13.1.6
- react@18.2.0
- react-dom@18.2.0

## Fundação

### Instalação da versão do node.js

1. Instalar a versão lts/hydrogen do node utilizando nvm (Nove Version Manager).

```bash
nvm install lts/hydrogen
```

2. Defininado a versão padrão node.js

```
nvm alias default lts/hydrogen
```

3. Definindo versão do node.js utilizando o arquivo .nvmrc (Node Version Manager Run Commands).

> Arquivos com o final **rc** geralmente são utilizados para definir comandos executados na inicialização da ferramenta.

> Arquivo necessita de uma linha em branco no final.

```text
lts/hydrogen

```

```bash
nvm install
```

### Instalação dos pacotes

1. Inicialização do arquivo package.json npm (Node Package Manager)
   > Presione enter em todas as perguntas, exceto a sobre licensa, onde deve ser digitado MIT.

```bash
npm init
```

2. Instalando pacotes e suas respectivas versões.

```
npm install next@13.1.6
npm install react@18.2.0
npm install react-dom@18.2.0
```

## Deploy Site Estático com o GitHub Pages

### Gerar Site Estático

```bash
npm run build
npm run export
```
