# Save this in project root and run it to write server.cjs, install deps, and start server in a new window
Set-Location "C:\Users\ASUS\Desktop\RRnagar-work\frontend"

# Write server.cjs (overwrites if exists)
@'
const jsonServer = require('json-server');
const bodyParser = require('body-parser');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);

// increase JSON body size limit to 10mb (adjust if needed)
server.use(bodyParser.json({ limit: '10mb' }));
server.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// simple request logger to help debug
server.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

server.use(router);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server running on http://localhost:${PORT} (body limit 10mb)`);
});
'@ | Set-Content -LiteralPath .\server.cjs -Encoding UTF8 -Force

Write-Host "Wrote server.cjs"

# Install dependencies (json-server, body-parser)
Write-Host "Installing json-server and body-parser (may take a moment)..."
npm install json-server body-parser --no-audit --no-fund

Write-Host ""
Write-Host "Starting server.cjs in a new PowerShell window (keeps it open for logs)..."
Start-Process powershell -ArgumentList "-NoExit","-Command","cd `"$PWD`"; node .\server.cjs"

Write-Host "Server started in new window. Verify with:"
Write-Host "  Test-NetConnection -ComputerName 127.0.0.1 -Port 5000"
Write-Host "  Invoke-RestMethod -Uri 'http://127.0.0.1:5000/settings' -Method GET"