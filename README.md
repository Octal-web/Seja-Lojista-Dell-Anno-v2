<div align="center">
  <h1>Seja Lojista - Dell Anno</h1>
</div>

O projeto consistiu no desenvolvimento de um site no estilo de ladding page moderno e responsivo para a marca **Dell Anno**, com foco em representar detalhes que compõem a conversão para lojista.
  
---

## Índice

- [Sobre](#sobre)
- [Visualização](#visualizacao)
- [Tecnologias Principais](#tecnologias-utilizadas)
- [Arquitetura do Projeto](#arquitetura-do-projeto)
- [Como Executar o Projeto](#como-executar-o-projeto)

---

<h2 id="sobre">Sobre:</h2>

Através do site para o público:

- Visualizar a página **Home** com informaçõas acerca de:
    - **Sobre o mercado de móveis planejados**
    - **Diferencias e motivo de escolher a marca**
    - **Acessos e matériais fornecidos**
    - **Suporte para estruturar a loja**
    - **Lojistas e fachadas**
    - **Grupo à qual pertence**
    - **Formulário de contato**
    - **Perguntas frequentes**
---


<h2 id="visualizacao">Visualização de algumas seções:</h2>

<img width="400" alt="image" src="https://github.com/user-attachments/assets/f511a406-05a7-440a-b4b1-66f205ad930a" />
<img width="400" alt="image" src="https://github.com/user-attachments/assets/cb2b0971-277a-4896-b555-7eb548e7c428" />
<img width="400" alt="image" src="https://github.com/user-attachments/assets/75ec26d3-a27d-4f6e-90ba-291a39b64f5f" />
<img width="400" alt="image" src="https://github.com/user-attachments/assets/6e22e855-e445-4dff-85ad-32d059f751c1" />

---

<h2 id="tecnologias-utilizadas">Tecnologias Principais:</h2>

### Back-end:
- **Laravel**: framework PHP para construção do projeto, gerenciamento de rotas, autenticação e etc.
- **PHP**: linguagem de desenvolvimento
- **Laravel Sanctum**: autenticação e proteção de rotas
- **Inertia.js**: integração entre backend Laravel e frontend React sem necessidade de API tradicional
- **Ziggy**: compartilhamento de rotas Laravel diretamente no frontend React
- **Laravel Tinker**: ferramenta para testes e execução de comandos no ambiente
- **Laravel PT-BR Validator**: validações adaptadas para formato brasileiro

### Front-end:
- **React**: biblioteca para construção de interfaces
- **Inertia React**: integração entre Laravel e React sem necessidade de API REST tradicional
- **Vite**: ferramenta de build e desenvolvimento rápido
- **Laravel Vite Plugin**: integração entre Laravel e Vite
- **Tailwind CSS**: framework para estilização
- **Tailwind Forms**: plugin para estilização de formulários no Tailwind
- **PostCSS**: processador de CSS usado junto do Tailwind
- **GSAP**: biblioteca para animações

---

<h2 id="arquitetura-do-projeto">Arquitetura principal do Projeto:</h2>

```bash
Seja-Lojista-Dell-Anno
│
├── app
│   ├── Http
│   │   ├── Controllers    # Controladores responsáveis pelas requisições e retornar respostas 
│   │   ├── Middleware     # Interceptação, autenticação e tratamento de requisições
│   │   ├── Requests       # Validação e autorização de formulários e requisições
│   ├── Models             # Representação das tabelas do banco (Eloquent)
│   ├── Providers          # Configuração de pacotes
│   ├── Services           #Regras de negócio
├── bootstrap              # Inicialização do framework
├── config                 # Arquivos de configuração
├── database               # Migrations, seeds e factories
├── public                 # Diretório público acessível pelo navegador
│   ├── site               # Arquivos do site institucional
├── resources              # Frontend e recursos
│   ├── css                # Estilização 
│   ├── js                 # Componentes, páginas, hooks e layouts
│   ├── views              # Templates e views do Laravel/Inertia
├── routes                 # Definição das rotas web
├── storage                # Arquivos gerados (logs, cache e etc.)
├── tests
│

```

---

<h2 id="como-executar-o-projeto">Como Executar o Projeto:</h2>

1. Clone o repositório:

```bash
git clone https://github.com/Octal-web/Seja-Lojista-Dell-Anno.git
cd Seja-Lojista-Dell-Anno
```

2. Instale as dependências do Front-end:

```bash
npm install
```

3. Instale as dependências do Back-end:

```bash
composer install
```

4. Configure o ambiente

Crie o arquivo .env:

```bash
cp .env.example .env
```

Gere a chave da aplicação:
```bash
php artisan key:generate
```

Configure o banco de dados SQL e preencha com o acesso no .env

5. Rode o projeto:
```bash
npm run dev
php artisan serve
```


