import { useState, useCallback, useEffect } from "react";

// ─── SKILL MAP ───────────────────────────────────────────────────────────────
const SKILL_MAP = {
  variables:     { label: "Variables & Tokens",      color: "#6366f1", tier: 2 },
  autolayout:    { label: "Auto Layout",             color: "#8b5cf6", tier: 2 },
  components:    { label: "Components & Variants",   color: "#a78bfa", tier: 2 },
  slots:         { label: "Slots",                   color: "#7c3aed", tier: 2 },
  devmode:       { label: "Dev Mode & Handoff",      color: "#0ea5e9", tier: 2 },
  accessibility: { label: "Accessibility",           color: "#06b6d4", tier: 2 },
  figmaai:       { label: "Figma AI",                color: "#f59e0b", tier: 2 },
  claude:        { label: "Claude Workflows",        color: "#f97316", tier: 2 },
  prototyping:   { label: "Advanced Prototyping",    color: "#ec4899", tier: 3 },
  motion:        { label: "Figma Motion",            color: "#10b981", tier: 3 },
  vibecoding:    { label: "Vibe Coding",             color: "#ef4444", tier: 3 },
  codelayers:    { label: "Code Layers",             color: "#64748b", tier: 3 },
};

// ─── SKILL-BASED PLAN ────────────────────────────────────────────────────────
// Structure: skills → lessons → tasks
// Each lesson is self-contained and can be completed in any order.
// estimatedTime is per lesson, not per skill.

const PLAN = { skills: [

  // ── 1. VARIABLES & TOKENS ──────────────────────────────────────────────────
  {
    id: "s1",
    skillId: "variables",
    title: "Variables & Tokens",
    why: "You have the basics. This closes the gaps that trip people up in interviews and in real codebases: how tokens appear to engineers, how to use variables in prototypes, and how to keep a token system maintainable.",
    color: "#6366f1",
    tier: 2,
    lessons: [
      {
        id: "s1l1",
        title: "Variables in Dev Mode: what engineers actually see",
        why: "You can build a perfect token system in Figma and still hand off raw hex values to engineers. This lesson closes that gap.",
        estimatedTime: "1 hr",
        resources: [
          { label: "Figma Docs: Variables in Dev Mode", url: "https://help.figma.com/hc/en-us/articles/27882809912471-Variables-in-Dev-Mode", type: "docs", time: "15 min" },
          { label: "Mastering Figma Variables: The Complete 2026 Playbook", url: "https://david-supik.medium.com/mastering-figma-variables-the-complete-2026-playbook-f4651ec85473", type: "article", time: "20 min" },
          { label: "Design System Mastery with Figma Variables 2025/2026", url: "https://www.designsystemscollective.com/design-system-mastery-with-figma-variables-the-2025-2026-best-practice-playbook-da0500ca0e66", type: "article", time: "20 min" },
        ],
        tasks: [
          { id: "s1l1t1", label: "Read all 3 resources", phase: "learn" },
          { id: "s1l1t2", label: "Open your existing token file in Dev Mode", phase: "practice" },
          { id: "s1l1t3", label: "Inspect a frame — confirm token names show up in the CSS snippet (not raw hex values)", phase: "practice" },
          { id: "s1l1t4", label: "Check font-weight token — does it appear as var(--token-name) or as a number?", phase: "practice" },
          { id: "s1l1t5", label: "Fix any layers where raw values appear instead of tokens — reattach variables", phase: "deliver" },
        ],
        deliverable: "A Figma frame where every color, spacing, and radius value in the Dev Mode inspect panel shows a token name, not a raw value.",
      },
      {
        id: "s1l2",
        title: "Variables in prototypes: conditionals, expressions, string variables",
        why: "Most designers stop at color tokens. Variables in prototypes let you build logic-driven flows that feel like real products — and are impressive in interviews.",
        estimatedTime: "2 hrs",
        resources: [
          { label: "Figma Docs: Use variables in prototypes", url: "https://help.figma.com/hc/en-us/articles/14506587589399-Use-variables-in-prototypes", type: "docs", time: "20 min" },
          { label: "Figma Docs: Advanced prototyping examples", url: "https://help.figma.com/hc/en-us/articles/17146044893591-Advanced-prototyping-examples", type: "docs", time: "20 min" },
          { label: "Figma: Create an onboarding flow with advanced prototyping", url: "https://help.figma.com/hc/en-us/articles/18888057155991-Create-an-onboarding-flow-with-advanced-prototyping", type: "docs", time: "30 min" },
          { label: "Prototyping Like a Pro: Advanced Figma Techniques (Medium, 2026)", url: "https://medium.com/@atnoforuiuxdesigning/prototyping-like-a-pro-advanced-figma-prototyping-techniques-most-designers-dont-know-aca9a0a1dfa8", type: "article", time: "15 min" },
        ],
        tasks: [
          { id: "s1l2t1", label: "Read all 4 resources", phase: "learn" },
          { id: "s1l2t2", label: "Create a boolean variable: isExpanded. Wire it to show/hide a panel on click — no screen links", phase: "practice" },
          { id: "s1l2t3", label: "Create a number variable: cartCount. Wire two buttons to increment and decrement. Display value in a text layer", phase: "practice" },
          { id: "s1l2t4", label: "Add a conditional: if cartCount > 0, show the checkout button. If 0, hide it", phase: "practice" },
          { id: "s1l2t5", label: "Build a 3-step onboarding flow using variables to track step number — no duplicate frames", phase: "deliver" },
        ],
        deliverable: "A prototype with at least one conditional interaction driven by a variable — no screen-to-screen links used for logic.",
      },
      {
        id: "s1l3",
        title: "Tokens Studio and the code pipeline (awareness level)",
        why: "You don't need to set this up, but you need to know it exists and be able to talk about it. Token sync from Figma to code is asked about in senior interviews.",
        estimatedTime: "45 min",
        resources: [
          { label: "Tokens Studio for Figma — overview (Figma Community)", url: "https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma", type: "tool", time: "10 min" },
          { label: "Style Dictionary — design tokens in code (docs)", url: "https://amzn.github.io/style-dictionary/", type: "docs", time: "10 min" },
          { label: "Mastering Figma Variables 2026 — Tokens Studio section", url: "https://david-supik.medium.com/mastering-figma-variables-the-complete-2026-playbook-f4651ec85473", type: "article", time: "10 min" },
        ],
        tasks: [
          { id: "s1l3t1", label: "Read the overview of Tokens Studio", phase: "learn" },
          { id: "s1l3t2", label: "Read what Style Dictionary is and what problem it solves", phase: "learn" },
          { id: "s1l3t3", label: "Write a 3-sentence explanation of the full pipeline: Figma Variables -> Tokens Studio -> Style Dictionary -> CSS/code", phase: "deliver" },
        ],
        deliverable: "A written explanation you could use in an interview: how design tokens travel from Figma to production code.",
      },
    ],
  },

  // ── 2. AUTO LAYOUT ─────────────────────────────────────────────────────────
  {
    id: "s2",
    skillId: "autolayout",
    title: "Auto Layout",
    why: "Your knowledge is functional but dated. The 2024-2025 updates added wrapping, min/max widths, absolute positioning inside AL frames, and grid layout. These close real gaps in responsive design handoff.",
    color: "#8b5cf6",
    tier: 2,
    lessons: [
      {
        id: "s2l1",
        title: "Auto Layout 5.0: what changed and what you might be missing",
        why: "The features added in 2023-2025 make Auto Layout behave much more like CSS Flexbox and Grid. If you haven't used min/max width or wrap, you're missing half the tool.",
        estimatedTime: "1.5 hrs",
        resources: [
          { label: "Figma Docs: Auto Layout (full, check for 2024/2025 features)", url: "https://help.figma.com/hc/en-us/articles/360040451373", type: "docs", time: "25 min" },
          { label: "Advanced Prototyping in Figma — Auto Layout section (Designilo, 2025)", url: "https://designilo.com/2025/07/08/advanced-prototyping-in-figma-interactive-flows-that-feel-real/", type: "article", time: "15 min" },
          { label: "Untitled UI: Auto Layout 5.0 overview (check their docs/changelog)", url: "https://www.untitledui.com/figma", type: "reference", time: "10 min" },
        ],
        tasks: [
          { id: "s2l1t1", label: "Read the full Auto Layout docs — specifically: wrap, min/max width, absolute position inside AL, fill vs hug vs fixed", phase: "learn" },
          { id: "s2l1t2", label: "Build a responsive card grid: cards wrap at narrow widths using AL wrap", phase: "practice" },
          { id: "s2l1t3", label: "Build a sidebar nav item: label fills available width, icon is fixed, badge is absolute positioned top-right", phase: "practice" },
          { id: "s2l1t4", label: "Build a modal with a scrollable content area inside a fixed-height frame", phase: "practice" },
          { id: "s2l1t5", label: "Verify every layer uses tokens for all spacing values — no hardcoded numbers", phase: "deliver" },
        ],
        deliverable: "3 rebuilt components using wrap, absolute position, and min/max width — all token-connected.",
      },
    ],
  },

  // ── 3. COMPONENTS & VARIANTS ───────────────────────────────────────────────
  {
    id: "s3",
    skillId: "components",
    title: "Components & Variants",
    why: "You have solid component knowledge. The gap is the new features and the nuances that interviewers probe: nested interactive components, component documentation in Figma, and the overlap between variants and component properties.",
    color: "#a78bfa",
    tier: 2,
    lessons: [
      {
        id: "s3l1",
        title: "Variants vs Component Properties: when to use which",
        why: "This is the most common interview question on components. Most designers use them interchangeably and then run into variant explosion. The answer is precise and learnable.",
        estimatedTime: "1.5 hrs",
        resources: [
          { label: "Figma Docs: Component properties", url: "https://help.figma.com/hc/en-us/articles/5579474826519-Create-and-use-component-properties", type: "docs", time: "20 min" },
          { label: "Figma Docs: Understand the difference between slots, instance swap, and variants", url: "https://help.figma.com/hc/en-us/articles/38231200344599-Use-slots-to-build-flexible-components-in-Figma", type: "docs", time: "10 min" },
          { label: "Figma Slots: Guide and Expert Review (Brightside Studio, April 2026)", url: "https://www.brightside-studio.de/en/blog/figma-slots-review", type: "article", time: "20 min" },
        ],
        tasks: [
          { id: "s3l1t1", label: "Read all 3 resources", phase: "learn" },
          { id: "s3l1t2", label: "Write a rule: when do you use a Variant vs a Component Property? Give one example of each", phase: "practice" },
          { id: "s3l1t3", label: "Take one existing component from your design system and audit it: are there variants that should be properties?", phase: "practice" },
          { id: "s3l1t4", label: "Rebuild that component reducing the variant count by converting appropriate variants to properties", phase: "deliver" },
        ],
        deliverable: "A rebuilt component with fewer variants and more component properties, plus a written rule explaining the decision.",
      },
      {
        id: "s3l2",
        title: "Interactive components (nested state management)",
        why: "Interactive components let you build component-level prototype behavior without duplicating frames. Knowing this removes the noodle-soup problem from your prototypes entirely.",
        estimatedTime: "1.5 hrs",
        resources: [
          { label: "Figma Docs: Create interactive components with variants", url: "https://help.figma.com/hc/en-us/articles/360061175334-Create-interactive-components-with-variants", type: "docs", time: "20 min" },
          { label: "Figma Community: Interactive components playground", url: "https://www.figma.com/community/file/1257676352928172927/variables-advanced-prototyping", type: "tool", time: "20 min" },
        ],
        tasks: [
          { id: "s3l2t1", label: "Read the interactive components docs", phase: "learn" },
          { id: "s3l2t2", label: "Build a toggle component: off/on states, transition between variants on click", phase: "practice" },
          { id: "s3l2t3", label: "Build a checkbox with 3 states: unchecked / checked / indeterminate, interactive", phase: "practice" },
          { id: "s3l2t4", label: "Add both to a form and verify: the interactions work without any frame-to-frame prototype connections", phase: "deliver" },
        ],
        deliverable: "A toggle and checkbox component, both interactive, working in a prototype without frame links.",
      },
    ],
  },

  // ── 4. SLOTS ───────────────────────────────────────────────────────────────
  {
    id: "s4",
    skillId: "slots",
    title: "Slots",
    why: "Slots (open beta March 2026) solve the oldest design system problem: components that need to be detached to customize. Learning them now puts you ahead of most designers who haven't touched them yet.",
    color: "#7c3aed",
    tier: 2,
    lessons: [
      {
        id: "s4l1",
        title: "What slots are and why they exist",
        why: "Before using slots, understanding the problem they solve (the detach-or-duplicate dilemma) makes you able to explain them clearly in an interview.",
        estimatedTime: "1 hr",
        resources: [
          { label: "Figma Blog: How to Supercharge your Design System with Slots", url: "https://www.figma.com/blog/supercharge-your-design-system-with-slots/", type: "docs", time: "15 min" },
          { label: "Figma Help: Use slots to build flexible components", url: "https://help.figma.com/hc/en-us/articles/38231200344599-Use-slots-to-build-flexible-components-in-Figma", type: "docs", time: "15 min" },
          { label: "YouTube: Create flexible components with Slots (Figma official, 4 min)", url: "https://www.youtube.com/watch?v=UjOVRUSdO14", type: "video", time: "4 min" },
          { label: "Figma Slots: Guide and Expert Review (Brightside Studio, April 2026)", url: "https://www.brightside-studio.de/en/blog/figma-slots-review", type: "article", time: "15 min" },
        ],
        tasks: [
          { id: "s4l1t1", label: "Watch the 4-minute YouTube video first", phase: "learn" },
          { id: "s4l1t2", label: "Read the Figma Blog post and Help article", phase: "learn" },
          { id: "s4l1t3", label: "Write: what are the 3 old workarounds that slots replace? What is wrong with each one?", phase: "practice" },
          { id: "s4l1t4", label: "Open the Figma Slots playground file and explore the examples", phase: "deliver" },
        ],
        deliverable: "Written explanation of why slots exist and the 3 problems they replace.",
      },
      {
        id: "s4l2",
        title: "Building your first slot-based components",
        why: "The real learning happens when you convert an existing component. Modals and cards are the highest-value targets.",
        estimatedTime: "1.5 hrs",
        resources: [
          { label: "How to Use Figma Slots — step by step (Zight, March 2026)", url: "https://zight.com/guides/how-to-use-figma-slots/", type: "article", time: "15 min" },
          { label: "Figma Help: Use slots to build flexible components", url: "https://help.figma.com/hc/en-us/articles/38231200344599-Use-slots-to-build-flexible-components-in-Figma", type: "docs", time: "10 min" },
        ],
        tasks: [
          { id: "s4l2t1", label: "Open your design system from the Week 2 work", phase: "practice" },
          { id: "s4l2t2", label: "Identify the components people most often detach (usually modals, cards, dropdown menus)", phase: "practice" },
          { id: "s4l2t3", label: "Convert your modal component to use slots: content area becomes a slot, footer actions become a slot", phase: "practice" },
          { id: "s4l2t4", label: "Test: add a form, a confirmation message, and a data table as different slot contents — without detaching", phase: "practice" },
          { id: "s4l2t5", label: "Convert your card component to use a content slot — verify the card frame and footer stay locked", phase: "deliver" },
        ],
        deliverable: "A modal and a card component in your design system rebuilt with native slots. Both work without detaching.",
      },
    ],
  },

  // ── 5. DEV MODE & HANDOFF ──────────────────────────────────────────────────
  {
    id: "s5",
    skillId: "devmode",
    title: "Dev Mode and Handoff",
    why: "This is your most actionable gap. Engineers at good companies have specific expectations from handoff files. Missing annotations, unclear states, and detached components are all visible and avoidable.",
    color: "#0ea5e9",
    tier: 2,
    lessons: [
      {
        id: "s5l1",
        title: "Dev Mode: the full picture",
        why: "Dev Mode has significantly evolved since 2023. The Ready for Dev workflow, focus view, status notifications, and Code Connect are all worth knowing.",
        estimatedTime: "1.5 hrs",
        resources: [
          { label: "Figma Docs: Guide to Dev Mode", url: "https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode", type: "docs", time: "20 min" },
          { label: "Figma Blog: The Designer's Handbook for Developer Handoff (April 2025)", url: "https://www.figma.com/blog/the-designers-handbook-for-developer-handoff/", type: "article", time: "15 min" },
          { label: "YouTube: Design to Developer Handoff in Figma — Full Tutorial (August 2025, 30+ min)", url: "https://www.youtube.com/watch?v=ALkqhXv0GPk", type: "video", time: "30 min" },
          { label: "Figma Dev Mode: Everything Developers Need to Know (2025)", url: "https://wpdean.com/figma-dev-mode/", type: "article", time: "15 min" },
        ],
        tasks: [
          { id: "s5l1t1", label: "Watch the full YouTube handoff tutorial", phase: "learn" },
          { id: "s5l1t2", label: "Read the Figma Designer Handbook for Handoff", phase: "learn" },
          { id: "s5l1t3", label: "Open one of your past design files in Dev Mode — as if you were an engineer seeing it for the first time", phase: "practice" },
          { id: "s5l1t4", label: "Write a list of everything that is unclear or missing from that file", phase: "practice" },
          { id: "s5l1t5", label: "Add measurement annotations for spacing between key elements", phase: "practice" },
          { id: "s5l1t6", label: "Add text annotations for: interaction states not shown, edge cases, animation intent", phase: "practice" },
          { id: "s5l1t7", label: "Mark 3 frames as Ready for Dev with status notes", phase: "deliver" },
        ],
        deliverable: "One past design file retrofitted with proper Dev Mode annotations, measurements, and Ready for Dev status.",
      },
      {
        id: "s5l2",
        title: "What a good handoff file actually looks like",
        why: "The difference between a handoff that engineers trust and one they ignore is almost entirely about file organization and communication discipline — not visual quality.",
        estimatedTime: "1.5 hrs",
        resources: [
          { label: "Figma Best Practices: Guide to Developer Handoff", url: "https://www.figma.com/best-practices/guide-to-developer-handoff/", type: "docs", time: "15 min" },
          { label: "How to Annotate in Figma Dev Mode (Designilo, July 2025)", url: "https://designilo.com/2025/07/24/how-to-annotate-in-figma-dev-mode-a-practical-guide-for-better-handoff/", type: "article", time: "10 min" },
          { label: "Figma Dev Mode Comprehensive Guide 2025 (Skywork AI)", url: "https://skywork.ai/blog/figma-dev-mode-comprehensive-guide-2025-everything-you-need-to-know/", type: "article", time: "15 min" },
        ],
        tasks: [
          { id: "s5l2t1", label: "Read all 3 resources", phase: "learn" },
          { id: "s5l2t2", label: "Create a fresh screen for a feature you know well — treat it as a production handoff from the start", phase: "practice" },
          { id: "s5l2t3", label: "File organization: pages named clearly (e.g. Working / Ready for Dev / Archive)", phase: "practice" },
          { id: "s5l2t4", label: "Components: every interactive element has all states visible on canvas (default, hover, active, disabled, error)", phase: "practice" },
          { id: "s5l2t5", label: "Every component uses tokens — verify nothing is hardcoded", phase: "practice" },
          { id: "s5l2t6", label: "Write a handoff note on the page: what this feature does, what edge cases to watch, what is not shown", phase: "deliver" },
        ],
        deliverable: "A single screen built with handoff-first discipline: token-connected, all states shown, annotated, organized, and marked Ready for Dev.",
      },
    ],
  },

  // ── 6. ACCESSIBILITY ───────────────────────────────────────────────────────
  {
    id: "s6",
    skillId: "accessibility",
    title: "Accessibility",
    why: "In 2026, AA contrast compliance is the legal baseline in the EU and US. Failing it in a portfolio review or interview is an immediate red flag. This is not optional knowledge.",
    color: "#06b6d4",
    tier: 2,
    lessons: [
      {
        id: "s6l1",
        title: "WCAG AA: the essentials a product designer must know",
        why: "You don't need to memorize every criterion. You need to know the ones that affect visual design, and be able to apply them confidently.",
        estimatedTime: "1.5 hrs",
        resources: [
          { label: "Figma for Accessibility: Designing Accessible Interfaces 2026", url: "https://belovdigital.agency/blog/how-to-use-figma-for-designing-accessible-digital-interfaces/", type: "article", time: "20 min" },
          { label: "WCAG for Designers: A Practical Guide (Bird Eats Bug)", url: "https://birdeatsbug.com/blog/wcag-for-designers", type: "article", time: "15 min" },
          { label: "Accessibility in Design Systems (A11Y Pros, November 2025)", url: "https://a11ypros.com/blog/accessibility-in-design-systems", type: "article", time: "15 min" },
          { label: "WebAIM Contrast Checker — use this as a daily tool", url: "https://webaim.org/resources/contrastchecker/", type: "tool", time: "5 min" },
        ],
        tasks: [
          { id: "s6l1t1", label: "Read all 3 articles", phase: "learn" },
          { id: "s6l1t2", label: "Bookmark WebAIM contrast checker and the A11y Annotation Kit plugin for Figma", phase: "learn" },
          { id: "s6l1t3", label: "Write the 5 rules you need to know: contrast ratio for body text (4.5:1), large text (3:1), UI components (3:1), touch target minimum (44px), color alone never conveys meaning", phase: "practice" },
          { id: "s6l1t4", label: "Install the Stark plugin in Figma and run a color blindness simulation on your design system", phase: "practice" },
          { id: "s6l1t5", label: "Check every text color in your design system against its background — log any failures", phase: "deliver" },
        ],
        deliverable: "A written accessibility audit of your design system color tokens: which pass AA, which fail, what you changed.",
      },
      {
        id: "s6l2",
        title: "Accessibility annotations in handoff",
        why: "Engineers make accessibility decisions based on what designers specify. If your handoff file has no ARIA roles, no focus order, no keyboard nav notes — engineers will guess. They will guess wrong.",
        estimatedTime: "1.5 hrs",
        resources: [
          { label: "Figma Community: Accessibility Checklist for Designers (WCAG 2.1 AA)", url: "https://www.figma.com/community/file/1233184772650050315/accessibility-checklist-for-designers", type: "tool", time: "10 min" },
          { label: "YouTube: Design to Developer Handoff — accessibility section (same video as Dev Mode lesson)", url: "https://www.youtube.com/watch?v=ALkqhXv0GPk", type: "video", time: "15 min" },
          { label: "Using Figma for WCAG: What's New (Bombe Design, 2025)", url: "https://bombe.design/using-figma-for-wcag-whats-new-in-accessibility-features/", type: "article", time: "10 min" },
        ],
        tasks: [
          { id: "s6l2t1", label: "Install the A11y Annotation Kit plugin from Figma Community", phase: "learn" },
          { id: "s6l2t2", label: "Take the handoff screen from Lesson 5.2 and add accessibility annotations:", phase: "practice" },
          { id: "s6l2t3", label: "Annotate: tab order (number sequence for keyboard navigation)", phase: "practice" },
          { id: "s6l2t4", label: "Annotate: ARIA labels for icon-only buttons (what a screen reader should say)", phase: "practice" },
          { id: "s6l2t5", label: "Annotate: focus state for every interactive component — make it visible and with 3:1 contrast against surrounding UI", phase: "practice" },
          { id: "s6l2t6", label: "Add a note for any animation: include a reduced-motion alternative", phase: "deliver" },
        ],
        deliverable: "One annotated screen with full accessibility spec: tab order, ARIA labels, focus states, reduced-motion note.",
      },
    ],
  },

  // ── 7. FIGMA AI ────────────────────────────────────────────────────────────
  {
    id: "s7",
    skillId: "figmaai",
    title: "Figma AI",
    why: "You have barely used it. In 2026 this is expected knowledge. The goal is not to use it constantly — it is to know what it can and cannot do, have a formed opinion, and be able to demonstrate it.",
    color: "#f59e0b",
    tier: 2,
    lessons: [
      {
        id: "s7l1",
        title: "Figma AI: what actually works in 2026",
        why: "There is a lot of noise about Figma AI. This lesson cuts to what is genuinely useful day-to-day versus what is a demo feature.",
        estimatedTime: "2 hrs",
        resources: [
          { label: "Figma Help: Figma AI Overview", url: "https://help.figma.com/hc/en-us/articles/23905654528791-Figma-AI-overview", type: "docs", time: "15 min" },
          { label: "Figma Blog: Config 2026 recap — AI and agent features", url: "https://www.figma.com/blog/config-2026-recap/", type: "article", time: "15 min" },
          { label: "Figma Help: What's new from Config 2026", url: "https://help.figma.com/hc/en-us/articles/39582753756695-What-s-new-from-Config-2026", type: "docs", time: "10 min" },
        ],
        tasks: [
          { id: "s7l1t1", label: "Read all 3 resources", phase: "learn" },
          { id: "s7l1t2", label: "Use Rename layers on a messy file with poorly named layers — screenshot before and after", phase: "practice" },
          { id: "s7l1t3", label: "Use Generate content to fill a component with realistic copy (names, dates, descriptions)", phase: "practice" },
          { id: "s7l1t4", label: "Use Make design / First draft on a vague prompt — evaluate what it generates", phase: "practice" },
          { id: "s7l1t5", label: "Use the Figma agent to suggest improvements to one of your design system components", phase: "practice" },
          { id: "s7l1t6", label: "Write: for each feature you tried, one sentence on when you would actually use it in real work", phase: "deliver" },
        ],
        deliverable: "A Figma file with 4 AI experiments (rename, content, first draft, agent) + a written evaluation of each.",
      },
      {
        id: "s7l2",
        title: "Figma Motion: the new native animation timeline",
        why: "Launched at Config 2026 (June 24). This eliminates the After Effects round-trip for UI animation. Even awareness-level knowledge is a strong signal in 2026 interviews.",
        estimatedTime: "2 hrs",
        resources: [
          { label: "Figma Blog: Introducing Figma Motion", url: "https://www.figma.com/blog/introducing-figma-motion/", type: "article", time: "10 min" },
          { label: "Figma Motion Review 2026 (MakerStack)", url: "https://makerstack.co/reviews/figma-motion-review/", type: "article", time: "15 min" },
          { label: "Figma Config 2026: Code Layers, Motion and AI (CMSWire)", url: "https://www.cmswire.com/digital-experience/figma-launches-code-layers-motion-at-config-2026/", type: "article", time: "10 min" },
          { label: "Figma Motion: Complete Guide with AI Agent Prompts (Promptslove, June 2026)", url: "https://promptslove.com/blog/figma-motion-ui-animation/", type: "article", time: "20 min" },
        ],
        tasks: [
          { id: "s7l2t1", label: "Read all 4 resources", phase: "learn" },
          { id: "s7l2t2", label: "Open Figma Motion mode on a frame from your design system", phase: "practice" },
          { id: "s7l2t3", label: "Apply a preset animation (fade, scale, or move) to a button component", phase: "practice" },
          { id: "s7l2t4", label: "Manually set keyframes: animate a card expanding on click (opacity + height)", phase: "practice" },
          { id: "s7l2t5", label: "Switch to Dev Mode and inspect the animation: copy the CSS output", phase: "practice" },
          { id: "s7l2t6", label: "Export as GIF or MP4 for use in a portfolio or presentation", phase: "deliver" },
        ],
        deliverable: "One animated component (button or card) with keyframes set manually, inspected in Dev Mode, exported as MP4 or GIF.",
      },
    ],
  },

  // ── 8. CLAUDE WORKFLOWS ────────────────────────────────────────────────────
  {
    id: "s8",
    skillId: "claude",
    title: "Claude Workflows",
    why: "You use AI intuitively but not systematically. The gap is structured prompting, the Figma MCP connection, and using Claude for the specific design tasks where it gives you the most leverage.",
    color: "#f97316",
    tier: 2,
    lessons: [
      {
        id: "s8l1",
        title: "Structured prompting for design work",
        why: "Most designers use Claude like a search engine — one vague question, one generic answer. Structured prompting gets you output you can actually use.",
        estimatedTime: "1.5 hrs",
        resources: [
          { label: "Anthropic: Prompt Engineering Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", type: "docs", time: "20 min" },
          { label: "Claude pour Product Designer: guide complet 2026 (Thiga, French but Google Translate works)", url: "https://www.media.thiga.co/claude-product-designer-2026", type: "article", time: "15 min" },
        ],
        tasks: [
          { id: "s8l1t1", label: "Read both resources", phase: "learn" },
          { id: "s8l1t2", label: "Prompt: give Claude a screen description, ask it to write all UI copy with role/tone/constraints specified", phase: "practice" },
          { id: "s8l1t3", label: "Prompt: paste a user flow description, ask Claude to write a structured design spec (sections: states, edge cases, accessibility notes)", phase: "practice" },
          { id: "s8l1t4", label: "Prompt: describe one of your design system components, ask Claude to write usage documentation in the Atlassian format", phase: "practice" },
          { id: "s8l1t5", label: "Prompt: ask Claude to critique a recent design decision — give it context about your users and constraints", phase: "practice" },
          { id: "s8l1t6", label: "Evaluate all 4 outputs: what was useful, what was wrong, what prompt change would improve it", phase: "deliver" },
        ],
        deliverable: "4 real Claude outputs used in your design work, plus a written evaluation of prompt quality.",
      },
      {
        id: "s8l2",
        title: "Figma MCP: connecting Claude to your Figma files",
        why: "This is the workflow that eliminates translation loss between design and code. Claude reads your actual Figma file — component names, tokens, structure — and generates code that uses your system.",
        estimatedTime: "2 hrs",
        resources: [
          { label: "Figma MCP: official documentation", url: "https://www.figma.com/developers/mcp", type: "docs", time: "15 min" },
          { label: "Claude Code + Figma MCP: A Beginner's Step-by-Step Setup Guide (Medium, April 2026)", url: "https://medium.com/@nithin_94885/claude-code-mcp-with-figma-a-beginners-step-by-step-setup-guide-84546b46c07d", type: "article", time: "20 min" },
          { label: "YouTube: Claude + Figma MCP Complete Workflow — 3 Months Experience (May 2026, ~20 min)", url: "https://www.youtube.com/watch?v=sUr36TBmC8c", type: "video", time: "20 min" },
          { label: "Figma Blog: From Claude Code to Figma (February 2026)", url: "https://www.figma.com/blog/introducing-claude-code-to-figma/", type: "article", time: "10 min" },
          { label: "How to Use Figma MCP with Claude Code: The Complete Playbook 2026", url: "https://www.925studios.co/blog/2026-03-18-how-to-use-figma-mcp-with-claude-code-the-complete-playbook-2026", type: "article", time: "15 min" },
        ],
        tasks: [
          { id: "s8l2t1", label: "Watch the YouTube walkthrough first", phase: "learn" },
          { id: "s8l2t2", label: "Read the setup guide and Figma MCP docs", phase: "learn" },
          { id: "s8l2t3", label: "Set up Figma MCP with Claude Desktop (follow official docs — use the remote MCP server, works on all plans)", phase: "practice" },
          { id: "s8l2t4", label: "Test connection: paste a Figma frame URL, ask Claude to describe the component structure", phase: "practice" },
          { id: "s8l2t5", label: "Ask Claude to generate a React component from one of your design system components", phase: "practice" },
          { id: "s8l2t6", label: "Compare output: does it use your actual token names? Does spacing match?", phase: "practice" },
          { id: "s8l2t7", label: "Write notes: what MCP can do, what it cannot do, where it saves the most time in your workflow", phase: "deliver" },
        ],
        deliverable: "Figma MCP connected and working. One component generated as code from your actual Figma file. Written notes on the workflow.",
      },
      {
        id: "s8l3",
        title: "AI-assisted UX research and documentation",
        why: "Claude is genuinely useful for research synthesis, JTBD statements, competitive analysis, and writing component documentation. These are practical day-to-day wins, not experiments.",
        estimatedTime: "2 hrs",
        resources: [
          { label: "NNGroup: AI for UX Research", url: "https://nngroup.com/articles/ai-ux-research/", type: "article", time: "15 min" },
        ],
        tasks: [
          { id: "s8l3t1", label: "Read the NNGroup article on AI for UX Research", phase: "learn" },
          { id: "s8l3t2", label: "Pick a product you know well. Ask Claude to generate 10 user interview questions for a specific user type", phase: "practice" },
          { id: "s8l3t3", label: "Write 5 realistic user quotes about that product. Ask Claude to synthesize 3 themes and write a JTBD statement", phase: "practice" },
          { id: "s8l3t4", label: "Ask Claude to write component documentation for your Button component in the Atlassian style (usage, anatomy, do/dont)", phase: "practice" },
          { id: "s8l3t5", label: "Ask Claude to critique one of your design decisions from a senior designer's perspective — give it full context", phase: "deliver" },
        ],
        deliverable: "A 1-page Research Brief (user goals, themes, JTBD) + documentation for one component — both written with Claude.",
      },
    ],
  },

  // ── 9. ADVANCED PROTOTYPING ────────────────────────────────────────────────
  {
    id: "s9",
    skillId: "prototyping",
    title: "Advanced Prototyping",
    why: "Most designers present static screens in interviews. A prototype that runs like a real product with real logic is remembered. Variables + interactive components + conditionals make this possible.",
    color: "#ec4899",
    tier: 3,
    lessons: [
      {
        id: "s9l1",
        title: "Building a complex variable-driven prototype",
        why: "This is where the skills from Variables and Components come together into something you can show. One good prototype is worth more than ten explained slides.",
        estimatedTime: "3 hrs",
        resources: [
          { label: "Figma Docs: Advanced prototyping examples", url: "https://help.figma.com/hc/en-us/articles/17146044893591-Advanced-prototyping-examples", type: "docs", time: "20 min" },
          { label: "Figma Community: Variables and Advanced Prototyping playground", url: "https://www.figma.com/community/file/1257676352928172927/variables-advanced-prototyping", type: "tool", time: "20 min" },
          { label: "Advanced Prototyping in Figma: Interactive Flows That Feel Real (Designilo, July 2025)", url: "https://designilo.com/2025/07/08/advanced-prototyping-in-figma-interactive-flows-that-feel-real/", type: "article", time: "15 min" },
        ],
        tasks: [
          { id: "s9l1t1", label: "Read all resources and explore the playground file", phase: "learn" },
          { id: "s9l1t2", label: "Choose one: multi-step form with live validation states / sortable data table / onboarding flow with preference selection", phase: "practice" },
          { id: "s9l1t3", label: "Build using only variables and interactive components — no frame duplication for logic", phase: "practice" },
          { id: "s9l1t4", label: "Implement at least one conditional: if/else logic that changes the UI based on user input", phase: "practice" },
          { id: "s9l1t5", label: "Use only components from your design system — no one-off frames", phase: "practice" },
          { id: "s9l1t6", label: "Ensure the prototype loops — no dead ends", phase: "practice" },
          { id: "s9l1t7", label: "Record a 30-second screen recording of the prototype running", phase: "deliver" },
        ],
        deliverable: "A complex variable-driven prototype with at least one conditional interaction. Screen recording saved.",
      },
    ],
  },

  // ── 10. VIBE CODING ────────────────────────────────────────────────────────
  {
    id: "s10",
    skillId: "vibecoding",
    title: "Vibe Coding",
    why: "Directing Claude or v0 to build real UI teaches you what implementation actually costs, makes you a better collaborator with engineers, and produces things Figma prototypes cannot: real interactions with real data.",
    color: "#ef4444",
    tier: 3,
    lessons: [
      {
        id: "s10l1",
        title: "Vibe coding fundamentals: directing Claude to build UI",
        why: "The skill is not coding. It is knowing how to break down a UI into buildable instructions and iterate on the output like a director, not a writer.",
        estimatedTime: "2 hrs",
        resources: [
          { label: "Claude Code x Figma MCP: The Designer's Playbook (ADPList Substack, April 2026)", url: "https://adplist.substack.com/p/how-to-build-with-figma-mcp-the-designers", type: "article", time: "15 min" },
          { label: "Claude Code + Figma: A Designer-Developer Workflow That Actually Works (Medium, April 2026)", url: "https://medium.com/design-bootcamp/claude-code-figma-a-designer-developer-workflow-that-actually-works-b7d7545edc40", type: "article", time: "15 min" },
          { label: "Figma Blog: Workflow Lab — Expanding the Canvas with Figma MCP (April 2026)", url: "https://www.figma.com/blog/workflow-lab-expanding-the-canvas-with-figma-mcp/", type: "article", time: "10 min" },
        ],
        tasks: [
          { id: "s10l1t1", label: "Read all 3 resources", phase: "learn" },
          { id: "s10l1t2", label: "Prompt 1: ask Claude to build a notification dropdown (bell icon, counter, 3 notification items)", phase: "practice" },
          { id: "s10l1t3", label: 'Prompt 2: refine — add click-to-read state and "Mark all as read" button', phase: "practice" },
          { id: "s10l1t4", label: "Prompt 3: give directional feedback — update colors to match your design system tokens", phase: "practice" },
          { id: "s10l1t5", label: "Notice: you are directing, not coding. Screenshot and save the final output", phase: "deliver" },
        ],
        deliverable: "A working notification dropdown built entirely through Claude conversation. Screenshot saved.",
      },
      {
        id: "s10l2",
        title: "Build a real screen via vibe coding and compare to Figma",
        why: "The comparison step is what makes this educational. Seeing what Claude gets right and wrong from your Figma spec teaches you more about handoff than any tutorial.",
        estimatedTime: "3 hrs",
        resources: [
          { label: "v0.dev — try for rapid UI generation (Vercel's tool)", url: "https://v0.dev", type: "tool", time: "ongoing" },
        ],
        tasks: [
          { id: "s10l2t1", label: "Pick a real screen from your past work (dashboard, settings panel, or data table)", phase: "practice" },
          { id: "s10l2t2", label: "Step 1: ask Claude to build semantic HTML structure only — no styling yet", phase: "practice" },
          { id: "s10l2t3", label: "Step 2: add layout — CSS Grid for the overall structure, Flexbox for components", phase: "practice" },
          { id: "s10l2t4", label: "Step 3: add one real interaction (filter, sort column, or collapsible sidebar)", phase: "practice" },
          { id: "s10l2t5", label: "Open your Figma file side by side with the coded version", phase: "practice" },
          { id: "s10l2t6", label: "Write 5 bullets: what your Figma spec should have specified more clearly", phase: "deliver" },
        ],
        deliverable: "A coded version of one real screen + 5 written handoff insights that will change how you annotate future designs.",
      },
    ],
  },

  // ── 11. CODE LAYERS ────────────────────────────────────────────────────────
  {
    id: "s11",
    skillId: "codelayers",
    title: "Code Layers (Config 2026 — Early Access)",
    why: "Just announced June 24, 2026. In closed beta, rolling out July 2026+. This is the feature that lets you bring a real codebase onto the Figma canvas, edit visually, and push changes back to the repo. Awareness now = leverage when it ships to your account.",
    color: "#64748b",
    tier: 3,
    lessons: [
      {
        id: "s11l1",
        title: "What Code Layers are and why they matter",
        why: "Code Layers changes the designer-engineer relationship more fundamentally than anything since Dev Mode. Understanding it now means you can explain it clearly in interviews before most people have used it.",
        estimatedTime: "1 hr",
        resources: [
          { label: "Figma Blog: Code on the Figma Canvas (June 24, 2026)", url: "https://www.figma.com/blog/code-on-the-figma-canvas/", type: "article", time: "10 min" },
          { label: "Figma Config 2026: Every Announcement and What It Means for Designers (Qubika)", url: "https://qubika.com/blog/figma-config-2026-announcements-for-designers/", type: "article", time: "15 min" },
          { label: "Figma Config 2026: Motion, Code Layers and AI Tools Explained (MagicShot)", url: "https://magicshot.ai/news/figma-config-2026-motion-code-layers-ai", type: "article", time: "10 min" },
          { label: "Config 2026: AI blurs the lines — Figma code, motion and agent workflows (Diginomica)", url: "https://diginomica.com/config-2026-ai-blurs-lines-figma-code-motion-agent-workflows-design-canvas", type: "article", time: "10 min" },
        ],
        tasks: [
          { id: "s11l1t1", label: "Read all 4 resources", phase: "learn" },
          { id: "s11l1t2", label: "Join the waitlist at figma.com/config-betas for Code Layers early access", phase: "practice" },
          { id: "s11l1t3", label: "Write: what problem does Code Layers solve that Dev Mode does not?", phase: "practice" },
          { id: "s11l1t4", label: "Write: how would Code Layers change the handoff process on a team you have worked on?", phase: "deliver" },
        ],
        deliverable: "Written explanation of Code Layers suitable for an interview, plus early access request submitted.",
      },
    ],
  },

]};

// ─── DELIVERABLES CATALOG ─────────────────────────────────────────────────────
// Updated to match skill-based structure.
// skillId and lessonId tie deliverables to specific lessons.

const DELIVERABLES_CATALOG = [
  // Variables
  { id: "d1",  skillId: "variables",     lessonId: "s1l1", icon: "T",  label: "Token Dev Mode audit",         desc: "Every token visible in Dev Mode inspect — no raw hex values" },
  { id: "d2",  skillId: "variables",     lessonId: "s1l2", icon: "PT", label: "Conditional prototype",        desc: "Variable-driven prototype with if/else logic, no frame duplication" },
  { id: "d3",  skillId: "variables",     lessonId: "s1l3", icon: "D",  label: "Token pipeline explanation",   desc: "Written: how tokens travel from Figma to production code" },
  // Auto Layout
  { id: "d4",  skillId: "autolayout",    lessonId: "s2l1", icon: "AL", label: "AL 5.0 component trio",       desc: "Card grid (wrap), sidebar item (absolute), modal (scrollable)" },
  // Components
  { id: "d5",  skillId: "components",    lessonId: "s3l1", icon: "C",  label: "Rebuilt component audit",     desc: "Fewer variants, more properties, written decision rule" },
  { id: "d6",  skillId: "components",    lessonId: "s3l2", icon: "IC", label: "Interactive toggle+checkbox", desc: "Both interactive, working in prototype without frame links" },
  // Slots
  { id: "d7",  skillId: "slots",         lessonId: "s4l1", icon: "S",  label: "Slots explanation",           desc: "3 old workarounds and why slots replace them" },
  { id: "d8",  skillId: "slots",         lessonId: "s4l2", icon: "S",  label: "Modal + card with slots",     desc: "Two components rebuilt with native slots in your design system" },
  // Dev Mode
  { id: "d9",  skillId: "devmode",       lessonId: "s5l1", icon: "H",  label: "Retrofitted handoff file",    desc: "Past design annotated, measured, Ready for Dev" },
  { id: "d10", skillId: "devmode",       lessonId: "s5l2", icon: "H",  label: "Handoff-first screen",        desc: "New screen built for handoff: token-connected, all states, annotated" },
  // Accessibility
  { id: "d11", skillId: "accessibility", lessonId: "s6l1", icon: "A",  label: "Token contrast audit",        desc: "Written audit: which tokens pass AA, which fail, what changed" },
  { id: "d12", skillId: "accessibility", lessonId: "s6l2", icon: "A",  label: "Annotated a11y spec",         desc: "Tab order, ARIA labels, focus states, reduced-motion note" },
  // Figma AI
  { id: "d13", skillId: "figmaai",       lessonId: "s7l1", icon: "AI", label: "Figma AI evaluation",         desc: "4 AI experiments + written evaluation of each feature" },
  { id: "d14", skillId: "figmaai",       lessonId: "s7l2", icon: "M",  label: "Animated component",          desc: "Button or card animated in Motion, exported as MP4 or GIF" },
  // Claude
  { id: "d15", skillId: "claude",        lessonId: "s8l1", icon: "CL", label: "4 Claude outputs",            desc: "Copy, spec, docs, critique — all evaluated" },
  { id: "d16", skillId: "claude",        lessonId: "s8l2", icon: "MC", label: "MCP component generation",    desc: "One component generated from Figma via MCP, workflow notes written" },
  { id: "d17", skillId: "claude",        lessonId: "s8l3", icon: "R",  label: "Research Brief + component docs", desc: "JTBD statement and component documentation via Claude" },
  // Prototyping
  { id: "d18", skillId: "prototyping",   lessonId: "s9l1", icon: "PR", label: "Complex prototype",           desc: "Variable-driven with conditional logic, screen recording saved" },
  // Vibe Coding
  { id: "d19", skillId: "vibecoding",    lessonId: "s10l1", icon: "VC", label: "Notification dropdown",      desc: "Built via Claude conversation — screenshot saved" },
  { id: "d20", skillId: "vibecoding",    lessonId: "s10l2", icon: "VC", label: "Coded screen + insights",    desc: "Real screen built via vibe coding + 5 handoff insights" },
  // Code Layers
  { id: "d21", skillId: "codelayers",    lessonId: "s11l1", icon: "CL", label: "Code Layers explanation",   desc: "Interview-ready written explanation + early access requested" },
];

// ─── RESOURCES CATALOG ────────────────────────────────────────────────────────
const RESOURCES_CATALOG = [
  { category: "Variables and Tokens", items: [
    { label: "Figma Docs: Guide to Variables in Figma", url: "https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma", type: "docs", time: "30 min", skillId: "variables" },
    { label: "Figma Docs: Variables in Dev Mode", url: "https://help.figma.com/hc/en-us/articles/27882809912471-Variables-in-Dev-Mode", type: "docs", time: "15 min", skillId: "variables" },
    { label: "Figma Docs: Use variables in prototypes", url: "https://help.figma.com/hc/en-us/articles/14506587589399-Use-variables-in-prototypes", type: "docs", time: "20 min", skillId: "variables" },
    { label: "Mastering Figma Variables: The Complete 2026 Playbook", url: "https://david-supik.medium.com/mastering-figma-variables-the-complete-2026-playbook-f4651ec85473", type: "article", time: "20 min", skillId: "variables" },
    { label: "Design System Mastery with Figma Variables 2025/2026", url: "https://www.designsystemscollective.com/design-system-mastery-with-figma-variables-the-2025-2026-best-practice-playbook-da0500ca0e66", type: "article", time: "20 min", skillId: "variables" },
    { label: "Tokens Studio for Figma (plugin)", url: "https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma", type: "tool", time: "ongoing", skillId: "variables" },
  ]},
  { category: "Components, Variants and Slots", items: [
    { label: "Figma Docs: Component properties", url: "https://help.figma.com/hc/en-us/articles/5579474826519-Create-and-use-component-properties", type: "docs", time: "20 min", skillId: "components" },
    { label: "Figma Docs: Create interactive components with variants", url: "https://help.figma.com/hc/en-us/articles/360061175334-Create-interactive-components-with-variants", type: "docs", time: "20 min", skillId: "components" },
    { label: "Figma Help: Use slots to build flexible components", url: "https://help.figma.com/hc/en-us/articles/38231200344599-Use-slots-to-build-flexible-components-in-Figma", type: "docs", time: "15 min", skillId: "slots" },
    { label: "Figma Blog: How to Supercharge your Design System with Slots", url: "https://www.figma.com/blog/supercharge-your-design-system-with-slots/", type: "article", time: "15 min", skillId: "slots" },
    { label: "YouTube: Create flexible components with Slots (Figma, 4 min)", url: "https://www.youtube.com/watch?v=UjOVRUSdO14", type: "video", time: "4 min", skillId: "slots" },
    { label: "Figma Slots: Guide and Expert Review (Brightside Studio, April 2026)", url: "https://www.brightside-studio.de/en/blog/figma-slots-review", type: "article", time: "20 min", skillId: "slots" },
    { label: "How to Use Figma Slots — step by step (Zight, March 2026)", url: "https://zight.com/guides/how-to-use-figma-slots/", type: "article", time: "15 min", skillId: "slots" },
  ]},
  { category: "Dev Mode and Handoff", items: [
    { label: "Figma Docs: Guide to Dev Mode", url: "https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode", type: "docs", time: "20 min", skillId: "devmode" },
    { label: "Figma Blog: The Designer's Handbook for Developer Handoff (April 2025)", url: "https://www.figma.com/blog/the-designers-handbook-for-developer-handoff/", type: "article", time: "15 min", skillId: "devmode" },
    { label: "YouTube: Design to Developer Handoff in Figma — Full Tutorial (August 2025)", url: "https://www.youtube.com/watch?v=ALkqhXv0GPk", type: "video", time: "30 min", skillId: "devmode" },
    { label: "How to Annotate in Figma Dev Mode (Designilo, July 2025)", url: "https://designilo.com/2025/07/24/how-to-annotate-in-figma-dev-mode-a-practical-guide-for-better-handoff/", type: "article", time: "10 min", skillId: "devmode" },
    { label: "Figma Dev Mode: Everything Developers Need to Know (2025)", url: "https://wpdean.com/figma-dev-mode/", type: "article", time: "15 min", skillId: "devmode" },
  ]},
  { category: "Accessibility", items: [
    { label: "Figma for Accessibility: Designing Accessible Interfaces 2026", url: "https://belovdigital.agency/blog/how-to-use-figma-for-designing-accessible-digital-interfaces/", type: "article", time: "20 min", skillId: "accessibility" },
    { label: "WCAG for Designers: A Practical Guide (Bird Eats Bug)", url: "https://birdeatsbug.com/blog/wcag-for-designers", type: "article", time: "15 min", skillId: "accessibility" },
    { label: "Accessibility in Design Systems (A11Y Pros, November 2025)", url: "https://a11ypros.com/blog/accessibility-in-design-systems", type: "article", time: "15 min", skillId: "accessibility" },
    { label: "WebAIM Contrast Checker", url: "https://webaim.org/resources/contrastchecker/", type: "tool", time: "ongoing", skillId: "accessibility" },
    { label: "Figma Community: Accessibility Checklist for Designers (WCAG 2.1 AA)", url: "https://www.figma.com/community/file/1233184772650050315/accessibility-checklist-for-designers", type: "tool", time: "10 min", skillId: "accessibility" },
  ]},
  { category: "Figma AI and Motion", items: [
    { label: "Figma Help: Figma AI Overview", url: "https://help.figma.com/hc/en-us/articles/23905654528791-Figma-AI-overview", type: "docs", time: "15 min", skillId: "figmaai" },
    { label: "Figma Blog: Config 2026 recap", url: "https://www.figma.com/blog/config-2026-recap/", type: "article", time: "15 min", skillId: "figmaai" },
    { label: "Figma Blog: Introducing Figma Motion (June 24, 2026)", url: "https://www.figma.com/blog/introducing-figma-motion/", type: "article", time: "10 min", skillId: "motion" },
    { label: "Figma Motion Review 2026 (MakerStack)", url: "https://makerstack.co/reviews/figma-motion-review/", type: "article", time: "15 min", skillId: "motion" },
    { label: "Figma Motion: Complete Guide with AI Agent Prompts (Promptslove, June 2026)", url: "https://promptslove.com/blog/figma-motion-ui-animation/", type: "article", time: "20 min", skillId: "motion" },
  ]},
  { category: "Claude Workflows and Figma MCP", items: [
    { label: "Anthropic: Prompt Engineering Guide", url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", type: "docs", time: "20 min", skillId: "claude" },
    { label: "Figma MCP: official documentation", url: "https://www.figma.com/developers/mcp", type: "docs", time: "15 min", skillId: "claude" },
    { label: "YouTube: Claude + Figma MCP Complete Workflow (May 2026)", url: "https://www.youtube.com/watch?v=sUr36TBmC8c", type: "video", time: "20 min", skillId: "claude" },
    { label: "Claude Code + Figma: A Designer-Developer Workflow That Actually Works (Medium, April 2026)", url: "https://medium.com/design-bootcamp/claude-code-figma-a-designer-developer-workflow-that-actually-works-b7d7545edc40", type: "article", time: "15 min", skillId: "claude" },
    { label: "How to Use Figma MCP with Claude Code: The Complete Playbook 2026", url: "https://www.925studios.co/blog/2026-03-18-how-to-use-figma-mcp-with-claude-code-the-complete-playbook-2026", type: "article", time: "15 min", skillId: "claude" },
    { label: "Figma Blog: From Claude Code to Figma (February 2026)", url: "https://www.figma.com/blog/introducing-claude-code-to-figma/", type: "article", time: "10 min", skillId: "claude" },
    { label: "NNGroup: AI for UX Research", url: "https://nngroup.com/articles/ai-ux-research/", type: "article", time: "15 min", skillId: "claude" },
    { label: "Claude Code x Figma MCP: The Designer's Playbook (ADPList Substack)", url: "https://adplist.substack.com/p/how-to-build-with-figma-mcp-the-designers", type: "article", time: "15 min", skillId: "vibecoding" },
  ]},
  { category: "Advanced Prototyping", items: [
    { label: "Figma Docs: Advanced prototyping examples", url: "https://help.figma.com/hc/en-us/articles/17146044893591-Advanced-prototyping-examples", type: "docs", time: "20 min", skillId: "prototyping" },
    { label: "Figma Docs: Create onboarding flow with advanced prototyping", url: "https://help.figma.com/hc/en-us/articles/18888057155991-Create-an-onboarding-flow-with-advanced-prototyping", type: "docs", time: "30 min", skillId: "prototyping" },
    { label: "Figma Community: Variables and Advanced Prototyping playground", url: "https://www.figma.com/community/file/1257676352928172927/variables-advanced-prototyping", type: "tool", time: "30 min", skillId: "prototyping" },
    { label: "Prototyping Like a Pro: Advanced Figma Techniques (Medium, April 2026)", url: "https://medium.com/@atnoforuiuxdesigning/prototyping-like-a-pro-advanced-figma-prototyping-techniques-most-designers-dont-know-aca9a0a1dfa8", type: "article", time: "15 min", skillId: "prototyping" },
  ]},
  { category: "Code Layers (Config 2026)", items: [
    { label: "Figma Blog: Code on the Figma Canvas (June 24, 2026)", url: "https://www.figma.com/blog/code-on-the-figma-canvas/", type: "article", time: "10 min", skillId: "codelayers" },
    { label: "Figma Config 2026: Every Announcement and What It Means for Designers (Qubika)", url: "https://qubika.com/blog/figma-config-2026-announcements-for-designers/", type: "article", time: "15 min", skillId: "codelayers" },
    { label: "Config 2026: AI blurs the lines — Figma code, motion and agent workflows (Diginomica)", url: "https://diginomica.com/config-2026-ai-blurs-lines-figma-code-motion-agent-workflows-design-canvas", type: "article", time: "10 min", skillId: "codelayers" },
    { label: "v0.dev — AI UI generation (Vercel)", url: "https://v0.dev", type: "tool", time: "ongoing", skillId: "vibecoding" },
    { label: "Style Dictionary — design tokens in code", url: "https://amzn.github.io/style-dictionary/", type: "docs", time: "10 min", skillId: "variables" },
  ]},
];
// ─── STORAGE ─────────────────────────────────────────────────────────────────
const LS = "dlt_v2";
function load() {
  try { const r = localStorage.getItem(LS); return r ? JSON.parse(r) : defaultState(); }
  catch { return defaultState(); }
}
function defaultState() {
  return { checked:{}, notes:{}, resourceStatus:{}, sessionActive:null,
           streak:0, lastActiveDate:null, startedDate:null };
}
function save(s) { try { localStorage.setItem(LS, JSON.stringify(s)); } catch {} }

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const allLessons = () => PLAN.skills.flatMap(s => s.lessons.map(l => ({...l, skillId: s.skillId})));
const allTasks = () => allLessons().flatMap(l => l.tasks);
const skillTasks = (skillId) => { const s = PLAN.skills.find(x=>x.skillId===skillId); return s ? s.lessons.flatMap(l=>l.tasks):[]};
const lessonDone = (lesson, checked) => lesson.tasks.length>0 && lesson.tasks.every(t=>checked[t.id]);
const lessonProgress = (lesson, checked) => lesson.tasks.length===0?0:lesson.tasks.filter(t=>checked[t.id]).length/lesson.tasks.length;

function currentLesson(checked) {
  const lessons = allLessons();
  return lessons.find(l => !lessonDone(l,checked)) || lessons[lessons.length-1];
}
function computeStreak(checked) {
  const lessons = allLessons();
  let streak = 0;
  for (let i = lessons.length-1; i >= 0; i--) {
    if (lessonDone(lessons[i], checked)) streak++;
    else break;
  }
  return streak;
}
function skillProgress(checked) {
  const scores = {};
  Object.keys(SKILL_MAP).forEach(k => { scores[k] = { done:0, total:0 }; });
  PLAN.skills.forEach(s => {
    if (!scores[s.skillId]) return;
    const tasks = s.lessons.flatMap(l=>l.tasks);
    scores[s.skillId].total += tasks.length;
    scores[s.skillId].done += tasks.filter(t=>checked[t.id]).length;
  });
  return scores;
}
function deliverablesDone(checked) {
  return DELIVERABLES_CATALOG.filter(d => {
    const lesson = allLessons().find(x=>x.id===d.lessonId);
    return lesson && lessonDone(lesson, checked);
  });
}
function todayStr() {
  return new Date().toISOString().split("T")[0];
}

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Ic = {
  Check: ({cls=""}) => <svg viewBox="0 0 20 20" fill="none" className={cls||"w-4 h-4"}><path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Chevron: ({cls=""}) => <svg viewBox="0 0 20 20" fill="none" className={cls||"w-4 h-4"}><path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  ChevronDown: ({cls=""}) => <svg viewBox="0 0 20 20" fill="none" className={cls||"w-4 h-4"}><path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Ext: () => <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5"><path d="M7 5H4v11h11v-3M10 4h6m0 0v6m0-6L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  X: () => <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Flame: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 2c0 0-5 4-5 9a5 5 0 0010 0c0-5-5-9-5-9zm0 12a2 2 0 110-4 2 2 0 010 4z"/></svg>,
  Star: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M10 1l2.7 5.5L19 7.5l-4.5 4.4L15.4 19 10 16.1 4.6 19l1-7.1L1 7.5l6.3-.9L10 1z"/></svg>,
  Play: () => <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M6 4l12 6-12 6V4z"/></svg>,
  Map: () => <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><path d="M1 4l6-2 6 3 6-2v13l-6 2-6-3-6 2V4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  Skill: () => <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M6 10h8M10 6v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Folder: () => <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><path d="M2 6a2 2 0 012-2h3l2 2h7a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  Book: () => <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><path d="M4 3h6v14H4a1 1 0 01-1-1V4a1 1 0 011-1zm6 0h6a1 1 0 011 1v12a1 1 0 01-1 1h-6V3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
};

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────
function PillTag({children, color}) {
  return <span style={{background:color+"18", color}} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium">{children}</span>;
}

function ProgressRing({value, size=48, stroke=4, color="#6366f1"}) {
  const r = (size-stroke*2)/2;
  const circ = 2*Math.PI*r;
  const dash = circ*(1-value/100);
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke}/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
        style={{transition:"stroke-dashoffset 0.5s ease"}}/>
    </svg>
  );
}

function Bar({value, color="#6366f1", h="h-1.5"}) {
  return (
    <div className={"rounded-full bg-gray-100 overflow-hidden "+h}>
      <div className="h-full rounded-full transition-all duration-500" style={{width:Math.round(value)+"%", background:color}}/>
    </div>
  );
}

function ResourceBadge({type}) {
  const map = {video:["YT","#ef4444"], docs:["Docs","#6366f1"], article:["Read","#8b5cf6"], tool:["Tool","#f59e0b"], reference:["Ref","#06b6d4"]};
  const [label, color] = map[type]||["Link","#64748b"];
  return <span style={{color, background:color+"18"}} className="text-xs font-semibold px-2 py-0.5 rounded-full">{label}</span>;
}

function Checkbox({checked, onChange, size="w-5 h-5"}) {
  return (
    <button onClick={onChange} className={"flex-shrink-0 rounded border-2 flex items-center justify-center transition-colors duration-200 "+size+(checked?" border-indigo-500 bg-indigo-500 text-white":" border-gray-300 hover:border-indigo-400")}>
      {checked && <Ic.Check cls="w-3 h-3"/>}
    </button>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:"today", label:"Today", Icon:Ic.Play },
  { id:"journey", label:"Journey", Icon:Ic.Map },
  { id:"skills", label:"Skills", Icon:Ic.Skill },
  { id:"portfolio", label:"Portfolio", Icon:Ic.Folder },
  { id:"resources", label:"Resources", Icon:Ic.Book },
];

function Sidebar({active, setActive, checked}) {
  const streak = computeStreak(checked);
  const total = allTasks().length;
  const done = allTasks().filter(t=>checked[t.id]).length;
  const pct = total>0?Math.round(done/total*100):0;
  const today = currentLesson(checked);
  const todaySkill = PLAN.skills.find(s=>s.skillId===today?.skillId);
  return (
    <aside className="w-56 flex-shrink-0 bg-[#1e1b4b] text-white flex flex-col h-screen sticky top-0">
      <div className="px-5 pt-6 pb-4 border-b border-white/10">
        <div className="text-base font-extrabold tracking-tight mb-1">
          <span className="text-indigo-400">Design</span><span className="text-white">Tracker</span>
        </div>
        <div className="text-sm font-medium text-indigo-200/70">Skill-Based Track</div>
      </div>
      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-indigo-200/60">Overall progress</span>
          <span className="text-xs font-bold text-indigo-300">{pct}%</span>
        </div>
        <Bar value={pct} color="#818cf8" h="h-1"/>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-amber-400"><Ic.Flame/></span>
          <span className="text-sm font-bold text-amber-400">{streak}</span>
          <span className="text-xs text-indigo-200/50">day streak</span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({id,label,Icon})=>(
          <button key={id} onClick={()=>setActive(id)} className={"w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border-l-2 "+(active===id?"bg-indigo-600 text-white border-indigo-300":"border-transparent text-indigo-200/60 hover:text-white hover:bg-white/5")}>
            <Icon/>{label}
          </button>
        ))}
      </nav>
      {today && todaySkill && (
        <div className="px-5 py-4 border-t border-white/10">
          <div className="text-xs text-indigo-200/50 mb-1">Currently on</div>
          <div className="text-xs font-medium text-indigo-100 leading-snug">{todaySkill.title}: {today.title}</div>
        </div>
      )}
    </aside>
  );
}

// ─── TODAY VIEW ───────────────────────────────────────────────────────────────
function TodayView({checked, notes, onToggle, onNote, state, onStartSession, onEndSession, sessionActive}) {
  const today = currentLesson(checked);
  const skill = PLAN.skills.find(s=>s.skillId===today?.skillId);
  if (!today||!skill) return <div className="p-8 text-gray-400">All done!</div>;

  const done = today.tasks.filter(t=>checked[t.id]).length;
  const total = today.tasks.length;
  const pct = total>0?Math.round(done/total*100):0;
  const isLessonDone = lessonDone(today, checked);
  const streak = computeStreak(checked);
  const skillColor = skill.color;
  const lessonIndex = skill.lessons.findIndex(l=>l.id===today.id);

  const learnTasks = today.tasks.filter(t=>t.phase==="learn");
  const practiceTasks = today.tasks.filter(t=>t.phase==="practice");
  const deliverTasks = today.tasks.filter(t=>t.phase==="deliver");

  return (
    <div className="flex gap-6 p-8 min-h-screen bg-[#faf9f7]">
      {/* Main column */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Header */}
        <div className="rounded-2xl overflow-hidden bg-[#fffffe] border border-[#efe9e0] shadow-sm">
          <div className="h-1.5" style={{background:`linear-gradient(90deg, ${skill.color}, ${skill.color}55)`}}/>
          <div className="p-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-widest" style={{color:skill.color}}>{skill.title} - Lesson {lessonIndex+1} of {skill.lessons.length}</span>
              {skill.tier===3 && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Advanced</span>}
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 leading-tight">{today.title}</h1>
            <div className="mt-3 max-w-xl rounded-xl bg-indigo-50/50 border-l-4 px-4 py-3" style={{borderColor:skill.color}}>
              <p className="text-gray-600 leading-relaxed text-sm">{today.why}</p>
            </div>
          </div>
        </div>

        {/* Why this matters + meta */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            {today.estimatedTime}
          </span>
          <div className="flex gap-1.5 flex-wrap">
            <PillTag color={skill.color}>{skill.title}</PillTag>
          </div>
        </div>

        {/* Session progress bar */}
        <div className="bg-[#fffffe] rounded-2xl border border-[#efe9e0] shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Lesson progress</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-indigo-600">{pct}%</span>
              {isLessonDone && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Complete</span>}
            </div>
          </div>
          <Bar value={pct} color={pct===100?"linear-gradient(90deg,#34d399,#10b981)":"linear-gradient(90deg,#818cf8,#8b5cf6)"} h="h-2.5"/>
          <div className="mt-2 text-xs text-gray-400">{done} of {total} tasks</div>
          {!isLessonDone && !sessionActive && (
            <button onClick={onStartSession} className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
              <Ic.Play/>Start this lesson
            </button>
          )}
          {isLessonDone && (
            <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium">
              <Ic.Check cls="w-5 h-5"/>Lesson complete - great work.
            </div>
          )}
        </div>

        {/* Step 1: Learn */}
        <TaskSection title="01 - Learn" subtitle="Watch and read" tasks={learnTasks} checked={checked} onToggle={onToggle} color={skillColor} tint="indigo">
          {today.resources.length>0 && (
            <div className="mt-4 space-y-2">
              {today.resources.map((r,i)=>(
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-[#efe9e0] bg-[#fffffe]/70 hover:border-indigo-200 hover:bg-indigo-50 transition-all group">
                  <ResourceBadge type={r.type}/>
                  <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900">{r.label}</span>
                  <span className="text-xs text-gray-400">{r.time}</span>
                  <span className="text-gray-300 group-hover:text-indigo-400"><Ic.Ext/></span>
                </a>
              ))}
            </div>
          )}
        </TaskSection>

        {/* Step 2: Practice */}
        <TaskSection title="02 - Practice" subtitle="Do the work in Figma or Claude" tasks={practiceTasks} checked={checked} onToggle={onToggle} color={skillColor} tint="violet"/>

        {/* Step 3: Deliver */}
        <TaskSection title="03 - Deliver" subtitle="Create the output" tasks={deliverTasks} checked={checked} onToggle={onToggle} color={skillColor} tint="emerald">
          <div className="mt-3 p-3 bg-[#fffffe] rounded-xl border border-emerald-200 shadow-sm">
            <div className="text-xs font-semibold text-emerald-700 mb-1 uppercase tracking-wide">Today's deliverable</div>
            <p className="text-sm text-emerald-900">{today.deliverable}</p>
          </div>
        </TaskSection>

        {/* Notes */}
        <div className="bg-[#fffffe] rounded-2xl border border-[#efe9e0] shadow-sm p-5">
          <div className="text-sm font-semibold text-gray-700 mb-3">Notes</div>
          <textarea
            value={notes[today.id]||""}
            onChange={e=>onNote(today.id, e.target.value)}
            placeholder="Notes, questions, or anything worth remembering from this lesson..."
            rows={4}
            className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
          />
        </div>

        {/* Complete button */}
        {!isLessonDone && (
          <div className="text-center pb-8">
            <div className="text-xs text-gray-400 mb-3">Finish all tasks above to mark this lesson complete</div>
            <button
              disabled={pct<100}
              onClick={()=>{
                today.tasks.forEach(t=>{if(!checked[t.id])onToggle(t.id);});
                onEndSession();
              }}
              className={"px-8 py-3 rounded-xl text-sm font-semibold transition-all "+(pct===100?"bg-emerald-500 hover:bg-emerald-600 text-white":"bg-gray-100 text-gray-400 cursor-not-allowed")}>
              {pct===100?"Mark lesson complete!":"Complete all tasks first"}
            </button>
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <div className="w-72 flex-shrink-0 space-y-4">
        {/* Streak card */}
        <div className="bg-[#fffffe] rounded-2xl border border-[#efe9e0] shadow-sm p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-amber-500 text-2xl"><Ic.Flame/></span>
            <div>
              <div className="text-2xl font-bold text-gray-900 leading-none">{streak}</div>
              <div className="text-xs text-gray-400">lesson streak</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {streak===0?"Complete this lesson to start your streak.":streak<3?"Momentum is building. Keep going.":streak<7?"Strong consistency. You are building a habit.":"Outstanding focus. This is how skills are built."}
          </div>
        </div>

        {/* Skill map position */}
        <div className="bg-[#fffffe] rounded-2xl border border-[#efe9e0] shadow-sm p-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Your journey</div>
          <div className="space-y-2">
            {PLAN.skills.map(s => {
              const st = skillTasks(s.skillId);
              const sd = st.filter(t=>checked[t.id]).length;
              const sp = st.length>0?Math.round(sd/st.length*100):0;
              const isCurrent = s.skillId===skill.skillId;
              return (
                <div key={s.skillId} className={"rounded-xl p-3 transition-all "+(isCurrent?"border-2 bg-indigo-50":"border border-gray-100")+(isCurrent?" border-indigo-300":"")}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{background:s.color}}/>
                      <span className={"text-xs font-semibold "+(isCurrent?"text-indigo-700":"text-gray-500")}>{s.title}</span>
                    </div>
                    <span className="text-xs text-gray-400">{sp}%</span>
                  </div>
                  <Bar value={sp} color={s.color} h="h-1"/>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skill being built */}
        <div className="bg-[#fffffe] rounded-2xl border border-[#efe9e0] shadow-sm p-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Skill progress</div>
          {(() => {
            const scores = skillProgress(checked);
            const s = scores[skill.skillId]||{done:0,total:1};
            const p = s.total>0?Math.round(s.done/s.total*100):0;
            return (
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-600">{skill.title}</span>
                  <span className="text-xs font-bold" style={{color:skill.color}}>{p}%</span>
                </div>
                <Bar value={p} color={skill.color} h="h-1.5"/>
              </div>
            );
          })()}
        </div>

        {/* Next milestone */}
        <NextMilestone checked={checked}/>
      </div>
    </div>
  );
}

function TaskSection({title, subtitle, tasks, checked, onToggle, color, tint, children}) {
  if (tasks.length===0 && !children) return null;
  const tintClass = tint==="violet"?"bg-violet-50/30":tint==="emerald"?"bg-emerald-50/30":"bg-indigo-50/30";
  return (
    <div className={"rounded-2xl border border-[#efe9e0] shadow-sm p-5 "+tintClass}>
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1.5 h-5 rounded-full" style={{background:color}}/>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-700">{title}</span>
        <span className="text-xs text-gray-400">{subtitle}</span>
      </div>
      {tasks.length>0 && (
        <div className="mt-3 space-y-1">
          {tasks.map(task=>(
            <label key={task.id} className={"flex items-start gap-3 py-1.5 px-2 -mx-2 rounded-lg cursor-pointer group transition-colors duration-200 "+(checked[task.id]?"bg-emerald-50/60":"hover:bg-indigo-50/50")}>
              <Checkbox checked={!!checked[task.id]} onChange={()=>onToggle(task.id)}/>
              <span className={"text-sm leading-snug pt-0.5 "+(checked[task.id]?"text-gray-400 line-through":"text-gray-700 group-hover:text-gray-900")}>{task.label}</span>
            </label>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

function NextMilestone({checked}) {
  const lessons = allLessons();
  const completedLessons = lessons.filter(l=>lessonDone(l,checked)).length;
  const tier2Total = PLAN.skills.filter(s=>s.tier===2).flatMap(s=>s.lessons).length;
  const totalLessons = lessons.length;
  const milestones = [
    {at:Math.ceil(tier2Total/2), label:"Building momentum", desc:"Core skills underway"},
    {at:tier2Total, label:"Core skills complete", desc:"Ready for the advanced track"},
    {at:totalLessons, label:"All skills complete", desc:"Interview-ready"},
  ];
  const next = milestones.find(m=>completedLessons<m.at);
  if (!next) return null;
  const pct = Math.round(completedLessons/next.at*100);
  return (
    <div className="bg-[#fffffe] rounded-2xl border border-[#efe9e0] shadow-sm p-5">
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Next milestone</div>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center text-amber-500">
          <Ic.Star/>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-800">{next.label}</div>
          <div className="text-xs text-gray-400">{next.desc}</div>
        </div>
      </div>
      <Bar value={pct} color="#f59e0b" h="h-1.5"/>
      <div className="text-xs text-gray-400 mt-1">{completedLessons} / {next.at} lessons</div>
    </div>
  );
}

// ─── JOURNEY VIEW ─────────────────────────────────────────────────────────────
function JourneyView({checked, setViewAndDay}) {
  const today = currentLesson(checked);
  return (
    <div className="p-8 max-w-4xl bg-[#faf9f7] min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Learning Journey</h2>
        <p className="text-gray-500 text-sm mt-1">Your skill map. Lessons within a skill can be done in any order.</p>
      </div>
      <div className="space-y-10">
        {PLAN.skills.map((skill,si)=>{
          const st = skillTasks(skill.skillId);
          const sd = st.filter(t=>checked[t.id]).length;
          const sp = st.length>0?Math.round(sd/st.length*100):0;
          const sComplete = sp===100;
          return (
            <div key={skill.id}>
              {/* Skill header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-lg font-extrabold shadow-sm" style={{background:skill.color}}>
                  {si+1}
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{color:skill.color}}>{skill.tier===3?"Advanced Skill":"Core Skill"}</div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-extrabold text-gray-900">{skill.title}</h3>
                    {sComplete && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Complete</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5 max-w-2xl">{skill.why}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold" style={{color:skill.color}}>{sp}%</div>
                  <div className="text-xs text-gray-400">{sd}/{st.length} tasks</div>
                </div>
              </div>
              <div className="ml-2 pl-8 border-l-2" style={{borderColor:skill.color+"40"}}>
                <div className="grid grid-cols-1 gap-2.5">
                  {skill.lessons.map((lesson,li)=>{
                    const done = lessonDone(lesson, checked);
                    const isToday = lesson.id===today?.id;
                    const lp = lessonProgress(lesson,checked);
                    const lDone = lesson.tasks.filter(t=>checked[t.id]).length;
                    return (
                      <button key={lesson.id} onClick={()=>setViewAndDay(lesson.id)}
                        className={"relative w-full text-left rounded-2xl px-4 py-3.5 border transition-all group "+(isToday?"border-transparent border-l-4 bg-indigo-50/50 shadow-sm":done?"border-emerald-200 bg-emerald-50":"border-[#efe9e0] bg-[#fffffe] hover:border-indigo-200 hover:shadow-sm")}
                        style={isToday?{borderLeftColor:skill.color}:undefined}>
                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                          style={{background:done?"#10b981":isToday?"#6366f1":"white", borderColor:done?"#10b981":isToday?"#6366f1":skill.color+"60"}}>
                          {done && <Ic.Check cls="w-2.5 h-2.5 text-white"/>}
                          {isToday && !done && <div className="w-2 h-2 rounded-full bg-indigo-600"/>}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={"text-xs font-medium "+(isToday?"text-indigo-500":done?"text-emerald-600":"text-gray-400")}>
                                Lesson {li+1}
                              </span>
                              {isToday && <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-medium">Up next</span>}
                            </div>
                            <div className={"text-sm font-semibold "+(done?"text-emerald-700":isToday?"text-indigo-900":"text-gray-800")}>{lesson.title}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{lesson.estimatedTime}</div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="text-xs text-gray-400">{lDone}/{lesson.tasks.length}</div>
                            {lp>0 && !done && <Bar value={lp*100} color={skill.color} h="h-1"/>}
                            <span className={"text-gray-300 group-hover:text-gray-500 transition-colors "+(isToday?"text-indigo-400":"")}><Ic.Chevron/></span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── SKILLS VIEW ──────────────────────────────────────────────────────────────
function SkillsView({checked}) {
  const scores = skillProgress(checked);
  const sorted = Object.entries(scores).sort((a,b)=>b[1].done/Math.max(b[1].total,1)-a[1].done/Math.max(a[1].total,1));
  const strongest = sorted[0];
  const weakest = [...sorted].reverse().find(([,s])=>s.total>0);
  return (
    <div className="p-8 max-w-3xl bg-[#faf9f7] min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Skill Progress</h2>
        <p className="text-gray-500 text-sm mt-1">Each completed lesson contributes to the skill it trains.</p>
      </div>
      {(strongest||weakest) && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {strongest && (
            <div className="bg-[#fffffe] rounded-2xl border border-[#efe9e0] shadow-sm p-5">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Strongest skill</div>
              <div className="text-sm font-bold text-gray-900 mb-1">{SKILL_MAP[strongest[0]]?.label}</div>
              <div className="text-2xl font-bold" style={{color:SKILL_MAP[strongest[0]]?.color}}>
                {strongest[1].total>0?Math.round(strongest[1].done/strongest[1].total*100):0}%
              </div>
            </div>
          )}
          {weakest && weakest[0]!==strongest?.[0] && (
            <div className="bg-[#fffffe] rounded-2xl border border-[#efe9e0] shadow-sm p-5">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Focus area</div>
              <div className="text-sm font-bold text-gray-900 mb-1">{SKILL_MAP[weakest[0]]?.label}</div>
              <div className="text-2xl font-bold text-gray-400">
                {weakest[1].total>0?Math.round(weakest[1].done/weakest[1].total*100):0}%
              </div>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(SKILL_MAP).map(([key,{label,color}])=>{
          const s = scores[key]||{done:0,total:0};
          const p = s.total>0?Math.round(s.done/s.total*100):0;
          return (
            <div key={key} className="bg-[#fffffe] rounded-2xl border border-[#efe9e0] shadow-sm p-5 flex items-center gap-4">
              <div className="flex-shrink-0">
                <ProgressRing value={p} size={56} stroke={5} color={color}/>
                <div className="text-center -mt-10 text-xs font-bold" style={{color}}>{p}%</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-800 mb-1">{label}</div>
                <div className="text-xs text-gray-400">{s.done} of {s.total} tasks done</div>
                {p===100 && <div className="mt-1 text-xs text-emerald-600 font-medium">Mastered</div>}
                {p>0 && p<100 && <div className="mt-1 text-xs text-indigo-500 font-medium">In progress</div>}
                {p===0 && s.total>0 && <div className="mt-1 text-xs text-gray-400">Not started</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PORTFOLIO VIEW ───────────────────────────────────────────────────────────
function PortfolioView({checked}) {
  const done = deliverablesDone(checked);
  const total = DELIVERABLES_CATALOG.length;
  const pct = Math.round(done.length/total*100);
  const skillGroups = PLAN.skills.map((s,si)=>({skill:s, index:si+1, items:DELIVERABLES_CATALOG.filter(d=>d.skillId===s.skillId)}));
  return (
    <div className="p-8 max-w-3xl bg-[#faf9f7] min-h-screen">
      <div className="mb-2">
        <h2 className="text-2xl font-bold text-gray-900">Portfolio Outputs</h2>
        <p className="text-gray-500 text-sm mt-1">Everything you are building. Visible proof of learning.</p>
      </div>
      <div className="flex items-center gap-4 mb-8 mt-4">
        <ProgressRing value={pct} size={64} stroke={6} color="#10b981"/>
        <div className="ml-1">
          <div className="text-3xl font-bold text-gray-900 -mt-16">{pct}%</div>
          <div className="text-xs text-gray-400 mt-16">{done.length} of {total} deliverables</div>
        </div>
        <div className="flex-1 ml-4">
          <Bar value={pct} color="#10b981" h="h-2"/>
          <div className="text-xs text-gray-400 mt-1">{total-done.length} remaining</div>
        </div>
      </div>
      <div className="space-y-8">
        {skillGroups.map(({skill,index,items})=>{
          if (items.length===0) return null;
          return (
            <div key={skill.id}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-lg flex-shrink-0 flex items-center justify-center text-white text-xs font-bold" style={{background:skill.color}}>{index}</div>
                <span className="text-sm font-semibold text-gray-700">{skill.title}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {items.map(d=>{
                  const isDone = done.find(x=>x.id===d.id);
                  return (
                    <div key={d.id} className={"flex items-start gap-3 p-4 rounded-2xl border shadow-sm transition-all "+(isDone?"border-emerald-200 bg-emerald-50":"border-[#efe9e0] bg-[#fffffe]")}>
                      <div className={"w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center text-xs font-bold "+(isDone?"bg-emerald-100 text-emerald-700":"bg-gray-100 text-gray-400")}>
                        {d.icon}
                      </div>
                      <div className="min-w-0">
                        <div className={"text-sm font-semibold "+(isDone?"text-emerald-800":"text-gray-700")}>{d.label}</div>
                        <div className="text-xs text-gray-400 mt-0.5 leading-snug">{d.desc}</div>
                      </div>
                      {isDone && <Ic.Check cls="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5"/>}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── RESOURCES VIEW ───────────────────────────────────────────────────────────
function ResourcesView({state, onResourceStatus}) {
  const [filter, setFilter] = useState("all");
  const statusLabels = {unread:"Not opened", opened:"Opened", done:"Completed"};
  return (
    <div className="p-8 max-w-3xl bg-[#faf9f7] min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Resource Library</h2>
        <p className="text-gray-500 text-sm mt-1">All links from the plan, grouped by topic. Track what you have read.</p>
      </div>
      <div className="flex gap-2 mb-6">
        {["all","video","docs","article","tool","reference"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className={"px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize "+(filter===f?"bg-indigo-600 text-white":"bg-[#fffffe] border border-[#efe9e0] text-gray-500 hover:border-indigo-200")}>
            {f==="all"?"All types":f}
          </button>
        ))}
      </div>
      <div className="space-y-6">
        {RESOURCES_CATALOG.map(section=>{
          const items = section.items.filter(r=>filter==="all"||r.type===filter);
          if (items.length===0) return null;
          return (
            <div key={section.category}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">{section.category}</h3>
              <div className="space-y-2">
                {items.map((r,i)=>{
                  const key = r.url;
                  const status = state.resourceStatus?.[key]||"unread";
                  return (
                    <div key={i} className={"flex items-center gap-3 p-4 rounded-2xl border shadow-sm bg-[#fffffe] transition-all "+(status==="done"?"border-emerald-200":status==="opened"?"border-indigo-100":"border-[#efe9e0]")}>
                      <ResourceBadge type={r.type}/>
                      <a href={r.url} target="_blank" rel="noopener noreferrer"
                        onClick={()=>{if(status==="unread")onResourceStatus(key,"opened");}}
                        className="flex-1 min-w-0 group">
                        <div className={"text-sm font-medium group-hover:text-indigo-600 transition-colors "+(status==="done"?"text-gray-400 line-through":"text-gray-700")}>{r.label}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{SKILL_MAP[r.skillId]?.label||r.skillId} - {r.time}</div>
                      </a>
                      <select
                        value={status}
                        onChange={e=>onResourceStatus(key,e.target.value)}
                        className={"text-xs border rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 "+(status==="done"?"border-emerald-200 text-emerald-700 bg-emerald-50":status==="opened"?"border-indigo-200 text-indigo-600 bg-indigo-50":"border-gray-200 text-gray-500")}>
                        {Object.entries(statusLabels).map(([v,l])=><option key={v} value={v}>{l}</option>)}
                      </select>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [state, setState] = useState(load);
  const [view, setView] = useState("today");
  const [focusLessonId, setFocusLessonId] = useState(null);
  const { checked, notes } = state;

  const persist = useCallback(next=>{ setState(next); save(next); }, []);

  function toggleTask(id) {
    const next = {...state, checked:{...checked, [id]:!checked[id]}};
    const d = todayStr();
    if (!next.startedDate) next.startedDate = d;
    persist(next);
  }
  function setNote(lessonId, value) {
    persist({...state, notes:{...notes, [lessonId]:value}});
  }
  function setResourceStatus(key, status) {
    persist({...state, resourceStatus:{...(state.resourceStatus||{}), [key]:status}});
  }
  function setViewAndLesson(lessonId) {
    setFocusLessonId(lessonId);
    setView("today");
  }

  // If a specific lesson is focused (from journey), override currentLesson
  const today = focusLessonId ? allLessons().find(l=>l.id===focusLessonId)||currentLesson(checked) : currentLesson(checked);

  return (
    <div className="flex bg-[#faf9f7] min-h-screen font-sans" style={{fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <Sidebar active={view} setActive={(v)=>{setView(v);setFocusLessonId(null);}} checked={checked}/>
      <main className="flex-1 overflow-auto">
        {view==="today" && (
          <TodayView
            checked={checked} notes={notes}
            onToggle={toggleTask} onNote={setNote}
            state={state}
            sessionActive={state.sessionActive}
            onStartSession={()=>persist({...state, sessionActive:today?.id})}
            onEndSession={()=>persist({...state, sessionActive:null})}
          />
        )}
        {view==="journey" && <JourneyView checked={checked} setViewAndDay={setViewAndLesson}/>}
        {view==="skills" && <SkillsView checked={checked}/>}
        {view==="portfolio" && <PortfolioView checked={checked}/>}
        {view==="resources" && <ResourcesView state={state} onResourceStatus={setResourceStatus}/>}
      </main>
    </div>
  );
}
