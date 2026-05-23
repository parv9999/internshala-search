'use client';

import { useMemo, useState } from 'react';
import styles from './AnalyticsDashboard.module.css';

export default function AnalyticsDashboard({ internships, onToggleProfile, selectedProfiles }) {
  const [collapsed, setCollapsed] = useState(false);

  // Calculate live statistics from active internships
  const stats = useMemo(() => {
    const total = internships.length;
    if (total === 0) {
      return {
        wfhPercent: 0,
        onsitePercent: 0,
        wfhCount: 0,
        onsiteCount: 0,
        avgStipend: 0,
        topProfiles: [],
      };
    }

    // 1. WFH vs On-site counts
    const wfhCount = internships.filter((i) => i.isRemote).length;
    const onsiteCount = total - wfhCount;
    const wfhPercent = Math.round((wfhCount / total) * 100);
    const onsitePercent = 100 - wfhPercent;

    // 2. Average Stipend
    const stipendSum = internships.reduce((acc, i) => acc + i.stipendValue, 0);
    const avgStipend = Math.round(stipendSum / total);

    // 3. Profile frequencies
    const profileCounts = {};
    internships.forEach((i) => {
      if (i.profileName) {
        profileCounts[i.profileName] = (profileCounts[i.profileName] || 0) + 1;
      }
    });

    const topProfiles = Object.entries(profileCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    return {
      wfhPercent,
      onsitePercent,
      wfhCount,
      onsiteCount,
      avgStipend,
      topProfiles,
    };
  }, [internships]);

  const { wfhPercent, onsitePercent, wfhCount, onsiteCount, avgStipend, topProfiles } = stats;

  // SVG circular properties for WFH doughnut chart
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (wfhPercent / 100) * circumference;

  if (internships.length === 0) return null;

  return (
    <article className={styles.container} id="analytics-dashboard-panel">
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <span className={styles.sparkleIcon}>📊</span>
          <h3>Live Hiring Dashboard</h3>
          <span className={styles.liveBadge}>● LIVE TRENDS</span>
        </div>
        <button
          className={styles.collapseBtn}
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle Dashboard"
          suppressHydrationWarning
        >
          {collapsed ? '➕ Expand' : '➖ Minimize'}
        </button>
      </div>

      {/* Grid Content */}
      <div className={`${styles.body} ${collapsed ? styles.bodyCollapsed : ''}`}>
        {/* Card 1: Circular Doughnut Chart */}
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>Location Breakdown</h4>
          <div className={styles.doughnutWrapper}>
            <svg className={styles.svgCircle} viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                className={styles.circleBg}
                cx="50"
                cy="50"
                r={radius}
                strokeWidth="8"
              />
              {/* Foreground animated circle */}
              <circle
                className={styles.circleFg}
                cx="50"
                cy="50"
                r={radius}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div className={styles.doughnutText}>
              <strong className={styles.percentValue}>{wfhPercent}%</strong>
              <span className={styles.percentLabel}>Remote</span>
            </div>
          </div>
          <div className={styles.doughnutLegend}>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendDotRemote}`} />
              <span>Remote ({wfhCount})</span>
            </div>
            <div className={styles.legendItem}>
              <span className={`${styles.legendDot} ${styles.legendDotOnsite}`} />
              <span>On-site ({onsiteCount})</span>
            </div>
          </div>
        </div>

        {/* Card 2: Hot Profiles Bar Chart */}
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>Demand by Profile</h4>
          <div className={styles.barChart}>
            {topProfiles.length > 0 ? (
              topProfiles.map((prof) => {
                const maxVal = topProfiles[0]?.count || 1;
                const ratio = Math.max((prof.count / maxVal) * 100, 10);
                const isActive = selectedProfiles.includes(prof.name);

                return (
                  <div
                    key={prof.name}
                    className={`${styles.barRow} ${isActive ? styles.barRowActive : ''}`}
                    onClick={() => onToggleProfile(prof.name)}
                    title={`Click to filter by ${prof.name}`}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={styles.barInfo}>
                      <span className={styles.barName}>{prof.name}</span>
                      <strong className={styles.barCount}>{prof.count}</strong>
                    </div>
                    <div className={styles.barContainer}>
                      <div className={styles.barFill} style={{ width: `${ratio}%` }} />
                    </div>
                  </div>
                );
              })
            ) : (
              <p className={styles.noData}>Select filters to analyze trends</p>
            )}
          </div>
        </div>

        {/* Card 3: Stipend Metric Gauge */}
        <div className={styles.card}>
          <h4 className={styles.cardTitle}>Stipend Overview</h4>
          <div className={styles.gaugeContainer}>
            <div className={styles.gaugeValWrap}>
              <span className={styles.gaugeLabel}>AVERAGE VALUE</span>
              <strong className={styles.gaugeValue}>₹{avgStipend.toLocaleString('en-IN')}<span className={styles.monthSuffix}>/mo</span></strong>
            </div>
            {/* Visual Progress Scale Meter */}
            <div className={styles.scaleBar}>
              <div
                className={styles.scaleFill}
                style={{ width: `${Math.min((avgStipend / 40000) * 100, 100)}%` }}
              />
            </div>
            <div className={styles.scaleLabels}>
              <span>₹0</span>
              <span>₹20K (Mid)</span>
              <span>₹40K+ (High)</span>
            </div>
            <p className={styles.gaugeTip}>
              {avgStipend >= 25000
                ? '🔥 Premium stipend tier: Excellent market-competitive packages!'
                : avgStipend >= 12000
                ? '⭐ Standard stipend tier: solid student learning allowances.'
                : '🎒 Entry-level or training allowances: focuses heavily on mentoring.'}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
