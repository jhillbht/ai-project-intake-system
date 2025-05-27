# AI Project Intake System

AI Project Intake & Development Pipeline - Automated evaluation, approval workflow, and project management system built with Next.js, DigitalOcean, OpenAI, and Confluence integration.

## 🚀 Features

- **Smart Intake Form** - Dynamic form with use-case specific fields
- **AI Evaluation Pipeline** - Automated project scoring and classification  
- **Confluence Integration** - Auto-documentation via Atlassian MCP
- **Slack Notifications** - Daily updates and weekly CEO summaries
- **Approval Dashboard** - Founder review with Impact/Effort matrix
- **Jira Integration** - Auto-creation of tickets for approved projects
- **Memory Layer** - Mem0 integration for persistent AI memory

## 🏗️ Architecture

**Dual-Service Setup on DigitalOcean App Platform:**
- **Main Web App**: Next.js (Professional M: 2 vCPU, 4GB RAM)
- **Worker Service**: Node.js (Professional S: CPU-optimized for AI processing)

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, OpenAI API
- **Memory**: Mem0 with OpenAI integration
- **Integrations**: Confluence, Slack, Jira (via Atlassian MCP)
- **Deployment**: DigitalOcean App Platform
- **Monitoring**: Native DO monitoring + custom health checks

## 📋 Quick Start

### 1. Local Development
```bash
cd main-web-app
npm install
npm run dev
# Open http://localhost:3000
```

### 2. Deploy to DigitalOcean
```bash
# Install doctl CLI
brew install doctl
doctl auth init

# Deploy using our script
./deployment/deploy.sh
```

## ⚙️ Environment Variables

```env
NODE_ENV=production
OPENAI_API_KEY=your_openai_key
SLACK_BOT_TOKEN=your_slack_token
SLACK_TEAM_ID=your_team_id
ATLASSIAN_MCP_ENDPOINT=https://mcp.atlassian.com/v1/sse
```

## 📊 Project Status

✅ **Complete**: Intake form, API routes, deployment config
🔄 **In Progress**: AI evaluation pipeline, Confluence integration
📋 **Planned**: Worker service, approval dashboard, notifications

## 🎯 Deployment Ready

This system is ready for immediate deployment to DigitalOcean App Platform with:
- Complete Next.js application
- Health monitoring endpoints
- Environment configuration
- Auto-scaling for 120 concurrent users

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md)
- [Deployment Guide](DEPLOYMENT_GUIDE.md)
- [Technical Architecture](docs/)

---

**Built for Array's AI project evaluation and development pipeline** 🚀