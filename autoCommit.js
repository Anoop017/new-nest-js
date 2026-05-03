const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// File to update
const filePath = path.join(__dirname, "README.md");

// Generate content
const time = new Date().toLocaleString();
const random = Math.floor(Math.random() * 100000);

const newLine = `\nUpdate: ${time} | Random: ${random}`;

// Append to README
fs.appendFileSync(filePath, newLine);

// Git commands
try {
  execSync("git add .", { stdio: "inherit" });

  // Check if there is anything to commit
  const status = execSync("git status --porcelain").toString();

  if (!status) {
    console.log("No changes to commit");
    process.exit(0);
  }

  execSync(`git commit -m "Auto update: ${time}"`, { stdio: "inherit" });
  execSync("git push", { stdio: "inherit" });

  console.log("✅ Auto commit pushed successfully");
} catch (err) {
  console.error("❌ Error:", err.message);
}