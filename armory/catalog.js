/* Skunkworks Academy Cyber Armory finalizer
 * SKU: SKW-SEC-ARM-001
 * Data source: attachment-derived armory/data-1.js ... armory/data-6.js
 */
(function(){
  const purposes={
    "Credential & Identity Security":"Credential and authentication auditing resource; use only with owned, synthetic, or explicitly provided credentials and hashes.",
    "Adversary Emulation & C2 Research":"Dual-use adversary-emulation resource; restrict to isolated ranges or formally authorised red/purple-team work.",
    "Wireless Security":"Wireless-security resource; use only with networks and radios you own or have explicit written authority to assess.",
    "SOC, SIEM & Threat Intelligence":"Defensive monitoring, threat hunting, indicator enrichment, malware analysis, SIEM or security-operations resource.",
    "DFIR & Forensics":"Incident response, evidence handling, forensic examination or post-incident analysis resource.",
    "OSINT & Internet Intelligence":"Public-source intelligence and exposure-research resource; use lawfully with data minimisation and a legitimate purpose.",
    "Web & Application Security":"Web/API assessment resource; use only against applications explicitly in scope or isolated training targets.",
    "Vulnerability Management":"Vulnerability discovery, prioritisation and remediation resource for assets included in an authorised scope.",
    "Mobile Security":"Mobile application analysis and instrumentation resource for apps and devices you own or are authorised to assess.",
    "Cloud & Platform Security":"Cloud posture, exposure, hardening or authorised cloud-assessment resource.",
    "Reverse Engineering & Debugging":"Binary analysis, debugging and reverse-engineering resource for authorised samples and controlled research.",
    "Secure Coding, SAST & Fuzzing":"Secure-development, static-analysis or fuzzing resource for software you control or are authorised to test.",
    "Steganography & Media Forensics":"Media-forensics and data-hiding research resource for controlled test artefacts.",
    "Network Security":"Network discovery, enumeration or protocol-analysis resource; keep activity bounded to authorised networks.",
    "Windows & Active Directory":"Windows and Active Directory security resource for identity, permissions, hardening and authorised assessment.",
    "Frameworks, Standards & Governance":"Security architecture, governance, risk, control, methodology or standards reference.",
    "Phishing Awareness & Analysis":"Phishing-awareness and defensive-analysis resource; do not use to deceive real users outside authorised simulations.",
    "Cyber Threat Visualisation":"Threat-telemetry visualisation resource for situational awareness and demonstrations.",
    "Training, Labs & Reference":"Cybersecurity learning, lab or practitioner reference resource.",
    "Security Tools & Reference":"General cybersecurity tool or reference; apply the legal authority and safe-use boundary appropriate to the resource."
  };
  const seen=new Set();
  const source=Array.isArray(window.SKUNKWORKS_ARMORY)?window.SKUNKWORKS_ARMORY:[];
  window.SKUNKWORKS_ARMORY=source.filter((item)=>{
    const key=String(item.u||'').replace(/\/$/,'');
    if(!key||seen.has(key)) return false;
    seen.add(key); return true;
  }).map((item)=>({...item,d:item.d||`${item.n}. ${purposes[item.c]||purposes["Security Tools & Reference"]}`}));
})();
