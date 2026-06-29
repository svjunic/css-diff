#!/usr/bin/env node
/**
 * ビルド後に css-diff CLI をビルドし、スキルへ同期する。
 * package.json の postbuild から呼ばれる。
 *
 * 生成物:
 *   bin/css-diff.cjs                              — minified CJS CLI (bin/css-diff.src.js から生成)
 *   .claude/skills/css-verify/                   — ESM ソースファイル一式 (ビルド成果物なし)
 *   .claude/skills/css-verify-npm/hooks/posttooluse.js — minified hook スクリプト
 */
import { buildSync } from "esbuild";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = dirname(dirname(fileURLToPath(import.meta.url)));

const bundledCss = readFileSync(join(ROOT, "src/styles.css"), "utf8");
const pkg = JSON.parse(readFileSync(join(ROOT, "package.json"), "utf8"));
const COPYRIGHT = `// Copyright (c) 2026 sv.junic. MIT License. v${pkg.version}\n// Source: https://github.com/svjunic/css-diff`;
const defines = {
  __BUNDLED_CSS__: JSON.stringify(bundledCss),
  __PKG_VERSION__: JSON.stringify(pkg.version),
};

// ── 1. bin/css-diff.cjs (minified CJS — 処理高速化) ─────────────────────────
buildSync({
  entryPoints: [join(ROOT, "bin/css-diff.src.js")],
  bundle: true,
  platform: "node",
  format: "cjs",
  minify: true,
  outfile: join(ROOT, "bin/css-diff.cjs"),
  target: "node18",
  banner: { js: COPYRIGHT },
  define: defines,
  logLevel: "error",
});
console.log("✓ minified bin/css-diff.cjs");

// ── 2. css-verify スキル向け ESM ソースファイルをコピー ──────────────────────
const SKILL_DIR = join(ROOT, ".claude/skills/css-verify");
mkdirSync(join(SKILL_DIR, "bin"), { recursive: true });
mkdirSync(join(SKILL_DIR, "src/reporters"), { recursive: true });
mkdirSync(join(SKILL_DIR, "src/ui"), { recursive: true });

cpSync(join(ROOT, "bin/css-diff.src.js"), join(SKILL_DIR, "bin/css-diff.src.js"), { force: true });
cpSync(join(ROOT, "src/core"), join(SKILL_DIR, "src/core"), { recursive: true, force: true });
cpSync(join(ROOT, "src/reporters/html.js"), join(SKILL_DIR, "src/reporters/html.js"), { force: true });
cpSync(join(ROOT, "src/ui/render.js"), join(SKILL_DIR, "src/ui/render.js"), { force: true });
cpSync(join(ROOT, "src/styles.css"), join(SKILL_DIR, "src/styles.css"), { force: true });
writeFileSync(join(SKILL_DIR, "package.json"), JSON.stringify({ type: "module" }, null, 2) + "\n");
console.log("✓ copied ESM sources to .claude/skills/css-verify/");

// ── 3. css-verify-npm スキルの hook スクリプト (minified) ─────────────────────
const HOOK_OUT = join(ROOT, ".claude/skills/css-verify-npm/hooks/posttooluse.js");

buildSync({
  entryPoints: [join(ROOT, ".claude/skills/css-verify-npm/hooks/posttooluse.src.js")],
  bundle: false,
  platform: "node",
  format: "esm",
  minify: true,
  outfile: HOOK_OUT,
  target: "node18",
  banner: { js: COPYRIGHT },
  logLevel: "error",
});
console.log("✓ minified .claude/skills/css-verify-npm/hooks/posttooluse.js");
