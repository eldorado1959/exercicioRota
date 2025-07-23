import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();
const PORT: number = 3000;

app.use(express.json());

// 🔹 Middleware: Registrar hora exata da requisição
app.use((req: Request, res: Response, next: NextFunction): void => {
  const dataHora = new Date().toISOString();
  console.log(`Requisição feita em: ${dataHora}`);
  next();
});

// 🔹 Middleware bônus: Bloquear entre 00h e 06h
app.use((req: Request, res: Response, next: NextFunction): void => {
  const hora = new Date().getHours();
  if (hora >= 0 && hora < 6) {
    res.status(403).json({ mensagem: 'Requisições bloqueadas entre 00h e 06h.' });
  } else {
    next();
  }
});

// 🔹 GET /usuarios
app.get('/usuarios', (req: Request, res: Response): void => {
  res.status(200).json({ mensagem: 'Lista de usuários' });
});

// 🔹 POST /usuarios
app.post('/usuarios', (req: Request, res: Response): void => {
  const { nome } = req.body;
  if (!nome) {
    res.status(400).json({ mensagem: 'Nome é obrigatório!' });
  } else {
    res.status(201).json({ mensagem: `Usuário ${nome} criado com sucesso!` });
  }
});

// 🔹 PUT /usuarios/:id
app.put('/usuarios/:id', (req: Request, res: Response): void => {
  res.status(200).json({ mensagem: 'Usuário atualizado completamente!' });
});

// 🔹 PATCH /usuarios/:id
app.patch('/usuarios/:id', (req: Request, res: Response): void => {
  res.status(200).json({ mensagem: 'Usuário atualizado parcialmente!' });
});

// 🔹 DELETE /usuarios/:id
app.delete('/usuarios/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ mensagem: 'ID não enviado' });
  } else {
    res.status(204).send();
  }
});

// 🔹 GET /sobre
app.get('/sobre', (req: Request, res: Response): void => {
  res.status(200).json({
    nome: 'Rogério Machado',
    idade: 40,
    descricao: 'Desenvolvedor full stack.'
  });
});

// 🔹 POST /comentarios
app.post('/comentarios', (req: Request, res: Response): void => {
  const { texto } = req.body;
  if (!texto || texto.trim() === '') {
    res.status(400).json({ mensagem: 'Texto do comentário é obrigatório.' });
  } else {
    res.status(201).json({ mensagem: 'Comentário recebido com sucesso!' });
  }
});

// 🔹 DELETE /comentarios/:id
app.delete('/comentarios/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ mensagem: 'ID do comentário é obrigatório.' });
  } else {
    res.status(204).send();
  }
});

// 🔹 Rota 404
app.use((req: Request, res: Response): void => {
  res.status(404).json({ mensagem: 'Rota não encontrada!' });
});

// 🔹 Iniciar servidor
app.listen(PORT, (): void => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
