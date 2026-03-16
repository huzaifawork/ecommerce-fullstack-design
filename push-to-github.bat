@echo off
cd /d c:\Users\GCA\Desktop\e-commerce-fullstack-design

echo Initializing git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: Week 1 complete - Static frontend for desktop and mobile views"

echo Renaming branch to main...
git branch -M main

echo Adding remote origin...
git remote add origin https://github.com/huzaifawork/ecommerce-fullstack-design.git

echo Pushing to GitHub...
git push -u origin main

echo Done! Check your GitHub repository.
pause
