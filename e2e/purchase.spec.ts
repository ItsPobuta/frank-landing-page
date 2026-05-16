import { expect, test } from '@playwright/test'

test.describe('Care Navigator purchase flow', () => {
  test('purchase button redirects to Stripe Checkout', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /purchase the navigator/i }).first().click()
    await page.waitForURL(/checkout\.stripe\.com/, { timeout: 10000 })
    expect(page.url()).toContain('checkout.stripe.com')
  })

  test('success page renders confirmation message', async ({ page }) => {
    await page.goto('/success?session_id=cs_test_fake')
    await expect(page.getByText('Thank you for your purchase.')).toBeVisible()
    await expect(page.getByText('Return to Frank')).toBeVisible()
  })
})

test.describe('Contact form validation', () => {
  test('shows errors when submitting empty board form', async ({ page }) => {
    await page.goto('/#contact')
    await page.getByRole('button', { name: /governing board/i }).click()
    await page.getByRole('button', { name: /submit/i }).click()
    await expect(page.getByText('Please enter your full name')).toBeVisible()
    await expect(page.getByText('Please enter a valid email address')).toBeVisible()
  })

  test('shows error for invalid email', async ({ page }) => {
    await page.goto('/#contact')
    await page.getByRole('button', { name: /governing board/i }).click()
    await page.getByPlaceholder('Full name').fill('Jane Smith')
    await page.getByPlaceholder('Email address').fill('not-an-email')
    await page.getByRole('button', { name: /submit/i }).click()
    await expect(page.getByText('Please enter a valid email address')).toBeVisible()
  })

  test('formats phone number as user types', async ({ page }) => {
    await page.goto('/#contact')
    await page.getByRole('button', { name: /families/i }).click()
    const phone = page.getByPlaceholder('Phone number')
    await phone.fill('5551234567')
    await expect(phone).toHaveValue('(555) 123-4567')
  })
})
