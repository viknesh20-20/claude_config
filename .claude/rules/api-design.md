# API Design Rules

## Endpoints
- Use plural nouns for resource names: `/users`, `/orders`, `/products`
- Use kebab-case for multi-word paths: `/user-profiles`, `/order-items`
- Use HTTP verbs for actions: GET (read), POST (create), PUT (replace), PATCH (update), DELETE (remove)
- Nest resources for relationships: `/users/:id/orders`
- Version the API: `/api/v1/`
- Maximum nesting depth: 2 levels (`/users/:id/orders` not `/users/:id/orders/:id/items/:id`)

## HTTP Status Codes
- `200` OK — successful GET, PUT, PATCH
- `201` Created — successful POST
- `204` No Content — successful DELETE
- `400` Bad Request — malformed request or validation error
- `401` Unauthorized — missing or invalid authentication
- `403` Forbidden — authenticated but insufficient permissions
- `404` Not Found — resource does not exist
- `409` Conflict — state conflict (duplicate, version mismatch)
- `422` Unprocessable Entity — valid syntax but semantic errors
- `429` Too Many Requests — rate limited
- `500` Internal Server Error — unexpected server failure

## Pagination
- Use cursor-based pagination for large datasets: `?cursor=abc&limit=20`
- Use offset pagination for simple cases: `?page=2&per_page=20`
- Always return pagination metadata: `total`, `next_cursor`, `has_more`
- Default page size: 20, maximum: 100

## Filtering & Sorting
- Filter with query parameters: `?status=active&role=admin`
- Sort with: `?sort=created_at&order=desc`
- Support multiple sort fields: `?sort=status,-created_at`

## Error Format
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Human-readable description", "details": [] } }
```

## General
- Be consistent — every endpoint follows the same patterns
- Design for the consumer, not the database schema
- Use JSON for request and response bodies
- Include rate limit headers: `X-RateLimit-Limit`, `X-RateLimit-Remaining`
- Support CORS appropriately for the intended consumers
