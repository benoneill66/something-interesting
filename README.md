# Something Interesting

A small collection of self-contained HTML documents, each one a short, visually
designed write-up about a genuinely interesting topic — science, history, nature,
space, math, and more. Every doc is a single HTML file with inline CSS and **no
external dependencies**, so it opens anywhere and works offline forever.

## Structure

```
something-interesting/
├── index.html        # landing page / gallery linking to every doc
└── docs/
    ├── bioluminescence.html   # how deep-sea life makes its own light
    └── benfords-law.html      # why the digit 1 leads ~30% of numbers
```

## View it

Open `index.html` in any browser:

```sh
open index.html
```

Or serve the folder locally:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Adding a new doc

1. Create a new single-file `docs/<topic>.html` (inline CSS, no dependencies).
2. Add a matching `<a class="card">` entry to `index.html`.

## Ideas for turning this into an app

- **Auto-index:** generate `index.html` from the files in `docs/` so new docs show up automatically.
- **Hosting:** push to GitHub and enable GitHub Pages (it's all static — zero build).
- **Generator:** a script (or scheduled job) that creates a new doc on a fresh topic and commits it.
- **Tags & search:** add categories and a client-side filter on the landing page.

---

Generated with [Claude Code](https://claude.com/claude-code).
