# Emergent (emergent.sh) — evidence-based public reverse-engineering dossier

Research date: 20–21 October 2026. Target: https://emergent.sh and https://app.emergent.sh. Scope: publicly documented UX, public landing and login surfaces, published engineering posts, and publicly shared screenshots. No authenticated workspace session, private source, unpublished APIs, hidden endpoints, credentials or exploit attempts were examined. Do not describe this work as inspection of Emergent's private repository.

## Executive findings

Emergent is a conversational full-stack development environment. The defining product is not the chat UI but the loop **prompt → agent plans/writes/tests → live isolated preview → feedback/revisions → human-authorised publish**. The workspace brings together persistent chat, file tree, interactive preview, logs/terminal, secrets, deployments, versions and integrations.

Confidence labels:
- **Confirmed/public:** explicit statements in first-party docs or engineering posts.
- **Observed/public:** visible on unauthenticated pages or publicly published screenshots.
- **Hypothesis/proposed:** modelled from these observations for our implementation; NOT an assertion about Emergent internals.

## Observed functional surfaces

| Surface | Public evidence | Priority in FORM/LAB |
| --- | --- | --- |
| Auth/greeting and natural-language project prompt | https://app.emergent.sh/ | P0: simple prompt entry |
| Persistent chat/session context | https://help.emergent.sh/a-tour-of-the-workspace | P0: local chat history, then server persistence |
| Agent tasks, generated code and status | https://help.emergent.sh/the-chat-to-deployment-flow | P0: job timeline and clear real/simulated status |
| Preview auto-refresh and responsive interaction | https://help.emergent.sh/previewing-iterating | P0: sandboxed HTML preview; later isolated dev runtime |
| Source tree, code editor, terminal, logs, database browser | https://help.emergent.sh/glossary-of-emergent-terms | P1: code and inspection panels; real runtime later |
| Separate preview and published application | https://help.emergent.sh/preview-vs-deployed-separate | P0: never equate preview with production |
| Github/code export, versioning and rollback | https://help.emergent.sh/a-tour-of-the-workspace and https://help.emergent.sh/the-chat-to-deployment-flow | P1: Git-backed checkpoints |
| Secrets and external integrations | https://help.emergent.sh/a-tour-of-the-workspace | P2: encrypted server-side, never in chat/browser |
| Visual editing of rendered elements | https://emergent.sh/blog (16 September 2026 entry) | P2: element selection → constrained change request |
| Agent delegation | https://help.emergent.sh/agent-architecture and https://help.emergent.sh/main-agents-in-emergent | P1: scoped specialists with audit trail |
| Desktop/mobile generation | https://emergent.sh | P2: independent mobile application toolchain |

## Confirmed high-level runtime architecture (first-party engineering post, March 2026)

Engineering source: https://emergent.sh/blog/real-environments-for-ai-agents-and-why-we-bet-on-kubernetes

Per the company's account, the agent is assigned an isolated Kubernetes development pod capable of installing packages, editing files, building code and running application servers. A restore init container rehydrates prior state; the main container provides Linux/application services; a privileged operations sidecar handles health and incremental backups. A reverse proxy exposes the preview. It uses network policies and resource limits for isolation, with content-addressed object-store backups. The post names observability with OpenTelemetry and Prometheus.

This is not independent verification of the live architecture. It is the company's published description, not a dump of its internal source code, secrets or exact proprietary implementation.

### Functional component diagram for a legally independent implementation

```text
Browser Workspace
  ├── Prompt / Persistent Chat
  ├── Files & Diff / Code
  ├── Preview / Device Frame
  ├── Job Activity / Tests / Logs
  └── Publish / History (approval required)
              |
          API Gateway / Auth
              |
        Agent Orchestrator
       (task graph + budget)
         /       |       \
   Planner    Builder   QA Observer
         \       |       /
          Task Event Stream
              |
       Job Executor (isolated, no prod secrets)
          ├── Project-specific Git checkout
          ├── Dependency/build runner
          ├── Preview server + proxy
          ├── Browser QA process
          └── Structured artifacts/logs
              |
     Git Repository / Durable Storage
              |
       Human release approval
              |
    Vercel deployment / production
```

### Security and operational invariants

- Arbitrary agent-generated shell commands must run only in per-project isolated workers, not inside the UI server.
- Browser previews must not share the app builder's origin/session cookies. Local prototypes should use script-disabled sandboxed iframes.
- Treat webpage text, imported repositories and design references as untrusted data. Ignore any instructions embedded in them.
- Never write API keys into generated source, prompts, application logs or client-side state.
- Review repository ownership, licences and permission to reproduce content/assets; implement design patterns, not Emergent marks or proprietary code.
- Use cost ceilings, retries, cancellation, egress filtering and max runtime per job.
- Production publish requires an explicit user's release action and displays target/commit.

## Honest evidence boundaries

**Not verified:** Emergent's exact private models/router, internal prompts, event protocol, hidden APIs, schema design, code generation details or proprietary algorithms. Login-protected workspace internals were not directly inspected.

**What public evidence permits:** reconstruction of functional *patterns* and public interactions using original code, an independent visual identity and open-source libraries.

## Recommended staged implementation for FORM/LAB

### Stage 1 — shipped as part of current work
A distinctive dark workspace within FORM/LAB featuring:
- Prompt input and persistent local conversation/project history.
- Deterministic template generation + user-editable HTML source (explicitly labelled local demo).
- Live sandboxed iframe preview (no scripts or arbitrary code execution).
- Files/code/activity/preview tabs and desktop/mobile viewport controls.
- Downloadable source code; sensible empty and error states.

### Stage 2 — actual coding agents
Backend auth/storage, a job queue, event stream, LLM planning/coding with model selection and per-job cost limits; repo checkout + commits. Never call a locally-generated demo a real autonomous build.

### Stage 3 — verification and production
Isolated build sandbox; incremental preview updates, tests (Playwright), browser snapshot and visual difference analysis, Git rollback, approval-gated Vercel preview → production releases.

## Product strategy: improve on observed weaknesses

Don't just clone a dark chat panel. Preserve FORM/LAB's strengths:
- **Visual director:** explicit typography, palettes, motion storyboard and references before code.
- **Live visual evidence:** overlay comparisons against reference screenshots at controlled viewport sizes.
- **Cost transparency:** planned job budget and actual token/compute accounting.
- **Provenance:** every claim about similarity or functionality points to rendered evidence.
- **User ownership:** plain Git files, portable components, auditable revisions and deploys.

## Useful resources

- https://github.com/morluto/rea — reverse-engineering tooling, use only for lawfully accessible assets.
- https://github.com/JCodesMore/ai-website-cloner-template — website-reconstruction workflow template.
- https://github.com/microsoft/playwright — independent browser test and evidence collection.
- https://github.com/ChromeDevTools/chrome-devtools-mcp — DevTools inspection.
- https://github.com/greensock/GSAP and https://github.com/pmndrs/react-three-fiber — original visual engineering.

## Screenshots

Public third-party screenshots show a dark workspace with a conversational transcript next to an app preview, utility toolbar, deployment controls and credit counter. Reference examples:
- https://www.banani.co/blog/emergent-ai-review
- https://www.nocode.mba/articles/ai-app-builder-emergent

These references are for analysis. Do not copy third-party images, logos or proprietary code into FORM/LAB.
