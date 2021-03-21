# Rangga's Staffany Take Home Test

## Stacks
- Framework: Hapi JS
- ORM: TypeORM
- DB: PostgreSQL

## How to Install
0. Clone this repo
1. `cd <cloned_dir>`
2. `npm i`
3. `cp env.example .env`
4. fill your .env settings with these
```
PORT="3000"

DB_HOST="localhost"
DB_PORT="5432"
DB_USERNAME="<your postgres username>"
DB_PASSWORD="<your postgres password>"
DB_NAME="staffany_shift_rangga"

JWT_SECRET="staffanyranggatest"
```
5. Create a PostgreSQL database with name that you specifies in .env (which is, **staffany_shift_rangga**)
6. `npm run dev` -> running this first time will generate the tables
7. `Ctrl + c` -> Terminate current running server
8. `npm run migrate` -> to execute seed user & role data
9. `npm run dev` -> run the server again

## How to run
1. `npm run dev`
2. `npm run test`

## Basic Requirement Checklist
- [x] User should be able to see a list of shifts
- [x] User should be able to see the name, date, start time, end time of each shift
- [x] User should be able to create & update shifts via form
- [x] User should be able to delete shifts

## Advance Requirements: Backend Focus
- [x] User should not be able to create or edit a shift such that is clashing with an existing shift
- [x] User should be able to "publish" an entire week's worth of shifts at a time
- [x] User should not be able to edit or delete a shift after it's been "published"
- [x] User should not be able to create shifts in a "week" that is "published"
- [x] Write tests (still not 100% coverage yet)

## Bonus
- [x] JWT Authentication
- [x] Swagger Documentation (access at http://localhost:3000/documentation)
- [x] Database migration & seeder
- [x] JOI Validation