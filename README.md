# Case Gandaya
A case for gandaya interview

## Como executar
Seguindo os moldes do live-coding

```
  cd client && npm install && npm run dev

  cd docker && docker compose up

  cd server && npm install && npx prisma generate && npm run dev
```

Após a execução de todos os comandos, teremos o front rodando em http://localhost:5173 e o backend rodando em http://localhost:3000

Como não consegui fazer o dump do banco a tempo, é necessário subir alguns produtos e pelo menos 1 usuário pra a aplicação funcionar, todas as requisições são feitas pra esse primeiro usuário criado. Como os schemas são bem simples não deve haver muitos problemas.