'use client';

import styles from './page.module.css';
import Navbar from '@/components/Navbar';
import FilterPanel from '@/components/FilterPanel';
import InternshipCard from '@/components/InternshipCard';
import SkeletonCard from '@/components/SkeletonCard';
import AnalyticsDashboard from '@/components/AnalyticsDashboard';
import ResumeMatcher from '@/components/ResumeMatcher';
import ShareCardModal from '@/components/ShareCardModal';
import { useInternships } from '@/hooks/useInternships';
import { useState, useEffect, useMemo } from 'react';

// Count-Up Animation Component with SSR Hydration Protection
function CountUp({ value }) {
  const [count, setCount] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let start = 0;
    const end = parseInt(value, 10) || 0;
    if (end === 0) {
      setCount(0);
      return;
    }
    const duration = 800; // 0.8s
    const increment = Math.max(Math.ceil(end / 30), 1);
    const stepTime = Math.max(Math.floor(duration / (end / increment)), 20);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  if (!mounted) return <>{value}</>;
  return <>{count.toLocaleString()}</>;
}

export default function Home() {
  const {
    internships,
    loading,
    error,
    filterOptions,
    searchQuery, setSearchQuery,
    selectedProfiles, toggleProfile,
    selectedLocations, toggleLocation,
    selectedDurations, toggleDuration,
    minStipend, setMinStipend,
    remoteOnly, setRemoteOnly,
    clearAllFilters,
    activeFilterCount,
    totalCount,
    sortBy, setSortBy,
    savedIds, toggleSave,
  } = useInternships();

  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [darkMode, setDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Advanced Recruiter Wow states
  const [resumeSkills, setResumeSkills] = useState([]);
  const [sharingInternship, setSharingInternship] = useState(null);

  // Trending Profiles for Quick Filtering
  const trendingProfiles = [
    { label: '🌐 Web Dev', value: 'Web Development' },
    { label: '⚛️ ReactJS', value: 'ReactJS Development' },
    { label: '🎨 Graphic Design', value: 'Graphic Design' },
    { label: '📈 Marketing', value: 'Social Media Marketing' },
    { label: '📊 Data Science', value: 'Data Science' }
  ];

  // Dark Mode Sync
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('internshala_theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const shouldBeDark = savedTheme ? savedTheme === 'dark' : prefersDark;
      
      setDarkMode(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('internshala_theme', next ? 'dark' : 'light');
      } catch (e) {
        console.error(e);
      }
      if (next) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      return next;
    });
  };

  // Back to Top trigger observer
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Live Simulated Skills Compatibility Matching Engine
  const scoredInternships = useMemo(() => {
    if (resumeSkills.length === 0) return internships;
    
    return internships.map((internship) => {
      const textToSearch = `
        ${internship.title} 
        ${internship.profileName} 
        ${internship.locations.join(' ')} 
        ${internship.companyName}
      `.toLowerCase();

      let matchesCount = 0;
      resumeSkills.forEach((skill) => {
        if (textToSearch.includes(skill.toLowerCase())) {
          matchesCount++;
        }
      });

      // Calculate base score ratio
      let score = Math.round((matchesCount / resumeSkills.length) * 100);

      // Domain intelligence match booster
      const profile = (internship.profileName || '').toLowerCase();
      
      const isTechSkill = resumeSkills.some((s) =>
        ['react', 'js', 'javascript', 'html', 'css', 'git', 'node', 'web', 'frontend'].includes(s.toLowerCase())
      );
      const isTechIntern =
        profile.includes('web') || profile.includes('dev') || profile.includes('tech') || profile.includes('software');
      if (isTechSkill && isTechIntern) score = Math.min(score + 40, 98);

      const isDesignSkill = resumeSkills.some((s) =>
        ['figma', 'photoshop', 'design', 'ui', 'ux', 'graphic'].includes(s.toLowerCase())
      );
      const isDesignIntern = profile.includes('design') || profile.includes('ui') || profile.includes('ux');
      if (isDesignSkill && isDesignIntern) score = Math.min(score + 40, 98);

      const isMarketSkill = resumeSkills.some((s) =>
        ['market', 'seo', 'sales', 'analytics', 'content', 'social'].includes(s.toLowerCase())
      );
      const isMarketIntern =
        profile.includes('market') || profile.includes('seo') || profile.includes('social') || profile.includes('sales');
      if (isMarketSkill && isMarketIntern) score = Math.min(score + 40, 98);

      const matchScore = score === 0 ? 0 : Math.max(score, 45);

      return {
        ...internship,
        matchScore,
      };
    });
  }, [internships, resumeSkills]);

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* ── Hero banner ──────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroBlobA} />
          <div className={styles.heroBlobB} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>🚀 Professional Internship Portal</span>
          <h1 className={styles.heroTitle}>
            Find your <span className={styles.heroGradient}>dream internship</span>
          </h1>
          <p className={styles.heroSub}>
            Explore thousands of live internship listings with premium filters, dark mode, and real-time client-side search.
          </p>

          {/* Search bar */}
          <div className={styles.searchWrap} id="search-bar">
            <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              id="internship-search-input"
              type="text"
              className={styles.searchInput}
              placeholder="Search by role, company, or skill…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
              suppressHydrationWarning
            />
            {searchQuery && (
              <button className={styles.searchClear} onClick={() => setSearchQuery('')} aria-label="Clear search" suppressHydrationWarning>✕</button>
            )}
          </div>

          {/* Quick-filter trending chips */}
          <div className={styles.heroChips}>
            <span className={styles.heroChipLabel}>Trending:</span>
            {trendingProfiles.map((profile) => {
              const isActive = selectedProfiles.includes(profile.value);
              return (
                <button
                  key={profile.value}
                  className={`${styles.heroChip} ${isActive ? styles.heroChipActive : ''}`}
                  onClick={() => toggleProfile(profile.value)}
                  suppressHydrationWarning
                >
                  {profile.label}
                </button>
              );
            })}
          </div>

          {/* Animated Stats */}
          <div className={styles.stats}>
            <div className={styles.stat}>
              <strong>
                {loading ? '0' : <CountUp value={totalCount} />}
              </strong>
              <span>Total listings</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <strong>
                {loading ? '0' : <CountUp value={scoredInternships.length} />}
              </strong>
              <span>Matching results</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <strong>
                {loading ? '0' : <CountUp value={filterOptions.profiles?.length || 0} />}
              </strong>
              <span>Profiles</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile filter toggle ──────────────────────────────── */}
      <div className={styles.mobileFilterBar}>
        <button
          id="mobile-filter-toggle"
          className={styles.mobileFilterBtn}
          onClick={() => setFilterOpen((o) => !o)}
          suppressHydrationWarning
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
          Filters
          {activeFilterCount > 0 && (
            <span className={styles.mobileFilterCount}>{activeFilterCount}</span>
          )}
        </button>
        <span className={styles.mobileCount}>
          {scoredInternships.length} internship{scoredInternships.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* ── Main layout ───────────────────────────────────────── */}
      <main className={styles.main} id="main-content">
        {/* Real-time Reactive Analytics Dashboard */}
        {!loading && !error && (
          <AnalyticsDashboard
            internships={scoredInternships}
            onToggleProfile={toggleProfile}
            selectedProfiles={selectedProfiles}
          />
        )}

        <div className={styles.layout}>
          {/* Sidebar filter panel + Resume Matcher */}
          <div className={`${styles.filterSidebar} ${filterOpen ? styles.filterSidebarOpen : ''}`}>
            {/* Resume Skills Matcher Widget */}
            {!loading && !error && (
              <>
                <ResumeMatcher onSkillsChange={setResumeSkills} />
                <div style={{ height: '24px' }} />
              </>
            )}
            
            <FilterPanel
              filterOptions={filterOptions}
              selectedProfiles={selectedProfiles}
              toggleProfile={toggleProfile}
              selectedLocations={selectedLocations}
              toggleLocation={toggleLocation}
              selectedDurations={selectedDurations}
              toggleDuration={toggleDuration}
              minStipend={minStipend}
              setMinStipend={setMinStipend}
              remoteOnly={remoteOnly}
              setRemoteOnly={setRemoteOnly}
              clearAllFilters={clearAllFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Results section */}
          <section className={styles.results} aria-label="Internship listings">

            {/* Results controls (Sort dropdown & Grid/List view toggle) */}
            {!loading && !error && (
              <div className={styles.controlsRow}>
                <p className={styles.resultsCount}>
                  {activeFilterCount > 0 ? (
                    <>Found <strong>{scoredInternships.length}</strong> matching internships</>
                  ) : (
                    <><strong>{scoredInternships.length}</strong> internships available</>
                  )}
                </p>
                
                <div className={styles.controlsRight}>
                  {/* Sorting Dropdown */}
                  <div className={styles.sortSelectWrap}>
                    <span className={styles.sortLabel}>Sort By:</span>
                    <select
                      className={styles.sortSelect}
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      suppressHydrationWarning
                    >
                      <option value="newest">📅 Newest Listings</option>
                      <option value="stipend-high">💵 Stipend: High to Low</option>
                      <option value="stipend-low">💵 Stipend: Low to High</option>
                      <option value="duration-short">⏳ Duration: Shortest</option>
                      <option value="duration-long">⏳ Duration: Longest</option>
                    </select>
                  </div>

                  {/* Grid/List Toggle */}
                  <div className={styles.viewToggle}>
                    <button
                      className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
                      onClick={() => setViewMode('grid')}
                      title="Grid View"
                      aria-label="Grid View"
                      suppressHydrationWarning
                    >
                      ⊞
                    </button>
                    <button
                      className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
                      onClick={() => setViewMode('list')}
                      title="List View"
                      aria-label="List View"
                      suppressHydrationWarning
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Clear filters row (visible only if filter active) */}
            {!loading && !error && activeFilterCount > 0 && (
              <div className={styles.resultsHeader}>
                <div className={styles.activeChips}>
                  {remoteOnly && (
                    <span className={styles.chip}>Work from home <button onClick={() => setRemoteOnly(false)}>✕</button></span>
                  )}
                  {selectedProfiles.map((p) => (
                    <span key={p} className={styles.chip}>{p} <button onClick={() => toggleProfile(p)}>✕</button></span>
                  ))}
                  {selectedLocations.map((l) => (
                    <span key={l} className={styles.chip}>{l} <button onClick={() => toggleLocation(l)}>✕</button></span>
                  ))}
                  {selectedDurations.map((d) => (
                    <span key={d} className={styles.chip}>{d} <button onClick={() => toggleDuration(d)}>✕</button></span>
                  ))}
                  {minStipend > 0 && (
                    <span className={styles.chip}>Min ₹{minStipend.toLocaleString('en-IN')} <button onClick={() => setMinStipend(0)}>✕</button></span>
                  )}
                </div>
                <button className={styles.clearFiltersBtn} onClick={clearAllFilters} suppressHydrationWarning>
                  ✕ Clear all
                </button>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className={styles.errorState} id="error-state">
                <div className={styles.errorIcon}>⚠️</div>
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
              </div>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className={styles.cardGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* Internship cards */}
            {!loading && !error && scoredInternships.length > 0 && (
              <div className={`${styles.cardGrid} ${viewMode === 'list' ? styles.cardGridList : ''}`}>
                {scoredInternships.map((intern, i) => (
                  <InternshipCard
                    key={intern.id}
                    internship={intern}
                    index={i}
                    isSaved={savedIds.includes(intern.id)}
                    onToggleSave={toggleSave}
                    viewMode={viewMode}
                    matchScore={intern.matchScore}
                    onShareClick={setSharingInternship}
                  />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!loading && !error && scoredInternships.length === 0 && (
              <div className={styles.emptyState} id="empty-state">
                <div className={styles.emptyIcon}>🔍</div>
                <h3 className={styles.emptyTitle}>No internships found</h3>
                <p className={styles.emptySub}>Try adjusting your filters, searching other terms, or clicking clear below.</p>
                <button className={styles.emptyBtn} onClick={clearAllFilters} suppressHydrationWarning>
                  Reset all filters
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Custom Share Ticket Modal */}
      {sharingInternship && (
        <ShareCardModal
          internship={sharingInternship}
          onClose={() => setSharingInternship(null)}
        />
      )}

      {/* Floating Back to Top Button */}
      {showScrollTop && (
        <button
          className={styles.backToTop}
          onClick={scrollToTop}
          title="Back to Top"
          aria-label="Back to Top"
          suppressHydrationWarning
        >
          ▲
        </button>
      )}

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© 2026 SDE Internship Assignment | Designed & Developed by <strong>Parv Chauhan</strong></p>
          <p className={styles.footerNote}>Contact: <a href="mailto:parvchauhan36@gmail.com" className={styles.footerEmail}>parvchauhan36@gmail.com</a></p>
        </div>
      </footer>
    </>
  );
}
