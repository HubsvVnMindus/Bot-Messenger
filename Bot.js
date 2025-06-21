const { execSync } = require('child_process');

const CONFIG = {
  ip: "play.nethergames.org",
  port: 19132,
  username: "HungBot"
};

const requiredPackages = ['bedrock-protocol'];

function checkAndInstall(pkg) {
  try {
    require.resolve(pkg);
    console.log(`✅ Đã có: ${pkg}`);
  } catch {
    console.log(`📦 Đang cài: ${pkg}`);
    execSync(`npm install ${pkg}`, { stdio: 'inherit' });
  }
}

for (const pkg of requiredPackages) {
  checkAndInstall(pkg);
}

const { createClient } = require('bedrock-protocol');

console.log(`🔌 Kết nối đến ${CONFIG.ip}:${CONFIG.port} dưới tên ${CONFIG.username}...`);

const client = createClient({
  host: CONFIG.ip,
  port: CONFIG.port,
  username: CONFIG.username,
  offline: true
});

client.on('join', () => {
  console.log(`✅ Bot '${CONFIG.username}' đã vào server.`);
});

client.on('disconnect', reason => {
  console.log(`❌ Bị ngắt kết nối: ${reason}`);
});

client.on('error', err => {
  console.error("❌ Lỗi:", err.message);
});
