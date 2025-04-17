# 🌤️ Climabot

O **Climabot** é um chatbot para consulta de informações climáticas com backend em Node.js e frontend em React, monitorado com Prometheus e Grafana. 

## 🚀 Tecnologias Utilizadas

- **Node.js** + **Express** — Backend da aplicação
- **React.js** — Frontend interativo
- **Docker** + **Docker Compose** — Empacotamento e orquestração dos serviços
- **Prometheus** — Coleta e armazenamento de métricas
- **Grafana** — Visualização das métricas da aplicação
- **Morgan** — Middleware para logging de requisições HTTP


## 🛠️ Como Rodar o Projeto

Certifique-se de ter o [Docker](https://www.docker.com/) e o [Docker Compose](https://docs.docker.com/compose/) instalados.

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/climabot.git
cd climabot
```

2. Suba todos os serviços com Docker Compose:

```bash
docker-compose up --build
```

3. Acesse os serviços:

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **API**: [http://localhost:3001](http://localhost:3001)
- **Prometheus**: [http://localhost:9090](http://localhost:9090)
- **Grafana**: [http://localhost:3002](http://localhost:3002)

> **Login padrão do Grafana:**  
> Usuário: `admin`  
> Senha: `admin`

4. Acesse o dashboard importando a fonte de dados Prometheus e adicionando os painéis disponíveis para as métricas da API.

## 📈 Observabilidade com Morgan

A aplicação usa o **Morgan** para logar todas as requisições HTTP no formato (com método, status, tempo de resposta, IP, etc). Isso ajuda na auditoria e na análise de tráfego em tempo real via terminal.

### 📊 Importando o Dashboard no Grafana

Para visualizar as métricas da API no Grafana, foi criado um dashboard customizado chamado **API Monitoring**. Ele exibe:

- 📈 Distribuição de Latência (`http_request_duration_seconds`)
- 📊 Taxa de Requisições HTTP (`http_requests_total`)
- ⏱️ Tempo Médio de Resposta

#### Passos para importar:

1. Acesse o Grafana pelo navegador: [http://localhost:3002](http://localhost:3002)
2. Faça login com as credenciais:
   - **Usuário:** `admin`
   - **Senha:** `admin`
3. No menu lateral, clique em **Dashboards** → **Import**.
4. Clique em **Upload JSON file** e selecione o arquivo `api-monitoring.json`.
5. Escolha a fonte de dados (`Prometheus`) quando solicitado.
6. Clique em **Import**.

> O arquivo `api-monitoring.json` está incluído neste repositório e pode ser reutilizado para importar rapidamente os gráficos personalizados de monitoramento da aplicação Climabot.