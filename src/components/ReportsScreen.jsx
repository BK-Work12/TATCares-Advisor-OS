import React, { useState } from 'react';
import { Download } from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'ashley', label: 'AI Ashley Logs' },
  { id: 'retention', label: 'Retention' },
  { id: 'referrals', label: 'Referrals' },
];

function Kpi({ value, label, delta, color }) {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl p-4 shadow-sm">
      <div className="font-poppins font-black text-2xl" style={{ color, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '3px' }}>
        {value}
      </div>
      <div className="font-opensans text-xs text-gray-400 font-semibold">{label}</div>
      <div className="font-opensans text-xs font-bold mt-1" style={{ color: '#1A7A4A' }}>
        {delta}
      </div>
    </div>
  );
}

function Bars({ rows }) {
  return rows.map((r) => (
    <div key={r.label} className="flex items-center gap-2 mb-2.5">
      <span className="font-opensans text-xs text-gray-500 w-24 sm:w-36 flex-shrink-0 whitespace-nowrap overflow-hidden text-ellipsis">{r.label}</span>
      <div className="flex-1 h-2.5 bg-gray-300 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(4, Math.round((r.value / r.max) * 100))}%`, background: r.color }} />
      </div>
      <span className="font-poppins font-bold text-xs w-11 text-right flex-shrink-0" style={{ color: r.color }}>
        {r.value}
        {r.suffix || ''}
      </span>
    </div>
  ));
}

function OverviewTab() {
  const kpis = [
    { value: '24', label: 'Total Clients', delta: '↑ 7 new this quarter', color: '#1B3A5C' },
    { value: '17', label: 'Active Subscribers', delta: '71% activation rate', color: '#2F7D79' },
    { value: '$6,594', label: 'Quarterly Revenue', delta: '↑ $488 vs Q1', color: '#1A7A4A' },
    { value: '63', label: 'Avg FFS Score', delta: '↑ +8 points from onboarding', color: '#B8860B' },
    { value: '82%', label: 'Renewal Rate', delta: 'Q1 to Q2 retention', color: '#5B4A8B' },
  ];

  const locations = [
    { name: 'Katy', value: 4096, clients: 11, ffs: 66, color: '#2F7D79' },
    { name: 'Downtown Houston', value: 2149, clients: 8, ffs: 58, color: '#5B4A8B' },
    { name: 'Pearland', value: 848, clients: 3, ffs: 65, color: '#B8860B' },
  ];

  const maxLoc = Math.max(...locations.map((l) => l.value));
  const advisorRows = [
    { name: 'Yvonne Hollis-Cobb', clients: '8', ffs: '71', mrr: '$3,243', renewal: '89%', color: '#2F7D79', spark: [48, 52, 58, 61, 65, 68, 71] },
    { name: 'Priya Shankar', clients: '7', ffs: '60', mrr: '$2,094', renewal: '82%', color: '#B8860B', spark: [44, 48, 53, 56, 57, 59, 60] },
    { name: 'David Reyes', clients: '7', ffs: '57', mrr: '$2,096', renewal: '74%', color: '#5B4A8B', spark: [42, 45, 50, 52, 54, 55, 57] },
  ];
  const weekly = [3200, 3400, 3800, 4100, 4800, 5200, 6594];
  const maxWeekly = Math.max(...weekly);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 mb-5">
        {kpis.map((k) => (
          <Kpi key={k.label} {...k} />
        ))}
      </div>

      <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm mb-5">
        <div className="font-poppins font-bold text-xs text-gray-900 mb-4 flex items-center justify-between">
          Renewal Forecast - Next 90 Days
          <span className="font-opensans text-xs font-semibold text-gray-400">4 clients due</span>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[760px]">
            <div className="grid gap-2.5 p-2 border-b border-gray-300 mb-2" style={{ gridTemplateColumns: '1.3fr 0.8fr 0.8fr 1fr 1.2fr 1fr' }}>
              {['Client', 'Advisor', 'Location', 'MRR', 'Renewal Date', 'Likelihood'].map((h) => (
                <span key={h} className="font-opensans text-xs font-black uppercase tracking-wider text-gray-400">
                  {h}
                </span>
              ))}
            </div>
            {[
              ['Jordan Crawford', 'Priya', 'Pearland', '$499', 'Apr 15', 'High'],
              ['Melissa Grant', 'Priya', 'Katy', '$349', 'Apr 20', 'High'],
              ['Carol Williams', 'Yvonne', 'Katy', '$499', 'May 1', 'High'],
              ['Diane Moore', 'David', 'Downtown', '$349', 'May 15', 'At Risk'],
            ].map((r) => (
              <div key={r[0]} className="grid gap-2.5 p-2.5 border-b border-gray-200" style={{ gridTemplateColumns: '1.3fr 0.8fr 0.8fr 1fr 1.2fr 1fr' }}>
                <span className="text-xs font-bold text-gray-900">{r[0]}</span>
                <span className="text-xs text-gray-500">{r[1]}</span>
                <span className="text-xs text-gray-500">{r[2]}</span>
                <span className="font-poppins text-xs font-bold text-gray-900">{r[3]}</span>
                <span className="text-xs text-gray-900">{r[4]}</span>
                <span className="font-opensans text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center" style={{ background: r[5] === 'At Risk' ? '#FDEBE8' : '#E8F5EE', color: r[5] === 'At Risk' ? '#C63D2F' : '#1A7A4A' }}>
                  {r[5]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm mb-5">
        <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Advisor Performance Breakdown</div>
        <div className="overflow-x-auto">
          <div className="min-w-[840px]">
            <div className="grid gap-2.5 p-2 border-b border-gray-300 mb-2" style={{ gridTemplateColumns: '1.4fr 0.8fr 0.8fr 1fr 1fr 1fr' }}>
              {['Advisor', 'Clients', 'Avg FFS', 'Quarterly MRR', 'Renewal Rate', 'FFS Trend'].map((h) => (
                <span key={h} className="font-opensans text-xs font-black uppercase tracking-widest text-gray-400">
                  {h}
                </span>
              ))}
            </div>
            {advisorRows.map((r) => (
              <div key={r.name} className="grid gap-2.5 p-2.5 border-b border-gray-200" style={{ gridTemplateColumns: '1.4fr 0.8fr 0.8fr 1fr 1fr 1fr' }}>
                <span className="text-xs font-bold text-gray-900">{r.name}</span>
                <span className="font-poppins font-bold text-xs text-gray-900">{r.clients}</span>
                <span className="font-poppins font-bold text-xs" style={{ color: '#B8860B' }}>{r.ffs}</span>
                <span className="font-poppins font-bold text-xs text-gray-900">{r.mrr}</span>
                <span className="font-poppins font-bold text-xs" style={{ color: '#1A7A4A' }}>{r.renewal}</span>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '40px' }}>
                  {r.spark.map((v, i) => {
                    const h = Math.max(4, Math.round((v / 71) * 40));
                    return <div key={`${r.name}-${i}`} style={{ width: '100%', maxWidth: '8px', height: `${h}px`, borderRadius: '3px 3px 0 0', background: r.color, opacity: 0.35 + (v / 71) * 0.65 }} />;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Revenue by Location</div>
          {locations.map((l) => (
            <div key={l.name} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: l.color }}></div>
                  <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>{l.name}</span>
                </div>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '13px', color: '#1F2937' }}>${l.value.toLocaleString()}</span>
              </div>
              <div style={{ height: '8px', background: '#E7E3DD', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${Math.round((l.value / maxLoc) * 100)}%`, height: '100%', background: l.color, borderRadius: '999px' }}></div>
              </div>
              <div style={{ marginTop: '3px', fontFamily: 'Open Sans, sans-serif', fontSize: '11px', color: '#98A2B3' }}>
                {l.clients} clients · Avg FFS {l.ffs}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Q2 Revenue Trend (Weekly)</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '120px', marginBottom: '8px' }}>
            {weekly.map((v, i) => {
              const h = Math.round((v / maxWeekly) * 100);
              const active = i === weekly.length - 1;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
                  <div style={{ height: `${100 - h}px` }}></div>
                  <div style={{ flex: 1, width: '100%', background: active ? '#2F7D79' : '#E8F3F1', borderRadius: '6px 6px 0 0', border: `1px solid ${active ? '#2F7D79' : '#E7E3DD'}`, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '2px' }}>
                    {active ? <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '9px', color: '#fff' }}>$7K</span> : null}
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '10px', color: '#98A2B3' }}>Wk1</span>
            <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '10px', color: '#98A2B3' }}>Wk7 (Now)</span>
          </div>
        </div>
      </div>
    </>
  );
}

function PipelineTab() {
  const steps = [
    { label: 'New Lead', value: 3, color: '#1B3A5C' },
    { label: 'Ashley Qualified', value: 2, color: '#2F7D79' },
    { label: 'Intake In Progress', value: 3, color: '#B8860B' },
    { label: 'Advisor Review', value: 2, color: '#5B4A8B' },
    { label: 'Proposal Building', value: 2, color: '#2C5F7F' },
    { label: 'Proposal Sent', value: 3, color: '#1A7A4A' },
    { label: 'Active Subscriber', value: 6, color: '#A05A00' },
    { label: 'Renewal Decision', value: 4, color: '#C63D2F' },
  ];

  const max = steps[0].value;

  return (
    <>
      <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm mb-5">
        <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Pipeline Funnel - All Stages</div>
        {steps.map((s) => (
          <div key={s.label} className="flex items-center mb-2 gap-2.5">
            <span className="font-opensans text-xs text-gray-500 w-28 sm:w-36 flex-shrink-0">{s.label}</span>
            <div className="flex-1 h-7 bg-gray-300 rounded-lg overflow-hidden relative">
              <div className="h-full rounded-lg flex items-center px-3 font-opensans text-xs font-bold text-white whitespace-nowrap" style={{ width: `${Math.max(8, Math.round((s.value / max) * 100))}%`, background: s.color }}>
                {s.label}
              </div>
            </div>
            <span className="font-poppins font-black text-xs w-7 text-right flex-shrink-0">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Conversion Rates by Stage</div>
          <Bars
            rows={[
              { label: 'Lead → Qualified', value: 73, max: 100, color: '#B8860B', suffix: '%' },
              { label: 'Qualified → Intake', value: 83, max: 100, color: '#2F7D79', suffix: '%' },
              { label: 'Intake → Review', value: 80, max: 100, color: '#5B4A8B', suffix: '%' },
              { label: 'Review → Proposal', value: 75, max: 100, color: '#2C5F7F', suffix: '%' },
              { label: 'Proposal → Active', value: 67, max: 100, color: '#1A7A4A', suffix: '%' },
            ]}
          />
        </div>

        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Pipeline by Advisor</div>
          <div className="overflow-x-auto">
            <div className="min-w-[720px]">
              <div className="grid gap-2.5 p-2 border-b border-gray-300 mb-2" style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr' }}>
                {['Advisor', 'Active Leads', 'Active Subs', 'Conversion', 'Avg Days'].map((h) => (
                  <span key={h} className="font-opensans text-xs font-black uppercase tracking-widest text-gray-400">
                    {h}
                  </span>
                ))}
              </div>
              {[
                ['Yvonne Hollis-Cobb', '4', '8', '71%', '18d'],
                ['David Reyes', '3', '5', '63%', '24d'],
                ['Priya Shankar', '1', '5', '68%', '21d'],
              ].map((r) => (
                <div key={r[0]} className="grid gap-2.5 p-2.5 border-b border-gray-200" style={{ gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr' }}>
                  <span className="text-xs font-bold text-gray-900">{r[0]}</span>
                  <span className="font-poppins font-bold text-xs text-gray-900">{r[1]}</span>
                  <span className="font-poppins font-bold text-xs text-gray-900">{r[2]}</span>
                  <span className="font-poppins font-bold text-xs" style={{ color: '#1A7A4A' }}>{r[3]}</span>
                  <span className="font-poppins font-bold text-xs text-gray-500">{r[4]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AshleyTab() {
  const rows = [
    ['Apr 15', 'Omar Patel', 'Priya Shankar', 'Website', 'Go', 'Questionnaire sent'],
    ['Apr 14', 'Marcus Johnson', 'Yvonne Hollis-Cobb', 'Referral', 'Go', 'Discovery call booked'],
    ['Apr 12', 'Rachel Torres', 'David Reyes', 'Google Ads', 'Go', 'Ashley link sent'],
    ['Apr 9', 'Brian Wallace', 'David Reyes', 'Event', 'Go', 'Link not yet sent'],
    ['Apr 8', 'Unqualified Lead', 'David Reyes', 'Google Ads', 'No-Go', 'Politely declined'],
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-5">
        <Kpi value="47" label="Total Ashley Inquiries" delta="↑ 12 vs Q1" color="#1B3A5C" />
        <Kpi value="34" label="Qualified (Go)" delta="72% pass rate" color="#2F7D79" />
        <Kpi value="13" label="No-Go Decisions" delta="28% filtered out" color="#C63D2F" />
        <Kpi value="2.4d" label="Avg Response Time" delta="↓ from 3.1d Q1" color="#B8860B" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Inquiries by Lead Source</div>
          <Bars
            rows={[
              { label: 'Website', value: 14, max: 14, color: '#2F7D79' },
              { label: 'Referral', value: 12, max: 14, color: '#1A7A4A' },
              { label: 'Google Ads', value: 9, max: 14, color: '#2C5F7F' },
              { label: 'Event', value: 5, max: 14, color: '#B8860B' },
              { label: 'Walk-in', value: 4, max: 14, color: '#5B4A8B' },
            ]}
          />
        </div>

        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">No-Go Reasons</div>
          <Bars
            rows={[
              { label: 'Income below threshold', value: 7, max: 13, color: '#C63D2F' },
              { label: 'Entity not eligible', value: 3, max: 13, color: '#B8860B' },
              { label: 'Already has advisor', value: 2, max: 13, color: '#98A2B3' },
              { label: 'Outside service area', value: 1, max: 13, color: '#98A2B3' },
            ]}
          />
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
        <div className="font-poppins font-bold text-xs text-gray-900 mb-4 flex items-center justify-between">
          AI Ashley Routing Log - Q2 2026
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', fontWeight: 600, color: '#98A2B3' }}>{rows.length} entries</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Date', 'Client', 'Advisor', 'Source', 'Result', 'Action Taken'].map((h) => (
                  <th key={h} className="text-left p-2 border-b border-gray-300 font-opensans text-xs font-black uppercase tracking-widest text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={`${r[0]}-${r[1]}`}>
                  <td className="p-2.5 border-b border-gray-200 font-opensans text-xs text-gray-500">{r[0]}</td>
                  <td className="p-2.5 border-b border-gray-200 font-opensans text-xs text-gray-500"><strong>{r[1]}</strong></td>
                  <td className="p-2.5 border-b border-gray-200 font-opensans text-xs text-gray-500">{r[2]}</td>
                  <td className="p-2.5 border-b border-gray-200 font-opensans text-xs text-gray-500">{r[3]}</td>
                  <td className="p-2.5 border-b border-gray-200">
                    <span className="font-opensans text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center" style={{ background: r[4] === 'Go' ? '#E8F5EE' : '#FDEBE8', color: r[4] === 'Go' ? '#1A7A4A' : '#C63D2F' }}>
                      {r[4]}
                    </span>
                  </td>
                  <td className="p-2.5 border-b border-gray-200 font-opensans text-xs text-gray-500">{r[5]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function RetentionTab() {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-5">
        <Kpi value="82%" label="Overall Renewal Rate" delta="↑ 6% vs Q1" color="#2F7D79" />
        <Kpi value="$6.6K" label="Quarterly MRR" delta="↑ 8% from Q1" color="#1A7A4A" />
        <Kpi value="1" label="Churned This Quarter" delta="↓ from 3 in Q1" color="#C63D2F" />
        <Kpi value="63" label="Avg FFS at Renewal" delta="↑ 9 pts from intake" color="#B8860B" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Renewal Cohort Analysis</div>
          <div className="grid gap-2.5 p-2 border-b border-gray-300 mb-2" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
            {['Cohort', 'Clients', 'Renewed', 'Rate'].map((h) => (
              <span key={h} className="font-opensans text-xs font-black uppercase tracking-widest text-gray-400">
                {h}
              </span>
            ))}
          </div>
          {[
            ['Q4 2025', '6', '5', '83%'],
            ['Q3 2025', '4', '4', '100%'],
            ['Q2 2025', '3', '2', '67%'],
            ['Q1 2025', '2', '2', '100%'],
          ].map((r) => (
            <div key={r[0]} className="grid gap-2.5 p-2.5 border-b border-gray-200" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr' }}>
              <span className="font-opensans font-semibold text-xs text-gray-900">{r[0]}</span>
              <span className="font-poppins font-bold text-sm text-gray-900">{r[1]}</span>
              <span className="font-poppins font-bold text-sm text-gray-900">{r[2]}</span>
              <span className="font-poppins font-bold text-sm" style={{ color: parseInt(r[3], 10) >= 80 ? '#1A7A4A' : parseInt(r[3], 10) >= 60 ? '#B8860B' : '#C63D2F' }}>
                {r[3]}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Churn / Paused Reasons</div>
          <Bars
            rows={[
              { label: 'Non-responsive', value: 5, max: 9, color: '#C63D2F' },
              { label: 'Financial hardship', value: 2, max: 9, color: '#B8860B' },
              { label: 'Found other advisor', value: 1, max: 9, color: '#98A2B3' },
              { label: 'Paused (returning)', value: 1, max: 9, color: '#2C5F7F' },
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Avg FFS at Each Renewal</div>
          <Bars
            rows={[
              { label: 'Intake', value: 41, max: 100, color: '#C63D2F' },
              { label: 'Q1 Renewal', value: 54, max: 100, color: '#B8860B' },
              { label: 'Q2 Renewal', value: 63, max: 100, color: '#B8860B' },
              { label: 'Q3 Renewal', value: 71, max: 100, color: '#1A7A4A' },
              { label: 'Q4 Renewal', value: 78, max: 100, color: '#1A7A4A' },
              { label: 'Q5+ Renewal', value: 84, max: 100, color: '#2F7D79' },
            ]}
          />
        </div>

        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Clients At Renewal Risk</div>
          {[
            { name: 'Derek Wilson', detail: 'Yvonne · Overdue 45d', risk: 'High', bg: '#FDEBE8', color: '#C63D2F' },
            { name: 'Diane Moore', detail: 'David · FFS dropped', risk: 'Medium', bg: '#FEF9EE', color: '#7A5A00' },
            { name: 'Thomas Wren', detail: 'David · Paused', risk: 'Low', bg: '#F7F5F2', color: '#98A2B3' },
          ].map((row) => (
            <div key={row.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #F0ECE5' }}>
              <div>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: '13px', color: '#1F2937' }}>{row.name}</div>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11.5px', color: '#98A2B3', marginTop: '1px' }}>{row.detail}</div>
              </div>
              <span className="font-opensans text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center" style={{ background: row.bg, color: row.color }}>
                {row.risk} Risk
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ReferralsTab() {
  const logs = [
    ['Apr 8', 'Jordan Crawford', 'Marcus Johnson', 'Yvonne Hollis-Cobb', 'Converted'],
    ['Mar 20', 'Henry Ellis', 'David Okonkwo', 'Yvonne Hollis-Cobb', 'Converted'],
    ['Mar 15', 'Henry Ellis', 'Nina Foster', 'Yvonne Hollis-Cobb', 'In Progress'],
    ['Mar 10', 'Carol Williams', 'Robert Chen', 'Yvonne Hollis-Cobb', 'Converted'],
    ['Feb 28', 'Jordan Crawford', 'James Park', 'Priya Shankar', 'Converted'],
    ['Feb 20', 'Carla Reyes', 'Rachel Torres', 'David Reyes', 'In Progress'],
    ['Feb 15', 'Kevin Marsh', 'Unqualified', 'David Reyes', 'No-Go'],
  ];

  const topReferrers = [
    { name: 'Henry Ellis', detail: 'Yvonne · 2 referrals · 2 converted', count: 2, color: '#2F7D79' },
    { name: 'Jordan Crawford', detail: 'Yvonne/Priya · 2 referrals · 1 converted', count: 2, color: '#1A7A4A' },
    { name: 'Carol Williams', detail: 'Yvonne · 1 referral · 1 converted', count: 1, color: '#5B4A8B' },
    { name: 'Kevin Marsh', detail: 'David · 1 referral · 0 converted', count: 1, color: '#2C5F7F' },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-5">
        <Kpi value="7" label="Referrals This Quarter" delta="↑ 3 vs Q1" color="#1B3A5C" />
        <Kpi value="4" label="Converted to Clients" delta="57% conversion rate" color="#2F7D79" />
        <Kpi value="$1,396" label="Referral MRR Added" delta="From 4 converts" color="#1A7A4A" />
        <Kpi value="2.1x" label="Referral Multiplier" delta="vs paid channels" color="#B8860B" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Top Referrers</div>
          {topReferrers.map((r) => (
            <div key={r.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #F0ECE5' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '9px',
                  background: '#E8F5EE',
                  color: '#1A7A4A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif',
                  fontWeight: 800,
                  fontSize: '11px',
                  flexShrink: 0,
                }}
              >
                {r.name
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontWeight: 700, fontSize: '13px', color: '#1F2937' }}>{r.name}</div>
                <div style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11.5px', color: '#98A2B3' }}>{r.detail}</div>
              </div>
              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '13px', color: '#1A7A4A' }}>{r.count}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
          <div className="font-poppins font-bold text-xs text-gray-900 mb-4">Lead Source Comparison</div>
          <Bars
            rows={[
              { label: 'Referral (client)', value: 7, max: 14, color: '#1A7A4A' },
              { label: 'Google Ads', value: 9, max: 14, color: '#2C5F7F' },
              { label: 'Website organic', value: 14, max: 14, color: '#2F7D79' },
              { label: 'Event / in-person', value: 5, max: 14, color: '#B8860B' },
              { label: 'Social media', value: 3, max: 14, color: '#5B4A8B' },
            ]}
          />
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #F0ECE5', fontFamily: 'Open Sans, sans-serif', fontSize: '12px', color: '#667085', lineHeight: 1.6 }}>
            <strong style={{ color: '#1A7A4A' }}>Referrals convert at 57%</strong> vs 18% for paid channels. Angela should prioritize renewal calls with Henry Ellis and Jordan Crawford for additional referral asks.
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-300 rounded-3xl p-5 shadow-sm">
        <div className="font-poppins font-bold text-xs text-gray-900 mb-4 flex items-center justify-between">
          Referral Activity Log
          <span style={{ fontFamily: 'Open Sans, sans-serif', fontSize: '11px', fontWeight: 600, color: '#98A2B3' }}>{logs.length} entries</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {['Date', 'Referred By', 'Referred', 'Advisor', 'Status'].map((h) => (
                  <th key={h} className="text-left p-2 border-b border-gray-300 font-opensans text-xs font-black uppercase tracking-widest text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logs.map((r) => (
                <tr key={`${r[0]}-${r[2]}`}>
                  <td className="p-2.5 border-b border-gray-200 font-opensans text-xs text-gray-500">{r[0]}</td>
                  <td className="p-2.5 border-b border-gray-200 font-opensans text-xs text-gray-500"><strong>{r[1]}</strong></td>
                  <td className="p-2.5 border-b border-gray-200 font-opensans text-xs text-gray-500">{r[2]}</td>
                  <td className="p-2.5 border-b border-gray-200 font-opensans text-xs text-gray-500">{r[3]}</td>
                  <td className="p-2.5 border-b border-gray-200">
                    <span
                      className="font-opensans text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center"
                      style={{
                        background: r[4] === 'Converted' ? '#E8F5EE' : r[4] === 'In Progress' ? '#FEF9EE' : '#F7F5F2',
                        color: r[4] === 'Converted' ? '#1A7A4A' : r[4] === 'In Progress' ? '#7A5A00' : '#98A2B3',
                      }}
                    >
                      {r[4]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default function ReportsScreen() {
  const [tab, setTab] = useState('overview');
  const [advisor, setAdvisor] = useState('');
  const [location, setLocation] = useState('');
  const [period, setPeriod] = useState('q2');

  return (
    <div className="flex flex-col flex-1 overflow-hidden min-h-0">
      <div className="bg-white border-b border-gray-300 px-3 sm:px-5 flex flex-col md:flex-row items-stretch md:items-center justify-between flex-shrink-0 gap-2 md:gap-3">
        <div className="flex overflow-x-auto">
          {TABS.map((t) => (
            <button key={t.id} className={`font-opensans text-xs font-semibold px-4 py-2 border-b-2 text-gray-400 cursor-pointer hover:text-gray-900 whitespace-nowrap transition-all ${tab === t.id ? 'text-gray-900 font-bold border-b-teal-700' : 'border-b-transparent'}`} onClick={() => setTab(t.id)}>
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 py-2 flex-wrap md:justify-end">
          <select className="border border-gray-300 rounded-lg px-2.5 py-1 font-opensans text-xs text-gray-900 bg-white outline-none cursor-pointer" value={advisor} onChange={(e) => setAdvisor(e.target.value)}>
            <option value="">All Advisors</option>
            <option>Yvonne Hollis-Cobb</option>
            <option>David Reyes</option>
            <option>Priya Shankar</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-2.5 py-1 font-opensans text-xs text-gray-900 bg-white outline-none cursor-pointer" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All Locations</option>
            <option>Katy</option>
            <option>Downtown Houston</option>
            <option>Pearland</option>
          </select>
          <select className="border border-gray-300 rounded-lg px-2.5 py-1 font-opensans text-xs text-gray-900 bg-white outline-none cursor-pointer" value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="q1">Q1 2026</option>
            <option value="q2">Q2 2026 (Current)</option>
            <option value="all">All Time</option>
          </select>
          <button className="bg-white border border-gray-300 rounded-lg px-3 py-1 font-opensans text-xs font-semibold text-gray-500 cursor-pointer inline-flex items-center gap-1">
            <Download size={11} />
            Export
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gray-100">
        {tab === 'overview' && <OverviewTab />}
        {tab === 'pipeline' && <PipelineTab />}
        {tab === 'ashley' && <AshleyTab />}
        {tab === 'retention' && <RetentionTab />}
        {tab === 'referrals' && <ReferralsTab />}
      </div>
    </div>
  );
}
