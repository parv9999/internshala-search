'use client';

import { useState, useEffect } from 'react';
import styles from './ShareCardModal.module.css';

export default function ShareCardModal({ internship, onClose }) {
  const [copied, setCopied] = useState(false);

  const {
    title,
    companyName,
    locations,
    isRemote,
    duration,
    stipend,
    startDate,
    url,
    profileName,
  } = internship;

  const shareUrl = `https://internshala.com/internship/detail/${url}`;

  // Close modal on escape press
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamically assign card gradient backgrounds depending on profile category
  const getGradientClass = () => {
    const p = (profileName || title || '').toLowerCase();
    if (p.includes('web') || p.includes('react') || p.includes('front') || p.includes('tech') || p.includes('software')) {
      return styles.gradTech;
    }
    if (p.includes('design') || p.includes('ui') || p.includes('ux') || p.includes('graphic')) {
      return styles.gradDesign;
    }
    if (p.includes('market') || p.includes('seo') || p.includes('social') || p.includes('content')) {
      return styles.gradMarket;
    }
    return styles.gradDefault;
  };

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <h3 className={styles.title}>Visual Referral Card</h3>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close share card">✕</button>
        </div>

        {/* Scrollable Content */}
        <div className={styles.body}>
          <p className={styles.intro}>
            Here is your personalized digital referral card. Share it with friends or download it to showcase on your socials!
          </p>

          {/* ── Visual Ticket Card ─────────────────────────────── */}
          <div className={`${styles.ticket} ${getGradientClass()}`} id="share-referral-ticket">
            {/* Glossy Overlay */}
            <div className={styles.gloss} />

            {/* Ticket Top */}
            <div className={styles.ticketTop}>
              <span className={styles.cardEyebrow}>✨ PREMIUM OPPORTUNITY</span>
              <h4 className={styles.cardTitle}>{title}</h4>
              <span className={styles.cardCompany}>{companyName}</span>
              {isRemote && <span className={styles.cardBadge}>🏠 Remote / WFH</span>}
            </div>

            {/* Dash Divider */}
            <div className={styles.dashDivider}>
              <div className={styles.notchLeft} />
              <div className={styles.notchRight} />
            </div>

            {/* Ticket Bottom */}
            <div className={styles.ticketBottom}>
              <div className={styles.cardMetaGrid}>
                <div className={styles.metaBox}>
                  <span className={styles.metaLbl}>STIPEND</span>
                  <strong className={styles.metaVal}>{stipend}</strong>
                </div>
                <div className={styles.metaBox}>
                  <span className={styles.metaLbl}>DURATION</span>
                  <strong className={styles.metaVal}>{duration}</strong>
                </div>
                <div className={styles.metaBox}>
                  <span className={styles.metaLbl}>LOCATION</span>
                  <strong className={styles.metaVal}>
                    {isRemote ? 'Work From Home' : locations.slice(0, 1).join('')}
                  </strong>
                </div>
                <div className={styles.metaBox}>
                  <span className={styles.metaLbl}>REF CODE</span>
                  <strong className={`${styles.metaVal} ${styles.refCode}`}>
                    IS-{internship.id || '999'}
                  </strong>
                </div>
              </div>

              {/* Simulated QR Code check grid */}
              <div className={styles.qrWrapper}>
                <div className={styles.qrCode} title="Verify Internship">
                  {Array.from({ length: 49 }).map((_, i) => {
                    const isFilled = (i * 7 + 13) % 3 === 0 || i % 5 === 0 || i < 7 || i > 42;
                    return (
                      <div
                        key={i}
                        className={`${styles.qrPixel} ${isFilled ? styles.qrPixelFilled : ''}`}
                      />
                    );
                  })}
                </div>
                <span className={styles.qrCaption}>Scan to Apply</span>
              </div>
            </div>
          </div>

          {/* Copy referral link row */}
          <div className={styles.shareLinkRow}>
            <input
              type="text"
              readOnly
              value={shareUrl}
              className={styles.linkInput}
              onClick={(e) => e.target.select()}
            />
            <button
              className={`${styles.copyBtn} ${copied ? styles.copyBtnSuccess : ''}`}
              onClick={copyToClipboard}
              suppressHydrationWarning
            >
              {copied ? 'Copied! 🎉' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Footer actions */}
        <div className={styles.footer}>
          <button className={styles.downloadBtn} onClick={() => window.print()}>
            🖨️ Print / Save PDF
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
