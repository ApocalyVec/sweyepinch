# SwEYEpinch — GitHub Pages site

This folder is a ready-to-deploy static project page for **SwEYEpinch (CHI 2026)**.

## Quick deploy (recommended)

1. Create a new GitHub repo (e.g., `SwEYEpinch`).
2. Copy the contents of this folder into the repo root.
3. Commit & push.
4. In GitHub: **Settings → Pages**
   - Source: `Deploy from a branch`
   - Branch: `main` (or `master`)
   - Folder: `/ (root)`
5. Wait a minute, then your site will be live at:

`https://<your-username>.github.io/<repo-name>/`

## Using a user/organization site

If you want `https://<your-username>.github.io/` (no repo path), the repository must be named:

`<your-username>.github.io`

and the files must live in the repo root.

## Editing links

Open `index.html` and replace the placeholder `Code/Dataset/Video` links with your real URLs.

## Local preview

You can preview locally with any static server:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

- The PDF is included at `assets/SwEYEpinch_2026_CHI.pdf`.
- The preview image is `assets/paper_first_page.png`.
# sweyepinch
