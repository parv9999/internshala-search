'use client';

import { useState, useEffect, useMemo } from 'react';
import { transformInternships } from '@/utils/transformData';

export function useInternships() {
  const [allInternships, setAllInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedDurations, setSelectedDurations] = useState([]);
  const [minStipend, setMinStipend] = useState(0);
  const [remoteOnly, setRemoteOnly] = useState(false);

  // Sorting & Bookmark state
  const [sortBy, setSortBy] = useState('newest');
  const [savedIds, setSavedIds] = useState([]);

  /* ─── Fetch data once ───────────────────────────────────────── */
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await fetch('/api/internships');
        if (!res.ok) throw new Error('Failed to fetch internships');
        const json = await res.json();
        setAllInternships(transformInternships(json));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  /* ─── Load bookmarks on mount (client-side only) ────────────── */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('internshala_bookmarks');
      if (saved) {
        setSavedIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load bookmarks:', e);
    }
  }, []);

  /* ─── Derived filter options (unique values from data) ───────── */
  const filterOptions = useMemo(() => {
    const profiles = [...new Set(allInternships.map((i) => i.profileName).filter(Boolean))].sort();
    const locations = [
      ...new Set(allInternships.flatMap((i) => i.locations).filter(Boolean)),
    ].sort();
    const durations = [
      ...new Set(allInternships.map((i) => i.duration).filter(Boolean)),
    ].sort((a, b) => {
      const aM = parseInt(a) || 0;
      const bM = parseInt(b) || 0;
      return aM - bM;
    });
    const maxStipend = Math.max(...allInternships.map((i) => i.stipendValue), 0);
    return { profiles, locations, durations, maxStipend };
  }, [allInternships]);

  /* ─── Apply filters and sorting (client-side only) ───────────── */
  const processedInternships = useMemo(() => {
    // 1. Filter
    const filtered = allInternships.filter((intern) => {
      // Search by title, company, or profile
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = intern.title.toLowerCase().includes(q);
        const matchesCompany = intern.companyName.toLowerCase().includes(q);
        const matchesProfile = intern.profileName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesProfile) return false;
      }

      // Profile filter
      if (selectedProfiles.length > 0 && !selectedProfiles.includes(intern.profileName)) {
        return false;
      }

      // Location filter
      if (selectedLocations.length > 0) {
        const hasLocation = intern.locations.some((loc) => selectedLocations.includes(loc));
        if (!hasLocation && !(remoteOnly && intern.isRemote)) return false;
      }

      // Duration filter
      if (selectedDurations.length > 0 && !selectedDurations.includes(intern.duration)) {
        return false;
      }

      // Stipend filter
      if (intern.stipendValue < minStipend) return false;

      // Remote only
      if (remoteOnly && !intern.isRemote) return false;

      return true;
    });

    // 2. Sort
    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'stipend-high':
          return b.stipendValue - a.stipendValue;
        case 'stipend-low':
          return a.stipendValue - b.stipendValue;
        case 'duration-short':
          return a.durationMonths - b.durationMonths;
        case 'duration-long':
          return b.durationMonths - a.durationMonths;
        case 'newest':
        default:
          return b.id - a.id;
      }
    });
  }, [
    allInternships,
    searchQuery,
    selectedProfiles,
    selectedLocations,
    selectedDurations,
    minStipend,
    remoteOnly,
    sortBy,
  ]);

  /* ─── Toggle helpers ─────────────────────────────────────────── */
  function toggleProfile(p) {
    setSelectedProfiles((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  }
  function toggleLocation(l) {
    setSelectedLocations((prev) =>
      prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]
    );
  }
  function toggleDuration(d) {
    setSelectedDurations((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
    );
  }

  function toggleSave(id) {
    setSavedIds((prev) => {
      const updated = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem('internshala_bookmarks', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to write bookmarks:', e);
      }
      return updated;
    });
  }

  function clearAllFilters() {
    setSearchQuery('');
    setSelectedProfiles([]);
    setSelectedLocations([]);
    setSelectedDurations([]);
    setMinStipend(0);
    setRemoteOnly(false);
  }

  const activeFilterCount =
    selectedProfiles.length +
    selectedLocations.length +
    selectedDurations.length +
    (minStipend > 0 ? 1 : 0) +
    (remoteOnly ? 1 : 0);

  return {
    internships: processedInternships,
    loading,
    error,
    filterOptions,
    // filter values
    searchQuery, setSearchQuery,
    selectedProfiles, toggleProfile,
    selectedLocations, toggleLocation,
    selectedDurations, toggleDuration,
    minStipend, setMinStipend,
    remoteOnly, setRemoteOnly,
    clearAllFilters,
    activeFilterCount,
    totalCount: allInternships.length,
    // sorting and bookmarks
    sortBy, setSortBy,
    savedIds, toggleSave,
  };
}
