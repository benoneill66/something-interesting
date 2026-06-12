# Something Interesting → "Curious"

An Instagram Reels–style feed of short, interesting articles. Swipe through
full-screen cards; tap in to read the full piece. It's a fully static site —
no build step, no server, works offline — hosted on GitHub Pages.

**Live:** https://benoneill66.github.io/something-interesting/

## How it's stored

Each article is two things:

```
docs/<slug>.html      # the full, self-contained article page (inline CSS)
docs/manifest.json     # one metadata entry per article (drives the feed)
```

`index.html` (the feed) fetches `docs/manifest.json`, shuffles the articles,
and loops endlessly. Card colors are auto-generated from each title, so you
never pick them. You only edit `index.html` if you want to change the feed UI.

A manifest entry looks like:

```json
{ "title": "The Living Light", "category": "Nature",
  "teaser": "One-line hook shown on the swipe card.",
  "file": "docs/bioluminescence.html" }
```

## Adding an article

1. Write the page → `docs/<slug>.html` (single file, inline CSS, no dependencies).
2. Publish it in one command:

```sh
tools/publish.sh \
  --title "The Antikythera Mechanism" \
  --category "History" \
  --teaser "A 2,000-year-old hand-cranked computer pulled from a shipwreck." \
  --file "docs/antikythera-mechanism.html"
```

`publish.sh` registers it in the manifest (dedupes by `--file`), commits, and
pushes. GitHub Pages redeploys in ~1–2 min.

> Just want to update the manifest without pushing? Run
> `node tools/add-article.mjs` with the same flags.

## Intended workflow (cron / generator)

A scheduled job does, each run:

1. Pick a fresh topic and write `docs/<slug>.html`.
2. Call `tools/publish.sh --title … --category … --teaser … --file …`.

That's it — the feed fills itself.

## Local preview

The feed uses `fetch`, which browsers block over `file://`. To preview locally:

```sh
python3 -m http.server 8000   # then open http://localhost:8000
```

---

Generated with [Claude Code](https://claude.com/claude-code).
