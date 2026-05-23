'use client';
import { useState } from 'react';
import styles from './InternshipCard.module.css';
import DetailDrawer from './DetailDrawer';

function getLogoUrl(logo) {
  if (!logo) return null;
  return `https://internshala.com/uploads/company/${logo}`;
}

function formatStipend(stipend) {
  if (!stipend || stipend === 'Unpaid') return 'Unpaid';
  return stipend.replace('INR ', '₹').replace('/month', '/mo');
}

export default function InternshipCard({
  internship,
  index = 0,
  isSaved,
  onToggleSave,
  viewMode = 'grid',
  matchScore = null,
  onShareClick,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [shareMsg, setShareMsg] = useState('');

  const {
    title, companyName, companyLogo, locations,
    isRemote, duration, stipend, startDate,
    expiringIn, isPremium, isPPO, isInternational, url, partTime,
  } = internship;

  const logoUrl = getLogoUrl(companyLogo);

  async function handleShare(e) {
    e.stopPropagation();
    if (onShareClick) {
      onShareClick(internship);
      return;
    }
    const shareUrl = `https://internshala.com/internship/detail/${url}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url: shareUrl });
      } catch (err) {
        console.error(err);
      }
    } else {
      await navigator.clipboard.writeText(shareUrl);
      setShareMsg('Link copied!');
      setTimeout(() => setShareMsg(''), 2000);
    }
  }

  return (
    <>
      <article
        className={`${styles.card} ${viewMode === 'list' ? styles.listCard : ''}`}
        style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
        id={`internship-card-${internship.id}`}
        onClick={() => setDrawerOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setDrawerOpen(true)}
      >
        {/* Top badges row */}
        <div className={styles.badges}>
          {matchScore > 0 && (
            <span
              className={`${styles.badge} ${styles.badgeMatch}`}
              style={{ animation: 'pulse 2s infinite ease-in-out' }}
            >
              ⚡ {matchScore}% Match
            </span>
          )}
          {isRemote && <span className={`${styles.badge} ${styles.badgeRemote}`}>🏠 Work from home</span>}
          {isPPO    && <span className={`${styles.badge} ${styles.badgePPO}`}>⭐ Job offer</span>}
          {isInternational && <span className={`${styles.badge} ${styles.badgeIntl}`}>🌍 International</span>}
          {partTime && <span className={`${styles.badge} ${styles.badgePartTime}`}>Part‑time</span>}
          {internship.stipendValue >= 20000 && (
            <span className={`${styles.badge} ${styles.badgeHigh}`}>🔥 High stipend</span>
          )}
        </div>

        {/* Body */}
        <div className={styles.body}>
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
          <div className={styles.info}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.company}>
              {companyName}
              {isPremium && <span className={styles.premiumDot} title="Premium">✦</span>}
            </span>
          </div>

          {/* Action buttons top-right */}
          <div className={styles.cardActions} onClick={(e) => e.stopPropagation()}>
            <button
              id={`save-btn-${internship.id}`}
              className={`${styles.iconBtn} ${isSaved ? styles.iconBtnActive : ''}`}
              onClick={() => onToggleSave(internship.id)}
              title={isSaved ? 'Remove bookmark' : 'Bookmark'}
              aria-label="Bookmark"
              suppressHydrationWarning
            >
              {isSaved ? '🔖' : '🤍'}
            </button>
            <button
              id={`share-btn-${internship.id}`}
              className={styles.iconBtn}
              onClick={handleShare}
              title="Share internship"
              aria-label="Share"
              suppressHydrationWarning
            >
              📤
            </button>
          </div>
        </div>

        {shareMsg && <div className={styles.shareToast}>{shareMsg}</div>}

        {/* Meta */}
        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            <span>{isRemote ? 'Work from home' : locations.length > 0 ? locations.slice(0, 2).join(', ') + (locations.length > 2 ? ` +${locations.length - 2}` : '') : 'Not specified'}</span>
          </div>
          <div className={styles.metaItem}>
            <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>{duration}</span>
          </div>
          <div className={styles.metaItem}>
            <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
            </svg>
            <span className={styles.stipend}>{formatStipend(stipend)}</span>
          </div>
        </div>

        <div className={styles.divider} />

        {/* Footer */}
        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            <span className={styles.startDate}>
              {startDate === 'Starts Immediately' ? '🚀 Starts immediately' : `📅 ${startDate}`}
            </span>
            {expiringIn && <span className={styles.deadline}>⏳ {expiringIn}</span>}
          </div>
          <a
            href={`https://internshala.com/internship/detail/${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.applyBtn}
            id={`apply-btn-${internship.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            Apply now →
          </a>
        </div>
      </article>

      {/* Detail drawer */}
      {drawerOpen && (
        <DetailDrawer
          internship={internship}
          onClose={() => setDrawerOpen(false)}
          isSaved={isSaved}
          onToggleSave={onToggleSave}
          matchScore={matchScore}
        />
      )}
    </>
  );
}
