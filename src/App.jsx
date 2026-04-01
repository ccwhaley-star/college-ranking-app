import { useState, useMemo, useEffect } from "react";

function useIsMobile(breakpoint = 700) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [breakpoint]);
  return isMobile;
}

const initialSchools = [
  {
    id: 1,
    name: "University of Kansas",
    shortName: "KU",
    location: "Lawrence, KS",
    logo: "/logos/ku.png",
    schoolColor: "#0051BA",
    isKansas: true,
    hasMaterialsEng: "concentration",
    tuitionRoomBoard: 25510,
    scholarships: [
      { name: "Chancellor's Scholarship", amount: 5000 },
      { name: "Engineering Scholarship", amount: 1500 },
    ],
    medianIncome: 63500,
    ratings: { affordability: 9, academic: 7, townVibe: 8, medianIncome: 6, roi: 7 },
    notes: {
      affordability:
        "~$25,510/yr tuition + room & board (in-state). Chancellor's Scholarship ($5,000/yr) + $1,500/yr engineering scholarship = $6,500/yr off. After scholarships: ~$19,010/yr.",
      academic:
        "R1 research university. Strong engineering school (KSPE ranked). Offers a concentration in Materials Engineering (not a full degree). Related programs in Chemical & Mechanical Engineering.",
      townVibe:
        "Classic college town — Mass St. has great restaurants, shops & live music. Big 12 sports culture. Vibrant and walkable downtown.",
      townVibeSource: "Niche.com, KU campus reviews, Visit Lawrence",
      medianIncome:
        "KU engineering grads average ~$63,500/yr starting salary (Mechanical Engineering proxy — no standalone Materials Eng degree). Mid-career KU alumni average ~$77,489 across all majors.",
      medianIncomeSource: "CollegeSimply, PayScale, KU Engineering Career Center",
      roi:
        "4-year cost after scholarships: ~$76,040. With an estimated starting salary of $63,500/yr, payback period is relatively short. Strong in-state value, though concentration (not full degree) in Materials Eng may limit specialized earning potential.",
      roiSource: "Calculated from KU tuition data and PayScale salary estimates",
      materialsEng: "concentration",
    },
  },
  {
    id: 3,
    name: "University of Montana",
    shortName: "U of M",
    location: "Missoula, MT",
    logo: "/logos/montana.png",
    schoolColor: "#660033",
    isKansas: false,
    hasMaterialsEng: false,
    tuitionRoomBoard: 49404,
    scholarships: [
      { name: "Scholarship", amount: 15000 },
    ],
    medianIncome: 52100,
    ratings: { affordability: 6, academic: 5, townVibe: 9, medianIncome: 4, roi: 4 },
    notes: {
      affordability:
        "~$49,404/yr tuition + room & board (out-of-state). $15,000/yr scholarship brings it down to ~$34,404/yr. Kansas students do not qualify for WUE.",
      academic:
        "Solid liberal arts & sciences university. Strong environmental science, forestry, and humanities. No dedicated Materials Engineering program.",
      townVibe:
        "One of the best college towns in the West. Missoula is outdoorsy, artsy, and vibrant — hiking, skiing, river activities. Strong community feel.",
      townVibeSource: "Niche.com, Destination Missoula, U of Montana student reviews",
      medianIncome:
        "U of Montana alumni earn a median of ~$52,100/yr six years post-graduation (all majors). No Materials Eng program exists — closest proxy is Montana State (Bozeman) engineering grads at ~$70,160/yr starting.",
      medianIncomeSource: "DOE College Scorecard, Montana State Career Destinations Report, PayScale",
      roi:
        "4-year cost after scholarship: ~$137,616. Without a Materials Eng program, earning potential trails schools with dedicated programs. Beautiful location but weaker financial return for an engineering-focused career path.",
      roiSource: "Calculated from U of Montana tuition data and DOE College Scorecard",
      materialsEng: false,
    },
  },
  {
    id: 4,
    name: "Clemson University",
    shortName: "Clemson",
    location: "Clemson, SC",
    logo: "/logos/clemson.png",
    schoolColor: "#F56600",
    isKansas: false,
    hasMaterialsEng: true,
    tuitionRoomBoard: 56602,
    scholarships: [],
    medianIncome: 75000,
    ratings: { affordability: 3, academic: 8, townVibe: 7, medianIncome: 8, roi: 5 },
    notes: {
      affordability:
        "~$56,602/yr tuition + room & board (out-of-state). One of the more expensive options. No scholarships yet. Look into merit scholarships — Clemson offers competitive awards.",
      academic:
        "Strong Materials Science & Engineering BS program with unique focus on textiles, ceramics, and optical materials. ACC school with solid research reputation.",
      townVibe:
        "True college town — Clemson is essentially built around the university. Strong football culture (Death Valley). Smaller, tight-knit community in the SC foothills.",
      townVibeSource: "Niche.com, Clemson student reviews, Visit Clemson SC",
      medianIncome:
        "Clemson MSE grads average ~$75,000/yr starting salary (range $60k–$100k per department data). Clemson engineering grads overall: Chemical $75,951, ME $73,220. Early-career all-majors median is $62,100.",
      medianIncomeSource: "Clemson MSE Department, PayScale, CollegeSimply",
      roi:
        "4-year cost without scholarships: ~$226,408. Strong MSE program with good starting salaries ($75k), but highest sticker price in the group. Merit scholarship potential could significantly improve ROI.",
      roiSource: "Calculated from Clemson tuition data and Clemson MSE department salary reports",
      materialsEng: true,
    },
  },
  {
    id: 5,
    name: "Univ. of South Carolina",
    shortName: "USC",
    location: "Columbia, SC",
    logo: "/logos/usc.png",
    schoolColor: "#73000A",
    isKansas: false,
    hasMaterialsEng: true,
    tuitionRoomBoard: 64052,
    scholarships: [
      { name: "Scholarship", amount: 10697 },
    ],
    medianIncome: 71973,
    ratings: { affordability: 3, academic: 7, townVibe: 7, medianIncome: 7, roi: 5 },
    notes: {
      affordability:
        "~$64,052/yr tuition + room & board (out-of-state). $10,697/yr scholarship brings it down to ~$53,355/yr.",
      academic:
        "Materials Science & Engineering program available. Good engineering school with nuclear engineering specialty. Urban campus with more diverse academic offerings.",
      townVibe:
        "Columbia is a mid-size city — more urban feel than a typical college town. Five Points entertainment district, diverse food scene, warm weather year-round.",
      townVibeSource: "Niche.com, USC student reviews, Experience Columbia SC",
      medianIncome:
        "USC engineering grads earn ~$71,973/yr early career (College Factual). Mechanical Engineering starts at ~$72,370. All-major alumni median is $52,100 six years post-graduation. Mid-career all-majors median: ~$92,000–$98,000.",
      medianIncomeSource: "College Factual, USC Career Center, PayScale, DOE College Scorecard",
      roi:
        "4-year cost after scholarship: ~$213,420. Scholarship helps but still one of the higher total costs. Engineering salary outcomes are solid ($72k) but the high sticker price extends the payback period compared to KU or Purdue.",
      roiSource: "Calculated from USC tuition data and College Factual engineering salary data",
      materialsEng: true,
    },
  },
  {
    id: 6,
    name: "Johnson County Community College",
    shortName: "JCCC",
    location: "Overland Park, KS",
    logo: "/logos/jccc.png",
    schoolColor: "#003768",
    isKansas: true,
    hasMaterialsEng: false,
    tuitionRoomBoard: 3030,
    tuitionLabel: "Tuition + Fees (commuter)",
    scholarships: [],
    scholarshipNote: "Living at home — no room & board",
    medianIncome: 36600,
    ratings: { affordability: 10, academic: 4, townVibe: 5, medianIncome: 2, roi: 6 },
    notes: {
      affordability:
        "~$3,030/yr in-district tuition + fees (30 credit hours at $101/hr). No room & board — commuter college, Charlotte would live at home. By far the most affordable option. Books ~$1,560/yr additional.",
      academic:
        "One of the largest community colleges in the KC metro. Ranked #4 out of 44 Kansas colleges. Offers engineering transfer pathway (not a degree) — foundational courses before transferring to KU, K-State, or WSU for specialization. Smaller class sizes. No Materials Engineering program.",
      townVibe:
        "Overland Park is a large suburb (200k+ population) — safe, family-friendly, excellent amenities. Ranked #6 on Livability.com's 2025 Best Places to Live. Car-dependent. Great restaurants and parks, but limited nightlife (KC proper for that). Not a traditional college town experience.",
      townVibeSource: "Livability.com 2025 rankings, Niche.com, Experience Overland Park",
      medianIncome:
        "JCCC graduates earn median ~$29,900/yr two years post-graduation and ~$36,600/yr six years out. Those who transfer and complete a bachelor's earn ~$45,387/yr early career. No Materials Eng program — income reflects associate's-level earnings across all majors.",
      medianIncomeSource: "JCCC Institutional Research Post-Graduate Report, DOE College Scorecard",
      roi:
        "2-year cost: ~$6,060 (tuition only, living at home). Extremely low investment. However, it's a transfer pathway — would need 2+ more years at a 4-year university to complete a bachelor's in engineering. Total 4-year cost depends on transfer destination. Best value as a stepping stone.",
      roiSource: "JCCC tuition data, DOE College Scorecard salary data",
      materialsEng: false,
    },
  },
];

const CRITERIA = [
  { key: "affordability", label: "Affordability", icon: "\u{1F4B0}", color: "#10b981" },
  { key: "academic", label: "Academics", icon: "\u{1F4DA}", color: "#6366f1" },
  { key: "townVibe", label: "Town Vibe", icon: "\u{1F3D9}\uFE0F", color: "#f59e0b" },
  { key: "medianIncome", label: "Income", icon: "\u{1F4B5}", color: "#0ea5e9" },
  { key: "roi", label: "Investment Return", icon: "\u{1F4C8}", color: "#8b5cf6" },
];

function StarRating({ value, color, isMobile }) {
  return (
    <div style={{ display: "flex", gap: isMobile ? 1 : 2, flexWrap: "wrap" }}>
      {[...Array(10)].map((_, i) => {
        const star = i + 1;
        const filled = star <= value;
        return (
          <span
            key={star}
            style={{
              fontSize: isMobile ? 20 : 18,
              color: filled ? color : "#d1d5db",
              userSelect: "none",
              padding: isMobile ? "2px 1px" : 0,
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {"\u2605"}
          </span>
        );
      })}
      {value > 0 && (
        <span
          style={{
            marginLeft: 6,
            fontSize: 13,
            color: "#6b7280",
            alignSelf: "center",
          }}
        >
          {value}/10
        </span>
      )}
    </div>
  );
}

function NotePanel({ school, activeNote }) {
  if (!activeNote) return null;

  const criterion = CRITERIA.find((c) => c.key === activeNote);
  const note = school.notes[activeNote];

  return (
    <div
      style={{
        background: `${criterion?.color}08`,
        borderRadius: "0 0 10px 10px",
        padding: "14px 16px",
        border: `1px solid ${criterion?.color || "#e5e7eb"}40`,
        borderTop: "none",
      }}
    >
      <p
        style={{
          fontSize: 13.5,
          color: "#374151",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {note}
      </p>
      {school.notes[activeNote + "Source"] && (
        <div
          style={{
            marginTop: 8,
            fontSize: 11,
            color: "#9ca3af",
            fontStyle: "italic",
          }}
        >
          Source: {school.notes[activeNote + "Source"]}
        </div>
      )}
      {activeNote === "medianIncome" && school.medianIncome && (
        <div
          style={{
            marginTop: 12,
            padding: "8px 12px",
            borderRadius: 8,
            background: "#eff6ff",
            border: "1px solid #93c5fd",
            fontSize: 13,
            color: "#1e40af",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>{"\u{1F4B0}"}</span>
          Median early-career salary: ${school.medianIncome.toLocaleString()}/yr
        </div>
      )}
      {activeNote === "roi" && (
        <div
          style={{
            marginTop: 12,
            padding: "8px 12px",
            borderRadius: 8,
            background: "#f5f3ff",
            border: "1px solid #c4b5fd",
            fontSize: 13,
            color: "#5b21b6",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 16 }}>{"\u{1F4B5}"}</span>
          {(() => {
            const totalScholarship = (school.scholarships || []).reduce((sum, s) => sum + s.amount, 0);
            const fourYearCost = (school.tuitionRoomBoard - totalScholarship) * 4;
            return `4-year net cost: $${fourYearCost.toLocaleString()} · Estimated starting salary: $${(school.medianIncome || 0).toLocaleString()}/yr`;
          })()}
        </div>
      )}
      {activeNote === "academic" && (
        <div
          style={{
            marginTop: 12,
            padding: "8px 12px",
            borderRadius: 8,
            background: school.hasMaterialsEng === true ? "#ecfdf5" : school.hasMaterialsEng === "concentration" ? "#eff6ff" : "#fef3c7",
            border: `1px solid ${school.hasMaterialsEng === true ? "#6ee7b7" : school.hasMaterialsEng === "concentration" ? "#93c5fd" : "#fcd34d"}`,
            fontSize: 12.5,
            color: school.hasMaterialsEng === true ? "#065f46" : school.hasMaterialsEng === "concentration" ? "#1e40af" : "#92400e",
            fontWeight: 600,
          }}
        >
          {school.hasMaterialsEng === true
            ? "\u2705 Materials Engineering program available"
            : school.hasMaterialsEng === "concentration"
            ? "\u{1F4D8} Materials Engineering concentration available (not a full degree)"
            : "\u26A0\uFE0F No dedicated Materials Engineering program"}
        </div>
      )}
    </div>
  );
}

function SchoolCard({ school, rank, onRatingChange, weights, isMobile }) {
  const [activeNote, setActiveNote] = useState(null);

  const totalScore = useMemo(() => {
    let total = 0,
      totalWeight = 0;
    CRITERIA.forEach((c) => {
      const w = weights[c.key] || 1;
      total += (school.ratings[c.key] || 0) * w;
      totalWeight += w;
    });
    return totalWeight > 0 ? (total / totalWeight).toFixed(1) : "0.0";
  }, [school.ratings, weights]);

  const totalScholarship = (school.scholarships || []).reduce((sum, s) => sum + s.amount, 0);

  const rankColors = ["#f59e0b", "#9ca3af", "#cd7c2f", "#6366f1", "#6366f1", "#6366f1"];
  const rankLabels = ["\u{1F947}", "\u{1F948}", "\u{1F949}", "4th", "5th", "6th"];

  return (
    <div
      style={{
        background: "white",
        borderRadius: 16,
        padding: 0,
        overflow: "hidden",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        border: "1px solid #f3f4f6",
        transition: "box-shadow 0.2s",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${school.schoolColor}18, ${school.schoolColor}08)`,
          borderBottom: `3px solid ${school.schoolColor}40`,
          padding: isMobile ? "12px 14px" : "16px 20px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "stretch" : "center",
          justifyContent: "space-between",
          gap: isMobile ? 12 : 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <img
              src={school.logo}
              alt={school.shortName}
              style={{
                width: isMobile ? 36 : 44,
                height: isMobile ? 36 : 44,
                objectFit: "contain",
                borderRadius: 8,
                background: "white",
                padding: 2,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: -6,
                right: -6,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: rankColors[rank - 1],
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: 10,
                border: "2px solid white",
              }}
            >
              {rank}
            </div>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: isMobile ? 15 : 17, color: "#111827" }}>
              {school.name}
            </div>
            <div
              style={{
                fontSize: 11,
                color: "#6b7280",
                display: "flex",
                flexWrap: "wrap",
                gap: isMobile ? 4 : 8,
                marginTop: 2,
              }}
            >
              <span>{"\u{1F4CD}"} {school.location}</span>
              {school.isKansas && (
                <span
                  style={{
                    background: "#dbeafe",
                    color: "#1d4ed8",
                    padding: "1px 6px",
                    borderRadius: 4,
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                >
                  IN-STATE
                </span>
              )}
              {school.hasMaterialsEng === true && (
                <span
                  style={{
                    background: "#dcfce7",
                    color: "#166534",
                    padding: "1px 6px",
                    borderRadius: 4,
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                >
                  MAT. ENG {"\u2713"}
                </span>
              )}
              {school.hasMaterialsEng === "concentration" && (
                <span
                  style={{
                    background: "#dbeafe",
                    color: "#1e40af",
                    padding: "1px 6px",
                    borderRadius: 4,
                    fontWeight: 600,
                    fontSize: 11,
                  }}
                >
                  MAT. ENG CONC.
                </span>
              )}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 20, justifyContent: isMobile ? "space-between" : "flex-end" }}>
          {/* Cost info */}
          <div style={{ textAlign: isMobile ? "left" : "right" }}>
            <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 2 }}>
              {school.tuitionLabel || "Tuition + Room & Board"}
            </div>
            <div style={{ fontSize: isMobile ? 13 : 15, color: "#6b7280", textDecoration: totalScholarship > 0 ? "line-through" : "none" }}>
              ${school.tuitionRoomBoard.toLocaleString()}/yr
            </div>
            {totalScholarship > 0 ? (
              <div style={{ fontSize: isMobile ? 15 : 17, fontWeight: 800, color: "#10b981" }}>
                ${(school.tuitionRoomBoard - totalScholarship).toLocaleString()}/yr
              </div>
            ) : school.scholarshipNote ? (
              <div style={{ fontSize: 12, fontStyle: "italic", color: "#f59e0b", marginTop: 2 }}>
                {school.scholarshipNote}
              </div>
            ) : (
              <div style={{ fontSize: 12, fontStyle: "italic", color: "#9ca3af", marginTop: 2 }}>
                No scholarships yet
              </div>
            )}
          </div>
          {/* Divider */}
          <div style={{ width: 1, height: 40, background: "#e5e7eb" }} />
          {/* Score */}
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: isMobile ? 24 : 28,
                fontWeight: 900,
                color: rankColors[rank - 1],
              }}
            >
              {totalScore}
            </div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>weighted score</div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div
        style={{
          padding: isMobile ? 14 : 20,
        }}
      >
        {/* Ratings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {CRITERIA.map((criterion) => (
            <div key={criterion.key}>
              <div
                onClick={() => setActiveNote(activeNote === criterion.key ? null : criterion.key)}
                style={{
                  padding: "10px 14px",
                  borderRadius: activeNote === criterion.key ? "10px 10px 0 0" : 10,
                  cursor: "pointer",
                  background:
                    activeNote === criterion.key
                      ? `${criterion.color}10`
                      : "#f9fafb",
                  border: `1px solid ${activeNote === criterion.key ? criterion.color + "40" : "#f3f4f6"}`,
                  borderBottom: activeNote === criterion.key ? "none" : undefined,
                  transition: "all 0.15s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span style={{ fontSize: 16 }}>{criterion.icon}</span>
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: 13,
                        color: "#374151",
                      }}
                    >
                      {criterion.label}
                    </span>
                    <span style={{ fontSize: 12, color: "#9ca3af", marginLeft: 4 }}>
                      {activeNote === criterion.key ? "\u25B2" : "\u25BC"}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <span style={{ fontSize: 11, color: "#9ca3af" }}>
                      weight: {weights[criterion.key]}x
                    </span>
                  </div>
                </div>
                <StarRating
                  value={school.ratings[criterion.key]}
                  color={criterion.color}
                  isMobile={isMobile}
                />
              </div>
              {activeNote === criterion.key && (
                <NotePanel school={school} activeNote={activeNote} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CollegeRanker() {
  const isMobile = useIsMobile();
  const [schools, setSchools] = useState(initialSchools);
  const [weights, setWeights] = useState({
    affordability: 1,
    academic: 1,
    townVibe: 1,
    medianIncome: 1,
    roi: 1,
  });
  const [filterKansas, setFilterKansas] = useState(false);
  const [filterMaterials, setFilterMaterials] = useState(false);

  const getScore = (school) => {
    let total = 0,
      totalWeight = 0;
    CRITERIA.forEach((c) => {
      const w = weights[c.key] || 1;
      total += (school.ratings[c.key] || 0) * w;
      totalWeight += w;
    });
    return totalWeight > 0 ? total / totalWeight : 0;
  };

  const rankedSchools = useMemo(() => {
    let filtered = [...schools];
    if (filterKansas) filtered = filtered.filter((s) => !s.isKansas);
    if (filterMaterials) filtered = filtered.filter((s) => s.hasMaterialsEng === true);
    return filtered.sort((a, b) => getScore(b) - getScore(a));
  }, [schools, weights, filterKansas, filterMaterials]);

  const handleRatingChange = (id, criterion, value) => {
    setSchools((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, ratings: { ...s.ratings, [criterion]: value } }
          : s
      )
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "24px 16px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: isMobile ? 12 : 16, marginBottom: isMobile ? 20 : 32 }}>
          <img
            src="/charlotte.jpg"
            alt="Charlotte"
            style={{
              width: isMobile ? 48 : 64,
              height: isMobile ? 48 : 64,
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center 15%",
              border: "3px solid #f59e0b",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              flexShrink: 0,
            }}
          />
          <div>
            <h1
              style={{
                fontSize: isMobile ? 20 : 28,
                fontWeight: 900,
                color: "#111827",
                margin: "0 0 4px",
              }}
            >
              Charlotte's College Ranking Tool
            </h1>
            <p style={{ color: "#6b7280", fontSize: isMobile ? 13 : 15, margin: 0 }}>
              Rate each school 1–10 across all criteria. Click a category to
              see detailed notes.
            </p>
          </div>
        </div>

        {/* Controls */}
        <div
          style={{
            background: "white",
            borderRadius: 16,
            padding: 20,
            marginBottom: 24,
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            border: "1px solid #f3f4f6",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 16 : 20,
            }}
          >
            {/* Weights */}
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#374151",
                  marginBottom: 12,
                }}
              >
                {"\u2696\uFE0F"} Criteria Weights (how much does each matter?)
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {CRITERIA.map((c) => (
                  <div
                    key={c.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <span
                      style={{ fontSize: isMobile ? 12 : 14, width: isMobile ? 120 : 150, flexShrink: 0, color: "#374151", whiteSpace: "nowrap" }}
                    >
                      {c.icon} {c.label}
                    </span>
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.5"
                      value={weights[c.key]}
                      onChange={(e) =>
                        setWeights((prev) => ({
                          ...prev,
                          [c.key]: parseFloat(e.target.value),
                        }))
                      }
                      style={{ flex: 1, "--thumb-color": c.color }}
                    />
                    <span
                      style={{
                        width: 30,
                        textAlign: "center",
                        fontWeight: 700,
                        color: c.color,
                        fontSize: 14,
                      }}
                    >
                      {weights[c.key]}x
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div>
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  color: "#374151",
                  marginBottom: 12,
                }}
              >
                {"\u{1F50D}"} Filters
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {[
                  {
                    key: "filterKansas",
                    val: filterKansas,
                    set: setFilterKansas,
                    label: "Out-of-state schools only",
                    icon: "\u{1F30E}",
                    color: "#1d4ed8",
                  },
                  {
                    key: "filterMaterials",
                    val: filterMaterials,
                    set: setFilterMaterials,
                    label: "Materials Engineering degree required",
                    icon: "\u2697\uFE0F",
                    color: "#166534",
                  },
                ].map((f) => (
                  <div
                    key={f.key}
                    onClick={() => f.set((v) => !v)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      borderRadius: 10,
                      cursor: "pointer",
                      background: f.val ? `${f.color}10` : "#f9fafb",
                      border: `2px solid ${f.val ? f.color : "#e5e7eb"}`,
                      transition: "all 0.15s",
                    }}
                  >
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 6,
                        background: f.val ? f.color : "white",
                        border: `2px solid ${f.val ? f.color : "#d1d5db"}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      {f.val ? "\u2713" : ""}
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        color: f.val ? f.color : "#374151",
                        fontWeight: f.val ? 600 : 400,
                      }}
                    >
                      {f.icon} {f.label}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    marginTop: 8,
                    padding: "10px 14px",
                    borderRadius: 10,
                    background: "#fef9ec",
                    border: "1px solid #fcd34d",
                    fontSize: 12.5,
                    color: "#92400e",
                  }}
                >
                  {"\u{1F4A1}"} <strong>Tip:</strong> Drag the weight sliders to make
                  certain criteria matter more in the final ranking score.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* School cards */}
        {rankedSchools.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: 60,
              background: "white",
              borderRadius: 16,
              color: "#6b7280",
            }}
          >
            <div style={{ fontSize: 40 }}>{"\u{1F50D}"}</div>
            <div style={{ marginTop: 12 }}>
              No schools match your current filters.
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {rankedSchools.map((school, idx) => (
              <SchoolCard
                key={school.id}
                school={school}
                rank={idx + 1}
                onRatingChange={handleRatingChange}
                weights={weights}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}

        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            fontSize: 12,
            color: "#9ca3af",
          }}
        >
          Tuition data approximate as of 2024–2025. Verify current rates at
          each university.
        </div>
      </div>
    </div>
  );
}
