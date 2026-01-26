# Copilot Instructions: UI Automation Hotel Showcase

## Project Overview
This is a **Playwright-based E2E test automation framework** for a hotel booking application (https://automationintesting.online/). The project demonstrates professional automation practices with extensible architecture.

## Architecture & Key Patterns

### Page Object Model (POM)
- **Location**: `pages/` directory
- **Pattern**: Each page has a dedicated class (e.g., `HomePage`, `BookNow`)
- **Structure**: Constructor accepts `Page` object, locators defined as class properties, interaction methods encapsulate Playwright calls
- **Example**: `BookNow` class in [pages/bookNow.ts](pages/bookNow.ts) defines selectors (`.btn.btn-primary`, `.react-datepicker__input-container input`) as readonly properties, methods like `clickOnBookNowButton()` handle interactions and assertions

### Locator Strategy
- **Primary**: CSS selectors for general buttons/inputs (`.btn.btn-primary.btn-lg`)
- **Alternative**: `getByRole()` for semantic elements (`getByRole('link', {name: /book now/i})`)
- **Date inputs**: Use `nth()` to target specific inputs from collection (CheckIn=0, CheckOut=1)
- **Pattern**: Always chain `.toBeVisible()` assertions before interactions

### Test Structure
- **Location**: `tests/bookinghotel.spec.ts`
- **Pattern**: `test.describe()` for test suites, `test.beforeEach()` for setup
- **Instance creation**: Page objects instantiated fresh in beforeEach with page fixture
- **Flow**: Navigate → Interact → Verify (e.g., clickBookNowButton → fillDates → checkAvailability → confirmBooking)

## Developer Workflows

### Running Tests
```bash
npm test                    # Run all tests (not configured in scripts yet)
npx playwright test         # Direct command to run all tests
npx playwright test --debug # Debug mode with Playwright Inspector
npx playwright test --headed # View browser during test execution
```

### Test Configuration
- **Config file**: `playwright.config.ts`
- **Test directory**: `./tests`
- **Parallelization**: Enabled by default (`fullyParallel: true`)
- **CI adjustments**: Retries disabled locally, 2 retries on CI; workers=1 on CI
- **Reporter**: HTML reports generated in `playwright-report/`
- **Trace collection**: Enabled on first retry only (`trace: 'on-first-retry'`)

### Multi-Browser Testing
- Active browsers: Chromium, Firefox, WebKit
- Disabled: Mobile viewports and branded browsers (commented in config)
- Each test runs against all 3 browsers automatically

## Code Conventions & Common Patterns

### Async/Await Pattern
- All interaction methods are `async` with `await` calls
- Example: `await this.bookNow.click()` not `this.bookNow.click().then(...)`

### Visibility Assertions
- **Enforce**: Every interaction precedes with visibility check
- **Pattern**: `await expect(locator).toBeVisible()` before `.click()` or `.fill()`
- **Prevents**: Flaky tests from interacting with hidden elements

### Method Naming
- User actions: `clickOnBookNowButton()`, `fillBookingDate()`
- Sequential setup: Methods chain logically in test execution order
- Descriptive: Avoid generic names like `click()` or `fill()`

### Locator Selection Priority
1. Accessible queries: `getByRole()` with accessible names
2. CSS selectors: For standardized button/input classes
3. Multiple elements: Use `.nth()` for ordered collections (not index-based fragile selectors)

## Integration & Dependencies

### External Target
- **Application**: https://automationintesting.online/
- **Type**: Third-party SaaS hotel booking system
- **No baseURL set**: Navigation uses full URLs (enables cross-environment flexibility)

### Dependencies
- `@playwright/test@^1.57.0` - Core testing framework
- `@types/node@^25.0.10` - TypeScript support

### Cross-File Communication
- **Test → Page Objects**: Tests import and instantiate page classes
- **Page Objects → Playwright**: Encapsulate all `Page` interactions
- **No direct selectors in tests**: All locators live in page object classes

## Extension Points & Adding Tests

### New Test Files
1. Create `tests/newFeature.spec.ts`
2. Import relevant page objects: `import { HomePage } from '../pages/homePage'`
3. Follow suite → beforeEach → test structure
4. Instantiate page objects in beforeEach with page fixture

### New Page Objects
1. Create `pages/newPage.ts` exporting a class
2. Accept `Page` in constructor
3. Define locators as `readonly` class properties
4. Write `async` methods for user interactions with assertions
5. Example to follow: [pages/bookNow.ts](pages/bookNow.ts) (see `.react-datepicker__input-container input` + `.nth()` pattern)

### Adding New Interactions
- Maintain consistency: `async methodName() { await expect(...).toBeVisible(); await this.locator.action(); }`
- Use meaningful selector names in comments if CSS class is cryptic

## Known Issues & Debugging

### Flakiness Causes
- Missing `.scrollIntoViewIfNeeded()` for off-screen elements (see `fillBookingDate()`)
- Skipping visibility checks before interaction
- Hard-coded date values without dynamic input (see `fill('24/01/2026')`)

### Debugging Commands
- `--debug` flag: Step through with Playwright Inspector
- `console.log()` for element counts: e.g., `console.log('book now count:', await this.selectRoom.count())`
- Trace viewer: Review `playwright-report/` → trace files on failure
