<script setup>
import { computed } from 'vue'

const business = {
  name: 'Acme HVAC San Diego',
  url: 'acmehvacsd.com'
}

const score = {
  value: 61,
  outOf: 100,
  verdict: 'Fair.',
  caption: 'Below the local HVAC sector median of 68.'
}

const metrics = [
  {
    label: 'Est. Monthly Loss',
    value: '$8,640',
    note: 'Based on 15 unresolved issues & call-tracking averages'
  },
  {
    label: 'Local Rank',
    value: '#7',
    unit: 'of 12',
    notePrefix: '3 competitors',
    note: 'ranking above you on key queries'
  },
  {
    label: 'Mobile Load',
    value: '6.2',
    unit: 's',
    notePrefix: 'Slower than 78%',
    note: 'of HVAC sites in your area'
  }
]

const subScores = [
  { label: 'Search results', detail: 'Poor — get to the top of Google', score: 22, total: 40, tone: 'red' },
  { label: 'Customer experience', detail: 'Needs work — fix friction on-site', score: 21, total: 40, tone: 'amber' },
  { label: 'Local listings', detail: 'Strong — minor cleanup only', score: 18, total: 20, tone: 'green' }
]

const tabs = [
  { key: 'visibility', label: 'Visibility', count: '6' },
  { key: 'search', label: 'Search Results', count: '22/40' },
  { key: 'experience', label: 'Customer Experience', count: '21/40' },
  { key: 'listings', label: 'Local Listings', count: '18/20' }
]
const activeTab = 'visibility'

const queries = [
  { query: 'Best HVAC repair in San Diego', leader: '#1: Pacific Air & Heating', rank: 'Unranked', type: 'map result' },
  { query: 'AC installation near me', leader: '#1: Pacific Air & Heating', rank: 'Unranked', type: 'organic' },
  { query: 'Furnace repair San Diego', leader: '#1: SoCal Comfort Pros', rank: '4th', type: 'organic' },
  { query: 'Emergency HVAC service 24/7', leader: '#1: Coastline Climate Co.', rank: 'Unranked', type: 'map result' },
  { query: 'Heat pump installation La Jolla', leader: '#1: Pacific Air & Heating', rank: '7th', type: 'organic' },
  { query: 'HVAC contractor Mira Mesa', leader: '#1: SoCal Comfort Pros', rank: 'Unranked', type: 'map result' }
]

const seoIntro = {
  title: "What's SEO?",
  text: 'Improving your website so search engines like Google can find it, rank it higher, and bring you more leads.'
}
const seoGroups = [
  {
    title: 'Domain',
    items: [
      { label: 'Using custom domain', passed: true },
      { label: 'Only one domain', passed: true }
    ]
  },
  {
    title: 'Headline (H1)',
    items: [
      { label: 'Includes the service area', description: 'Mentioning your service area in the headline helps with local SEO.', passed: false },
      { label: 'Includes relevant keywords', description: 'Including relevant keywords in your headline improves search visibility.', passed: false }
    ]
  },
  {
    title: 'Metadata',
    items: [
      { label: 'Images have "alt" tags', passed: true },
      { label: 'Description includes the service area', description: 'Mentioning your service area in the meta description aids local SEO efforts.', passed: false },
      { label: 'Open Graph image', description: 'Open Graph image metadata (og:image) is critical for visual social sharing previews.', passed: false },
      { label: 'Page title includes the service area', description: 'Including your service area in the page title helps with local search visibility.', passed: false }
    ]
  }
]

const cxIntro = {
  title: 'Your Site',
  text: 'Your site content and experience drive conversion and bookings.'
}
const cxGroups = [
  {
    title: 'Content',
    items: [
      { label: 'Click-to-call phone number', description: "Mobile visitors expect a tappable phone number above the fold. You're losing emergency callers.", passed: false },
      { label: 'Online booking / quote request form', passed: true },
      { label: 'Service areas listed on website', description: 'Customers (and Google) need to see which neighborhoods you serve.', passed: false },
      { label: 'Operating hours visible', description: "Hours aren't displayed on the homepage — customers will call a competitor instead of guessing.", passed: false }
    ]
  },
  {
    title: 'Trust & Appearance',
    items: [
      { label: 'Licensing & certifications shown', description: 'No C-20 license number, EPA cert, or NATE badge visible — homeowners look for these before calling.', passed: false },
      { label: 'Customer reviews on-page', passed: true },
      { label: 'Real team / truck photos', description: 'Stock photography reduces trust. Real photos of your team and trucks can lift conversion 10-20%.', passed: false }
    ]
  }
]

const gbpProfile = {
  name: 'Acme HVAC San Diego',
  rating: '4.5',
  reviewCount: 184
}
const llGroups = [
  {
    title: 'Profile Content',
    items: [
      { label: 'First-party website', sub: 'acmehvacsd.com', passed: true },
      { label: 'Business hours', passed: true },
      { label: 'Phone number', sub: '(858) 555-0184', passed: true },
      { label: 'Service options & emergency hours', description: '"24/7 emergency service" toggle isn\'t set — you won\'t appear for after-hours searches.', passed: false },
      { label: 'Categories match keywords', sub: '"HVAC contractor", "Air conditioning repair service", "Furnace repair service"', passed: true }
    ]
  },
  {
    title: 'User-Submitted Content',
    items: [
      { label: 'Quality reviews', sub: '184 reviews · last review 3 days ago · response rate 64%', passed: true }
    ]
  }
]

const reportDate = computed(() =>
  new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
)
</script>

<template>
  <div class="report">
    <ReportHeader :date="reportDate" />

    <section class="hero">
      <div class="hero-inner">
        <ReportSiteIdentity :business="business" />
        <ReportScoreHero :score="score" :metrics="metrics" />
        <ReportSubScoreRow :sub-scores="subScores" />
      </div>
      <ReportTabBar
        :tabs="tabs"
        :active="activeTab"
        meta="40 things reviewed · 15 need work"
      />
    </section>

    <main class="content">
      <div class="content-inner">
        <ReportSection
          title="This is how you're doing online"
          description="Where you show up when customers search for you, next to your competitors."
          count="6 queries tracked"
        >
          <div class="query-list">
            <ReportQueryRow v-for="q in queries" :key="q.query" :query="q" />
          </div>
        </ReportSection>

        <ReportSection
          title="Search Results"
          description="Get your website to the top of Google."
          count="22 / 40"
        >
          <ReportChecklistCard :intro="seoIntro" :groups="seoGroups" />
        </ReportSection>

        <ReportSection
          title="Customer Experience"
          description="Improve the experience on your website."
          count="21 / 40"
        >
          <ReportChecklistCard :intro="cxIntro" :groups="cxGroups" />
        </ReportSection>

        <ReportSection
          title="Local Listings"
          description="Make your business easy to find."
          count="18 / 20"
        >
          <ReportChecklistCard :groups="llGroups">
            <template #top>
              <ReportGbpProfile :profile="gbpProfile" />
            </template>
          </ReportChecklistCard>
        </ReportSection>

        <ReportCtaBanner :fix-count="15" highlight-label="AI Site Builder" />
      </div>
    </main>
  </div>
</template>

<style scoped>
.report {
  min-height: 100vh;
  background: var(--bg);
}

.hero {
  background: var(--cream);
}
.hero-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 40px 28px;
}

.content {
  background: var(--bg);
}
.content-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

.query-list {
  display: flex;
  flex-direction: column;
}

@media (max-width: 640px) {
  .hero-inner,
  .content-inner {
    padding-left: 20px;
    padding-right: 20px;
  }
}
</style>
