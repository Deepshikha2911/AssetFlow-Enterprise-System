# AssetFlow – Enterprise Asset & Resource Management System

This repository now uses one clear main structure for the hackathon team.

## Team Ownership

- Member 1: Authentication + Dashboard + Organization Setup
- Member 2: Asset Management
- Member 3: Asset Allocation + Transfer + Resource Booking
- Member 4: Maintenance + Audit + Reports + Notifications

## File Ownership Guide

### Member 1
Can edit:
- frontend/src/features/auth-dashboard-org/**
- backend/src/features/auth-dashboard-org/**
- frontend/src/context/**
- frontend/src/routes/**

### Member 2
Can edit:
- frontend/src/features/asset-management/**
- backend/src/features/asset-management/**

### Member 3
Can edit:
- frontend/src/features/allocation-booking/**
- backend/src/features/allocation-booking/**

### Member 4
Can edit:
- frontend/src/features/maintenance-audit-reports/**
- backend/src/features/maintenance-audit-reports/**

### Team Lead / Final Integration
Can edit:
- frontend/src/App.jsx
- backend/src/server.js
- frontend/src/shared/**
- backend/src/shared/**
- database/**

## Main Structure

- frontend/
  - public/
  - src/
    - App.jsx
    - main.jsx
    - routes/
    - context/
    - features/
      - auth-dashboard-org/
      - asset-management/
      - allocation-booking/
      - maintenance-audit-reports/
    - shared/
      - components/
      - utils/
      - api/
    - styles/
    - assets/
- backend/
  - src/
    - server.js
    - config/
    - features/
      - auth-dashboard-org/
      - asset-management/
      - allocation-booking/
      - maintenance-audit-reports/
    - shared/
      - middleware/
      - utils/
    - uploads/
- database/
  - schema.sql
  - seed.sql
  - assetflow.sql
  - ER_Diagram.png

## Integration Rule

Only the Team Lead should edit the final integration files:
- frontend/src/App.jsx
- backend/src/server.js

## Notes

- Each member works only inside their own feature folder.
- Shared folders are limited to reusable UI, utilities, and API config.
- Final integration should happen once at the end.
