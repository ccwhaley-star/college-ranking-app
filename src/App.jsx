import { useState, useMemo } from "react";

const initialSchools = [
  {
    id: 1,
    name: "University of Kansas",
    shortName: "KU",
    location: "Lawrence, KS",
    logo: "/logos/ku.png",
    isKansas: true,
    hasMaterialsEng: "concentration",
    tuitionRoomBoard: 22200,
    scholarships: [
      { name: "Chancellor's Scholarship", amount: 11200 },
      { name: "Engineering Scholarship", amount: 1500 },
    ],
    ratings: { affordability: 9, academic: 7, townVibe: 8 },
    notes: {
      affordability:
        "~$11,200/yr in-state tuition. As a Kansas resident this is your best value option. Chancellor's Scholarship covers full tuition + $1,500/yr engineering scholarship.",
      academic:
        "R1 research university. Strong engineering school (KSPE ranked). Offers a concentration in Materials Engineering (not a full degree). Related programs in Chemical & Mechanical Engineering.",
      townVibe:
        "Classic college town — Mass St. has great restaurants, shops & live music. Big 12 sports culture. Vibrant and walkable downtown.",
      materialsEng: "concentration",
    },
  },
  {
    id: 2,
    name: "Purdue University",
    shortName: "Purdue",
    location: "West Lafayette, IN",
    logo: "/logos/purdue.png",
    isKansas: false,
    hasMaterialsEng: true,
    tuitionRoomBoard: 39800,
    scholarships: [],
    scholarshipNote: "Deferred — no scholarship yet",
    ratings: { affordability: 5, academic: 10, townVibe: 6 },
    notes: {
      affordability:
        "~$28,800/yr out-of-state tuition. Pricier but Purdue is known for keeping costs relatively low for a Big 10 school. Deferred admission — no scholarship yet. Strong co-op/internship opportunities offset costs.",
      academic:
        "#4 ranked Materials Engineering program in the US (US News 2024). One of the top engineering schools in the country. Highly rigorous.",
      townVibe:
        "Classic Midwest college town. West Lafayette is smaller and focused around campus. Strong engineering culture, lots of industry recruiting on campus.",
      materialsEng: true,
    },
  },
  {
    id: 3,
    name: "University of Montana",
    shortName: "U of M",
    location: "Missoula, MT",
    logo: "/logos/montana.png",
    isKansas: false,
    hasMaterialsEng: false,
    tuitionRoomBoard: 42664,
    scholarships: [],
    scholarshipNote: "Scholarship amount TBD",
    ratings: { affordability: 6, academic: 5, townVibe: 9 },
    notes: {
      affordability:
        "~$8,456/yr in-state, ~$33,664/yr out-of-state. Check Western Undergraduate Exchange (WUE) program — Kansas students may qualify for reduced tuition (~$12,684/yr). Scholarship amount TBD.",
      academic:
        "Solid liberal arts & sciences university. Strong environmental science, forestry, and humanities. No dedicated Materials Engineering program.",
      townVibe:
        "One of the best college towns in the West. Missoula is outdoorsy, artsy, and vibrant — hiking, skiing, river activities. Strong community feel.",
      materialsEng: false,
    },
  },
  {
    id: 4,
    name: "Clemson University",
    shortName: "Clemson",
    location: "Clemson, SC",
    logo: "/logos/clemson.png",
    isKansas: false,
    hasMaterialsEng: true,
    tuitionRoomBoard: 49550,
    scholarships: [],
    ratings: { affordability: 3, academic: 8, townVibe: 7 },
    notes: {
      affordability:
        "~$38,550/yr out-of-state tuition. One of the more expensive options. No scholarships yet. Look into merit scholarships — Clemson offers competitive awards.",
      academic:
        "Strong Materials Science & Engineering BS program with unique focus on textiles, ceramics, and optical materials. ACC school with solid research reputation.",
      townVibe:
        "True college town — Clemson is essentially built around the university. Strong football culture (Death Valley). Smaller, tight-knit community in the SC foothills.",
      materialsEng: true,
    },
  },
  {
    id: 5,
    name: "Univ. of South Carolina",
    shortName: "USC",
    location: "Columbia, SC",
    logo: "/logos/usc.png",
    isKansas: false,
    hasMaterialsEng: true,
    tuitionRoomBoard: 46000,
    scholarships: [],
    ratings: { affordability: 4, academic: 7, townVibe: 7 },
    notes: {
      affordability:
        "~$34,000/yr out-of-state tuition. No scholarships yet. Check Palmetto Fellows and Carolina Scholars scholarships.",
      academic:
        "Materials Science & Engineering program available. Good engineering school with nuclear engineering specialty. Urban campus with more diverse academic offerings.",
      townVibe:
        "Columbia is a mid-size city — more urban feel than a typical college town. Five Points entertainment district, diverse food scene, warm weather year-round.",
      materialsEng: true,
    },
  },
];

const CRITERIA = [
  { key: "affordability", label: "Affordability", icon: "\u{1F4B0}", color: "#10b981" },
  { key: "academic", label: "Academics", icon: "\u{1F4DA}", color: "#6366f1" },
  { key: "townVibe", label: "Town Vibe", icon: "\u{1F3D9}\uFE0F", color: "#f59e0b" },
];

function StarRating({ value, onChange, color }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {[...Array(10)].map((_, i) => {
        const star = i + 1;
        const filled = star <= (hover || value);
        return (
          <span
            key={star}
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            style={{
              cursor: "pointer",
              fontSize: 18,
              color: filled ? color : "#d1d5db",
              transition: "color 0.1s",
              userSelect: "none",
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
  if (!activeNote)
    return (
      <div
        style={{
          background: "#f9fafb",
          borderRadius: 12,
          padding: 20,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9ca3af",
          fontSize: 14,
          textAlign: "center",
          border: "2px dashed #e5e7eb",
        }}
      >
        <div>
          <div style={{ fontSize: 32, marginBottom: 8 }}>{"\u{1F4A1}"}</div>
          <div>
            Hover over a rating category
            <br />
            to see detailed notes
          </div>
        </div>
      </div>
    );

  const criterion = CRITERIA.find((c) => c.key === activeNote);
  const note = school.notes[activeNote];

  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        padding: 20,
        height: "100%",
        border: `2px solid ${criterion?.color || "#e5e7eb"}`,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 22 }}>{criterion?.icon}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
            {criterion?.label}
          </div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{school.name}</div>
        </div>
      </div>
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

function SchoolCard({ school, rank, onRatingChange, weights }) {
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

  const rankColors = ["#f59e0b", "#9ca3af", "#cd7c2f", "#6366f1", "#6366f1"];
  const rankLabels = ["\u{1F947}", "\u{1F948}", "\u{1F949}", "4th", "5th"];

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
          background: `linear-gradient(135deg, ${rankColors[rank - 1]}22, ${rankColors[rank - 1]}11)`,
          borderBottom: `3px solid ${rankColors[rank - 1]}`,
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ position: "relative" }}>
            <img
              src={school.logo}
              alt={school.shortName}
              style={{
                width: 44,
                height: 44,
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
          <div>
            <div style={{ fontWeight: 800, fontSize: 17, color: "#111827" }}>
              {school.name}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "#6b7280",
                display: "flex",
                gap: 8,
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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          {/* Cost info */}
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 2 }}>
              Tuition + Room & Board
            </div>
            <div style={{ fontSize: 15, color: "#6b7280", textDecoration: totalScholarship > 0 ? "line-through" : "none" }}>
              ${school.tuitionRoomBoard.toLocaleString()}/yr
            </div>
            {totalScholarship > 0 ? (
              <div style={{ fontSize: 17, fontWeight: 800, color: "#10b981" }}>
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
                fontSize: 28,
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
          padding: 20,
          display: "grid",
          gridTemplateColumns: "1fr 280px",
          gap: 20,
        }}
      >
        {/* Ratings */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {CRITERIA.map((criterion) => (
            <div
              key={criterion.key}
              onMouseEnter={() => setActiveNote(criterion.key)}
              onMouseLeave={() => setActiveNote(null)}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                cursor: "default",
                background:
                  activeNote === criterion.key
                    ? `${criterion.color}10`
                    : "#f9fafb",
                border: `1px solid ${activeNote === criterion.key ? criterion.color + "40" : "#f3f4f6"}`,
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
                onChange={(val) =>
                  onRatingChange(school.id, criterion.key, val)
                }
                color={criterion.color}
              />
            </div>
          ))}
        </div>

        {/* Notes panel */}
        <NotePanel school={school} activeNote={activeNote} />
      </div>
    </div>
  );
}

export default function CollegeRanker() {
  const [schools, setSchools] = useState(initialSchools);
  const [weights, setWeights] = useState({
    affordability: 1,
    academic: 1,
    townVibe: 1,
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
    if (filterMaterials) filtered = filtered.filter((s) => s.hasMaterialsEng);
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
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 32 }}>
          <img
            src="/charlotte.jpg"
            alt="Charlotte"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center 15%",
              border: "3px solid #f59e0b",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
            }}
          />
          <div>
            <h1
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#111827",
                margin: "0 0 4px",
              }}
            >
              Charlotte's College Ranking Tool
            </h1>
            <p style={{ color: "#6b7280", fontSize: 15, margin: 0 }}>
              Rate each school 1–10 across all criteria. Hover over a category to
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
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
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
                      style={{ fontSize: 14, width: 110, color: "#374151" }}
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
