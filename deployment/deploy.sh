#!/bin/bash

# AI Project Intake System - Deployment Script
# Deploys to DigitalOcean App Platform

set -e

echo "🚀 AI Project Intake System - Deployment Script"
echo "============================================="

# Check if doctl is installed
if ! command -v doctl &> /dev/null; then
    echo "❌ doctl CLI not found. Please install it first:"
    echo "   brew install doctl"
    echo "   Then run: doctl auth init"
    exit 1
fi

# Check if authenticated
if ! doctl auth whoami &> /dev/null; then
    echo "❌ Not authenticated with DigitalOcean"
    echo "   Please run: doctl auth init"
    exit 1
fi

echo "✓ DigitalOcean CLI authenticated"

# Get app ID if exists
APP_ID=$(doctl apps list --format ID,Spec.Name --no-header | grep "ai-project-intake-system" | awk '{print $1}' || true)

if [ -z "$APP_ID" ]; then
    echo "📱 Creating new app..."
    APP_ID=$(doctl apps create --spec deployment/app.yaml --format ID --no-header)
    echo "✓ App created with ID: $APP_ID"
else
    echo "📱 Updating existing app (ID: $APP_ID)..."
    doctl apps update $APP_ID --spec deployment/app.yaml
    echo "✓ App updated"
fi

# Trigger deployment
echo "🔄 Triggering deployment..."
DEPLOYMENT_ID=$(doctl apps create-deployment $APP_ID --format ID --no-header)
echo "✓ Deployment started (ID: $DEPLOYMENT_ID)"

# Monitor deployment
echo "📊 Monitoring deployment progress..."
echo "   (This may take 5-10 minutes)"

while true; do
    PHASE=$(doctl apps get-deployment $APP_ID $DEPLOYMENT_ID --format Phase --no-header)
    
    case $PHASE in
        "PENDING_BUILD"|"BUILDING"|"PENDING_DEPLOY"|"DEPLOYING")
            echo -n "."
            sleep 10
            ;;
        "ACTIVE")
            echo ""
            echo "✅ Deployment successful!"
            break
            ;;
        "ERROR"|"CANCELED")
            echo ""
            echo "❌ Deployment failed with status: $PHASE"
            echo "Check logs with: doctl apps logs $APP_ID"
            exit 1
            ;;
        *)
            echo ""
            echo "⚠️  Unknown deployment phase: $PHASE"
            sleep 10
            ;;
    esac
done

# Get app URL
APP_URL=$(doctl apps get $APP_ID --format DefaultIngress.Hostname --no-header)
echo ""
echo "🎉 Deployment Complete!"
echo "============================================="
echo "📱 App URL: https://$APP_URL"
echo "📊 View logs: doctl apps logs $APP_ID"
echo "🔧 View app: doctl apps get $APP_ID"
echo ""
echo "Next steps:"
echo "1. Set environment variables in DigitalOcean dashboard"
echo "2. Configure custom domain (optional)"
echo "3. Set up monitoring alerts"