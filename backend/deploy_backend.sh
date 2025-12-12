#!/bin/bash
set -e

PROJECT_ID="letter-bookpt"
REGION="us-central1"

echo "Using Project: $PROJECT_ID"
echo "Region: $REGION"

# Ensure gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "gcloud could not be found. Please install Google Cloud SDK."
    exit 1
fi

# Function to deploy a service
deploy_service() {
    SERVICE_NAME=$1
    CLOUD_RUN_NAME=$2
    
    echo "------------------------------------------------"
    echo "Deploying $SERVICE_NAME as $CLOUD_RUN_NAME..."
    echo "------------------------------------------------"

    # Build using Cloud Build
    gcloud builds submit . \
        --tag gcr.io/$PROJECT_ID/$CLOUD_RUN_NAME \
        --project $PROJECT_ID \
        --build-arg SERVICE_NAME=$SERVICE_NAME

    # Deploy to Cloud Run
    gcloud run deploy $CLOUD_RUN_NAME \
        --image gcr.io/$PROJECT_ID/$CLOUD_RUN_NAME \
        --platform managed \
        --region $REGION \
        --project $PROJECT_ID \
        --allow-unauthenticated
        
    # Capture URL
    URL=$(gcloud run services describe $CLOUD_RUN_NAME --platform managed --region $REGION --project $PROJECT_ID --format 'value(status.url)')
    echo "Deployed $CLOUD_RUN_NAME at $URL"
    
    # Export variable dynamically
    # Clean service name for variable usage (remove special chars if any, though here simple)
    # We use the raw SERVICE_NAME for the variable name prefix
    export "${SERVICE_NAME}_URL"="$URL"
}

# Navigate to script directory (should be backend root)
cd "$(dirname "$0")"

# Deploy Leaf Services
deploy_service "User" "letterbook-user"
deploy_service "catalogo" "letterbook-catalogo"
deploy_service "Interaction" "letterbook-interaction"
deploy_service "Community" "letterbook-community"

# Deploy Gateway
echo "------------------------------------------------"
echo "Deploying Gateway..."
echo "------------------------------------------------"

# Build Gateway
gcloud builds submit . \
    --tag gcr.io/$PROJECT_ID/letterbook-gateway \
    --project $PROJECT_ID \
    --build-arg SERVICE_NAME=Gateway

# Deploy Gateway with environment variables
gcloud run deploy letterbook-gateway \
    --image gcr.io/$PROJECT_ID/letterbook-gateway \
    --platform managed \
    --region $REGION \
    --project $PROJECT_ID \
    --allow-unauthenticated \
    --set-env-vars USER_SERVICE_URL=$User_URL \
    --set-env-vars CATALOGO_SERVICE_URL=$catalogo_URL \
    --set-env-vars INTERACTION_SERVICE_URL=$Interaction_URL \
    --set-env-vars COMMUNITY_SERVICE_URL=$Community_URL

GATEWAY_URL=$(gcloud run services describe letterbook-gateway --platform managed --region $REGION --project $PROJECT_ID --format 'value(status.url)')

echo "------------------------------------------------"
echo "Backend Deployment Complete!"
echo "Gateway URL: $GATEWAY_URL"
echo "------------------------------------------------"
echo "Please update your Frontend configuration to use this Gateway URL."
