# Smart Horizon Experience

MASTER PROMPT — SMART H PREMIUM REACT WEBSITE

Expert-Level UI/UX, 3D Visual Design, Motion Engineering & Production-Ready Development

You are acting as a senior UI/UX designer, creative director, React architect, motion designer, frontend performance engineer, accessibility specialist, and QA engineer.

Your task is to design and implement a complete, premium, original, responsive, multi-page React website for the brand Smart H, using the reference websites below only to understand broad enterprise website design principles:

https://www.dsmgo.in/

https://www.progressive.in/

The result must have its own visual identity, original copy, original layouts, distinctive animation language, custom 3D-style iconography, high-quality local images, a four-slide animated homepage carousel, and a clean component-based architecture.

This is an implementation task, not merely a design proposal. Inspect the existing project and assets, implement all required pages, connect the interactions, run available validation commands, fix the errors you encounter, and deliver the completed working codebase.

1. MANDATORY PROJECT RULES

Use React with Vite and JavaScript/JSX unless the existing repository already uses TypeScript or a compatible established setup.

Do not use Next.js or replace React with another framework.

Use React Router for proper client-side page navigation.

Use reusable, independently maintainable components.

Keep the folder structure simple and understandable for a developer working in VS Code.

Preserve existing working functionality, project configuration, reusable components, and legitimate Smart H brand assets.

Do not overwrite or delete the existing project before inspecting it.

Never copy source code, exact layouts, original marketing copy, logos, distinctive graphics, or animations from the reference websites.

Do not create nonfunctional buttons, dead links, decorative forms that cannot be submitted, or fake success notifications.

Do not invent customer names, testimonials, partner logos, awards, certifications, statistics, or claims about Smart H.

Do not leave placeholder images, broken images, empty pages, unfinished sections, unnecessary TODO comments, or demo-only interfaces in the final implementation.

Do not claim the website is error-free or tested unless the relevant checks have actually been run.

Primary objective: Create a professional enterprise technology website that feels custom-designed for Smart H rather than looking like a generic corporate template.

2. FIRST: AUDIT THE EXISTING PROJECT

Before writing code:

Inspect the repository, package.json, installed dependencies, application entry point, current routes, existing pages, assets, CSS files and scripts.

Identify the current React version and build tool.

Locate any Smart H logos, brand documents, service descriptions, photographs, icons, contact information, or existing website assets.

Determine what is already functional and should be preserved.

Check whether a contact API, backend, CRM integration, or environment configuration already exists.

Make a short internal implementation plan based on the actual repository.

If the repository is empty, initialize a clean React + Vite project.

If useful existing components are available, improve and reuse them instead of needlessly duplicating them.

If Smart H's exact service information is unavailable, create a coherent, editable enterprise technology website using conservative draft copy. Centralize editable service descriptions and contact information in configuration files. Do not present unverified claims as established facts.

3. ORIGINAL BRAND DESIGN SYSTEM

Create a cohesive design system using these primary colors:

Midnight Navy: #071126

Deep Navy: #0B1733

Cobalt Blue: #2F5BFF

Electric Blue: #6687FF

Bright Red: #FF334D

Off-White: #F6F8FC

White: #FFFFFF

Muted Text: #A8B4CC

Define these as CSS custom properties in src/styles/tokens.css.

Use midnight navy as the principal background for cinematic hero sections, dark feature sections, and selected footer areas.

Use cobalt blue for primary buttons, interactive states, selected gradients, interface highlights, and visual accents.

Use bright red sparingly for important calls to action, active states, tiny lighting details, and selected visual emphasis.

Use off-white and white sections to create breathing room and improve readability.

Design personality

The website should feel:

Premium and enterprise-grade.

Modern and technology-forward.

Bold but professional.

Visually distinctive and carefully art-directed.

Rich in depth without excessive glow, blur, or decorative clutter.

Animated but consistently readable and easy to navigate.

Use a consistent typography system. Prefer Inter, Manrope, or another suitable modern sans-serif font. Use locally available font files when properly licensed; otherwise use a reliable font-loading strategy with sensible fallbacks.

Establish clear typography scales, consistent spacing, a responsive grid, predictable border radii, controlled shadows, and reusable component variants.

Avoid excessive gradients, random glassmorphism, neon outlines everywhere, overly rounded generic cards, and animations that distract from the information.

The result must be an original Smart H design, not a recreation of either reference website.

4. CREATE A SIGNATURE SMART H VISUAL LANGUAGE

Develop a distinctive design concept for Smart H based on the interaction of:

Architectural midnight-navy surfaces.

Sculpted cobalt-blue visual forms.

Selective bright-red details.

Layered depth and dimensional lighting.

Editorial typography.

Animated lines, grids, particles, and interconnected technology motifs where appropriate.

Use asymmetric composition, overlapping visual layers, carefully controlled negative space, and strong visual hierarchy.

Create custom reusable visual components instead of assembling unrelated templates.

The logo must remain an actual brand asset. If no valid Smart H logo exists, create a clean original text-based Smart H wordmark using typography and simple geometric detailing. Do not pretend an unapproved graphic is an official logo.

5. TOP ANNOUNCEMENT BAR WITH ROTATING ANIMATED TEXT

Create a separate, fully configurable announcement bar positioned above the primary navbar.

It must:

Display one announcement at a time.

Automatically rotate messages approximately every 4.5 seconds.

Transition smoothly using text fade, a subtle vertical movement, or a restrained directional reveal.

Support a configurable array of announcement messages.

Allow changes to background, text, accent color, font size, timing, borders, and animation style through one centralized configuration.

Offer an optional small icon or status indicator.

Support optional links for announcements.

Prevent text overflow on narrow screens.

Pause automatic rotation when hovered or focused.

Respect browser visibility changes and the user's reduced-motion preference.

Clean up all timers and event listeners.

Never cause horizontal scrolling or unexpected layout shifts.

Store the messages and visual settings in a dedicated configuration file. Do not hardcode the announcement text into multiple components.

6. PREMIUM RESPONSIVE NAVBAR

Build a reusable navbar with:

Smart H logo or approved wordmark.

Home.

About.

Services or Solutions.

Industries.

Case Studies.

Insights, if supported by real content.

Contact.

A distinctive “Let's Talk” or “Book a Consultation” CTA.

Include a thoughtfully designed dropdown or mega-menu for service categories when useful.

Navbar motion and behavior

Smooth entrance animation on initial page load.

Sticky positioning with a polished background transition when scrolling.

Refined hover and active navigation states.

A subtle animated underline or indicator.

Accessible dropdown navigation.

Mobile hamburger button with a smooth open/close animation.

A full-width or carefully designed mobile navigation panel.

Keyboard navigation, visible focus states, Escape-to-close behavior, and proper ARIA attributes.

Correct active states based on the current React Router route.

No overlapping with the announcement bar or hero.

No accidental page scrolling behind an open mobile menu.

Keep the announcement bar and navbar in separate components and separate CSS files.

7. HOMEPAGE HERO — FOUR-IMAGE AUTOMATIC CAROUSEL

This is one of the most important features.

Create a cinematic, professional hero carousel with exactly four initial slides, each using its own locally stored high-quality visual.

Every slide should have:

A different image or original visual composition.

A strong headline.

Concise supporting copy.

A primary CTA.

An optional secondary CTA.

A subtle eyebrow label.

A dark readability overlay.

A distinctive but cohesive visual arrangement.

A relevant image focal point that works on desktop and mobile.

The carousel should communicate the Smart H brand story through four distinct angles, such as intelligent business transformation, connected technology, secure infrastructure, and scalable innovation. Adapt these themes to the actual services discovered during the project audit.

Use original wording. Do not reproduce the reference websites' headlines or copy.

Carousel functionality

Automatically advance every 5–6 seconds.

Smooth crossfade combined with a restrained zoom or directional transition.

Animate the active heading and description with a short staggered entrance.

Animate CTAs without creating unnecessary movement.

Previous and next controls.

Clickable slide indicators with a clear active state.

Touch swipe support for mobile.

Keyboard-accessible controls.

Pause autoplay on hover or keyboard focus.

Pause or reset appropriately when the browser tab becomes inactive.

Correctly clear timers and event listeners when the component unmounts.

Support reduced-motion preferences.

Prevent layout shifts during slide transitions.

Preload or prioritize the initial hero image and lazy-load later slides where appropriate.

The carousel must never display two competing slide contents simultaneously or flash a blank frame between transitions.

All four slides must use actual local assets, not the same repeated image with different text.

Store slide content in src/data/heroSlides.js or an equivalent centralized data module.

8. ORIGINAL IMAGE CREATION AND ASSET MANAGEMENT

All website imagery must be original, properly licensed for its intended use, or generated specifically for Smart H.

Preferred workflow

First preference: generate original AI images for the homepage banners, service illustrations, abstract technology visuals, and custom brand imagery, provided an appropriate image-generation tool is available.

Second preference: download suitable images from legitimate sources such as:

https://unsplash.com/

https://www.pexels.com/

https://pixabay.com/

Check the relevant license and any applicable restrictions for each selected image before use. Do not assume that every image containing a person, logo, trademark, artwork, or private property can be used without further permission.

Image requirements

Do not download or extract images from DSM or Progressive.

Do not use another company's logo as Smart H artwork.

Do not use images with visible watermarks.

Do not use random images unrelated to the section.

Do not use remote image URLs directly in final application components.

Do not rely on external image URLs that can break or disappear.

Avoid repeated images across service cards unless repetition serves a clear design purpose.

Avoid baked-in text in generated images.

Avoid generic AI imagery that looks obviously distorted or inconsistent.

Download or generate each selected image and save it locally.

Use descriptive filenames and optimized WebP or AVIF formats when practical, with suitable fallbacks if needed.

Create a clear directory structure:

public/assets/images/hero/

public/assets/images/services/

public/assets/images/industries/

public/assets/images/case-studies/

public/assets/images/about/

public/assets/images/icons/

public/assets/images/backgrounds/

Create ASSET_CREDITS.md documenting each externally sourced asset, its source page, author when available, license information, and any relevant attribution requirements. Record AI-generated assets as such.

Use meaningful alternative text for informative images and empty alternative text for purely decorative images.

Use responsive image sizing, correct aspect ratios, object positioning, lazy loading below the fold, and appropriate loading priorities.

If an ideal image cannot be created or sourced, generate a genuinely original illustration or visual asset. Do not leave a blank placeholder or silently replace it with an unrelated stock photo.

9. CUSTOM 3D-STYLE ICON SYSTEM

Create a cohesive Smart H icon system that matches the midnight-navy, cobalt-blue, and bright-red visual identity.

The icons should feel dimensional, sculpted, premium, and consistent.

Use a suitable combination of:

Original SVG artwork with dimensional shading and lighting.

CSS 3D transforms and perspective.

Carefully designed gradient surfaces and highlights.

Lightweight animated SVG or Lottie/Rive assets when suitable.

A Three.js-based visual only when genuine 3D rendering adds meaningful value.

Do not force Three.js onto every card or icon. Avoid unnecessary heavy 3D dependencies.

Build a reusable ThreeDIcon or similarly named component that accepts properties such as:

type

variant

size

animated

className

ariaLabel

Create original icon artwork for relevant categories such as infrastructure, connectivity, cloud, AI, cybersecurity, automation, data, and consultation, according to Smart H's real service offerings.

Make the visual style consistent in lighting direction, depth, shadows, materials, and dimensions.

Use real buttons for interactive controls. Icons should not replace accessible text labels.

Avoid emoji as icons and do not combine unrelated icon libraries with conflicting visual styles.

Hover effects may include gentle tilt, highlight movement, floating depth, or a restrained light sweep. Disable or simplify motion on touch devices and for users who prefer reduced motion.

10. COMPLETE MULTI-PAGE WEBSITE

Implement all pages listed below as actual React pages, not sections disguised as separate routes.

A. Home — /

Include:

Announcement bar and navbar.

Four-slide animated hero.

Introduction to Smart H.

Main solutions or service pillars.

A visually rich services section.

Industry coverage.

Differentiators or capabilities.

Featured case studies using verified or clearly identified illustrative content.

A process or delivery-method section.

Insights or resources if supported by content.

FAQs where relevant.

A prominent consultation CTA.

Complete footer.

Use varied layouts rather than repeating the same card grid in every section.

B. About — /about

Include:

Brand introduction.

Mission and vision, only when supplied or written as editable proposed content.

Approach and working principles.

Team or leadership section only when genuine information and approved photos are available.

Capability highlights.

CTA leading to contact.

Do not invent company history, employee numbers, credentials, or leadership profiles.

C. Services — /services

Create a configurable services listing page.

Use the actual Smart H services found in available documents or repository assets.

Where appropriate, include service categories, descriptive visuals, benefits, deliverables, use cases, and links to detailed service pages.

Every service card must navigate to a valid destination.

D. Service Detail — /services/:slug

Build a reusable detail-page template driven by service data.

Include:

Service hero.

Overview.

Business challenges addressed.

Capabilities or deliverables.

Relevant process or implementation approach.

Related services.

Consultation CTA.

Never create separate duplicated components for every service unless the content or behavior genuinely requires it.

E. Industries — /industries

Create an industry-focused experience with relevant illustrations and industry descriptions.

Use only industries that are relevant to Smart H's actual offering. Do not imply existing clients or specialized experience without evidence.

F. Case Studies — /case-studies

Create a polished case-study listing with filtering where useful.

Each item should display a title, category, summary, image, and link.

Use verified case studies where available. If sample layouts are needed, clearly mark illustrative content as a sample and do not present invented results or customer identities as real.

G. Case Study Detail — /case-studies/:slug

Create a reusable case-study detail layout with:

Client context, only if approved for publication.

Challenge.

Approach.

Solution.

Outcome, only where substantiated.

Relevant visuals.

Related studies.

Consultation CTA.

Do not invent percentages, savings, deployment times, or improvements.

H. Insights — /insights

If sufficient approved or original content is available, create a resources or insights page with article cards, categories, readable typography, and valid article navigation.

Use original written content. Do not scrape or reproduce the reference websites' articles.

If there is no real article content, keep the section configurable rather than inventing an extensive publication library.

I. Contact — /contact

Create a premium contact experience with a responsive form.

Suggested fields:

Full name.

Business email.

Company or organization.

Phone number, with optional country code.

Service or inquiry type.

Project details.

Optional budget or timeline if relevant.

Requirements:

Frontend validation.

Labels and accessible error messages.

Clear loading and success/error states.

Correct submit and keyboard behavior.

Spam protection strategy appropriate to the available backend.

Integration with an existing API if one is found.

Use an environment-configured API endpoint if appropriate.

If no backend exists, provide a clearly configured email fallback or another real contact method only when valid contact details are available.

Never show “Message sent successfully” merely because a button was clicked. Display success only when the message has actually been accepted by the configured submission mechanism.

J. Not Found — *

Implement a custom 404 page consistent with Smart H branding.

Include a helpful message and working navigation back to the homepage.

11. ADVANCED MOTION DESIGN

Use Framer Motion for shared entrance animations, transitions, and interactive elements where compatible with the existing project.

Use CSS animations for simple visual effects. Introduce GSAP only if a complex scroll sequence genuinely needs it and cannot be handled more simply.

Avoid installing overlapping animation libraries for the same purpose.

Required animations

Announcement text transition.

Navbar entrance and active indicator.

Four-slide hero carousel.

Staggered hero text reveals.

Scroll-triggered section entrances.

Subtle image reveal or masking.

3D icon hover interactions.

Service card depth and highlight effects.

Carefully controlled background particles, lines, or grid effects.

Animated metrics only when the displayed values are factual.

Button hover and press feedback.

CTA section transition.

Footer reveal.

A subtle page transition where it improves the experience.

Animation rules

Favor transform and opacity rather than continuously animating layout dimensions.

Keep animation durations and easing consistent across the site.

Do not animate every element.

Avoid excessive parallax, flashing, motion blur, persistent spinning, and distracting particle effects.

Avoid large animations that repeatedly block scrolling.

Prevent overlapping entrance effects on route changes.

Use prefers-reduced-motion to disable or simplify nonessential motion.

Avoid persistent will-change on large numbers of elements.

Ensure all animations clean up after unmounting.

Keep content usable when animation libraries fail or motion is disabled.

The visual impact should come from well-designed composition and controlled movement rather than the quantity of animations.

12. FUNCTIONAL INTERACTIONS

Implement and test:

React Router navigation.

Responsive mobile navigation.

Accessible service dropdowns.

Four-slide carousel controls.

Rotating announcement bar.

All hero and section CTAs.

Service and case-study links.

Contact form validation.

FAQ accordion, if present.

Back-to-top button if included.

Optional floating contact launcher, if useful.

A floating contact bar must remain closed initially and open only when the user clicks its trigger. It must support a close control, accessible labeling, and appropriate mobile positioning.

Do not introduce popups that open automatically without a clear reason.

Every clickable element must have an intentional, working action. Avoid using placeholder href="#" links.

13. RESPONSIVE DESIGN

The website must be carefully adapted for:

Small mobile: approximately 320–375 px.

Standard mobile: approximately 390–430 px.

Tablet: approximately 768–1024 px.

Laptop: approximately 1280–1440 px.

Large desktop: 1600 px and above.

Requirements:

No horizontal page overflow.

No clipped headings or CTA buttons.

No overlapping navbar, announcement bar, or hero content.

Correct responsive navigation.

Properly cropped and positioned images.

Responsive grid layouts.

Appropriate typography scaling with clamp() when useful.

Adequate touch-target sizes.

Stable cards and form layouts.

No unnecessary fixed heights on text-heavy content.

No animation that relies on hover alone to reveal essential information.

Check both portrait and landscape layouts wherever relevant.

14. PERFORMANCE AND ACCESSIBILITY

Use a performance-first implementation.

Lazy-load below-the-fold images.

Prioritize the initial hero image.

Avoid shipping several megabytes of unnecessary assets.

Avoid installing large packages when a small native solution will work.

Use stable React keys.

Use semantic HTML.

Provide visible focus indicators.

Support keyboard-only navigation.

Label form controls correctly.

Ensure dialogs, dropdowns, and accordions have appropriate states and keyboard behavior.

Respect reduced-motion preferences.

Maintain readable contrast, especially for text on navy and blue backgrounds.

Avoid excessive DOM nodes in animated scenes.

Use error handling for missing images or optional external resources.

Make external navigation and contact links intentional and safe.

Aim for strong Core Web Vitals, but do not fabricate Lighthouse scores or performance results.

15. CLEAN AND UNDERSTANDABLE FOLDER STRUCTURE

Use this as the preferred structure for a new project. Adapt it if the existing codebase already follows a good architecture.

smart-h-website/

public/

assets/

images/

hero/

services/

industries/

case-studies/

about/

icons/

backgrounds/

favicon.svg

src/

assets/

components/

common/

AnnouncementBar.jsx

Navbar.jsx

Footer.jsx

PageTransition.jsx

BackToTop.jsx

layout/

MainLayout.jsx

ui/

Button.jsx

SectionHeading.jsx

Reveal.jsx

ThreeDIcon.jsx

ServiceCard.jsx

IndustryCard.jsx

CaseStudyCard.jsx

FAQAccordion.jsx

forms/

ContactForm.jsx

data/

siteConfig.js

navigation.js

heroSlides.js

services.js

industries.js

caseStudies.js

faqs.js

hooks/

useReducedMotion.js

useAutoplayCarousel.js

pages/

Home.jsx

About.jsx

Services.jsx

ServiceDetail.jsx

Industries.jsx

CaseStudies.jsx

CaseStudyDetail.jsx

Insights.jsx

Contact.jsx

NotFound.jsx

routes/

AppRoutes.jsx

styles/

tokens.css

global.css

animations.css

responsive.css

utils/

assetHelpers.js

formValidation.js

App.jsx

main.jsx

.env.example

ASSET_CREDITS.md

README.md

package.json

Do not create every file simply to match the tree. Each file should have a clear responsibility, and the finished imports must match the actual filenames and exports.

Keep component-specific styles close to the corresponding component or in a clearly named stylesheet if that fits the existing project.

Avoid one enormous JSX file, one enormous CSS file, duplicated navigation markup, and unnecessary abstractions.

16. CENTRALIZED CONFIGURATION

Place editable brand information in src/data/siteConfig.js.

This should contain the approved brand name, logo path, navigation labels, available contact details, social links, CTA labels, and relevant theme settings.

Place the rotating announcement messages in a separate data/configuration module.

Place hero slides, services, industries, and case studies in their own data modules.

This makes it possible to change a headline, banner image, service card, navigation label, or color without searching through multiple files.

Do not expose private API keys or credentials in the frontend. Use environment variables for configuration that is safe to expose, and server-side secrets only in the backend.

17. SEARCH ENGINE OPTIMIZATION

Implement basic technical SEO:

Unique page titles and descriptions.

Correct heading hierarchy.

Semantic page structure.

Canonical URLs where appropriate.

Social sharing metadata.

Descriptive local image names and alt text.

A proper favicon.

robots.txt and sitemap when appropriate to the deployment.

Structured data only for eligible, genuine information.

Working internal navigation and sensible URLs.

Do not create fake ratings, reviews, or organization details in structured data.

18. TESTING AND ERROR PREVENTION

After implementation, perform an actual quality check.

A. Build verification

Run the existing project scripts where available, such as:

npm install when dependencies need installing.

npm run dev to start the development server.

npm run build to verify the production build.

npm run lint if a lint script exists.

npm test if a test script exists.

Do not blindly execute setup commands that would overwrite an existing project or lockfile.

If no lint or test scripts exist, do not claim they passed. Add useful validation where it is practical and compatible with the project.

B. Fix common React errors

Check for:

Missing imports and incorrect file paths.

Invalid JSX.

Incorrect named or default exports.

React Router configuration errors.

Missing dependencies.

Missing image files.

Invalid component props.

Incorrect state updates.

Unstable keys.

Stale carousel timers.

Duplicate event listeners.

Memory leaks from animation effects.

Unhandled form errors.

Console errors caused by the application.

Incorrect environment variable usage.

C. Functional testing

Confirm that:

All pages load through their actual routes.

All navigation items lead to valid destinations.

The announcement bar changes messages.

All four hero slides work.

Carousel controls and keyboard interactions function.

The mobile navigation opens and closes correctly.

Dropdowns work on keyboard and touch devices.

The contact form validates input correctly.

Contact submission has real configured behavior or a clearly indicated fallback.

No image is broken.

No page causes horizontal overflow at supported viewport widths.

The reduced-motion setting is respected.

The 404 page renders for unknown routes.

Use the existing test framework if available. When browser automation is available, exercise the key flows at desktop and mobile viewport sizes.

Fix the defects discovered during testing and rerun the failed checks.

Do not conceal errors by disabling lint rules, suppressing exceptions, or replacing valid content with empty components.

19. FINAL ACCEPTANCE CRITERIA

The task is complete only when:

Smart H has a cohesive, original visual identity.

The full React website is implemented, not merely a homepage mockup.

The homepage has four genuinely different locally stored hero visuals.

The rotating announcement bar functions correctly.

The major iconography follows a coherent 3D design language.

All implemented routes and buttons have meaningful behavior.

Responsive layouts work without horizontal overflow.

Assets are locally stored where practical and have documented provenance.

No reference-site assets, text, logos, or copied layouts have been reused.

The console and build checks have been inspected and encountered errors have been fixed.

The project structure is clear enough for another developer to maintain.

README instructions explain installation, development, environment configuration, build, and deployment.

The final response clearly reports which checks were run and whether any limitation remains.

20. FINAL DELIVERABLE

After completing the implementation:

Summarize the pages and features created.

Provide the actual folder structure.

List the libraries installed and their purpose.

Explain where the announcement messages, hero slides, services, images, colors, and contact information are configured.

Explain how the downloaded/generated assets and credits are organized.

Provide the precise commands to run and build the project.

Report the actual build and test results.

Identify any feature requiring an unavailable backend, external service, or additional credentials.

If operating in an environment that permits file delivery, provide the completed project or ZIP using an actual verified file path.

Do not stop after describing the plan. Do not leave the task at a design specification, an unfinished mockup, or a few isolated components.

Build Smart H as a complete, polished, original, professional React website with premium motion design, custom dimensional visuals, clean architecture, and verified functionality to the extent supported by the available environment.     make it like a expert deep thinking and make it

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/cc588949-ebc5-4a78-9f73-14cc5fa87c85).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
