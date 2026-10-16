## CONTRIBUTING

We welcome contributions from the community! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your commit message here"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request and describe your changes.

---

### Before You Open a Pull Request

See the [README](README.md#getting-started) to set up the project. Then, from `website/`:

- Run `npm test`, which lints and builds the site and checks that `sitemap.xml` lists every page. CI runs the same checks, plus a dependency audit, on every pull request, and a merge into `main` deploys the site.
- Resize new images with `npm run resize-images` (see [Adding Images](README.md#adding-images)), and keep full-size originals out of `website/public`: everything in it is published.
- Never commit secrets, API keys or credentials. To report a security issue, follow [SECURITY.md](SECURITY.md) instead of opening an issue.
