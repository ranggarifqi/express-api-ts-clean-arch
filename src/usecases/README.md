# Use Cases

Use case is a layer that resides between Controller layer, and Domain layer (Entities)

The rule here is, you cannot use any external implementation in here.

For example:

* If you want to send an email, you cannot call any email function that resides in lib folder. That would break the rules of Clean Architecture's dependency rule.
The only way we can do this, we create a domain level interface first (in domain folder). And then use that domain level interface in our usecase classes' as attribute.

* If you want to use any DB repository, you cannot call it here directly. Because DB Repository is on the upper layer. So, you need to do the same thing. Create a domain level interface first. And use that interface in our usecase classes. 
Please see userUsecase.ts, and ./routes/v1/users/index.ts file.