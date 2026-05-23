/**
 * transformData.js
 * Converts raw Internshala API response into a clean, flat array.
 */

export function transformInternships(rawData) {
  const { internships_meta, internship_ids } = rawData;
  if (!internship_ids || !internships_meta) return [];

  return internship_ids.map((id) => {
    const r = internships_meta[id];
    return {
      id: r.id,
      title: r.title,
      companyName: r.company_name,
      companyUrl: r.company_url,
      companyLogo: r.company_logo,
      profileName: r.profile_name,
      locations: r.location_names || [],
      isRemote: r.work_from_home || false,
      duration: r.duration,
      durationMonths: parseDurationMonths(r.duration),
      stipend: r.stipend?.salary || 'Unpaid',
      stipendValue: r.stipend?.salaryValue1 || 0,
      startDate: r.start_date,
      postedOn: r.posted_on,
      applicationDeadline: r.application_deadline,
      expiringIn: r.expiring_in,
      isPremium: r.is_premium || false,
      isPPO: r.is_ppo || false,
      isInternational: r.is_international_job || false,
      url: r.url,
      partTime: r.part_time || false,
      officeDays: r.office_days,
    };
  });
}

function parseDurationMonths(duration) {
  if (!duration) return 0;
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}
