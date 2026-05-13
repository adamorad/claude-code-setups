# Claude Code Setups — Ideas & Improvements Backlog

100 features and improvements to pick from. Roughly grouped by category.

---

## UX / Interaction

1. Search bar — filter by keyword across name, description, features
2. Keyboard navigation — arrow keys move between tiles, Enter opens modal
3. Tile hover reveals first 3 features as a preview tooltip
4. Swipe left/right inside modal to navigate between setups
5. Bottom-sheet modal on mobile instead of centered overlay
6. Comparison mode — select 2 setups and see side-by-side diff
7. "Shuffle" button — randomly highlight a setup
8. Tile grid density toggle — compact / comfortable / spacious
9. Drag to reorder tiles (saved to localStorage)
10. Pinned/favorite setups float to top

## Visual / Design

11. Animated install counter on each tile (e.g. "12 tools")
12. "New" badge on setups updated in last 30 days
13. "Popular" badge driven by copy-count tracking
14. Tile flip on hover — front: summary, back: feature list
15. Smooth page-load skeleton screen before tiles appear
16. Particle/noise background texture on dark mode
17. Gradient border on tiles instead of solid accent border
18. Avatar/illustration per persona instead of ◆ symbol
19. Custom favicon per setup (colored dot)
20. Confetti animation on first install command copy

## Content / Setups

21. Estimated install time badge per setup (e.g. "~4 min")
22. Difficulty level: מתחיל / בינוני / מתקדם
23. "What you'll build in week 1" section inside modal
24. Screenshot or GIF of each setup running in terminal
25. YouTube embed — short demo video per setup
26. Changelog tab inside modal — what changed in last update
27. Prerequisites checklist before install (Xcode, API key, etc.)
28. "Works with" section — compatible tools and plugins
29. Community testimonials — "what I built with this setup"
30. "Similar setups" recommendation at bottom of each modal

## New Features

31. Quiz — 5 questions → recommends the best setup for you
32. "Build your own" configurator — pick tools, generate custom install.sh
33. Bookmarks — save favorite setups to localStorage, persist across visits
34. Recently viewed setups strip at top of page
35. Download setup summary as PDF one-pager
36. Share button per setup — copies deep link with preview text
37. Compatibility checker — "can I install multiple setups together?"
38. Install history — track which setups the user has copied
39. "What's changed" diff view between two setup versions
40. One-click install via Claude Code slash command (future)

## Technical / Performance

41. PWA manifest + offline support via service worker
42. Open Graph + Twitter card meta tags for link previews
43. Structured data (JSON-LD) for SEO — SoftwareApplication schema
44. sitemap.xml + robots.txt
45. Critical CSS inlined in `<head>` for faster FCP
46. Image lazy loading for any future screenshots/avatars
47. Prefetch modal content on tile hover
48. Code splitting if JS grows large
49. Bundle size tracking in CI
50. Lighthouse CI check on every PR

## Mobile

51. Add to Home Screen prompt (PWA)
52. Haptic feedback on copy (navigator.vibrate)
53. Sticky filter bar on mobile scroll
54. Larger tap targets — minimum 48px touch zones
55. Pull-to-refresh gesture
56. Share sheet integration on mobile (Web Share API)
57. Mobile-specific "tap to copy" tooltip
58. Swipe down to close modal on mobile
59. Horizontal scroll for filter bar on small screens
60. Full-bleed tiles on mobile (no side padding)

## Accessibility

61. Skip-to-content link for keyboard users
62. Focus trap inside modal
63. `@prefers-reduced-motion` — disable animations
64. High contrast mode toggle
65. Font size controls (+/- buttons, saved to localStorage)
66. Screen reader optimized feature list (proper `<ul>` semantics)
67. ARIA live region for filter results count
68. Color-blind friendly accent palette option
69. Tab order audit and fix
70. `aria-expanded` on tiles indicating modal state

## Localization / Platform

71. Full English version of the site with language toggle (EN/HE)
72. Linux (Ubuntu/Debian) version of each install.sh
73. Intel Mac fallback notes in each setup
74. Windows WSL2 instructions
75. Docker version of each setup (containerized)
76. GitHub Codespaces / Gitpod one-click variants
77. Fish shell support in install scripts (not just zsh/bash)
78. `--dry-run` flag for each install.sh to preview what it does
79. Silent mode flag: `--quiet` for CI/unattended install
80. Checksum verification for downloaded scripts

## Community / Social

81. GitHub Discussions link per setup — ask questions, share builds
82. "What I built" gallery — user-submitted screenshots
83. Submit your own setup — GitHub PR template
84. Weekly featured build from the community
85. Vote for next persona to add
86. Discord / Telegram community invite link
87. Live install counter (server-side, shown on each tile)
88. "Hall of fame" page — notable projects per setup
89. Twitter/X share card with setup name and install command
90. Leaderboard — most installs this week

## Business / Growth

91. Newsletter signup — get notified when new setups drop
92. Sponsor slot — "this setup sponsored by X"
93. Consulting / custom setup inquiry form
94. Patreon / Ko-fi tip link
95. Affiliate links for recommended tools (Supabase, Vercel, etc.)
96. API endpoint — `GET /api/setups` returns JSON for integrations
97. Embeddable widget — `<iframe>` or web component for other sites
98. GitHub Action — auto-PR when upstream tools release new versions
99. Analytics dashboard — public stats page (installs, popular setups)
100.  "Request a setup" form — collect demand before building new personas

---

_Last updated: 2026-05-13_
