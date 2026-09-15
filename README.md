# mumbai-streetfood-map

# Mumbai Street Food Map 🗺️

A crowd-sourced, interactive map for rating and discovering the best street food in Mumbai — vada pav, rolls, samosas, and everything in between. No more "world famous" claims with zero proof. Real ratings, real hotspots, real street food only (no restaurants).

## Core Idea

- Interactive map of Mumbai street food stalls
- Filter by food item (e.g. "show me the top 10 vada pav spots in the city")
- Crowd-sourced ratings and reviews
- Strictly street food — no restaurant-style listings
- Social, interactive experience for users, not just a static directory

## Tech Stack

| Layer | Choice |
|---|---|
| Frontend | React Native |
| Backend | .NET or Spring Boot (Java) |
| Relational DB | Microsoft SQL Server |
| NoSQL / Geo DB | MongoDB |
| Graph DB | Neo4j *(deferred — see notes)* |

### Notes on stack choices

- **MongoDB** is the workhorse for this app. It has native geospatial indexing (`2dsphere`, `$geoNear`), which is exactly what's needed for "top-rated stalls near me" / map-based queries.
- **SQL Server** handles structured data — users, auth, stall metadata, review records.
- **Neo4j** is on hold for now. Unless/until we build deep social-graph features (friend networks, "people who liked this also liked..."), it adds ops overhead without enough payoff for an MVP. Revisit post-launch.
- **.NET vs Spring Boot** — pick based on whoever's contributing has more backend experience. Either is a reasonable choice here.

## Key Problems to Solve

### 1. Verifying "this is actually street food" — without manual approval
We don't want a backend team manually approving/rejecting every submission. Instead:
- Require a photo + GPS pin at time of posting
- Make "street food" a crowd-editable tag — anyone can dispute a listing; enough disputes auto-hides it (no human review needed)
- Cross-check submitted location against a formal restaurant database (Zomato/Google Places API) — auto-flag matches

### 2. Rating manipulation
- Rate-limit: one review per device + account per stall per time window
- Weight reviews by account trust score (account age, review history, % of verified/photo reviews)
- Geofence reviews — only allow rating a stall if the device was recently near that pin

### 3. Cold start problem
- An empty map on day one kills the app
- Seed the map manually pre-launch — tag ~150–200 known Mumbai stalls before opening to the public

### 4. Duplicate pins
- Multiple users creating the same stall with slightly different coordinates/names
- Needs fuzzy dedup logic (name similarity + proximity radius) and a merge/claim flow for existing pins

## Contributing

This is an open collaborative project — friends and contributors are welcome to push code, open issues, and suggest features.

1. Clone the repo
2. Create a feature branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes
4. Open a pull request describing what you built/changed
5. Tag another contributor for review before merging to `main`

### Getting Started (suggested path)

1. **Wireframe / UI first** — use a tool like Lovable or Replit to quickly mock up the look and feel (map view, list view, review cards) before writing production code. Fast to iterate, good for agreeing on UX with the group.
2. **Real build** — once the direction is locked, move to Claude Code (or your preferred IDE) to build the actual app against this stack, working directly in this repo.

## Status

🚧 Early planning / wireframe stage.

## License

TBD.
