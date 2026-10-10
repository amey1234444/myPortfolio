const { spawn } = require('node:child_process')
const { chromium } = require(process.env.RUNNER_TEMP + '/portfolio-browser/node_modules/playwright')

async function main() {
  const server = spawn(process.execPath, [require.resolve('next/dist/bin/next'), 'start'], { stdio: 'ignore' })
  let browser
  try {
    let ready = false
    for (let attempt = 0; attempt < 40; attempt += 1) {
      try { if ((await fetch('http://localhost:3000')).ok) { ready = true; break } } catch {}
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    if (!ready) throw new Error('Production server did not start')
    browser = await chromium.launch()
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' })
    const waitForContent = async () => {
      await page.locator('main').waitFor({ state: 'visible' })
      await page.evaluate(() => Promise.race([document.fonts.ready, new Promise(resolve => setTimeout(resolve, 5000))]))
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
    }
    const errors = []
    page.on('pageerror', error => errors.push(error.message))
    for (const width of [1440, 768, 360, 390]) {
      await page.setViewportSize({ width, height: 1000 })
      for (const route of ['/', '/about', '/projects', '/projects/0', '/projects/6', '/projects/7', '/projects/8', '/tools', '/timeline', '/contact']) {
        await page.goto('http://localhost:3000' + route, { waitUntil: 'domcontentloaded' })
        await waitForContent()
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1)
        if (overflow) throw new Error('Horizontal overflow at ' + width + ': ' + route)
        if (!(await page.locator('main').isVisible())) throw new Error('Main content missing: ' + route)
      }
    }
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
    await waitForContent()
    await page.getByRole('button', { name: 'Systems', exact: true }).click()
    await page.getByText('server.ts', { exact: true }).waitFor()
    await page.getByRole('button', { name: 'Next value' }).click()
    await page.getByRole('heading', { name: /Stay curious/ }).waitFor()
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page.keyboard.press('Escape')
    if (await page.getByRole('button', { name: 'Open navigation' }).getAttribute('aria-expanded') !== 'false') throw new Error('Mobile menu failed to close')
    await page.getByRole('button', { name: 'Switch to dark theme' }).click()
    if (await page.locator('.portfolio').getAttribute('data-theme') !== 'dark') throw new Error('Theme did not change')
    await page.getByRole('button', { name: /Pause animations/ }).click()
    await page.reload({ waitUntil: 'domcontentloaded' })
    await waitForContent()
    await page.getByRole('button', { name: /Play animations/ }).waitFor()
    await page.getByRole('button', { name: 'Switch to light theme' }).click()
    await page.evaluate(() => window.scrollTo(0, 0))
    console.log('SCREENSHOT_MOBILE=' + (await page.screenshot({ type: 'jpeg', quality: 55 })).toString('base64'))
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.evaluate(() => window.scrollTo(0, 0))
    console.log('SCREENSHOT_DESKTOP=' + (await page.screenshot({ type: 'jpeg', quality: 55 })).toString('base64'))
    await page.locator('#contact').scrollIntoViewIfNeeded()
    console.log('SCREENSHOT_CONTACT=' + (await page.screenshot({ type: 'jpeg', quality: 55 })).toString('base64'))
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
    await waitForContent()
    console.log('SCREENSHOT_FEATURED=' + (await page.locator('#work').screenshot({ type: 'jpeg', quality: 60 })).toString('base64'))
    for (const [id, title, next] of [[8, 'GRID-X', 6], [6, 'IMG Creator', 7], [7, 'News Platform', 0]]) {
      await page.goto('http://localhost:3000/projects/' + id, { waitUntil: 'domcontentloaded' })
      await waitForContent()
      await page.getByRole('heading', { name: title, exact: true, level: 1 }).waitFor()
      await page.getByRole('heading', { name: 'Decisions behind the build.' }).waitFor()
      if (await page.locator('.next-project').getAttribute('href') !== '/projects/' + next) throw new Error('Incorrect next project: ' + title)
      if (await page.locator('.case-sources a').count() < 3) throw new Error('Missing project evidence: ' + title)
    }
    console.log('SCREENSHOT_CASESTUDY=' + (await page.locator('.case-study-body').screenshot({ type: 'jpeg', quality: 55 })).toString('base64'))
    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('http://localhost:3000/projects/6', { waitUntil: 'domcontentloaded' })
    await waitForContent()
    console.log('SCREENSHOT_PROJECT_MOBILE=' + (await page.screenshot({ type: 'jpeg', quality: 60 })).toString('base64'))
    await page.getByRole('button', { name: 'Switch to dark theme' }).click()
    console.log('SCREENSHOT_PROJECT_DARK=' + (await page.screenshot({ type: 'jpeg', quality: 60 })).toString('base64'))
    if (errors.length) throw new Error('Uncaught browser errors: ' + errors.join('; '))
    console.log('BROWSER_CHECKS_PASSED: ten routes at 1440/768/360/390 widths; three case studies and next-project navigation; workbench, carousel, mobile Escape, theme, saved motion; zero uncaught browser errors.')
    for (const platform of ['github', 'leetcode']) {
      const response = await fetch('http://localhost:3000/api/activity?platform=' + platform)
      const data = await response.json()
      console.log('LIVE_ACTIVITY: ' + JSON.stringify({ platform, status: response.status, days: data.days?.length, total: data.total, error: data.error }))
    }
  } finally {
    if (browser) await browser.close()
    server.kill()
  }
}
main().catch(error => { console.error(error); process.exitCode = 1 })
