# Mobile Frames Integration

- [x] Inspect landing page and robot scroller usage.
  Summary: Homepage renders `RobotScrollClient` in `app/(public)/page.tsx`, which loads `components/ui/RobotScroll.tsx`.
- [x] Add responsive frame source selection (`/frames-mobile` for mobile, `/frames` for desktop).
  Summary: `RobotScroll` now selects frame base by viewport width (`<768` => `/frames-mobile`, otherwise `/frames`) and reloads frames safely when the source changes.
- [x] Verify behavior and document image naming/placement contract.
  Summary: Ran `npx eslint components/ui/RobotScroll.tsx` successfully.

## Final Review
- Desktop behavior preserved.
- Mobile landing now uses files under `public/frames-mobile`.
- Naming contract remains `ezgif-frame-001.jpg` ... `ezgif-frame-128.jpg`.

## Follow-up Tuning
- [x] Move mobile "Built by Vulcans." overlay slightly upward.
- [x] Apply brand-aligned typography and colors from `skill.md` guidance.
  Summary: Mobile final overlay now sits higher and uses `#FF3B1F` / `#FF6A3D` accents with stronger heading/body font stacks.

## Typography and Copy Refresh
- [x] Add landing and tech font system (`Nunito` + `Rajdhani`) at the app layout level.
- [x] Refresh hero overlay lines for a college robotics-club tone and PESMCOE context.
- [x] Update homepage supporting copy to reflect club achievements and focus areas.
  Summary: Fonts are now loaded globally and robot overlay/homepage copy now aligns with Vulcans branding and existing stats.

## Theme Fixes (Home + Navbar)
- [x] Fix theme variable precedence so explicit light mode overrides system dark preference.
- [x] Fix navbar theme visuals for both desktop and mobile states.
- [x] Update homepage/footer hardcoded dark styles to theme-aware tokens.
  Summary: Light mode now switches consistently and navbar/footer follow theme colors instead of remaining dark-only.
