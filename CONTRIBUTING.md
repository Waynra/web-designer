# Contributing

Thanks for your interest in contributing to this repository. This project is a collection of static website assets and theme pages. Contributions are welcome — especially fixes to theme files, improvements to documentation, and small tooling additions.

## How to contribute (simple branch / PR workflow)

1. Fork or clone the repository locally.
2. Create a new branch for your change. Use a descriptive name:

   - feature/<short-description>
   - fix/<short-description>
   - docs/<short-description>

   Example: `feature/add-readme-clarity`

3. Make your changes on the branch. Keep changes small and focused.

4. Commit with clear messages using the format:

   - `type(scope): short description`

   Examples:

   - `fix(multimedia): correct image path in multimedia.html`
   - `docs: add CONTRIBUTING.md`

5. Push the branch to your fork and open a Pull Request against the `main` branch of this repository.

6. In the PR description, explain the change, why it's needed, and any steps to test/preview it locally.

7. Address review comments and update the PR until it's ready to merge.

## Testing / Previewing your change

This is a static site workspace. To preview your changes locally, run a simple HTTP server from the repository root (PowerShell example):

```powershell
py -3 -m http.server 8000
# then open http://localhost:8000 in a browser
Start-Process "http://localhost:8000"
```

Or use the VS Code Live Server extension for hot reload while editing.

## Code style and expectations

- Keep HTML/CSS/JS changes minimal and compatible with static hosting.
- Respect existing indentation and formatting conventions in modified files.
- When adding third-party libraries, prefer adding a short note in the README and include the exact version.

## Issues

- Open an issue to discuss larger changes before starting work.
- Provide steps to reproduce, screenshots, or sample files when relevant.

## Licensing & legal

If you add third-party code, ensure it is compatible with the repository's license. If there is no LICENSE file yet, ask maintainers in an issue before including external code with restrictive terms.

## Maintainer notes

- Small, well-described PRs are easiest to review and merge.
- If a change touches many files or is a major refactor, open an issue first to discuss scope and approach.

---

If you'd like, I can also add a `CODE_OF_CONDUCT.md` or a small `CONTRIBUTING` checklist template for PRs — tell me which you prefer.
