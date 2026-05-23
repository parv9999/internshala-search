'use client';

import { useState, useEffect } from 'react';
import styles from './DetailDrawer.module.css';

function getLogoUrl(logo) {
  if (!logo) return null;
  return `https://internshala.com/uploads/company/${logo}`;
}

function formatStipend(stipend) {
  if (!stipend || stipend === 'Unpaid') return 'Unpaid';
  return stipend.replace('INR ', '₹').replace('/month', '/mo');
}

function getDynamicRoleDetails(profileName, title, companyName) {
  const profile = (profileName || title || '').toLowerCase();
  
  // Default fallback data
  let aboutCompany = `${companyName} is an innovative and fast-growing company in its sector, dedicated to delivering cutting-edge solutions. We focus on fostering a dynamic work atmosphere where young minds can learn, build, and lead.`;
  let responsibilities = [
    "Collaborate with the cross-functional team to understand requirements and execute project goals.",
    "Work on real-world projects under the guidance of industry mentors and senior professionals.",
    "Perform research, gather requirements, and assist in documentation and quality assurance.",
    "Contribute to team meetings, present ideas, and take constructive feedback for growth."
  ];
  let skills = ["Communication", "Problem Solving", "Collaboration", "MS Office / Google Docs"];
  let perks = ["Certificate of Internship", "Letter of Recommendation", "Flexible Work Hours", "Informal Dress Code"];
  
  if (profile.includes('web') || profile.includes('front') || profile.includes('react') || profile.includes('javascript') || profile.includes('software') || profile.includes('developer') || profile.includes('tech') || profile.includes('backend') || profile.includes('full')) {
    aboutCompany = `${companyName} is a technology-focused organization building next-generation digital products. We pride ourselves on clean code, modern architecture, and solving hard technical challenges for our global user base.`;
    responsibilities = [
      "Develop and maintain responsive, high-performance web applications using modern web frameworks.",
      "Collaborate with UX/UI designers to transform design prototypes into pixel-perfect interactive pages.",
      "Integrate backend RESTful APIs and handle client-side data management and state optimizations.",
      "Write modular, clean, and well-documented code with comprehensive testing.",
      "Participate in code reviews, debug complex issues, and optimize application rendering speed."
    ];
    skills = ["JavaScript (ES6+)", "HTML5 & CSS3", "React.js / Next.js", "Git & GitHub", "REST APIs", "Node.js / Express"];
    perks = ["Certificate of Internship", "Letter of Recommendation", "Flexible Work Hours", "5 days a week", "PPO Opportunities", "Snacks & Beverages"];
  } else if (profile.includes('design') || profile.includes('ui') || profile.includes('ux') || profile.includes('graphic') || profile.includes('figma')) {
    aboutCompany = `${companyName} is a creative design and media studio. We craft stunning visual experiences, brand strategies, and beautiful product interfaces that make a lasting impression on consumers.`;
    responsibilities = [
      "Create visually engaging and user-centered design concepts, wireframes, and prototypes.",
      "Collaborate with frontend developers to ensure high-fidelity implementation of visual designs.",
      "Conduct user research, usability testing, and analyze feedback to refine user journeys.",
      "Design banners, social media assets, and digital marketing collateral aligned with brand identity.",
      "Keep up-to-date with emerging UI/UX design trends, tools, and design system methodologies."
    ];
    skills = ["Figma", "Adobe Photoshop / Illustrator", "User Research", "Wireframing & Prototyping", "Visual Design", "Typography"];
    perks = ["Certificate of Internship", "Letter of Recommendation", "Flexible Work Hours", "Informal Dress Code", "PPO Opportunities"];
  } else if (profile.includes('market') || profile.includes('seo') || profile.includes('social') || profile.includes('sales') || profile.includes('content')) {
    aboutCompany = `${companyName} is a customer-centric company driven by data, storytelling, and digital growth. We build high-impact growth channels, digital campaigns, and community engagements that connect people with value.`;
    responsibilities = [
      "Assist in executing social media marketing campaigns across Instagram, LinkedIn, and Twitter.",
      "Conduct SEO keyword research and optimize on-page content to drive organic traffic.",
      "Draft engaging newsletters, blog articles, and persuasive marketing copy for target audiences.",
      "Analyze campaign performance metrics (ROI, CPC, CTR) and generate weekly reports.",
      "Support the sales and business development teams in lead generation and customer outreach."
    ];
    skills = ["Digital Marketing", "SEO / SEM", "Content Writing", "Google Analytics", "Social Media Management", "Copywriting"];
    perks = ["Certificate of Internship", "Letter of Recommendation", "Flexible Work Hours", "Performance Incentives", "PPO Opportunities"];
  }
  
  return { aboutCompany, responsibilities, skills, perks };
}

// Dynamic Interview Prep Question Bank
function getInterviewQuestions(profileName, title) {
  const profile = (profileName || title || '').toLowerCase();
  
  if (profile.includes('web') || profile.includes('react') || profile.includes('front') || profile.includes('javascript') || profile.includes('software') || profile.includes('developer') || profile.includes('tech') || profile.includes('backend') || profile.includes('full')) {
    return [
      {
        q: "How does the React virtual DOM work?",
        a: "React creates a lightweight in-memory representation of the DOM. When state changes, it reconciles differences (diffing) and updates only the changed parts of the real DOM, ensuring high rendering efficiency."
      },
      {
        q: "What is the difference between state and props in React?",
        a: "State represents mutable local data owned and managed inside a component. Props are immutable read-only parameters passed down from a parent component to configure it."
      },
      {
        q: "Explain Next.js SSR vs. standard React CSR.",
        a: "CSR (Client-Side Rendering) sends empty HTML and builds the page on the client. SSR (Server-Side Rendering) pre-compiles pages with data on the server, ensuring great SEO and incredibly fast loads."
      }
    ];
  }
  
  if (profile.includes('design') || profile.includes('ui') || profile.includes('ux') || profile.includes('graphic') || profile.includes('figma')) {
    return [
      {
        q: "What is the core difference between UI and UX design?",
        a: "UI (User Interface) refers to aesthetics, layouts, and typography. UX (User Experience) targets user journeys, psychology, flows, and the overall usability of the product."
      },
      {
        q: "Explain visual hierarchy and how to achieve it.",
        a: "Visual hierarchy is arranging elements in order of importance. It is achieved by adjusting sizes, high-contrast colors, weights, and padding to naturally guide the user's focus."
      },
      {
        q: "How do you conduct usability testing on a Figma prototype?",
        a: "By setting specific task targets, observing where test users encounter friction, analyzing click paths, and gathering constructive design feedback to simplify the layouts."
      }
    ];
  }
  
  if (profile.includes('market') || profile.includes('seo') || profile.includes('social') || profile.includes('sales') || profile.includes('content')) {
    return [
      {
        q: "What is the difference between On-Page and Off-Page SEO?",
        a: "On-Page SEO optimizes elements directly on the website (keywords, title tags, body text, alt tags). Off-Page SEO builds authority externally (backlinks, guest posts, social shares)."
      },
      {
        q: "How do you calculate CTR and Cost Per Click (CPC)?",
        a: "CTR (Click-Through Rate) is clicks divided by impressions multiplied by 100. CPC (Cost Per Click) is the total advertising cost divided by the total number of clicks generated."
      },
      {
        q: "Explain the stages of a digital marketing funnel.",
        a: "A structured customer journey: Awareness (viewing ads) -> Interest (checking landing pages) -> Decision (adding items to cart) -> Action (submitting payment)."
      }
    ];
  }
  
  // General standard professional questions
  return [
    {
      q: "Tell me about a technical challenge you recently solved.",
      a: "Explain a blocker you encountered, outline how you analyzed log statements, detailed potential solutions, implemented the fix, and verified everything functioned cleanly."
    },
    {
      q: "Why do you want to join our organization?",
      a: "Highlight your enthusiasm for their domain products, explain how your skills solve their current tech needs, and express a strong eagerness to learn under senior team mentors."
    },
    {
      q: "How do you handle tight project deadlines?",
      a: "By breaking tasks into small pieces, utilizing checklist boards, communicating early if blockers arise, and staying focused on high-priority delivery items."
    }
  ];
}

// 3D CSS Flipping Flashcard Component
function Flashcard({ question, answer, number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`${styles.flashcard} ${flipped ? styles.flashcardFlipped : ''}`}
      onClick={() => setFlipped(!flipped)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
    >
      <div className={styles.flashcardInner}>
        {/* Front Side */}
        <div className={styles.flashcardFront}>
          <span className={styles.flashcardBadge}>Question {number}</span>
          <p className={styles.flashcardQ}>{question}</p>
          <span className={styles.tapPrompt}>👆 Tap to flip card</span>
        </div>
        {/* Back Side */}
        <div className={styles.flashcardBack}>
          <span className={`${styles.flashcardBadge} ${styles.flashcardBadgeAns}`}>Answer Key</span>
          <p className={styles.flashcardA}>{answer}</p>
          <span className={styles.tapPrompt}>👆 Tap to see question</span>
        </div>
      </div>
    </div>
  );
}

export default function DetailDrawer({ internship, onClose, isSaved, onToggleSave, matchScore = null }) {
  const [copied, setCopied] = useState(false);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);

  const {
    title, companyName, companyLogo, locations,
    isRemote, duration, stipend, startDate,
    expiringIn, isPremium, isPPO, isInternational, url, partTime,
  } = internship;

  const logoUrl = getLogoUrl(companyLogo);
  const { aboutCompany, responsibilities, skills, perks } = getDynamicRoleDetails(
    internship.profileName,
    title,
    companyName
  );

  const prepQuestions = getInterviewQuestions(internship.profileName, title);

  // Auto-fill checklist triggers if match score is active to simulate success
  useEffect(() => {
    if (matchScore >= 70) {
      setCheck1(true);
      setCheck2(true);
      setCheck3(true);
    }
  }, [matchScore]);

  // Prevent scroll on body when drawer is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  async function handleShare() {
    const shareUrl = `https://internshala.com/internship/detail/${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch (err) {
        console.error(err);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  const isEligible = check1 && check2 && check3;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.drawer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerMain}>
            <div className={styles.logoWrap}>
              {logoUrl ? (
                <img src={logoUrl} alt={`${companyName} logo`} className={styles.logo}
                  onError={(e) => { e.currentTarget.style.display = 'none'; }} />
              ) : (
                <div className={styles.logoFallback}>
                  {companyName?.charAt(0)?.toUpperCase() || '?'}
                </div>
              )}
            </div>
            <div className={styles.headerInfo}>
              <h2 className={styles.title}>{title}</h2>
              <div className={styles.companyRow}>
                <span className={styles.company}>{companyName}</span>
                {isPremium && <span className={styles.premiumBadge}>✦ Premium</span>}
              </div>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close details">
            ✕
          </button>
        </div>

        {/* Scrollable Body */}
        <div className={styles.body}>
          {/* Badges Row */}
          <div className={styles.badges}>
            {isRemote && <span className={`${styles.badge} ${styles.badgeRemote}`}>🏠 Work from Home</span>}
            {isPPO && <span className={`${styles.badge} ${styles.badgePPO}`}>⭐ Job Offer (PPO)</span>}
            {isInternational && <span className={`${styles.badge} ${styles.badgeIntl}`}>🌍 International</span>}
            {partTime && <span className={`${styles.badge} ${styles.badgePartTime}`}>Part-time</span>}
            {internship.stipendValue >= 20000 && (
              <span className={`${styles.badge} ${styles.badgeHigh}`}>🔥 High Stipend</span>
            )}
          </div>

          {/* Quick Stats Grid */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>📅 START DATE</span>
              <span className={styles.statVal}>{startDate}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>⏳ DURATION</span>
              <span className={styles.statVal}>{duration}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>💵 STIPEND</span>
              <span className={styles.statVal}>{formatStipend(stipend)}</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statLabel}>⌛ APPLY BY</span>
              <span className={styles.statVal}>{expiringIn || 'Apply soon'}</span>
            </div>
          </div>

          {/* Skills Match Analysis Card */}
          {matchScore > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Skills Alignment Analysis</h3>
              <div className={styles.matchAnalysisCard}>
                <div className={styles.matchScoreWrap}>
                  <div className={styles.matchCircle}>
                    <strong>{matchScore}%</strong>
                    <span>Match</span>
                  </div>
                  <div className={styles.matchTextWrap}>
                    <h4 className={styles.matchTitle}>
                      {matchScore >= 80 ? '🔥 High Compatibility!' : '⭐ Solid Matching Profile!'}
                    </h4>
                    <p className={styles.matchDesc}>
                      {matchScore >= 80
                        ? 'Your credentials match the core technical skills needed. Highly recommended to apply!'
                        : 'Your skill categories align nicely. Consider adding key industry words to secure selection screening.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Interview Prep Flashcards */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>📚 Interview Prep Flashcards</h3>
            <p className={styles.sectionSub}>Tap cards to flip and reveal typical interview questions & answer guidelines for this role!</p>
            <div className={styles.flashcardsGrid}>
              {prepQuestions.map((q, idx) => (
                <Flashcard key={idx} question={q.q} answer={q.a} number={idx + 1} />
              ))}
            </div>
          </div>

          {/* Timeline roadmap */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Application Roadmap</h3>
            <div className={styles.timeline}>
              <div className={`${styles.timelineStep} ${styles.timelineStepActive}`}>
                <div className={styles.timelineDot}>1</div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineStepTitle}>Apply</h4>
                  <p className={styles.timelineStepDesc}>Submit resume & answer employer questions</p>
                </div>
              </div>
              <div className={styles.timelineStep}>
                <div className={styles.timelineDot}>2</div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineStepTitle}>Resume Shortlisting</h4>
                  <p className={styles.timelineStepDesc}>Employer reviews applicant skills and background</p>
                </div>
              </div>
              <div className={styles.timelineStep}>
                <div className={styles.timelineDot}>3</div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineStepTitle}>Technical Interview</h4>
                  <p className={styles.timelineStepDesc}>Virtual interview or online coding task submission</p>
                </div>
              </div>
              <div className={styles.timelineStep}>
                <div className={styles.timelineDot}>4</div>
                <div className={styles.timelineContent}>
                  <h4 className={styles.timelineStepTitle}>Final Selection</h4>
                  <p className={styles.timelineStepDesc}>Get hired with potential PPO (Job Offer) terms</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Eligibility Checklist */}
          <div className={styles.section}>
            <div className={styles.sectionHeaderRow}>
              <h3 className={styles.sectionTitle}>Eligibility Checker</h3>
              {isEligible && <span className={styles.matchBadge}>🎉 Perfect Match (100%)</span>}
            </div>
            <div className={styles.checklist}>
              <label className={styles.checkItem}>
                <input
                  type="checkbox"
                  checked={check1}
                  onChange={(e) => setCheck1(e.target.checked)}
                  className={styles.checkInput}
                />
                <span className={styles.checkLabel}>
                  I am available for the full <strong>{duration}</strong> internship.
                </span>
              </label>
              <label className={styles.checkItem}>
                <input
                  type="checkbox"
                  checked={check2}
                  onChange={(e) => setCheck2(e.target.checked)}
                  className={styles.checkInput}
                />
                <span className={styles.checkLabel}>
                  I can work {isRemote ? 'Remote / Work From Home' : `in ${locations.join(', ')}`}.
                </span>
              </label>
              <label className={styles.checkItem}>
                <input
                  type="checkbox"
                  checked={check3}
                  onChange={(e) => setCheck3(e.target.checked)}
                  className={styles.checkInput}
                />
                <span className={styles.checkLabel}>
                  I possess the required skills or similar technical knowledge.
                </span>
              </label>
            </div>
          </div>

          {/* About Company */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>About {companyName}</h3>
            <p className={styles.sectionText}>{aboutCompany}</p>
          </div>

          {/* Responsibilities */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Role & Responsibilities</h3>
            <ul className={styles.list}>
              {responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          {/* Skills required */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Skills Required</h3>
            <div className={styles.chipsRow}>
              {skills.map((skill) => (
                <span key={skill} className={styles.skillChip}>{skill}</span>
              ))}
            </div>
          </div>

          {/* Perks */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Perks & Benefits</h3>
            <div className={styles.chipsRow}>
              {perks.map((perk) => (
                <span key={perk} className={styles.perkChip}>🌟 {perk}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <button
              className={`${styles.actionBtn} ${styles.bookmarkBtn} ${isSaved ? styles.bookmarkActive : ''}`}
              onClick={() => onToggleSave(internship.id)}
              title={isSaved ? 'Remove Bookmark' : 'Bookmark'}
            >
              {isSaved ? '🔖 Bookmarked' : '🤍 Bookmark'}
            </button>
            <button
              className={`${styles.actionBtn} ${styles.shareBtn}`}
              onClick={handleShare}
            >
              📤 {copied ? 'Copied!' : 'Share'}
            </button>
          </div>
          <a
            href={`https://internshala.com/internship/detail/${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.applyBtn}
          >
            Apply on Internshala →
          </a>
        </div>
      </div>
    </div>
  );
}
