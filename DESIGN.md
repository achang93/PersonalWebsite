# Portfolio design

Albert Chang's portfolio helps recruiters and collaborators understand his AI, machine learning, and software engineering work, inspect the evidence, and get in touch. The site uses plain HTML, CSS, and JavaScript.

## Direction and constraints

The user's chosen identity is minimal, futuristic, personal, and readable. Keep the charcoal background, off-white text, sage accent, compact project logos, subtle motion, and metallic interaction edges. The main name and wordmark have no trailing period.

Keep the page order: introduction and education, statistics, experience, projects, skills, contact. Preserve all original project titles, links, and factual descriptions. The first three projects are Captioning Model for Clinical X-Ray Images, Yearn for Mines, and LLM Prompt Optimization Under Domain Shift. Keep the contact heading “Good things start with a conversation.” Do not reintroduce the sphere or the removed audio measurement statistic.

The narrative comes from Albert's actual record: UCSC computer science and NLP education, four Amazon internships across audio and quantum hardware, research on agent interfaces, clinical image captioning, Minecraft agents, prompt optimization under domain shift, and software projects. The project filters let a visitor inspect the subset relevant to their interests; disclosures reveal the specific contributions.

## Applied skills

- [Emil Kowalski's Design Engineering](https://github.com/emilkowalski/skills/tree/main/skills/emil-design-eng): purpose-driven motion, short control transitions, press feedback, immediate keyboard interactions, touch-aware hover states, and interruptible transitions.
- [Impeccable](https://github.com/pbakaus/impeccable/tree/main/.agents/skills/impeccable), version 4.7.0: refine the existing identity, fix readability and hierarchy, keep icons consistent, preserve content truth, and verify the rendered result.
- [Taste](https://github.com/Leonxlnx/taste-skill/tree/main/skills/taste-skill): a typography-led composition, substantive project rows, fewer small labels, and a single text family. Direction helper: “Type and nothing else,” seed 852681227, preserving the existing palette and typeface.

The user's existing brief takes precedence over a skill's generic style rules. Compact logos replace photographs by request. Original long project titles may occupy more than two lines on a narrow phone. Metallic hover rims and button reflections intentionally use gradients; navigation state and reading progress use thin lines. Do not remove these solely to satisfy a style detector. No stock photography, invented screenshots, scroll-pinned scenes, or large decorative animations are required for this refinement.

## Typography and layout

- DM Sans throughout. Main reading copy is 16px; metadata and technology lists are 13px. Introductory copy is 22–24px.
- Display tracking stops at -0.04em. The large name remains the established focal point.
- Desktop content has a maximum width of 1160px and matching outer margins. Intermediate and phone layouts reduce margins to 24px and 20px.
- Projects use one row per project: name and classification on the left, description, technologies, and disclosure on the right. On phones these become one reading column. No fixed title or paragraph heights.
- Statistics and skills use a small change of background tone. Space separates work entries without persistent card outlines.
- Every icon uses SVG geometry with a consistent outline weight. Decorative icons are hidden from assistive technology.

## Interaction and motion

- Press feedback: 140ms. Color hover: 180ms. Small interface transitions: 240ms. Use the shared ease-out token.
- The name arrives once; section headings fade, while individual work entries rise slightly once. Nothing above the fold waits for scrolling.
- Keyboard input disables animation and smooth scrolling immediately. Focus is always visible. Pointer input restores normal motion.
- Hover movement is restricted to a fine pointer. Reduced-motion preferences disable movement, reveals, and pointer tracking.
- Details stay native and accessible. Their borders enclose the full expanded entry. Text transitions use `@starting-style` as progressive enhancement.
- Copy-email feedback keeps its width stable and changes the copy icon to a check mark. Its status is announced through a live region.

## Verification notes

The installed skills are local authoring tools, not browser dependencies. Impeccable's context launcher could not create its engine cache in this environment, so the existing source and conversation supplied the context. Taste's source checker flags the intentional gradient and navigation-line exceptions described above. Browser verification uses the app's browser tools rather than the skills' separate browser drivers.
