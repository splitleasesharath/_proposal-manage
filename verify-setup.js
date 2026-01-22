#!/usr/bin/env node

/**
 * Setup Verification Script
 * Run this after npm install to verify everything is set up correctly
 */

const fs = require('fs');
const path = require('path');

const checks = [];
let passed = 0;
let failed = 0;

function check(name, fn) {
  checks.push({ name, fn });
}

function log(message, type = 'info') {
  const colors = {
    info: '\x1b[36m',
    success: '\x1b[32m',
    error: '\x1b[31m',
    warn: '\x1b[33m',
    reset: '\x1b[0m'
  };
  console.log(`${colors[type]}${message}${colors.reset}`);
}

// Check 1: package.json exists
check('package.json exists', () => {
  return fs.existsSync('./package.json');
});

// Check 2: node_modules exists
check('Dependencies installed', () => {
  return fs.existsSync('./node_modules');
});

// Check 3: Required dependencies
check('React installed', () => {
  return fs.existsSync('./node_modules/react');
});

check('Vite installed', () => {
  return fs.existsSync('./node_modules/vite');
});

check('React Router installed', () => {
  return fs.existsSync('./node_modules/react-router-dom');
});

// Check 4: Source files exist
check('Main entry point exists', () => {
  return fs.existsSync('./src/main.jsx');
});

check('App component exists', () => {
  return fs.existsSync('./src/App.jsx');
});

check('ProposalManagePage exists', () => {
  return fs.existsSync('./src/pages/ProposalManagePage.jsx');
});

// Check 5: Components exist
check('FilterSection component exists', () => {
  return fs.existsSync('./src/components/FilterSection/FilterSection.jsx');
});

check('ProposalItem component exists', () => {
  return fs.existsSync('./src/components/ProposalItem/ProposalItem.jsx');
});

check('QuickProposalCreation component exists', () => {
  return fs.existsSync('./src/components/QuickProposalCreation/QuickProposalCreation.jsx');
});

// Check 6: Services exist
check('API service exists', () => {
  return fs.existsSync('./src/services/api.js');
});

check('Mock data service exists', () => {
  return fs.existsSync('./src/services/mockData.js');
});

// Check 7: Configuration files
check('Vite config exists', () => {
  return fs.existsSync('./vite.config.js');
});

check('index.html exists', () => {
  return fs.existsSync('./index.html');
});

// Check 8: Environment file
check('.env.example exists', () => {
  return fs.existsSync('./.env.example');
});

const hasEnv = fs.existsSync('./.env');
check('.env file present', () => {
  return hasEnv;
});

// Check 9: Documentation
check('README.md exists', () => {
  return fs.existsSync('./README.md');
});

check('QUICK_START.md exists', () => {
  return fs.existsSync('./QUICK_START.md');
});

check('DEPLOYMENT.md exists', () => {
  return fs.existsSync('./DEPLOYMENT.md');
});

check('API_DOCUMENTATION.md exists', () => {
  return fs.existsSync('./API_DOCUMENTATION.md');
});

// Run all checks
console.log('\n🔍 Verifying Proposal Management System Setup...\n');

checks.forEach(({ name, fn }) => {
  try {
    const result = fn();
    if (result) {
      log(`✓ ${name}`, 'success');
      passed++;
    } else {
      log(`✗ ${name}`, 'error');
      failed++;
    }
  } catch (error) {
    log(`✗ ${name} - ${error.message}`, 'error');
    failed++;
  }
});

console.log('\n' + '='.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(50) + '\n');

if (failed === 0) {
  log('✅ All checks passed! Your setup is complete.', 'success');
  console.log('\nNext steps:');
  console.log('  1. Copy .env.example to .env (if not done):');
  log('     cp .env.example .env', 'info');
  console.log('  2. Start the development server:');
  log('     npm run dev', 'info');
  console.log('  3. Open your browser to:');
  log('     http://localhost:3000', 'info');
  console.log('\n📖 See QUICK_START.md for detailed instructions.\n');
} else {
  log('❌ Some checks failed. Please review the errors above.', 'error');

  if (!hasEnv) {
    console.log('\n💡 Tip: Create .env file:');
    log('   cp .env.example .env', 'warn');
  }

  if (!fs.existsSync('./node_modules')) {
    console.log('\n💡 Tip: Install dependencies:');
    log('   npm install', 'warn');
  }

  console.log('\n');
}

process.exit(failed > 0 ? 1 : 0);
