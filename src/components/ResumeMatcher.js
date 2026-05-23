'use client';

import { useState, useEffect } from 'react';
import styles from './ResumeMatcher.module.css';

export default function ResumeMatcher({ onSkillsChange }) {
  const [selectedPreset, setSelectedPreset] = useState('');
  const [customSkills, setCustomSkills] = useState('');

  // Preset Skill Profiles
  const presets = {
    frontend: {
      label: '⚛️ React / Frontend Developer',
      skills: 'React.js, Next.js, JavaScript, ES6, HTML5, CSS3, Git, REST APIs, TypeScript, Responsive Design',
    },
    designer: {
      label: '🎨 UI/UX & Graphic Designer',
      skills: 'Figma, Wireframing, Prototyping, Adobe Photoshop, Adobe Illustrator, User Research, Visual Design, Typography',
    },
    marketer: {
      label: '📈 SEO & Digital Marketer',
      skills: 'Digital Marketing, SEO, SEM, Content Writing, Google Analytics, Social Media Management, Copywriting, Email Campaigns',
    },
  };

  // Sync preset changes with custom skills field
  const handlePresetSelect = (key) => {
    setSelectedPreset(key);
    if (presets[key]) {
      setCustomSkills(presets[key].skills);
      triggerAnalysis(presets[key].skills);
    } else {
      setCustomSkills('');
      triggerAnalysis('');
    }
  };

  const handleCustomSkillsChange = (val) => {
    setSelectedPreset('custom');
    setCustomSkills(val);
    triggerAnalysis(val);
  };

  // Convert comma-separated string to clean array and notify parent page
  const triggerAnalysis = (skillsStr) => {
    const list = skillsStr
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    onSkillsChange(list);
  };

  return (
    <article className={styles.container} id="resume-matcher-panel">
      <div className={styles.header}>
        <span className={styles.sparkleIcon}>⚡</span>
        <h3 className={styles.title}>Skills Match Checker</h3>
        <span className={styles.betaBadge}>SMART</span>
      </div>

      <div className={styles.body}>
        <p className={styles.intro}>
          Simulate uploading your resume or select a preset profile to calculate your matching compatibility score against active internships!
        </p>

        {/* Preset Selector */}
        <div className={styles.field}>
          <label className={styles.label}>Select Simulated Resume Profile:</label>
          <select
            className={styles.select}
            value={selectedPreset}
            onChange={(e) => handlePresetSelect(e.target.value)}
            suppressHydrationWarning
          >
            <option value="">-- Choose Profile --</option>
            <option value="frontend">{presets.frontend.label}</option>
            <option value="designer">{presets.designer.label}</option>
            <option value="marketer">{presets.marketer.label}</option>
          </select>
        </div>

        {/* Skills input area */}
        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label className={styles.label}>Skills List (Comma separated):</label>
            {customSkills && (
              <button
                className={styles.resetBtn}
                onClick={() => handlePresetSelect('')}
                suppressHydrationWarning
              >
                Clear
              </button>
            )}
          </div>
          <textarea
            className={styles.textarea}
            placeholder="Type or paste skills (e.g. React, Figma, SEO, Python, Git)..."
            value={customSkills}
            onChange={(e) => handleCustomSkillsChange(e.target.value)}
          />
        </div>

        {/* Indicator info card */}
        {customSkills && (
          <div className={styles.activeNotice}>
            <div className={styles.pulseDot} />
            <span>Skills compatibility check active. Match ratings applied to listing cards!</span>
          </div>
        )}
      </div>
    </article>
  );
}
