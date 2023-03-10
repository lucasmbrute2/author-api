# Welcome to Author API

An API that supports an auth application, you can handle Author (users), login up, login out, editting profile, etc. The most important part is upload of files, we are using S3 buckets to storage it, you can list, create and delete them ( we are filtering with a "page" parameter ). Btw this is just 4fun project for a interview.

## [Deployed on Railway](https://interview-production-e06a.up.railway.app/)

This should be a empty page, you should use a client as Insomnia or Postman.

![image](https://user-images.githubusercontent.com/68877260/221585563-b4ea3c2c-c2fe-4724-8122-4bdbb7cc74db.png)


## Routes and Features

<div style="display:block; margin-bottom:1rem;">
These are our routes
<div/>

![image](https://user-images.githubusercontent.com/68877260/221585747-5c0185fb-9924-4dc7-a947-fcef3a711ce3.png)

### Author routes (most importants)


/register

You are able to register an author.
Expected body: 
```  
* name: string
* email: string unique
* password: string
* confirmPassword: string
```  

/auth

You are able to auth your user.

expected body: 
```
* email: string unique
* password: string
```

### Picture routes (most importants)

/upload

You are able to upload an Picture. Should be auth with returned token from auth request ( put it on as Bearer token)

* select Multipartform

expected body:

```
pictures: file
```

/listByID

You are able to list all users from entire app and from your Gallery. It must be fixed later, altough any rlly sensitive data is leaking with that.

![image](https://user-images.githubusercontent.com/68877260/221591159-0218316f-7b08-408b-9bcb-e9c06bf80b99.png)

# Improvements and extensions

* Finish and improve unit tests
* Improve prisma query relations ( maybe author could already return pictures e.g) and save DB calls to increase perfomance
* Implent Cache in GET endpoints
* We must implement a rate limiter and debounce to prevent alot of requests
* Tests E2E would be really good
* Observation -> sentry or any other tool
* Create an admin ROLE 
