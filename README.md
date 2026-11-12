# Nazira Surprise Website

Static birthday-surprise website for Nazira Nadia Putri.

## Deploy to GitHub Pages

1. Create an empty GitHub repository.
2. Add that repository as this folder's `origin` remote.
3. Push the `main` branch.
4. In **Settings → Pages**, select **GitHub Actions** as the source if GitHub does not select it automatically.
5. Wait for the **Deploy to GitHub Pages** workflow to finish.

The website uses relative asset paths, so it works both as a user site and as a repository project site. Background music starts after the visitor presses **Tap for Surprise**, which satisfies browser autoplay restrictions.

## Push commands

```powershell
cd "C:\Users\fx506\Desktop\NADZIRA_GITHUB_READY"
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```
