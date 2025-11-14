#!/bin/bash

# Frontend Quick Fix and Setup Script
# This script updates to Next.js 15 and installs all dependencies

set -e

echo "🎨 Fixing Frontend Setup..."
echo "============================"
echo ""

cd "$(dirname "$0")"

# Clean previous installations
echo "🧹 Cleaning previous installations..."
rm -rf node_modules package-lock.json .next

# Install dependencies
echo "📦 Installing dependencies (Next.js 15)..."
npm install

# Verify installation
echo ""
echo "✅ Frontend setup complete!"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Make sure backend is running on http://localhost:8000"
echo ""
echo "2. Start the development server:"
echo "   npm run dev"
echo ""
echo "3. Open your browser:"
echo "   http://localhost:3000"
echo ""
echo "🎉 Ready to code!"
