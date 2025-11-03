import React from "react";
import Link from "next/link";

const posts = [
  {
    slug: "i-hacked-my-portfolio-legally",
    title: "I Hacked My Own Portfolio (Legally): How I Pen-Tested My Personal Website",
    excerpt: "A hands-on penetration test of my own site: discovery, exploitation, and remediation steps with concrete commands and PoCs.",
    date: "2025-11-04",
    tags: ["pentest", "web", "case-study"],
    content: `
Summary:
I ran a full blackbox assessment against my public portfolio. The scope: external web assets only (no social engineering). This write-up covers reconnaissance, automated scanning, manual verification, exploitation (demo PoCs), and the fixes I implemented.

Reconnaissance:
- Passive: harvested subdomains using crt.sh and securitytrails; gathered robots.txt and sitemap.xml.
- Active: ran a fast nmap TCP SYN scan for open ports on the host (if any) and curl to enumerate headers.

Commands used (examples):
  curl -I https://example.com
  nmap -sS -Pn -T4 example.com
  nikto -h https://example.com

Automated scanning:
- Ran Nikto and OWASP ZAP baseline scan to identify common issues: missing security headers, insecure cookie flags, and potential path disclosure.

Manual verification & findings:
- Missing HTTP security headers: X-Frame-Options and Content-Security-Policy were not set — allowed clickjacking and script injection attack surface in older browsers.
- A JSON API endpoint used by the contact form accepted unchecked input length and returned a detailed stack trace in 500 responses (exposed internal paths).
- An outdated third-party widget included a script from a CDN with no subresource integrity configured.

Exploitation PoC (safe, non-destructive):
- Demonstrated reflected XSS in an innocuous search parameter by encoding a harmless payload that triggered a JS alert in an isolated browser with CSP disabled for testing.
  Example payload (URL-encoded): %3Cscript%3Ealert(1)%3C%2Fscript%3E

Remediations implemented:
1) Add and enforce Content-Security-Policy (report-only first):
   - default-src 'self'; script-src 'self' https://trusted-cdn.example.com; object-src 'none';
2) Set security headers (Strict-Transport-Security, X-Frame-Options: DENY, Referrer-Policy, X-Content-Type-Options: nosniff).
3) Harden contact API: switch to parameterized handling, validate input sizes, and remove verbose stack traces in responses (return generic 500 messages and log details server-side).
4) Replace or pin third-party widgets and add Subresource Integrity (SRI) attributes to CDN scripts.

Lessons learned:
- Routine scans catch issues but manual verification is essential to confirm impact.
- Always assume third-party scripts are untrusted; SRI + CSP reduces supply-chain risk for client-side assets.
`,
  },
  {
    slug: "ai-phishing-detector",
    title: "How I Built an AI-Powered Phishing Detector from Scratch",
    excerpt: "Design, dataset, feature engineering, model choices, and deployment considerations for a phishing-detection prototype.",
    date: "2025-10-20",
    tags: ["ml", "phishing", "detection"],
    content: `
Overview:
I built a prototype that classifies emails/URLs as phishing or benign. Key components: dataset collection, feature extraction, model selection, evaluation, and integrating the model into a processing pipeline.

Dataset & labeling:
- Collected public phishing datasets (PhishTank, OpenPhish) and harvested benign samples from public mailing lists and test domains.
- Labeled heuristics included presence of IP addresses in URL, mismatched display and target domains, TLS certificate issues, and suspicious path tokens.

Feature engineering:
- URL-based features: length, number of subdomains, presence of '@' or '-' tokens, entropy of path segments.
- Header features: SPF, DKIM, DMARC pass/fail, sender reputation (via DNSBL lookups).
- Body features: presence of urgent language, suspicious forms, base64-encoded attachments.

Modeling choices:
- Tried LightGBM for tabular features and a simple CNN on tokenized URLs for string patterns. Ensemble (LightGBM + URL-CNN) gave the best precision-recall tradeoff.

Evaluation:
- Aim for high precision in production to avoid blocking benign emails. Used stratified cross-validation and measured AUC-PR, precision at top-1% and false positive rate under 0.5% in tests.

Deployment notes:
- Serve model as a lightweight REST service using FastAPI with a small Redis cache for computed scores.
- For low-latency path, precompute SPF/DKIM checks via async workers and enrich features before classification.

Security & adversarial considerations:
- Models can be evaded; include rule-based fallbacks and continual retraining. Monitor drift, and log features used for decisions to enable debugging and model improvement.
`,
  },
  {
    slug: "pentest-walkthrough",
    title: "From Recon to Exploit: My First Full Penetration Test Walkthrough",
    excerpt: "A step-by-step narrative of an end-to-end engagement: recon, scanning, exploitation, pivoting, and reporting.",
    date: "2025-09-12",
    tags: ["pentest", "red-team"],
    content: `
Scope & rules of engagement:
- Blackbox external assessment with explicit permission. Rules: non-destructive testing, preserve customer data, and immediate stop on any high-risk impact.

Recon:
- Used Amass for subdomain discovery, then mapped services with nmap. Prioritized web-app hosts and exposed management interfaces.

Scanning & vuln discovery:
- Burp Suite active scan found an insecure deserialization endpoint; manual inspection revealed use of Java serialization in a debug endpoint.

Exploitation (safe PoC):
- Crafted a non-persistent gadget payload to verify deserialization without executing arbitrary code (used to validate presence of vulnerability). Documented steps with request/response and evidence of control.

Post-exploit:
- Established pivot via an exposed administrative API and enumerated internal services. Demonstrated the risk of lateral movement and recommended network segmentation.

Reporting:
- Created an executive summary, technical findings with PoC, risk rating (CVSS where applicable), and prioritized mitigations with estimated effort.
`,
  },
  {
    slug: "psychology-of-phishing",
    title: "The Psychology of Phishing: Why Even Smart People Click",
    excerpt: "Behavioral insights, common persuasion techniques attackers use, and defensive countermeasures (simulations, UI nudges).",
    date: "2025-08-01",
    tags: ["phishing", "human-factors"],
    content: `
Key concepts:
- Phishing leverages cognitive biases: urgency, authority, scarcity, and reciprocity. Even trained users can fall prey when conditioned by context.

Defensive strategies:
- Technical: DMARC/SPF/DKIM to reduce spoofing; bannering external emails and stripping active content in HTML emails.
- Behavioral: periodic phishing simulations, contextual training, and designing user interfaces (e.g., clear domain indicators) that make risky actions harder.

Measuring effectiveness:
- Use metrics like click-through rate on simulated phishes and time-to-report; iterate on training and UI changes based on measured improvement.
`,
  },
  {
    slug: "zero-trust-student-lab",
    title: "Zero-Trust on a Student Budget: How I Built a Secure Lab from Scratch",
    excerpt: "Design and hardening steps for a small, inexpensive lab demonstrating zero-trust principles.",
    date: "2025-06-20",
    tags: ["zero-trust", "lab"],
    content: `
Design goals:
- Minimal cost, reproducible with cloud credits or local VMs. Emphasize identity, short-lived credentials, and micro-segmentation.

Architecture:
- Identity: use OIDC provider (Auth0 or Keycloak) for service and user identity. Issue short-lived tokens.
- Network: use isolated VLANs or cloud VPC subnets; enforce policies with a software-defined firewall (e.g., using Calico or cloud security groups).

Hardening steps:
- MFA for all interactive logins, automatic rotation for service credentials, and least-privilege RBAC policies.

Validation:
- Run attack simulations (internal port scans and lateral-movement checks) to verify segmentation and alerting.
`,
  },
  {
    slug: "dark-web-economy",
    title: "The Dark Web Economy: What Ransomware Gangs Teach Us About Incentives",
    excerpt: "Analysis of attacker incentives and how economic models inform defensive prioritization.",
    date: "2025-05-10",
    tags: ["threat-intel", "ransomware"],
    content: `
High-level insights:
- Ransomware operations are business-like: they optimize for return-on-effort. Understanding attacker economics helps defenders allocate scarce resources.

What defenders can do:
- Increase attack cost: backups, immutable infrastructure, segmentation. Reduce payoff: rapid detection and reducing likelihood of lucrative data exfiltration.

Intelligence sources:
- Monitor dark-web leaks, prioritize indicators of compromise (IOCs) relevant to your stack, and map common extortion techniques to defensive controls.
`,
  },
  {
    slug: "personal-siem",
    title: "Building a Personal SIEM with Python and Open-Source Tools",
    excerpt: "Collect, parse, and alert on logs using open-source components — ELK/Opensearch, Vector, and simple rule engines.",
    date: "2025-04-02",
    tags: ["siem", "logging"],
    content: `
Architecture:
- Shippers: Vector or filebeat collects logs and forwards to OpenSearch/Elasticsearch.
- Parsing: Ingest pipelines normalize fields (timestamps, IPs) and enrich (geoip, user-agent parsing).
- Detection: simple rule engine (Yara-like or Sigma converted rules) to trigger alerts, webhooks to a small alerting service.

Prototype steps:
1) Deploy OpenSearch in a small container and configure index templates.
2) Configure Vector to tail syslog and application logs, convert to JSON, and add fields.
3) Implement a Python alerting microservice that queries OpenSearch and applies Sigma rules periodically.

Outcome:
- Demonstrates data pipeline skills and detection engineering fundamentals suitable for SOC/intern roles.
`,
  },
  {
    slug: "owasp-top-10-hardening",
    title: "How I Secured a Vulnerable Web App Using OWASP Top 10 Principles",
    excerpt: "Walkthrough of remediations mapped to OWASP Top 10 categories with before/after evidence.",
    date: "2025-03-15",
    tags: ["owasp", "web"],
    content: `
Methodology:
- Start with a vulnerable instance (test lab), run automated scans and manual verification, then apply mitigations mapped to specific OWASP categories.

Examples:
- A1 Injection: parameterized queries, input validation, and least-privilege DB accounts.
- A3 Sensitive Data Exposure: enforce TLS, encrypt data at rest, and limit logging of secrets.

Verification:
- Re-scan and validate that attack vectors no longer produce exploitable responses; maintain a remediation checklist.
`,
  },
  {
    slug: "hardening-metasploitable2",
    title: "Lessons from Hardening Metasploitable 2: What Real Defense Looks Like",
    excerpt: "Practical hardening steps on an intentionally vulnerable VM and how to generalize them to production systems.",
    date: "2025-02-01",
    tags: ["hardening", "blue-team"],
    content: `
Hardening checklist applied:
- Remove unnecessary services, apply least-privilege user accounts, patch known vulnerabilities, and use host-based firewalls.

Evidence:
- Show before/after attack traces (service banner removal, closed ports), and improved logging to aid detection.

Takeaway:
- Hardening is iterative: automation (configuration management) ensures reproducibility and scalability.
`,
  },
  {
    slug: "inside-the-mind-of-a-hacker",
    title: "Inside the Mind of a Hacker: Thinking Offensively to Defend Better",
    excerpt: "Tactics, techniques, and mindset — learning offensive thinking to build stronger defenses.",
    date: "2025-01-10",
    tags: ["offensive-security", "mindset"],
    content: `
Overview:
Adversarial thinking improves defensive design. This article breaks down common attacker workflows (recon, weaponization, delivery, exploitation, persistence) and how defenders can anticipate and disrupt each phase.

Techniques and defender takeaways:
- Recon: attackers extensively profile targets. Defenders should reduce information leakage (tighten DNS, remove version banners, limit public metadata) and monitor for reconnaissance activity.
- Weaponization: threat actors prepare tooling and payloads. Enforce strict control over uploads and artifact stores; scan and sandbox incoming binaries.
- Delivery & Exploitation: social engineering and web weaknesses are primary vectors. Harden input handling, enforce MFA, and monitor for anomalous login patterns.
- Persistence & Lateral Movement: use least-privilege, rotate credentials, and monitor unusual API calls; implement micro-segmentation to raise attack cost.

Mindset exercises:
- Red-team blue-team drills: run short, scoped attack simulations and capture telemetry to improve detection rules.
- Threat modeling from attacker POV: think what an attacker gains at each step and implement controls that force them to expend more effort.

Outcome:
Practicing offensive thinking helps prioritize controls that reduce attacker ROI and improves detection coverage for realistic attack paths.
`,
  },
];

import BlogListClient from "@/components/ui/BlogListClient";

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black py-24 relative">
      {/* subtle global scanline for the blog */}
      <div aria-hidden className="absolute inset-0 pointer-events-none scanline-overlay opacity-60" />

      <div className="max-w-5xl mx-auto px-6 text-neonGreen relative z-10">
        <header className="mb-6">
          <h1 className="text-4xl font-mono font-bold">&lt;/blog&gt;</h1>
          <p className="mt-2 text-neonGreen/70 font-mono max-w-2xl">Short technical essays, deployment post-mortems, and design notes that show how I think about building reliable, secure software.</p>
        </header>

        <div>
          <BlogListClient posts={posts} />
        </div>
      </div>
    </main>
  );
}
