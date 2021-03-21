# Use Cases

Use case is a layer that resides between Controller layer, and Domain layer (Entities)

The rule here is, you cannot use any external implementations.
Basically, external implementations are some services that can be changed in the future.

Example of external implementations:

* If you want to use any DB repository, you cannot call it here directly. Because DB Repository is on the upper layer. So, you need to do the same thing. Create a domain level interface first. And use that interface in our usecase classes. 
Please see userUsecase.ts, and ./routes/v1/users/index.ts file.

* Email Service
* S3 Service
* Firebase
* Twilio
* Payment Gateway

If you want to create a helper function, or class that only used in business logic, please create a new folder, and put the functions there.