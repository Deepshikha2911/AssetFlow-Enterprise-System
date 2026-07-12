# How to Use AssetFlow Project

This guide is written for absolute beginners. If you have zero technical knowledge, follow these steps carefully.

---

# 1. What is this project?

AssetFlow is a simple system for managing company assets.

It helps you:
- add new assets
- see all assets in a list
- edit asset details
- delete assets
- track asset status

This project is divided into parts so each team member can work on a different section.

---

# 2. Before You Start

You need these things:
- a computer
- internet connection
- VS Code opened
- the project folder opened in VS Code

If you do not know what VS Code is, ask your team leader to open the project folder for you.

---

# 3. How to Open the Project

Follow these steps:
1. Open VS Code.
2. Click File.
3. Click Open Folder.
4. Choose the AssetFlow project folder.
5. Wait for the project to load.

Once the folder opens, you will see the project files on the left side.

---

# 4. How to Use the Project for Everyone

## General Rule
Each member should only work inside their assigned part.
Do not change files that belong to another member unless your team leader says so.

---

# 5. How Member 1 Should Use It

## Role
Member 1 works on:
- login and authentication
- dashboard
- organization setup

## What to Do
1. Open the folder named frontend.
2. Open the folder named src.
3. Open the folder named features.
4. Open the folder named auth-dashboard-org.
5. Add or update files related to login, dashboard, and organization setup here.

## Important Reminder
- Do not change the Asset Management folder.
- Do not change the Booking folder.
- Do not change the Maintenance folder.

---

# 6. How Member 2 Should Use It

## Role
Member 2 works on:
- asset registration
- asset list
- asset editing
- asset deletion

## What to Do
1. Open the frontend folder.
2. Open src.
3. Open features.
4. Open asset-management.
5. Work only inside this folder.

---

# 7. How Member 3 Should Use It

## Role
Member 3 works on:
- allocation of assets
- transfer of assets
- resource booking

## What to Do
1. Open the frontend folder.
2. Open src.
3. Open features.
4. Open allocation-booking.
5. Add or update files related to allocation and booking here.

---

# 8. How Member 4 Should Use It

## Role
Member 4 works on:
- maintenance management
- audit
- reports
- notifications

## What to Do
1. Open the frontend folder.
2. Open src.
3. Open features.
4. Open maintenance-audit-reports.
5. Add or update files for maintenance, audit, reports, and notifications here.

---

# 9. How the Backend Team Should Use It

The backend is the part that stores and manages data.

## Backend Folder Structure
Open the backend folder.
Then open src.
Then open features.
Then open the matching feature folder.

Example:
- asset-management for assets
- auth-dashboard-org for authentication
- allocation-booking for booking logic
- maintenance-audit-reports for maintenance and reports

---

# 10. How to Run the Project

## 10.1 Open the terminal
1. Open VS Code.
2. Click Terminal.
3. Click New Terminal.

## 10.2 Run the frontend
1. Open the terminal in the project root folder.
2. Install dependencies if needed:

```bash
npm install
```

3. Start the frontend from the project root:

```bash
npm run dev
```

4. Open the local address shown in the terminal, usually:

```bash
http://localhost:5173
```

If port 5173 is busy, Vite will choose another port and show it in the terminal.

## 10.3 Run the backend
1. Open a second terminal.
2. Go to the backend folder:

```bash
cd backend
```

3. Install dependencies if needed:

```bash
npm install
```

4. Start the backend:

```bash
node src/server.js
```

5. If the backend uses nodemon, run:

```bash
npx nodemon src/server.js
```

## 10.4 If you see an error
If you see an error like "command not found", run:

```bash
npm install
```

## 10.5 Stop the app
Press:

```bash
Ctrl + C
```

---

# 11. How to Use the Asset Management Module

1. Open the frontend project.
2. Go to the Asset Management page.
3. Fill in the asset name.
4. Enter the category.
5. Enter the serial number.
6. Choose the acquisition date.
7. Enter the acquisition cost.
8. Choose the condition.
9. Enter the location.
10. Choose whether the asset is bookable.
11. Click save.

The system will generate an asset tag automatically.

---

# 12. How to View, Edit, and Delete Assets

## View all assets
1. Open the asset list page.
2. You will see all assets in a table.

## Edit an asset
1. Click the Edit button.
2. Change the needed information.
3. Click Save.

## Delete an asset
1. Click Delete.
2. Confirm if asked.

---

# 13. Safe Team Rules

- Work only in your own folder.
- Do not edit other members' files.
- Save your work often.
- Ask the team leader if you are unsure.
- Do not delete important files without checking.
