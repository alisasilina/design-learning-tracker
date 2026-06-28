import { useState, useCallback, useEffect } from "react";

// ─── PALETTE & CONSTANTS ────────────────────────────────────────────────────
// Slate sidebar #0f172a, canvas #f8f7f4 (warm white), accent indigo #6366f1,
// accent emerald #10b981 for completion, amber #f59e0b for streak/milestone
// Body: system-ui stack. Numbers/labels: tabular figures via font-variant-numeric

// ─── DATA ────────────────────────────────────────────────────────────────────
const SKILL_MAP = {
  "variables":     { label: "Variables & Tokens",   color: "#6366f1" },
  "components":    { label: "Components & Variants", color: "#8b5cf6" },
  "autolayout":    { label: "Auto Layout",           color: "#a78bfa" },
  "designsystems": { label: "Design Systems",        color: "#06b6d4" },
  "devmode":       { label: "Dev Mode & Handoff",    color: "#0ea5e9" },
  "figmaai":       { label: "Figma AI",              color: "#f59e0b" },
  "claude":        { label: "Claude Workflows",      color: "#f97316" },
  "uxwriting":     { label: "UX Writing & Docs",     color: "#10b981" },
  "prototyping":   { label: "Prototyping",           color: "#ec4899" },
  "vibecoding":    { label: "Vibe Coding",           color: "#ef4444" },
};

const DELIVERABLES_CATALOG = [
  { id: "d1", label: "Color Token System",       desc: "Primitive + semantic color variables in Figma", week: 1, dayId: "w1d1", icon: "T" },
  { id: "d2", label: "Full Token File",          desc: "Color, spacing, radius + dark mode toggle",     week: 1, dayId: "w1d2", icon: "T" },
  { id: "d3", label: "Rebuilt Component",        desc: "One component with properties + tokens",        week: 1, dayId: "w1d3", icon: "C" },
  { id: "d4", label: "Button Component Set",     desc: "3 properties, clean variant grid",              week: 1, dayId: "w1d4", icon: "C" },
  { id: "d5", label: "Auto Layout Screen",       desc: "Rebuilt screen - zero manual positioning",      week: 1, dayId: "w1d5", icon: "S" },
  { id: "d6", label: "Annotated Handoff Screen", desc: "Dev Mode annotations + spec note",              week: 1, dayId: "w1d6", icon: "H" },
  { id: "d7", label: "Project 01 - Rebuilt Screen", desc: "Portfolio piece foundation",                 week: 1, dayId: "w1d7", icon: "P" },
  { id: "d8", label: "DS File Structure",        desc: "Figma file with written plan + pages",          week: 2, dayId: "w2d1", icon: "S" },
  { id: "d9", label: "Typography System",        desc: "8+ text styles paired and documented",          week: 2, dayId: "w2d2", icon: "T" },
  { id: "d10", label: "Atom Components x4",      desc: "Badge, Avatar, Button, Input - token-connected",week: 2, dayId: "w2d3", icon: "C" },
  { id: "d11", label: "Molecule Components x4",  desc: "Form field, Table row, Nav item, Card",         week: 2, dayId: "w2d4", icon: "C" },
  { id: "d12", label: "Usage Documentation",     desc: "Do/Don't, anatomy, descriptions per component", week: 2, dayId: "w2d5", icon: "D" },
  { id: "d13", label: "Accessible Components",   desc: "Contrast-checked + focus states",               week: 2, dayId: "w2d6", icon: "A" },
  { id: "d14", label: "Mini Design System",      desc: "Portfolio Piece #1 - complete system",          week: 2, dayId: "w2d7", icon: "P" },
  { id: "d15", label: "Figma AI Experiments",    desc: "3 AI-generated experiments with notes",         week: 3, dayId: "w3d1", icon: "AI" },
  { id: "d16", label: "AI-Written Component Docs", desc: "2 components documented with Claude",         week: 3, dayId: "w3d2", icon: "D" },
  { id: "d17", label: "3 Lo-fi Wireframes",      desc: "Structural sketches + decision note",           week: 3, dayId: "w3d3", icon: "W" },
  { id: "d18", label: "Research Brief",          desc: "User goals, pain points, JTBD - via Claude",    week: 3, dayId: "w3d4", icon: "R" },
  { id: "d19", label: "AI User Flow",            desc: "6-8 screen lo-fi flow with AI outline",         week: 3, dayId: "w3d5", icon: "W" },
  { id: "d20", label: "MCP Workflow Notes",      desc: "What Figma MCP can/cannot do for your workflow",week: 3, dayId: "w3d6", icon: "AI" },
  { id: "d21", label: "Project 02 - AI Feature", desc: "Portfolio Piece #2 - AI-assisted feature flow", week: 3, dayId: "w3d7", icon: "P" },
  { id: "d22", label: "Variable Prototype",      desc: "2+ variable-driven interactions, no screen links",week: 4, dayId: "w4d1", icon: "PR" },
  { id: "d23", label: "Complex Prototype",       desc: "Interview-ready interaction + screen recording", week: 4, dayId: "w4d2", icon: "PR" },
  { id: "d24", label: "Vibe-coded Component",    desc: "HTML notification component via Claude",         week: 4, dayId: "w4d3", icon: "VC" },
  { id: "d25", label: "Vibe-coded Screen",       desc: "Full screen coded via Claude + 5 handoff insights", week: 4, dayId: "w4d4", icon: "VC" },
  { id: "d26", label: "5-Lens Critique",         desc: "Written critique of 2 screens",                 week: 4, dayId: "w4d5", icon: "CR" },
  { id: "d27", label: "Interview Answers",       desc: "6 written answers + polished Figma files",      week: 4, dayId: "w4d6", icon: "IV" },
];

const PLAN = { weeks: [
  { id:"w1", number:1, theme:"Figma Foundation Rebuilt",
    tagline:"Variables, components, and modern Figma structure.",
    color:"#6366f1", skills:["variables","components","autolayout","devmode"],
    finalDeliverable:"Rebuilt screen with full token system + annotated handoff",
    days:[
      { id:"w1d1", weekId:"w1", dayNumber:1, isReview:false,
        topic:"Variables Part 1 - Color Tokens",
        why:"Variables replaced styles in 2023. Every modern Figma workflow depends on them. This is the single biggest gap to close.",
        goal:"Understand why variables beat styles, and build your first color system.",
        estimatedTime:"2-2.5 hrs", skills:["variables"],
        reflectionPrompt:"Could you explain the difference between primitive and semantic tokens to a junior designer?",
        resources:[
          { label:"Figma Official: Guide to Variables", url:"https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma", type:"docs", time:"20 min" },
          { label:"YouTube: Variables Intro (Figma, 14 min)", url:"https://www.youtube.com/watch?v=1ONxxlJnvdM", type:"video", time:"14 min" },
          { label:"Read: Figma Variables Complete Guide 2024", url:"https://uxdesign.cc/figma-variables-the-complete-guide-2024", type:"article", time:"15 min" },
        ],
        tasks:[
          { id:"w1d1t1", label:"Watch and read all 3 resources", phase:"learn" },
          { id:"w1d1t2", label:'Create Figma file: "My Token System"', phase:"practice" },
          { id:"w1d1t3", label:"Set up color primitives: Gray/10-Gray/900, Blue/50-Blue/700", phase:"practice" },
          { id:"w1d1t4", label:"Set up semantic collection: background/primary, text/default, border/default", phase:"practice" },
          { id:"w1d1t5", label:"Link semantics to primitives", phase:"practice" },
          { id:"w1d1t6", label:"Apply to 3 sample frames", phase:"practice" },
          { id:"w1d1t7", label:"Verify: change a primitive and watch all 3 frames update", phase:"deliver" },
        ],
        deliverable:"A Figma file with 2 variable collections and 3 frames that respond to them." },
      { id:"w1d2", weekId:"w1", dayNumber:2, isReview:false,
        topic:"Variables Part 2 - Spacing, Radius and Modes",
        why:"A complete token system covers more than color. Spacing and radius tokens let you resize your entire UI from one place.",
        goal:"Build a complete token system including spacing, radius, and a dark mode.",
        estimatedTime:"2-2.5 hrs", skills:["variables"],
        reflectionPrompt:"What would break in your token system if you removed the semantic layer?",
        resources:[
          { label:"YouTube: Variables for Spacing and Sizing", url:"https://www.youtube.com/watch?v=P5g6JBGkBMQ", type:"video", time:"18 min" },
          { label:"Figma Docs: Modes section", url:"https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma", type:"docs", time:"10 min" },
        ],
        tasks:[
          { id:"w1d2t1", label:"Watch spacing/sizing video", phase:"learn" },
          { id:"w1d2t2", label:"Add spacing collection: space/2, /4, /8, /12, /16, /24, /32", phase:"practice" },
          { id:"w1d2t3", label:"Add radius collection: sm(4), md(8), lg(16)", phase:"practice" },
          { id:"w1d2t4", label:"Add dark mode - duplicate light values and remap", phase:"practice" },
          { id:"w1d2t5", label:"Create a toggle prototype to switch between modes", phase:"deliver" },
        ],
        deliverable:"Extended token file with dark mode working on at least 1 frame." },
      { id:"w1d3", weekId:"w1", dayNumber:3, isReview:false,
        topic:"Component Architecture",
        why:"Your components exist but variants and properties are underused. This makes your library fragile and hard to scale.",
        goal:"Learn how to think about components before building them.",
        estimatedTime:"2-2.5 hrs", skills:["components"],
        reflectionPrompt:"What is the difference between a component property and a variant? When would you use each?",
        resources:[
          { label:"YouTube: Component Properties Deep Dive", url:"https://www.youtube.com/watch?v=k74IrUNaJVk", type:"video", time:"20 min" },
          { label:"Figma: Building Component Libraries", url:"https://www.figma.com/best-practices/building-and-using-component-libraries/", type:"docs", time:"15 min" },
        ],
        tasks:[
          { id:"w1d3t1", label:"Watch and read both resources", phase:"learn" },
          { id:"w1d3t2", label:"Pick one past component (button, badge, or input)", phase:"practice" },
          { id:"w1d3t3", label:"Rebuild with: Component properties (text, boolean, instance swap)", phase:"practice" },
          { id:"w1d3t4", label:"Apply Auto Layout on ALL layers", phase:"practice" },
          { id:"w1d3t5", label:"Connect all values to tokens", phase:"practice" },
          { id:"w1d3t6", label:"Name all layers cleanly", phase:"practice" },
          { id:"w1d3t7", label:"Verify: swap label, toggle icon, change state - without detaching", phase:"deliver" },
        ],
        deliverable:"1 rebuilt component, properly structured with properties." },
      { id:"w1d4", weekId:"w1", dayNumber:4, isReview:false,
        topic:"Variants",
        why:"Variants let you encode all component states in one place. Without them, designers duplicate frames and engineers miss states.",
        goal:"Build multi-state, multi-variant components properly.",
        estimatedTime:"2-2.5 hrs", skills:["components"],
        reflectionPrompt:"What is the matrix trap, and how did you avoid it today?",
        resources:[
          { label:"YouTube: Variants Masterclass (18 min)", url:"https://www.youtube.com/watch?v=y29Xwt9dET0", type:"video", time:"18 min" },
          { label:"Figma Docs: Create and Use Variants", url:"https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants", type:"docs", time:"10 min" },
        ],
        tasks:[
          { id:"w1d4t1", label:"Watch and read both resources", phase:"learn" },
          { id:"w1d4t2", label:"Add Size variants: sm / md / lg", phase:"practice" },
          { id:"w1d4t3", label:"Add State variants: default / hover / active / disabled", phase:"practice" },
          { id:"w1d4t4", label:"Add Type variants: primary / secondary / ghost", phase:"practice" },
          { id:"w1d4t5", label:"Use properties to toggle icon visibility", phase:"practice" },
          { id:"w1d4t6", label:"Reduce total variants by using properties smartly", phase:"deliver" },
        ],
        deliverable:"A button component set with 3 properties, clean variant grid, token-connected." },
      { id:"w1d5", weekId:"w1", dayNumber:5, isReview:false,
        topic:"Auto Layout Gaps",
        why:"You have solid spatial instincts. Closing the wrap, absolute positioning, and fill container gaps makes you truly fluent.",
        goal:"Identify and close your Auto Layout knowledge gaps.",
        estimatedTime:"2 hrs", skills:["autolayout"],
        reflectionPrompt:"Where in your past work would absolute positioning inside Auto Layout have saved you the most time?",
        resources:[
          { label:"Figma Docs: Auto Layout", url:"https://help.figma.com/hc/en-us/articles/360040451373", type:"docs", time:"20 min" },
        ],
        tasks:[
          { id:"w1d5t1", label:"Read docs: wrap, gap, absolute position, fill container vs hug", phase:"learn" },
          { id:"w1d5t2", label:"Rebuild a real screen from memory (dashboard card, table row, or sidebar)", phase:"practice" },
          { id:"w1d5t3", label:"Rule: everything must be Auto Layout - zero manual positioning", phase:"practice" },
          { id:"w1d5t4", label:"Use your tokens for ALL spacing", phase:"deliver" },
        ],
        deliverable:"1 rebuilt screen section using only Auto Layout and tokens." },
      { id:"w1d6", weekId:"w1", dayNumber:6, isReview:false,
        topic:"Dev Mode and Handoff",
        why:"Engineers are missing structured specs from your files right now. Dev Mode fixes this in an afternoon.",
        goal:"Learn Dev Mode so engineers never need to ask questions.",
        estimatedTime:"2 hrs", skills:["devmode"],
        reflectionPrompt:"What information was missing from your previous handoff files that Dev Mode would have provided?",
        resources:[
          { label:"YouTube: Dev Mode Overview (Figma, 2024)", url:"https://www.youtube.com/watch?v=LoMNKrv2RJc", type:"video", time:"22 min" },
          { label:"Figma Docs: Guide to Dev Mode", url:"https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode", type:"docs", time:"15 min" },
        ],
        tasks:[
          { id:"w1d6t1", label:"Watch and read both resources", phase:"learn" },
          { id:"w1d6t2", label:"Open Day 5 screen in Dev Mode", phase:"practice" },
          { id:"w1d6t3", label:"Add annotations using the built-in annotation tool", phase:"practice" },
          { id:"w1d6t4", label:"Check how your token names appear to developers", phase:"practice" },
          { id:"w1d6t5", label:'Write a short design spec comment block inside the file', phase:"deliver" },
        ],
        deliverable:"1 annotated screen ready for handoff, with a written spec note." },
      { id:"w1d7", weekId:"w1", dayNumber:7, isReview:true,
        topic:"Review Day",
        why:"Consolidation is part of learning. The gaps you find today prevent bad habits from embedding.",
        goal:"Review Week 1. Fix gaps. Write your reflection.",
        estimatedTime:"1 hr", skills:["variables","components"],
        reflectionPrompt:"If you had to teach someone the single most important thing you learned this week, what would it be?",
        resources:[],
        tasks:[
          { id:"w1d7t1", label:"Review all Week 1 Figma files", phase:"learn" },
          { id:"w1d7t2", label:"Fix anything that feels unclear or unfinished", phase:"practice" },
          { id:"w1d7t3", label:"Write: 3 things you learned + 1 thing still confusing", phase:"practice" },
          { id:"w1d7t4", label:'Token Audit: rebuild one past screen with all variables. Save as "Project 01"', phase:"deliver" },
        ],
        deliverable:'Save as: "Project 01 - Rebuilt Screen"' },
    ]},
  { id:"w2", number:2, theme:"Building a Mini Design System",
    tagline:"Create a complete, portfolio-ready design system from scratch.",
    color:"#8b5cf6", skills:["designsystems","components","variables"],
    finalDeliverable:"Mini Design System - Portfolio Piece #1",
    days:[
      { id:"w2d1", weekId:"w2", dayNumber:1, isReview:false,
        topic:"Design System Planning",
        why:"You have never built a design system from scratch. This is the single most asked-about skill in senior designer interviews.",
        goal:"Learn how real design systems are structured before touching Figma.",
        estimatedTime:"2 hrs", skills:["designsystems"],
        reflectionPrompt:"What 3 design principles would define your system, and why those three?",
        resources:[
          { label:"designsystems.com", url:"https://www.designsystems.com/", type:"article", time:"20 min" },
          { label:"Study: Material Design 3", url:"https://m3.material.io/", type:"reference", time:"20 min" },
          { label:"How to Build a Design System in Figma 2024", url:"https://uxdesign.cc/how-to-build-a-design-system-in-figma-2024", type:"article", time:"15 min" },
        ],
        tasks:[
          { id:"w2d1t1", label:"Read all 3 resources", phase:"learn" },
          { id:"w2d1t2", label:"Plan tokens: color, spacing, radius, typography", phase:"practice" },
          { id:"w2d1t3", label:"Plan component list (pick 8-10)", phase:"practice" },
          { id:"w2d1t4", label:"Write 3 design principles", phase:"practice" },
          { id:"w2d1t5", label:"Create Figma file structure: Tokens / Foundation / Components / Patterns", phase:"deliver" },
        ],
        deliverable:"File structure + written plan on the first page." },
      { id:"w2d2", weekId:"w2", dayNumber:2, isReview:false,
        topic:"Typography System",
        why:"Typography is the first thing that makes a design system feel polished or amateur.",
        goal:"Build a type scale using variables and styles together.",
        estimatedTime:"2 hrs", skills:["designsystems"],
        reflectionPrompt:"How does your type scale handle the jump from body text to a dashboard display number?",
        resources:[
          { label:"YouTube: Typography in Figma Systems (2024)", url:"https://www.youtube.com/watch?v=KSSQ6RKqHKs", type:"video", time:"18 min" },
          { label:"typescale.com - generate your scale", url:"https://typescale.com/", type:"tool", time:"10 min" },
        ],
        tasks:[
          { id:"w2d2t1", label:"Watch video and use typescale.com to plan your scale", phase:"learn" },
          { id:"w2d2t2", label:"Set up: Display, H1-H3, Body/lg, Body/md, Body/sm, Label, Caption", phase:"practice" },
          { id:"w2d2t3", label:"Set size, line-height, weight for each style", phase:"practice" },
          { id:"w2d2t4", label:"Create a Typography page showing all styles in use", phase:"practice" },
          { id:"w2d2t5", label:"Pair 1 display font with 1 body font", phase:"deliver" },
        ],
        deliverable:"Typography page with 8+ defined text styles." },
      { id:"w2d3", weekId:"w2", dayNumber:3, isReview:false,
        topic:"Component Library - Atoms",
        why:"Atoms are the building blocks. Get these right and every molecule and organism inherits their quality.",
        goal:"Build core atom components using your design system tokens.",
        estimatedTime:"2.5-3 hrs", skills:["components","variables"],
        reflectionPrompt:"Which atom was hardest to structure? What did that teach you?",
        resources:[],
        tasks:[
          { id:"w2d3t1", label:"Build Badge (3 colors, 2 sizes)", phase:"practice" },
          { id:"w2d3t2", label:"Build Avatar (initials + image variant, 3 sizes)", phase:"practice" },
          { id:"w2d3t3", label:"Polish Button from Week 1 and add to system", phase:"practice" },
          { id:"w2d3t4", label:"Build Input field (default, focus, error, disabled)", phase:"practice" },
          { id:"w2d3t5", label:"Verify: every atom uses tokens - no hardcoded values", phase:"deliver" },
        ],
        deliverable:"4 atom components, token-connected, with proper variants and properties." },
      { id:"w2d4", weekId:"w2", dayNumber:4, isReview:false,
        topic:"Component Library - Molecules",
        why:"Molecules prove your atoms work. If composition breaks here, your token or variant structure is wrong.",
        goal:"Build molecule components by composing atoms.",
        estimatedTime:"2.5-3 hrs", skills:["components"],
        reflectionPrompt:"Where did you find yourself reaching for a new component instead of composing existing atoms?",
        resources:[],
        tasks:[
          { id:"w2d4t1", label:"Build Form field (label + input + error message)", phase:"practice" },
          { id:"w2d4t2", label:"Build Table row (checkbox + avatar + text + badge + actions)", phase:"practice" },
          { id:"w2d4t3", label:"Build Navigation item (icon + label + active state)", phase:"practice" },
          { id:"w2d4t4", label:"Build Card (header + content + footer with actions)", phase:"practice" },
          { id:"w2d4t5", label:"Verify: all molecules use atom instances - no detached copies", phase:"deliver" },
        ],
        deliverable:"4 molecule components using atom components." },
      { id:"w2d5", weekId:"w2", dayNumber:5, isReview:false,
        topic:"Patterns and Usage Documentation",
        why:"Documentation is what separates a design system from a component library. It's also what interviewers look for.",
        goal:"Document your system inside Figma.",
        estimatedTime:"2 hrs", skills:["designsystems","uxwriting"],
        reflectionPrompt:"What would a new designer on your team need to understand to use your system confidently?",
        resources:[
          { label:"Atlassian: How they document components", url:"https://atlassian.design/components/button/usage", type:"reference", time:"15 min" },
        ],
        tasks:[
          { id:"w2d5t1", label:"Study Atlassian's component documentation style", phase:"learn" },
          { id:"w2d5t2", label:'Create "Usage" frames with Do/Don\'t examples', phase:"practice" },
          { id:"w2d5t3", label:'"When to use this component" note on each', phase:"practice" },
          { id:"w2d5t4", label:"Add anatomy labels", phase:"practice" },
          { id:"w2d5t5", label:"Write plain-English descriptions for all 4 components", phase:"deliver" },
        ],
        deliverable:'Four documented components on a "Usage" page.' },
      { id:"w2d6", weekId:"w2", dayNumber:6, isReview:false,
        topic:"Accessibility Basics",
        why:"Accessibility is not optional. AA contrast failures block promotions and portfolio reviews at good companies.",
        goal:"Make your design system accessible.",
        estimatedTime:"2 hrs", skills:["designsystems"],
        reflectionPrompt:"Which of your components failed the contrast check, and what did you change?",
        resources:[
          { label:"Figma Accessibility Resources", url:"https://www.figma.com/accessibility/", type:"docs", time:"15 min" },
          { label:"WebAIM Contrast Checker", url:"https://webaim.org/resources/contrastchecker/", type:"tool", time:"10 min" },
          { label:"YouTube: Accessibility in Design Systems (30 min)", url:"https://www.youtube.com/watch?v=aqR6EoM8oM0", type:"video", time:"30 min" },
        ],
        tasks:[
          { id:"w2d6t1", label:"Read and watch all 3 resources", phase:"learn" },
          { id:"w2d6t2", label:'Check all component colors with the Figma "Contrast" plugin', phase:"practice" },
          { id:"w2d6t3", label:"Add focus states to all interactive components", phase:"practice" },
          { id:"w2d6t4", label:"Label one frame with accessibility annotations", phase:"deliver" },
        ],
        deliverable:"Contrast-checked components with accessible focus states." },
      { id:"w2d7", weekId:"w2", dayNumber:7, isReview:true,
        topic:"Review Day + Portfolio Piece #1",
        why:"This is the moment your work becomes a portfolio piece. Treat the README like a product brief.",
        goal:"Write the Design System README and finalize Portfolio Piece #1.",
        estimatedTime:"1 hr", skills:["designsystems","uxwriting"],
        reflectionPrompt:"How would you present this design system in a 10-minute interview walkthrough?",
        resources:[],
        tasks:[
          { id:"w2d7t1", label:"Write the Design System README inside Figma", phase:"learn" },
          { id:"w2d7t2", label:"README: what the system is for, how to use tokens, how to contribute", phase:"practice" },
          { id:"w2d7t3", label:"Verify: 8+ components, variants, properties, light + dark mode", phase:"practice" },
          { id:"w2d7t4", label:'Save as: "Mini Design System - [Your Name]" - Portfolio Piece #1', phase:"deliver" },
        ],
        deliverable:"Portfolio Piece #1: Mini Design System, complete and named." },
    ]},
  { id:"w3", number:3, theme:"AI Tools in the Design Workflow",
    tagline:"Make AI a genuine part of how you work, not just an experiment.",
    color:"#f59e0b", skills:["figmaai","claude","uxwriting"],
    finalDeliverable:"AI-Assisted Feature Flow - Portfolio Piece #2",
    days:[
      { id:"w3d1", weekId:"w3", dayNumber:1, isReview:false,
        topic:"Figma AI Features",
        why:"AI is now table stakes in 2025-2026. Not knowing what Figma AI can do is a visible gap in interviews.",
        goal:"Know what Figma AI can actually do right now.",
        estimatedTime:"2-2.5 hrs", skills:["figmaai"],
        reflectionPrompt:"Which Figma AI feature saved the most time? Which was disappointing?",
        resources:[
          { label:"Figma AI - official overview", url:"https://www.figma.com/ai/", type:"docs", time:"20 min" },
          { label:"Figma Help: Figma AI Overview", url:"https://help.figma.com/hc/en-us/articles/23905654528791-Figma-AI-overview", type:"docs", time:"15 min" },
        ],
        tasks:[
          { id:"w3d1t1", label:"Read both resources", phase:"learn" },
          { id:"w3d1t2", label:'Use "Make design" to generate a rough layout', phase:"practice" },
          { id:"w3d1t3", label:'Use "Rename layers" on a messy file', phase:"practice" },
          { id:"w3d1t4", label:'Use "Generate content" to fill components with realistic copy', phase:"practice" },
          { id:"w3d1t5", label:"Screenshot what worked and what did not - you will need this for interviews", phase:"deliver" },
        ],
        deliverable:"A Figma file with 3 AI-generated experiments and your notes on each." },
      { id:"w3d2", weekId:"w3", dayNumber:2, isReview:false,
        topic:"Claude for UX Writing and Documentation",
        why:"Claude is the most useful AI tool for designers right now. Most designers do not know how to prompt it effectively.",
        goal:"Use Claude as a real design tool for copy and specs.",
        estimatedTime:"2 hrs", skills:["claude","uxwriting"],
        reflectionPrompt:"What prompt produced the most useful output today? What would you change about how you asked?",
        resources:[
          { label:"Prompt Engineering Basics (Anthropic Docs)", url:"https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", type:"docs", time:"20 min" },
        ],
        tasks:[
          { id:"w3d2t1", label:"Read resource (30 min)", phase:"learn" },
          { id:"w3d2t2", label:"Paste a screen description - ask Claude to write all UI copy", phase:"practice" },
          { id:"w3d2t3", label:"Describe a user flow - ask Claude to write a structured design spec", phase:"practice" },
          { id:"w3d2t4", label:"Ask Claude to critique a design decision you made recently", phase:"practice" },
          { id:"w3d2t5", label:"Save documentation for 2 design system components written with Claude", phase:"deliver" },
        ],
        deliverable:"Documentation for 2 design system components, written with Claude's help." },
      { id:"w3d3", weekId:"w3", dayNumber:3, isReview:false,
        topic:"AI-Assisted Concept Exploration",
        why:"The fastest way to generate structural options is AI. Most designers spend too long on the first idea.",
        goal:"Use Claude and ChatGPT to generate and compare UI direction ideas.",
        estimatedTime:"2 hrs", skills:["claude","figmaai"],
        reflectionPrompt:"How did AI-generated structural options change which direction you chose?",
        resources:[],
        tasks:[
          { id:"w3d3t1", label:"Pick a B2B screen you know well (e.g. analytics dashboard)", phase:"learn" },
          { id:"w3d3t2", label:"In Claude: ask for 3 structural approaches (layout logic, hierarchy, navigation)", phase:"practice" },
          { id:"w3d3t3", label:"In ChatGPT: ask for competitor analysis of 3 real products", phase:"practice" },
          { id:"w3d3t4", label:"In Figma: sketch the 3 approaches as lo-fi wireframes (15 min each)", phase:"practice" },
          { id:"w3d3t5", label:"Pick the strongest and annotate why", phase:"deliver" },
        ],
        deliverable:"3 lo-fi structural sketches in Figma + a short decision note." },
      { id:"w3d4", weekId:"w3", dayNumber:4, isReview:false,
        topic:"AI-Assisted UX Research",
        why:"You have theoretical UX knowledge but have not practiced on a real product. AI lets you simulate research without a user panel.",
        goal:"Learn to use AI for research synthesis.",
        estimatedTime:"2 hrs", skills:["claude","uxwriting"],
        reflectionPrompt:"How reliable do you think the AI-generated user quotes felt? What would real data change?",
        resources:[
          { label:"NNGroup: AI for UX Research", url:"https://nngroup.com/articles/ai-ux-research/", type:"article", time:"15 min" },
        ],
        tasks:[
          { id:"w3d4t1", label:"Read the NNGroup article", phase:"learn" },
          { id:"w3d4t2", label:"Ask Claude to generate 10 user interview questions for a product you know", phase:"practice" },
          { id:"w3d4t3", label:"Write 5 fake user quotes - ask Claude to synthesize themes", phase:"practice" },
          { id:"w3d4t4", label:"Ask Claude to write a JTBD statement for your product", phase:"practice" },
          { id:"w3d4t5", label:"Ask Claude to generate a competitive analysis table for 3 competitors", phase:"deliver" },
        ],
        deliverable:'A 1-page "Research Brief" with user goals, pain points, and JTBD statements.' },
      { id:"w3d5", weekId:"w3", dayNumber:5, isReview:false,
        topic:"AI-Assisted User Flows and Wireframing",
        why:"Jumping straight to UI is dangerous in interviews where process is evaluated. AI makes wireframing fast enough to stop skipping it.",
        goal:"Use AI to escape the straight-to-UI trap.",
        estimatedTime:"2 hrs", skills:["claude","figmaai"],
        reflectionPrompt:"How did starting with a text-based flow change the quality of your wireframe decisions?",
        resources:[
          { label:"AI Wireframing 2024 - Tools and Workflow", url:"https://uxdesign.cc/ai-wireframing-2024-tools-and-workflow", type:"article", time:"12 min" },
        ],
        tasks:[
          { id:"w3d5t1", label:"Read the article", phase:"learn" },
          { id:"w3d5t2", label:'Pick feature: "User onboarding for a B2B SaaS tool"', phase:"practice" },
          { id:"w3d5t3", label:"Ask Claude to outline the user flow (steps, decisions, edge cases)", phase:"practice" },
          { id:"w3d5t4", label:"Ask Claude to list content requirements for each screen", phase:"practice" },
          { id:"w3d5t5", label:"In Figma: build lo-fi wireframes as basic shapes only", phase:"practice" },
          { id:"w3d5t6", label:"Bring in design system components for later mid-fi frames", phase:"deliver" },
        ],
        deliverable:"A 6-8 screen lo-fi user flow in Figma with an AI-generated outline attached." },
      { id:"w3d6", weekId:"w3", dayNumber:6, isReview:false,
        topic:"Figma MCP - Introduction",
        why:"Figma MCP is the next frontier of AI-assisted design. Being able to talk about it in 2025-2026 signals senior awareness.",
        goal:"Understand what Figma MCP is and run your first real workflow.",
        estimatedTime:"2 hrs", skills:["figmaai","claude"],
        reflectionPrompt:"What Figma workflow would benefit most from MCP integration in your current project?",
        resources:[
          { label:"Figma MCP - official documentation", url:"https://www.figma.com/developers/mcp", type:"docs", time:"20 min" },
          { label:"MCP: Introduction (Model Context Protocol)", url:"https://modelcontextprotocol.io/introduction", type:"docs", time:"15 min" },
        ],
        tasks:[
          { id:"w3d6t1", label:"Read both resources", phase:"learn" },
          { id:"w3d6t2", label:'Search YouTube: "Figma MCP Claude 2025" - watch one community demo', phase:"learn" },
          { id:"w3d6t3", label:"Set up Figma MCP with Claude Desktop", phase:"practice" },
          { id:"w3d6t4", label:"Ask Claude to describe the structure of a Figma frame", phase:"practice" },
          { id:"w3d6t5", label:"Ask Claude to suggest improvements to a component", phase:"practice" },
          { id:"w3d6t6", label:"Write notes: what MCP can and cannot do for your workflow", phase:"deliver" },
        ],
        deliverable:"Notes on what Figma MCP can and cannot do for your workflow." },
      { id:"w3d7", weekId:"w3", dayNumber:7, isReview:true,
        topic:"Review Day + Portfolio Piece #2",
        why:"This project synthesizes everything from Week 3. It should feel like a real design process, not a homework exercise.",
        goal:"Build the AI-Assisted Feature Design and update your portfolio.",
        estimatedTime:"1 hr", skills:["claude","figmaai","uxwriting"],
        reflectionPrompt:"How will you describe your AI workflow in a portfolio walkthrough?",
        resources:[],
        tasks:[
          { id:"w3d7t1", label:"Review all AI experiments from the week", phase:"learn" },
          { id:"w3d7t2", label:'Write: "How will I use AI in my workflow?" - 5 bullet points', phase:"practice" },
          { id:"w3d7t3", label:"Build the end-of-week project: AI-Assisted Feature Design", phase:"practice" },
          { id:"w3d7t4", label:'Save as: "Project 02 - AI-Assisted Feature Flow" - Portfolio Piece #2', phase:"deliver" },
        ],
        deliverable:'Portfolio Piece #2: "Project 02 - AI-Assisted Feature Flow"' },
    ]},
  { id:"w4", number:4, theme:"Prototyping, Vibe Coding and Critique",
    tagline:"Three skills that immediately separate you from other candidates.",
    color:"#10b981", skills:["prototyping","vibecoding","designsystems"],
    finalDeliverable:"Variable prototype + coded screen + interview-ready answers",
    days:[
      { id:"w4d1", weekId:"w4", dayNumber:1, isReview:false,
        topic:"Variables-Driven Prototyping",
        why:"Most designers present static screens. A prototype that runs like a real product makes you stand out immediately.",
        goal:"Build prototypes that feel like real products, not clickable wireframes.",
        estimatedTime:"2-2.5 hrs", skills:["prototyping","variables"],
        reflectionPrompt:"How would you explain variable-driven prototyping to an engineer who thinks Figma prototypes are just mockups?",
        resources:[
          { label:"Figma Docs: Variables in Prototyping", url:"https://help.figma.com/hc/en-us/articles/14506587589399-Variables-in-prototyping", type:"docs", time:"15 min" },
          { label:"YouTube: Variables Prototyping Walkthrough", url:"https://www.youtube.com/watch?v=RlMiD5OgRaE", type:"video", time:"20 min" },
        ],
        tasks:[
          { id:"w4d1t1", label:"Watch and read both resources", phase:"learn" },
          { id:"w4d1t2", label:"Take any screen from your design system", phase:"practice" },
          { id:"w4d1t3", label:"Add boolean variable: isExpanded - wire to expand/collapse on click", phase:"practice" },
          { id:"w4d1t4", label:"Add string variable: activeTab - wire to tab component", phase:"practice" },
          { id:"w4d1t5", label:"No screen-to-screen links - purely variable-controlled state", phase:"deliver" },
        ],
        deliverable:"A prototype with at least 2 variable-driven interactions." },
      { id:"w4d2", weekId:"w4", dayNumber:2, isReview:false,
        topic:"Prototype a Real Product Interaction",
        why:"This is portfolio material. Complex prototypes are remembered in interviews because almost no one brings them.",
        goal:"Prototype something complex enough to show in an interview.",
        estimatedTime:"2.5-3 hrs", skills:["prototyping"],
        reflectionPrompt:"What would an engineer think if they saw this prototype? What questions would they ask you?",
        resources:[],
        tasks:[
          { id:"w4d2t1", label:"Choose: multi-step form OR sortable table OR sidebar nav with collapse", phase:"practice" },
          { id:"w4d2t2", label:"All states controlled by variables", phase:"practice" },
          { id:"w4d2t3", label:"Use components from your design system only - no new one-off frames", phase:"practice" },
          { id:"w4d2t4", label:"Ensure the prototype loops (no dead ends)", phase:"practice" },
          { id:"w4d2t5", label:"Record a 30-second screen recording of the prototype running", phase:"deliver" },
        ],
        deliverable:"A working variable-driven prototype + a short screen recording." },
      { id:"w4d3", weekId:"w4", dayNumber:3, isReview:false,
        topic:"Vibe Coding Fundamentals",
        why:"Vibe coding makes you a more fluent collaborator with engineers. It also lets you prototype interactions Figma cannot do.",
        goal:"Understand vibe coding and run your first Claude session.",
        estimatedTime:"2 hrs", skills:["vibecoding","claude"],
        reflectionPrompt:"What surprised you most about what Claude built without you writing a single line of code?",
        resources:[
          { label:"Claude Artifacts as a Design Tool", url:"https://www.anthropic.com/news/claude-and-artifacts", type:"article", time:"10 min" },
        ],
        tasks:[
          { id:"w4d3t1", label:"Read resource and explore Claude Artifacts", phase:"learn" },
          { id:"w4d3t2", label:"Prompt 1: Ask Claude to build a notification badge with dropdown", phase:"practice" },
          { id:"w4d3t3", label:'Prompt 2: Refine - add click-to-read and "Mark all as read" interaction', phase:"practice" },
          { id:"w4d3t4", label:"Prompt 3: Direction feedback - adjust spacing, update colors to navy", phase:"practice" },
          { id:"w4d3t5", label:"Screenshot the final result. Notice: you directed, you did not code.", phase:"deliver" },
        ],
        deliverable:"A working HTML notification component built entirely through conversation with Claude." },
      { id:"w4d4", weekId:"w4", dayNumber:4, isReview:false,
        topic:"Vibe Coding a Real Product Screen",
        why:"Building something from your actual Figma files teaches you how engineers read your specs - and what they miss.",
        goal:"Build something complex enough to understand its implementation cost.",
        estimatedTime:"2.5-3 hrs", skills:["vibecoding","devmode"],
        reflectionPrompt:"What did Claude get wrong about your design that your Figma spec should have made clearer?",
        resources:[],
        tasks:[
          { id:"w4d4t1", label:"Pick a real screen from your past work", phase:"practice" },
          { id:"w4d4t2", label:"Step 1: Ask Claude for semantic HTML only, no styling", phase:"practice" },
          { id:"w4d4t3", label:"Step 2: Add CSS Grid layout + Flexbox for components", phase:"practice" },
          { id:"w4d4t4", label:"Step 3: Add one interaction (filter, sort, or sidebar toggle)", phase:"practice" },
          { id:"w4d4t5", label:"Compare side by side with your Figma design", phase:"practice" },
          { id:"w4d4t6", label:"Write 5 bullets: what you would do differently in your handoff specs", phase:"deliver" },
        ],
        deliverable:"A coded version of one of your screens + 5 handoff insights." },
      { id:"w4d5", weekId:"w4", dayNumber:5, isReview:false,
        topic:"The Senior Designer Self-Critique Framework",
        why:"The gap between junior and senior is not craft - it is the ability to articulate why a decision is right or wrong.",
        goal:"Evaluate your own work the way interviewers and design leads do.",
        estimatedTime:"2 hrs", skills:["designsystems","uxwriting"],
        reflectionPrompt:"Which lens was hardest to apply to your own work, and what does that tell you?",
        resources:[
          { label:"NNGroup: How to Run a Proper Critique", url:"https://www.nngroup.com/articles/design-critique/", type:"article", time:"12 min" },
          { label:"How to Critique Design Like a Senior Designer", url:"https://medium.com/design-leadership/how-to-critique-design-like-a-senior-designer", type:"article", time:"10 min" },
        ],
        tasks:[
          { id:"w4d5t1", label:"Read both resources", phase:"learn" },
          { id:"w4d5t2", label:"Lens 1 - Clarity: can a new user understand what to do in 5 seconds?", phase:"practice" },
          { id:"w4d5t3", label:"Lens 2 - Hierarchy: does visual weight match information importance?", phase:"practice" },
          { id:"w4d5t4", label:"Lens 3 - Consistency: same patterns for same problems throughout?", phase:"practice" },
          { id:"w4d5t5", label:"Lens 4 - Efficiency: how many steps to complete the main task?", phase:"practice" },
          { id:"w4d5t6", label:"Lens 5 - Accessibility: contrast, tap targets, focus states", phase:"practice" },
          { id:"w4d5t7", label:'Use Claude to pressure-test your critique: ask "What am I missing?"', phase:"deliver" },
        ],
        deliverable:"A written critique of 2 of your own screens using the 5-lens framework." },
      { id:"w4d6", weekId:"w4", dayNumber:6, isReview:false,
        topic:"Interview Readiness",
        why:"Everything you have built is only useful if you can talk about it clearly. This session turns practice into performance.",
        goal:"Be able to talk about everything you built with confidence.",
        estimatedTime:"2.5-3 hrs", skills:["designsystems","uxwriting","devmode"],
        reflectionPrompt:"Which interview question felt most natural to answer? Which still feels weak?",
        resources:[],
        tasks:[
          { id:"w4d6t1", label:"Part 1: Mock interview with Claude - 8 questions with feedback (60 min)", phase:"learn" },
          { id:"w4d6t2", label:'Write answer: "Walk me through a design system you have worked on."', phase:"practice" },
          { id:"w4d6t3", label:'Write answer: "How do you use AI in your design workflow?"', phase:"practice" },
          { id:"w4d6t4", label:'Write answer: "How do you handle pushback from engineers?"', phase:"practice" },
          { id:"w4d6t5", label:'Write answer: "How do you know when a design is good enough to ship?"', phase:"practice" },
          { id:"w4d6t6", label:"File cleanup: clean layers, no detached components, cover frames, README on first page", phase:"deliver" },
        ],
        deliverable:"Written answers to 6 interview questions + polished Figma files." },
      { id:"w4d7", weekId:"w4", dayNumber:7, isReview:true,
        topic:"Rest Day",
        why:"Rest is part of learning. Your brain consolidates everything while you are not working.",
        goal:"Four weeks done. You earned it.",
        estimatedTime:"-", skills:[],
        reflectionPrompt:"What is the one skill you are most proud of having built in these 4 weeks?",
        resources:[],
        tasks:[
          { id:"w4d7t1", label:"Confirm: token-based design system with components, variants, dark mode", phase:"practice" },
          { id:"w4d7t2", label:"Confirm: AI-assisted feature flow with documentation", phase:"practice" },
          { id:"w4d7t3", label:"Confirm: variable-driven prototype", phase:"practice" },
          { id:"w4d7t4", label:"Confirm: coded screen built through vibe coding", phase:"practice" },
          { id:"w4d7t5", label:"Confirm: written critique framework and interview answers", phase:"deliver" },
        ],
        deliverable:"You now have 2 portfolio pieces and a full modern design skill set." },
    ]},
]};

const RESOURCES_CATALOG = [
  { category:"Figma Variables and Tokens", items:[
    { label:"Official Guide to Variables", url:"https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma", type:"docs", time:"20 min", week:1 },
    { label:"YouTube: Variables Intro (14 min)", url:"https://www.youtube.com/watch?v=1ONxxlJnvdM", type:"video", time:"14 min", week:1 },
    { label:"YouTube: Variables for Spacing", url:"https://www.youtube.com/watch?v=P5g6JBGkBMQ", type:"video", time:"18 min", week:1 },
  ]},
  { category:"Components and Variants", items:[
    { label:"YouTube: Component Properties Deep Dive", url:"https://www.youtube.com/watch?v=k74IrUNaJVk", type:"video", time:"20 min", week:1 },
    { label:"Figma Docs: Create and Use Variants", url:"https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants", type:"docs", time:"10 min", week:1 },
    { label:"Figma Best Practices: Component Libraries", url:"https://www.figma.com/best-practices/building-and-using-component-libraries/", type:"docs", time:"15 min", week:1 },
    { label:"YouTube: Variants Masterclass (18 min)", url:"https://www.youtube.com/watch?v=y29Xwt9dET0", type:"video", time:"18 min", week:1 },
  ]},
  { category:"Design Systems", items:[
    { label:"designsystems.com", url:"https://www.designsystems.com/", type:"article", time:"20 min", week:2 },
    { label:"Material Design 3", url:"https://m3.material.io/", type:"reference", time:"20 min", week:2 },
    { label:"Atlassian Design System", url:"https://atlassian.design/", type:"reference", time:"15 min", week:2 },
    { label:"How to Build a Design System in Figma 2024", url:"https://uxdesign.cc/how-to-build-a-design-system-in-figma-2024", type:"article", time:"15 min", week:2 },
  ]},
  { category:"Dev Mode and Handoff", items:[
    { label:"YouTube: Dev Mode Overview (2024)", url:"https://www.youtube.com/watch?v=LoMNKrv2RJc", type:"video", time:"22 min", week:1 },
    { label:"Figma Docs: Guide to Dev Mode", url:"https://help.figma.com/hc/en-us/articles/15023124644247-Guide-to-Dev-Mode", type:"docs", time:"15 min", week:1 },
  ]},
  { category:"AI Tools", items:[
    { label:"Figma AI Overview", url:"https://help.figma.com/hc/en-us/articles/23905654528791-Figma-AI-overview", type:"docs", time:"15 min", week:3 },
    { label:"Claude Prompt Engineering Guide", url:"https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview", type:"docs", time:"20 min", week:3 },
    { label:"Claude Artifacts as a Design Tool", url:"https://www.anthropic.com/news/claude-and-artifacts", type:"article", time:"10 min", week:4 },
    { label:"Figma MCP Documentation", url:"https://www.figma.com/developers/mcp", type:"docs", time:"20 min", week:3 },
  ]},
  { category:"Prototyping and Critique", items:[
    { label:"Figma Docs: Variables in Prototyping", url:"https://help.figma.com/hc/en-us/articles/14506587589399-Variables-in-prototyping", type:"docs", time:"15 min", week:4 },
    { label:"NNGroup: Design Critique", url:"https://www.nngroup.com/articles/design-critique/", type:"article", time:"12 min", week:4 },
  ]},
  { category:"Accessibility", items:[
    { label:"Figma Accessibility Resources", url:"https://www.figma.com/accessibility/", type:"docs", time:"15 min", week:2 },
    { label:"WebAIM Contrast Checker", url:"https://webaim.org/resources/contrastchecker/", type:"tool", time:"5 min", week:2 },
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
const allDays = () => PLAN.weeks.flatMap(w => w.days);
const allTasks = () => allDays().flatMap(d => d.tasks);
const weekTasks = (wid) => { const w = PLAN.weeks.find(x=>x.id===wid); return w ? w.days.flatMap(d=>d.tasks):[]};
const dayDone = (day, checked) => day.tasks.length>0 && day.tasks.every(t=>checked[t.id]);
const dayProgress = (day, checked) => day.tasks.length===0?0:day.tasks.filter(t=>checked[t.id]).length/day.tasks.length;

function currentDay(checked) {
  const days = allDays();
  return days.find(d => !d.isReview && !dayDone(d,checked)) || days[days.length-1];
}
function computeStreak(checked) {
  const days = allDays().filter(d=>!d.isReview);
  let streak = 0;
  for (let i = days.length-1; i >= 0; i--) {
    if (dayDone(days[i], checked)) streak++;
    else break;
  }
  return streak;
}
function skillProgress(checked) {
  const scores = {};
  Object.keys(SKILL_MAP).forEach(k => { scores[k] = { done:0, total:0 }; });
  allDays().forEach(day => {
    (day.skills||[]).forEach(sk => {
      if (!scores[sk]) return;
      scores[sk].total += day.tasks.length;
      scores[sk].done += day.tasks.filter(t=>checked[t.id]).length;
    });
  });
  return scores;
}
function deliverablesDone(checked) {
  return DELIVERABLES_CATALOG.filter(d => {
    const day = allDays().find(x=>x.id===d.dayId);
    return day && dayDone(day, checked);
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
  return <span style={{color, background:color+"18"}} className="text-xs font-medium px-1.5 py-0.5 rounded">{label}</span>;
}

function Checkbox({checked, onChange, size="w-5 h-5"}) {
  return (
    <button onClick={onChange} className={"flex-shrink-0 rounded border-2 flex items-center justify-center transition-all "+size+(checked?" border-indigo-500 bg-indigo-500 text-white":" border-gray-300 hover:border-indigo-400")}>
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
  const today = currentDay(checked);
  const todayWeek = PLAN.weeks.find(w=>w.id===today?.weekId);
  return (
    <aside className="w-56 flex-shrink-0 bg-slate-900 text-white flex flex-col h-screen sticky top-0">
      <div className="px-5 pt-6 pb-4 border-b border-slate-800">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Design Tracker</div>
        <div className="text-sm font-medium text-slate-200">4-Week Upskilling</div>
      </div>
      <div className="px-5 py-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Overall progress</span>
          <span className="text-xs font-bold text-indigo-400">{pct}%</span>
        </div>
        <Bar value={pct} color="#6366f1" h="h-1"/>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-amber-400"><Ic.Flame/></span>
          <span className="text-sm font-bold text-amber-400">{streak}</span>
          <span className="text-xs text-slate-500">day streak</span>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV_ITEMS.map(({id,label,Icon})=>(
          <button key={id} onClick={()=>setActive(id)} className={"w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all "+(active===id?"bg-indigo-600 text-white":"text-slate-400 hover:text-white hover:bg-slate-800")}>
            <Icon/>{label}
          </button>
        ))}
      </nav>
      {today && todayWeek && (
        <div className="px-5 py-4 border-t border-slate-800">
          <div className="text-xs text-slate-500 mb-1">Currently on</div>
          <div className="text-xs font-medium text-slate-300 leading-snug">W{todayWeek.number} D{today.dayNumber}: {today.topic}</div>
        </div>
      )}
    </aside>
  );
}

// ─── TODAY VIEW ───────────────────────────────────────────────────────────────
function TodayView({checked, notes, onToggle, onNote, state, onStartSession, onEndSession, sessionActive}) {
  const today = currentDay(checked);
  const week = PLAN.weeks.find(w=>w.id===today?.weekId);
  if (!today||!week) return <div className="p-8 text-gray-400">All done!</div>;

  const done = today.tasks.filter(t=>checked[t.id]).length;
  const total = today.tasks.length;
  const pct = total>0?Math.round(done/total*100):0;
  const isDayDone = dayDone(today, checked);
  const streak = computeStreak(checked);

  const learnTasks = today.tasks.filter(t=>t.phase==="learn");
  const practiceTasks = today.tasks.filter(t=>t.phase==="practice");
  const deliverTasks = today.tasks.filter(t=>t.phase==="deliver");

  return (
    <div className="flex gap-6 p-8 min-h-screen bg-gray-50">
      {/* Main column */}
      <div className="flex-1 min-w-0 space-y-5">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Week {week.number} - Day {today.dayNumber}</span>
            {today.isReview && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Review Day</span>}
          </div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">{today.topic}</h1>
          <p className="mt-2 text-gray-500 leading-relaxed text-sm max-w-xl">{today.why}</p>
        </div>

        {/* Why this matters + meta */}
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5 text-sm text-gray-500">
            <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            {today.estimatedTime}
          </span>
          <div className="flex gap-1.5 flex-wrap">
            {(today.skills||[]).map(sk=>(
              <PillTag key={sk} color={SKILL_MAP[sk]?.color||"#6366f1"}>{SKILL_MAP[sk]?.label||sk}</PillTag>
            ))}
          </div>
        </div>

        {/* Session progress bar */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Session progress</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-indigo-600">{pct}%</span>
              {isDayDone && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Complete</span>}
            </div>
          </div>
          <Bar value={pct} color="#6366f1" h="h-2"/>
          <div className="mt-2 text-xs text-gray-400">{done} of {total} tasks</div>
          {!isDayDone && !sessionActive && (
            <button onClick={onStartSession} className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors">
              <Ic.Play/>Start today's session
            </button>
          )}
          {isDayDone && (
            <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm font-medium">
              <Ic.Check cls="w-5 h-5"/>Day complete - great work.
            </div>
          )}
        </div>

        {/* Step 1: Learn */}
        <TaskSection title="01 - Learn" subtitle="Watch and read" tasks={learnTasks} checked={checked} onToggle={onToggle} color="#6366f1">
          {today.resources.length>0 && (
            <div className="mt-4 space-y-2">
              {today.resources.map((r,i)=>(
                <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group">
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
        <TaskSection title="02 - Practice" subtitle="Do the work in Figma or Claude" tasks={practiceTasks} checked={checked} onToggle={onToggle} color="#8b5cf6"/>

        {/* Step 3: Deliver */}
        <TaskSection title="03 - Deliver" subtitle="Create the output" tasks={deliverTasks} checked={checked} onToggle={onToggle} color="#10b981">
          <div className="mt-3 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="text-xs font-semibold text-emerald-700 mb-1 uppercase tracking-wide">Today's deliverable</div>
            <p className="text-sm text-emerald-900">{today.deliverable}</p>
          </div>
        </TaskSection>

        {/* Reflection */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="text-sm font-semibold text-gray-700 mb-1">Step 4 - Reflect</div>
          <p className="text-xs text-gray-400 mb-3 italic">"{today.reflectionPrompt}"</p>
          <div className="grid grid-cols-1 gap-3">
            {[["learned","What I learned today"],["confusing","What was confusing"],["revisit","What I want to revisit"],["figmaLink","Link to my Figma file / output"]].map(([field, placeholder])=>(
              <div key={field}>
                <label className="text-xs text-gray-400 block mb-1">{placeholder}</label>
                <textarea
                  value={(notes[today.id]||{})[field]||""}
                  onChange={e=>onNote(today.id, field, e.target.value)}
                  placeholder={placeholder+"..."}
                  rows={field==="figmaLink"?1:2}
                  className="w-full text-sm text-gray-700 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Complete button */}
        {!isDayDone && (
          <div className="text-center pb-8">
            <div className="text-xs text-gray-400 mb-3">Finish all tasks above to mark this session complete</div>
            <button
              disabled={pct<100}
              onClick={()=>{
                today.tasks.forEach(t=>{if(!checked[t.id])onToggle(t.id);});
                onEndSession();
              }}
              className={"px-8 py-3 rounded-xl text-sm font-semibold transition-all "+(pct===100?"bg-emerald-500 hover:bg-emerald-600 text-white":"bg-gray-100 text-gray-400 cursor-not-allowed")}>
              {pct===100?"Mark session complete - Day done!":"Complete all tasks first"}
            </button>
          </div>
        )}
      </div>

      {/* Right sidebar */}
      <div className="w-72 flex-shrink-0 space-y-4">
        {/* Streak card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-amber-500 text-2xl"><Ic.Flame/></span>
            <div>
              <div className="text-2xl font-bold text-gray-900 leading-none">{streak}</div>
              <div className="text-xs text-gray-400">day streak</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {streak===0?"Complete today's session to start your streak.":streak<3?"Momentum is building. Keep going.":streak<7?"Strong consistency. You are building a habit.":"Outstanding focus. This is how skills are built."}
          </div>
        </div>

        {/* Week position */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Your journey</div>
          <div className="space-y-2">
            {PLAN.weeks.map(w => {
              const wt = weekTasks(w.id);
              const wd = wt.filter(t=>checked[t.id]).length;
              const wp = wt.length>0?Math.round(wd/wt.length*100):0;
              const isCurrent = w.id===week.id;
              return (
                <div key={w.id} className={"rounded-xl p-3 transition-all "+(isCurrent?"border-2 bg-indigo-50":"border border-gray-100")+(isCurrent?" border-indigo-300":"")}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{background:w.color}}/>
                      <span className={"text-xs font-semibold "+(isCurrent?"text-indigo-700":"text-gray-500")}>Week {w.number}</span>
                    </div>
                    <span className="text-xs text-gray-400">{wp}%</span>
                  </div>
                  <Bar value={wp} color={w.color} h="h-1"/>
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills being built */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Skills you are building</div>
          {(today.skills||[]).map(sk => {
            const scores = skillProgress(checked);
            const s = scores[sk]||{done:0,total:1};
            const p = s.total>0?Math.round(s.done/s.total*100):0;
            return (
              <div key={sk} className="mb-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs text-gray-600">{SKILL_MAP[sk]?.label}</span>
                  <span className="text-xs font-bold" style={{color:SKILL_MAP[sk]?.color}}>{p}%</span>
                </div>
                <Bar value={p} color={SKILL_MAP[sk]?.color||"#6366f1"} h="h-1.5"/>
              </div>
            );
          })}
        </div>

        {/* Next milestone */}
        <NextMilestone checked={checked}/>
      </div>
    </div>
  );
}

function TaskSection({title, subtitle, tasks, checked, onToggle, color, children}) {
  if (tasks.length===0 && !children) return null;
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1.5 h-5 rounded-full" style={{background:color}}/>
        <span className="text-sm font-semibold text-gray-800">{title}</span>
        <span className="text-xs text-gray-400">{subtitle}</span>
      </div>
      {tasks.length>0 && (
        <div className="mt-3 space-y-2">
          {tasks.map(task=>(
            <label key={task.id} className="flex items-start gap-3 py-1.5 cursor-pointer group">
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
  const days = allDays();
  const completedDays = days.filter(d=>dayDone(d,checked)).length;
  const milestones = [
    {at:7, label:"Week 1 complete", desc:"Token system built"},
    {at:14, label:"Design System done", desc:"Portfolio Piece #1"},
    {at:21, label:"AI Workflow ready", desc:"Portfolio Piece #2"},
    {at:28, label:"All 4 weeks done", desc:"Interview-ready"},
  ];
  const next = milestones.find(m=>completedDays<m.at);
  if (!next) return null;
  const pct = Math.round(completedDays/next.at*100);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
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
      <div className="text-xs text-gray-400 mt-1">{completedDays} / {next.at} days</div>
    </div>
  );
}

// ─── JOURNEY VIEW ─────────────────────────────────────────────────────────────
function JourneyView({checked, setViewAndDay}) {
  const today = currentDay(checked);
  return (
    <div className="p-8 max-w-4xl bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Learning Journey</h2>
        <p className="text-gray-500 text-sm mt-1">Your 4-week roadmap. Each day is a step forward.</p>
      </div>
      <div className="space-y-10">
        {PLAN.weeks.map((week,wi)=>{
          const wt = weekTasks(week.id);
          const wd = wt.filter(t=>checked[t.id]).length;
          const wp = wt.length>0?Math.round(wd/wt.length*100):0;
          const wComplete = wp===100;
          return (
            <div key={week.id}>
              {/* Week header */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-sm" style={{background:week.color}}>
                  {week.number}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-gray-900">{week.theme}</h3>
                    {wComplete && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Complete</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{week.tagline}</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold" style={{color:week.color}}>{wp}%</div>
                  <div className="text-xs text-gray-400">{wd}/{wt.length} tasks</div>
                </div>
              </div>
              <div className="ml-2 pl-8 border-l-2" style={{borderColor:week.color+"40"}}>
                <div className="grid grid-cols-1 gap-2.5">
                  {week.days.map((day,di)=>{
                    const done = dayDone(day, checked);
                    const isToday = day.id===today?.id;
                    const dp = dayProgress(day,checked);
                    const dDone = day.tasks.filter(t=>checked[t.id]).length;
                    return (
                      <button key={day.id} onClick={()=>setViewAndDay(day.id)}
                        className={"relative w-full text-left rounded-xl px-4 py-3.5 border transition-all group "+(isToday?"border-indigo-400 bg-indigo-50 shadow-sm":done?"border-emerald-200 bg-emerald-50":"border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm")}>
                        <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 flex items-center justify-center"
                          style={{background:done?"#10b981":isToday?"#6366f1":"white", borderColor:done?"#10b981":isToday?"#6366f1":week.color+"60"}}>
                          {done && <Ic.Check cls="w-2.5 h-2.5 text-white"/>}
                          {isToday && !done && <div className="w-2 h-2 rounded-full bg-indigo-600"/>}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className={"text-xs font-medium "+(isToday?"text-indigo-500":done?"text-emerald-600":"text-gray-400")}>
                                {day.isReview?"Review":"Day "+day.dayNumber}
                              </span>
                              {isToday && <span className="text-xs bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-medium">Today</span>}
                            </div>
                            <div className={"text-sm font-semibold "+(done?"text-emerald-700":isToday?"text-indigo-900":"text-gray-800")}>{day.topic}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{day.estimatedTime}</div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <div className="text-xs text-gray-400">{dDone}/{day.tasks.length}</div>
                            {dp>0 && !done && <Bar value={dp*100} color={week.color} h="h-1"/>}
                            <span className={"text-gray-300 group-hover:text-gray-500 transition-colors "+(isToday?"text-indigo-400":"")}><Ic.Chevron/></span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                {/* Week deliverable */}
                <div className="mt-3 ml-0 p-3 rounded-xl border border-dashed border-gray-200 bg-white">
                  <div className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide font-medium">Week deliverable</div>
                  <div className="text-sm text-gray-600">{week.finalDeliverable}</div>
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
    <div className="p-8 max-w-3xl bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Skill Progress</h2>
        <p className="text-gray-500 text-sm mt-1">Each completed day contributes to the skills it trains.</p>
      </div>
      {(strongest||weakest) && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {strongest && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="text-xs text-gray-400 mb-2 uppercase tracking-wide">Strongest skill</div>
              <div className="text-sm font-bold text-gray-900 mb-1">{SKILL_MAP[strongest[0]]?.label}</div>
              <div className="text-2xl font-bold" style={{color:SKILL_MAP[strongest[0]]?.color}}>
                {strongest[1].total>0?Math.round(strongest[1].done/strongest[1].total*100):0}%
              </div>
            </div>
          )}
          {weakest && weakest[0]!==strongest?.[0] && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
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
            <div key={key} className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
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
  const weekGroups = [1,2,3,4].map(n=>({week:n, items:DELIVERABLES_CATALOG.filter(d=>d.week===n)}));
  return (
    <div className="p-8 max-w-3xl bg-gray-50 min-h-screen">
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
        {weekGroups.map(({week,items})=>{
          const weekObj = PLAN.weeks[week-1];
          return (
            <div key={week}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{background:weekObj.color}}>{week}</div>
                <span className="text-sm font-semibold text-gray-700">{weekObj.theme}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {items.map(d=>{
                  const isDone = done.find(x=>x.id===d.id);
                  return (
                    <div key={d.id} className={"flex items-start gap-3 p-4 rounded-xl border transition-all "+(isDone?"border-emerald-200 bg-emerald-50":"border-gray-200 bg-white")}>
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
    <div className="p-8 max-w-3xl bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Resource Library</h2>
        <p className="text-gray-500 text-sm mt-1">All links from the plan, grouped by topic. Track what you have read.</p>
      </div>
      <div className="flex gap-2 mb-6">
        {["all","video","docs","article","tool","reference"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} className={"px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize "+(filter===f?"bg-indigo-600 text-white":"bg-white border border-gray-200 text-gray-500 hover:border-gray-300")}>
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
                    <div key={i} className={"flex items-center gap-3 p-4 rounded-xl border bg-white transition-all "+(status==="done"?"border-emerald-200":status==="opened"?"border-indigo-100":"border-gray-200")}>
                      <ResourceBadge type={r.type}/>
                      <a href={r.url} target="_blank" rel="noopener noreferrer"
                        onClick={()=>{if(status==="unread")onResourceStatus(key,"opened");}}
                        className="flex-1 min-w-0 group">
                        <div className={"text-sm font-medium group-hover:text-indigo-600 transition-colors "+(status==="done"?"text-gray-400 line-through":"text-gray-700")}>{r.label}</div>
                        <div className="text-xs text-gray-400 mt-0.5">Week {r.week} - {r.time}</div>
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
  const [focusDayId, setFocusDayId] = useState(null);
  const { checked, notes } = state;

  const persist = useCallback(next=>{ setState(next); save(next); }, []);

  function toggleTask(id) {
    const next = {...state, checked:{...checked, [id]:!checked[id]}};
    const d = todayStr();
    if (!next.startedDate) next.startedDate = d;
    persist(next);
  }
  function setNote(dayId, field, value) {
    const dayNotes = {...(notes[dayId]||{}), [field]:value};
    persist({...state, notes:{...notes, [dayId]:dayNotes}});
  }
  function setResourceStatus(key, status) {
    persist({...state, resourceStatus:{...(state.resourceStatus||{}), [key]:status}});
  }
  function setViewAndDay(dayId) {
    setFocusDayId(dayId);
    setView("today");
  }

  // If a specific day is focused (from journey), override currentDay
  const today = focusDayId ? allDays().find(d=>d.id===focusDayId)||currentDay(checked) : currentDay(checked);

  return (
    <div className="flex bg-gray-50 min-h-screen font-sans" style={{fontFamily:"system-ui,-apple-system,sans-serif"}}>
      <Sidebar active={view} setActive={(v)=>{setView(v);setFocusDayId(null);}} checked={checked}/>
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
        {view==="journey" && <JourneyView checked={checked} setViewAndDay={setViewAndDay}/>}
        {view==="skills" && <SkillsView checked={checked}/>}
        {view==="portfolio" && <PortfolioView checked={checked}/>}
        {view==="resources" && <ResourcesView state={state} onResourceStatus={setResourceStatus}/>}
      </main>
    </div>
  );
}
