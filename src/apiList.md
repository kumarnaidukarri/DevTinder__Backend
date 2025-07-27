#DevTinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- Post /request/review/accepted/:requestId
- Post /request/review/rejected/:requestId

## userRouter:
- GET /users/connections
- GET /users/requests/received
- GET /users/feed - Gets you the profiles of other users on platform

connection status: ignore(pass), interested(like), accepted, rejected
