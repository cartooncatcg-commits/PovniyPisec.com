openapi: 3.1.0
info:
  # Do not change the title, if the title changes, the import paths will be broken
  title: Api
  version: 0.1.0
  description: API specification
servers:
  - url: /api
    description: Base API path
tags:
  - name: health
    description: Health operations
  - name: notifications
    description: Push notification subscriptions
  - name: posts
    description: Admin-managed posts (акції, знижки, новини)
  - name: storage
    description: Object storage uploads
paths:
  /posts:
    get:
      operationId: listPosts
      tags: [posts]
      summary: List all active (non-expired) posts
      responses:
        "200":
          description: List of posts
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: "#/components/schemas/Post"
    post:
      operationId: createPost
      tags: [posts]
      summary: Create a new post (admin only)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PostInput"
      responses:
        "201":
          description: Created
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Post"
        "401":
          description: Unauthorized
        "403":
          description: Forbidden
  /posts/{id}:
    delete:
      operationId: deletePost
      tags: [posts]
      summary: Delete a post (admin only)
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        "204":
          description: Deleted
        "401":
          description: Unauthorized
        "403":
          description: Forbidden
        "404":
          description: Not found
  /storage/uploads/request-url:
    post:
      operationId: requestUploadUrl
      tags: [storage]
      summary: Request a presigned upload URL (admin only)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/UploadUrlRequest"
      responses:
        "200":
          description: Presigned upload URL
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/UploadUrlResponse"
  /notifications/vapid-public-key:
    get:
      operationId: getVapidPublicKey
      tags: [notifications]
      summary: Get the VAPID public key
      description: Returns the public key clients need to subscribe to push notifications
      responses:
        "200":
          description: VAPID public key
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/VapidPublicKey"
  /notifications/subscribe:
    post:
      operationId: subscribeToNotifications
      tags: [notifications]
      summary: Subscribe to push notifications
      description: Registers a browser push subscription so the server can send it notifications
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PushSubscriptionInput"
      responses:
        "201":
          description: Subscribed
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PushSubscription"
  /healthz:
    get:
      operationId: healthCheck
      tags: [health]
      summary: Health check
      description: Returns server health status
      responses:
        "200":
          description: Healthy
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/HealthStatus"
components:
  schemas:
    HealthStatus:
      type: object
      properties:
        status:
          type: string
      required:
        - status
    VapidPublicKey:
      type: object
      properties:
        publicKey:
          type: string
      required:
        - publicKey
    PushSubscriptionKeys:
      type: object
      properties:
        p256dh:
          type: string
        auth:
          type: string
      required:
        - p256dh
        - auth
    PushSubscriptionInput:
      type: object
      properties:
        endpoint:
          type: string
        keys:
          $ref: "#/components/schemas/PushSubscriptionKeys"
      required:
        - endpoint
        - keys
    PushSubscription:
      type: object
      properties:
        id:
          type: integer
        endpoint:
          type: string
      required:
        - id
        - endpoint
    PostCategory:
      type: string
      enum: [akcii, znyzhky, novyny]
    Post:
      type: object
      properties:
        id:
          type: integer
        category:
          $ref: "#/components/schemas/PostCategory"
        title:
          type: string
        price:
          type: string
        imageUrl:
          type: ["string", "null"]
        createdAt:
          type: string
          format: date-time
        expiresAt:
          type: string
          format: date-time
      required:
        - id
        - category
        - title
        - price
        - imageUrl
        - createdAt
        - expiresAt
    PostInput:
      type: object
      properties:
        category:
          $ref: "#/components/schemas/PostCategory"
        title:
          type: string
          minLength: 1
        price:
          type: string
          minLength: 1
        imageUrl:
          type: ["string", "null"]
        expiresAt:
          type: string
          format: date-time
      required:
        - category
        - title
        - price
        - expiresAt
    UploadUrlRequest:
      type: object
      required: [name, size, contentType]
      properties:
        name:
          type: string
          minLength: 1
        size:
          type: integer
          minimum: 1
        contentType:
          type: string
          minLength: 1
    UploadUrlResponse:
      type: object
      required: [uploadURL, objectPath]
      properties:
        uploadURL:
          type: string
        objectPath:
          type: string
        metadata:
          $ref: "#/components/schemas/UploadUrlRequest"

