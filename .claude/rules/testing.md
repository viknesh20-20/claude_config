# Testing Rules

## Coverage
- Aim for >80% line coverage on business logic
- 100% coverage on critical paths (auth, payments, data mutations)
- Coverage is a guide, not a goal — meaningful tests over high numbers

## Test Structure
- Follow Arrange-Act-Assert (Given-When-Then) pattern
- One assertion concept per test — multiple asserts OK if testing one thing
- Use `describe`/`context` blocks to group related scenarios
- Use `beforeEach`/`setUp` for shared setup — `afterEach`/`tearDown` for cleanup

## Naming
- Test names are full English sentences describing the scenario
- Format: "should [expected behavior] when [condition]"
- Examples: "should return null when user is not found", "should throw ValidationError when email is invalid"

## What to Test
- Happy path — standard successful flow
- Edge cases — empty input, boundary values, zero, null, max length
- Error paths — invalid input, missing resources, network failures, timeouts
- Async behavior — promise resolution/rejection, concurrent operations
- State transitions — before and after side effects

## Mocking
- Mock at module boundaries (network, filesystem, database, external APIs)
- Never mock the unit under test
- Verify mock calls — correct arguments, call count
- Reset mocks between tests — no shared mutable state
- Prefer dependency injection over module-level mocking when possible

## Quality
- Tests must be deterministic — no random data, no time-dependent assertions
- Tests must be independent — run in any order, no shared state
- Tests must be fast — mock I/O, avoid sleep/delay
- Delete tests that no longer test real behavior — stale tests are worse than no tests
- Follow the same code quality standards in test code as production code
