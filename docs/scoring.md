# Scoring Rubric (for Claude system prompt)

### Category 1: Conversion Signals — 25 pts

| Criterion                        | Detection                                    | Points |
| -------------------------------- | -------------------------------------------- | ------ |
| Phone number in header           | Regex phone pattern in first 15% of HTML     | 5      |
| Click-to-call link (`tel:` href) | Search for `href="tel:`                      | 3      |
| CTA button above fold            | Action verbs in first 20% of HTML            | 4      |
| Contact form present             | `<form>` tag with inputs                     | 4      |
| Form has 3–5 fields              | Count input/select elements                  | 3      |
| Emergency / 24hr mention         | Text search: "24/7", "emergency", "same-day" | 3      |
| Pricing or financing mention     | Text search: "financing", "starting at", "$" | 3      |

### Category 2: Technical Health — 20 pts

| Criterion                      | Detection                                      | Points |
| ------------------------------ | ---------------------------------------------- | ------ |
| HTTPS active                   | URL protocol check                             | 3      |
| Mobile PageSpeed score         | PageSpeed API (≥80=8, 60-79=5, 40-59=2, <40=0) | 8      |
| LCP (≤2.5s=5, ≤4s=2, >4s=0)    | PageSpeed API                                  | 5      |
| CLS (≤0.1=4, ≤0.25=2, >0.25=0) | PageSpeed API                                  | 4      |

### Category 3: Content Depth — 20 pts

| Criterion                                       | Detection                                 | Points |
| ----------------------------------------------- | ----------------------------------------- | ------ |
| Service pages count (7+=6, 5-6=4, 3-4=2, <3=0)  | Internal links with service keywords      | 6      |
| Service area content                            | City names, "we serve", ZIP codes         | 4      |
| FAQ section                                     | "FAQ", "Frequently Asked", lines with "?" | 3      |
| Blog / educational content                      | /blog, /news, article pages               | 3      |
| Homepage word count (≥800=4, 400-799=2, <400=0) | Body text count                           | 4      |

### Category 4: Trust Signals — 20 pts

| Criterion                                 | Detection                                   | Points |
| ----------------------------------------- | ------------------------------------------- | ------ |
| Reviews / testimonials on site            | Stars, ratings, "testimonial" text          | 5      |
| Certification mentions (3+=5, 1-2=3, 0=0) | NATE, EPA, BBB, certified, insured          | 5      |
| License number or "Licensed & Insured"    | License text search                         | 3      |
| Guarantee / warranty language             | "guarantee", "warranty", "satisfaction"     | 3      |
| About / team content                      | /about page, "years in business", "founded" | 4      |

### Category 5: Local Presence — 15 pts

| Criterion                              | Detection                                      | Points |
| -------------------------------------- | ---------------------------------------------- | ------ |
| NAP in footer (name + address + phone) | Parse footer HTML                              | 4      |
| Schema markup present                  | `application/ld+json` with LocalBusiness/@type | 5      |
| Service areas listed                   | City names, "cities we serve"                  | 3      |
| Business hours stated                  | "Mon", "hours", "open", time patterns          | 3      |

### Grade Bands

| Score  | Grade | Label     |
| ------ | ----- | --------- |
| 90–100 | A     | Excellent |
| 75–89  | B     | Good      |
| 60–74  | C     | Fair      |
| 45–59  | D     | Weak      |
| < 45   | F     | Critical  |

---
