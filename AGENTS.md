# Raiden EmbedView (R-EmbedView) — Agent Context & Architecture Guide

## 1. Overview & Purpose

**R-EmbedView** is a high-performance embed commuter and gateway service for video streaming links within the Aniyae ecosystem. 

### Primary Responsibilities:
- **Embed Commutation & Routing**: Receives encrypted/encoded video source URLs via query parameters, identifies the provider domain, and commutes the request to the appropriate rendering pipeline.
- **Display Mode Management**: Dictates how embeds behave (e.g., standard iframe vs. sandboxed iframe blocking rogue ad scripts vs. custom JWPlayer HLS proxying).
- **URL Sanitization & Hash Extraction**: Normalizes malformed, fragmented, or upstream-concatenated video URLs (such as Moon / Byse / Filemoon, Dood, Streamwish, Lulu) by extracting visualization hashes and rebuilding canonical embed URLs.
- **Ad & Security Guardian Layer**: Injects protection layers including anti-DevTools (`CAT_FRAME`), custom ad managers (`ADS_PLAYER`), and DOM popup/iframe guardians (`ADS_GUARDIAN`).
- **HLS Segment Proxy**: Proxies and rewrites `.m3u8` manifests and `.ts` segments (e.g., Zilla Networks) with required headers (Referer/Origin) to bypass WAFs and CORS restrictions.

---

## 2. Core Request Flow

```
1. Inbound Request: GET /?{ANIYAE_HASH}={Base64_URI}&image={Poster}&animeTitle={Title}
   │
2. Parameter Decoding:
   └─► decodeUriParameter() -> doubleB64Controller()
       Handles single and double Base64-encoded strings with URL validation.
   │
3. Provider Resolution:
   └─► performConmutation(decodedUri, PROVIDERS_JSON)
       Performs case-insensitive substring matching against src/assets/providers.json.
   │
4. Player Wrapper:
   └─► Returns basePlayerPage (HTML button linking to /{provider_route}/?{ANIYAE_HASH}={Single_Base64}).
   │
5. Specialized Route Execution:
   ├─► /prod-general: Standard iframe embed with protection scripts.
   ├─► /prod-snbox: Sandboxed iframe (sandbox="allow-same-origin allow-scripts") for ad blocking.
   ├─► /prod-raidenplayer: JWPlayer interface for direct MP4/stream feeds.
   ├─► /prod-zilla-proxy: JWPlayer streaming via /zilla-m3u8/:hash and /zilla-segs/:hash/:segment.
   ├─► /moon-analizer: Normalizes Moon/Byse URLs via extractMoonHash -> SET_CORE_URI.moon.
   ├─► /prod-dood-analyzer, /prod-analizer-wish, /prod-analizer-lulu, etc.
   ├─► /proxed: Multiplexed core proxy resolver using SET_CORE_URI.
   └─► /provisional, /prod-down: Fallback and decommissioned provider pages.
```

---

## 3. Project Structure

```
.
├── src/
│   ├── assets/
│   │   ├── assets.ts          # Exports for JSON data sets
│   │   ├── providers.json     # Map of domain keywords -> route identifiers
│   │   └── set-core.json      # Base URLs for core analyzers/proxies (moon, uqload, lulu, etc.)
│   ├── conmuter.ts            # performConmutation: Case-insensitive domain matcher
│   ├── embed-serv.ts          # Express application entry, server configuration, and routes
│   ├── index.ts               # Public barrel export file
│   ├── providers/
│   │   ├── prod-base.ts       # basePlayerPage generation
│   │   ├── prod-down.ts       # Error & decommissioned provider landing pages
│   │   ├── prod-general.ts    # raidenGeneral: Default protected iframe wrapper
│   │   ├── prod-qls.ts        # Builders for core URL endpoints (fmoonProd, luluProd, uqloProd, etc.)
│   │   ├── prod-raidenplayer.ts # raidenPlayer: JWPlayer wrapper for direct streams
│   │   ├── prod-secure.ts     # CAT_FRAME, ADS_PLAYER, ADS_GUARDIAN obfuscated scripts
│   │   ├── prod-snbox.ts      # raidenSanbox: Sandboxed iframe renderer
│   │   ├── prod-uri-analizer.ts # Hash extraction (Moon, Mixdrop, Dood, Wish, Lulu, Base64 decoding)
│   │   ├── prod-zilla-proxy.ts# raidenZillaProxy: JWPlayer wrapper for Zilla HLS proxy
│   │   └── provider-strategy.ts # Programmatic strategy pattern dispatcher
│   └── tests/
│       ├── integration/       # Route & provider analyzer integration tests
│       └── unit/              # Commuter and decoding unit tests
├── dist/                      # Compiled JS output (via tsc)
├── package.json               # Dependencies and scripts (bun runtime)
└── tsconfig.json              # TypeScript compilation config
```

---

## 4. Key Configuration Files

### `src/assets/providers.json`
An array of objects mapping URL signatures to provider handler routes:
```json
[
  { "key": "filemoon.sx", "value": "moon-analizer" },
  { "key": "bysewihe.com", "value": "moon-analizer" },
  { "key": "doodstream", "value": "prod-general" },
  { "key": "solidfiles", "value": "prod-down" },
  { "key": "mega.nz", "value": "prod-snbox" }
]
```

### `src/assets/set-core.json`
Central configuration for target embed endpoints and core proxies:
```json
{
  "uqload": "https://omeplay.com/embed2/?host=uqload&id=",
  "lulu": "https://omeplay.com/embed2/?host=lulustream&id=",
  "fmoon": "https://omeplay.com/embed2/?host=filemoon&id=",
  "moon": "https://bysewihe.com/e/",
  "wishg": "https://omeplay.com/embed2/?host=streamhg&id=",
  "yandex": "https://omeplay.com/embed2/?host=yadisk&id=",
  "xn": "https://xn--9iq853atby55l.qsag.cloud/x3sdsx/?id="
}
```

---

## 5. Development & Operational Commands

- **Start Dev Server**: `bun dev` (runs with `--watch` on `src/embed-serv.ts`)
- **Build**: `bun run build` (runs ESLint and TypeScript compilation `tsc`)
- **Start Production**: `bun start` (runs `dist/embed-serv.js`)
- **Run Tests**: `bun test` or `bun test src/tests/`

---

## 6. Guidelines for Future Maintenance

1. **Hash Extraction over String Replacement**: When handling upstream providers with frequent domain changes or URL fragmentation (like Filemoon / Moon), always extract the visualization hash (`/e/{hash}`, `/d/{hash}`, `?id={hash}`) via regex and mount it onto the base URL defined in `set-core.json`. Avoid brittle `string.replace()` calls on domain names.
2. **Case-Insensitive Matching**: All URL pattern matching in `conmuter.ts` and analyzer functions must use case-insensitive logic (`.toLowerCase()`).
3. **Environment & Security**:
   - Environment variables: `SRV_URI` (Port), `HASH` (Query parameter key), `NODE_ENV`.
   - Obfuscated security constants in `prod-secure.ts` must be preserved unless explicitly instructed.
4. **Build Verification**: Any changes to TypeScript source files in `src/` must be validated with `bun run build` to ensure type consistency and clean ESLint linting.
