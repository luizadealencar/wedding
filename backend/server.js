// backend/server.js
import express from 'express';
import path from 'path';
import { amazonScraper } from './scrapers/amazon_scraper.js';
import { fileURLToPath } from 'url';
import { AMAZON_URL } from './urls.js';

const app = express();
const PORT = 3000;

// Serve arquivos estáticos
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public')));

// Endpoint para obter dados dos produtos
app.get('/api/products', async (req, res) => {
    try {
        const products = await amazonScraper(AMAZON_URL);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar produtos' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
