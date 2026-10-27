<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Project rules
- Editable content (brand, nav, announcements, hero slides, services, industries, case studies, FAQs) lives in `src/data/*`; components never hardcode copy, so edits happen in one place.
- Shared layout (announcement bar, navbar, footer) is rendered once in `src/routes/__root.jsx`; pages only render their own body.
- Dark sections use the `.surface-dark` class, which flips semantic tokens, instead of hardcoded colors.
- Case studies without client approval must keep `isSample: true` and contain no client names or figures, to avoid unverified claims.
- Contact form posts to `VITE_CONTACT_ENDPOINT` and shows success only on an OK response; with no endpoint it tells the user nothing was sent.
