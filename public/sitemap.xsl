<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
  version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  exclude-result-prefixes="sitemap xhtml">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="fr">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Sitemap — martzcode</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&amp;display=swap');

          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          :root {
            --bg:       #ffffff;
            --surface:  #f9f9f9;
            --border:   hsl(240, 5.9%, 90%);
            --text:     hsl(240, 10%, 3.9%);
            --muted:    hsl(240, 3.8%, 46.1%);
            --subtle:   hsl(240, 4.8%, 95.9%);
            --radius:   0.5rem;
          }

          body {
            font-family: 'Geist', 'Geist Sans', system-ui, sans-serif;
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            padding: 3rem 1.5rem;
          }

          .container {
            max-width: 860px;
            margin: 0 auto;
          }

          /* ── Header ── */
          header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-bottom: 2.5rem;
            padding-bottom: 1.5rem;
            border-bottom: 1px solid var(--border);
          }

          .logo {
            width: 40px;
            height: 40px;
            background: var(--text);
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 1rem;
            color: var(--bg);
            flex-shrink: 0;
            letter-spacing: -0.02em;
          }

          header h1 {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--text);
            letter-spacing: -0.02em;
          }

          header p {
            font-size: 0.8rem;
            color: var(--muted);
            margin-top: 2px;
          }

          /* ── Stats ── */
          .stats {
            display: flex;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
          }

          .stat {
            background: var(--subtle);
            border: 1px solid var(--border);
            border-radius: var(--radius);
            padding: 0.6rem 1rem;
            display: flex;
            align-items: baseline;
            gap: 0.4rem;
          }

          .stat-value {
            font-size: 1rem;
            font-weight: 600;
            color: var(--text);
          }

          .stat-label {
            font-size: 0.75rem;
            color: var(--muted);
          }

          /* ── Table ── */
          table {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            overflow: hidden;
            font-size: 0.825rem;
          }

          thead tr {
            background: var(--subtle);
          }

          th {
            padding: 0.65rem 1rem;
            text-align: left;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.06em;
            color: var(--muted);
            border-bottom: 1px solid var(--border);
          }

          td {
            padding: 0.65rem 1rem;
            border-bottom: 1px solid var(--border);
            vertical-align: middle;
            color: var(--text);
          }

          tr:last-child td {
            border-bottom: none;
          }

          tr:hover td {
            background: var(--subtle);
          }

          a {
            color: var(--text);
            text-decoration: none;
            font-weight: 500;
          }

          a:hover {
            text-decoration: underline;
            text-underline-offset: 3px;
          }

          /* ── Badges ── */
          .badge {
            display: inline-block;
            font-size: 0.7rem;
            font-weight: 500;
            padding: 0.15rem 0.5rem;
            border-radius: 4px;
            background: var(--subtle);
            color: var(--muted);
            border: 1px solid var(--border);
          }

          .badge-dark {
            background: var(--text);
            color: var(--bg);
            border-color: var(--text);
          }

          .col-url   { width: 55%; }
          .col-date  { width: 15%; }
          .col-freq  { width: 15%; }
          .col-prio  { width: 15%; }
          .muted { color: var(--muted); }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="logo">M</div>
            <div>
              <h1>sitemap.xml</h1>
              <p>martzcode.vercel.app</p>
            </div>
          </header>

          <div class="stats">
            <div class="stat">
              <span class="stat-value">
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
              </span>
              <span class="stat-label">URLs indexées</span>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th class="col-url">URL</th>
                <th class="col-date">Modifié</th>
                <th class="col-freq">Fréquence</th>
                <th class="col-prio">Priorité</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td class="col-url">
                    <a href="{sitemap:loc}">
                      <xsl:value-of select="sitemap:loc"/>
                    </a>
                  </td>
                  <td class="col-date muted">
                    <xsl:value-of select="substring(sitemap:lastmod, 1, 10)"/>
                  </td>
                  <td class="col-freq">
                    <xsl:if test="sitemap:changefreq">
                      <span class="badge">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </xsl:if>
                  </td>
                  <td class="col-prio">
                    <xsl:if test="sitemap:priority">
                      <span class="badge badge-dark">
                        <xsl:value-of select="sitemap:priority"/>
                      </span>
                    </xsl:if>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
