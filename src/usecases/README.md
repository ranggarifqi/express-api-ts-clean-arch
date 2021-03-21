# Use Cases

Use case is a layer that resides between Controller layer, and Domain layer (Entities)

It's general scope is to handle business logic.

The rule here is, you cannot use any external implementations.
Basically, external implementations are some services that can or might be changed in the future.

Example of external implementations:

* DB repository, you cannot call it here directly. Because DB Repository is on the upper layer. So, you need to create a domain level interface first. And use that interface in our usecase classes. 
Please see userUsecase.ts, and ./api/routes/v1/users/index.ts file.

* Email Service
* S3 Service
* Firebase
* Twilio
* Payment Gateway
* etc...

If you want to create a helper function, or class that only used in business logic, please create a new folder inside here