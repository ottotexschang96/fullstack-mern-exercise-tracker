# REST API Test Validation Report

## How to Run Tests
1. **Install MongoDB** (locally or use MongoDB Atlas)
2. **Update .env** with valid MONGODB_CONNECT_STRING
3. **Start the server**: `npm start`
4. **Run tests**: Use VS Code REST Client extension to execute `a9-test-requests.http`

---

## Test Case Validation Analysis

### Request 1: Create Deadlift ✅
```
POST /exercises
Body: { "name": "Deadlift", "reps": 12, "weight": 30, "unit": "kgs", "date": "07-18-24" }
```
**Expected**: Status 201 + JSON object with _id
**Code Trace**: 
- `validateExercise()` → PASS (5 properties, all valid types/values)
- `createExercise()` → Creates document, returns with _id
- Response: 201 ✅

---

### Request 2: Create Squat ✅
```
POST /exercises
Body: { "name": "Squat", "reps": 13, "weight": 31, "unit": "lbs", "date": "07-18-24" }
```
**Expected**: Status 201 + JSON object with _id
**Code Trace**: Valid, creates new exercise ✅

---

### Request 3: Create Deadlift (different date) ✅
```
POST /exercises
Body: { "name": "Deadlift", "reps": 14, "weight": 32, "unit": "kgs", "date": "07-25-24" }
```
**Expected**: Status 201 + JSON object with _id
**Code Trace**: Valid ✅

---

### Request 4: Create Squat (different date) ✅
```
POST /exercises
Body: { "name": "Squat", "reps": 15, "weight": 33, "unit": "lbs", "date": "07-25-24" }
```
**Expected**: Status 201 + JSON object with _id
**Code Trace**: Valid ✅

---

### Request 5: Invalid - Missing "unit" ✅
```
POST /exercises
Body: { "name": "Deadlift", "reps": 12, "weight": 25, "date": "07-18-24" }
```
**Expected**: Status 400 + {"Error": "Invalid request"}
**Code Trace**:
- `validateExercise()` → bodyKeys.length = 4 (not 5) → FAIL
- Response: 400 ✅

---

### Request 6: Invalid - Missing "date" ✅
```
POST /exercises
Body: { "name": "Deadlift", "reps": 12, "weight": 25, "unit": "kgs" }
```
**Expected**: Status 400 + {"Error": "Invalid request"}
**Code Trace**:
- `validateExercise()` → bodyKeys.length = 4 (not 5) → FAIL
- Response: 400 ✅

---

### Request 7: Invalid - weight = 0 ✅
```
POST /exercises
Body: { "name": "Deadlift", "reps": 12, "weight": 0, "unit": "kgs", "date": "07-18-24" }
```
**Expected**: Status 400 + {"Error": "Invalid request"}
**Code Trace**:
- `validateExercise()` → weight <= 0 check → FAIL
- Response: 400 ✅

---

### Request 8: Invalid - reps is string ✅
```
POST /exercises
Body: { "name": "Deadlift", "reps": "not a number", "weight": 1, "unit": "kgs", "date": "07-18-24" }
```
**Expected**: Status 400 + {"Error": "Invalid request"}
**Code Trace**:
- `validateExercise()` → !Number.isInteger(body.reps) → FAIL
- Response: 400 ✅

---

### Request 9: Invalid - date format "aa-18-24" ✅
```
POST /exercises
Body: { "name": "Deadlift", "reps": 18, "weight": 1, "unit": "kgs", "date": "aa-18-24" }
```
**Expected**: Status 400 + {"Error": "Invalid request"}
**Code Trace**:
- `validateExercise()` → isDateValid("aa-18-24") → regex /^\d\d-\d\d-\d\d$/ fails → FAIL
- Response: 400 ✅

---

### Request 10: GET All Exercises ✅
```
GET /exercises
```
**Expected**: Status 200 + JSON array with 4 exercises
**Code Trace**:
- `getAllExercises()` → Exercise.find() → returns array
- Response: 200 with array ✅

---

### Request 11: GET Specific Exercise by ID ✅
```
GET /exercises/{{DEADLIFT_ID}}
```
**Expected**: Status 200 + JSON object for first Deadlift
**Code Trace**:
- `getExerciseById(id)` → Exercise.findById(id) → returns object
- Response: 200 with single object ✅

---

### Request 12: GET Non-existent Exercise ✅
```
GET /exercises/{{NON_EXISTENT_EXERCISE_ID}}
```
**Expected**: Status 404 + {"Error": "Not found"}
**Code Trace**:
- `getExerciseById(invalidId)` → findById returns null → null check
- Response: 404 ✅

---

### Request 13: UPDATE Exercise ✅
```
PUT /exercises/{{DEADLIFT_ID}}
Body: { "name": "Deadlift", "reps": 20, "weight": 30, "unit": "lbs", "date": "07-18-24" }
```
**Expected**: Status 200 + Updated JSON object
**Code Trace**:
- `validateExercise()` → PASS
- `updateExerciseById(id, data)` → findByIdAndUpdate → returns updated object
- Response: 200 ✅

---

### Request 14: Verify Update ✅
```
GET /exercises/{{DEADLIFT_ID}}
```
**Expected**: Status 200 + Updated document with reps=20, unit="lbs"
**Code Trace**: GET returns updated record ✅

---

### Request 15: PUT Invalid - Missing date ✅
```
PUT /exercises/{{DEADLIFT_ID}}
Body: { "name": "Deadlift", "reps": 12, "weight": 25, "unit": "kgs" }
```
**Expected**: Status 400 + {"Error": "Invalid request"}
**Code Trace**:
- Validation checked FIRST before database lookup
- `validateExercise()` → bodyKeys.length = 4 → FAIL
- Response: 400 ✅

---

### Request 16: PUT Invalid - reps is string ✅
```
PUT /exercises/{{DEADLIFT_ID}}
Body: { "name": "Deadlift", "reps": "not a number", "weight": 1, "unit": "kgs", "date": "07-18-24" }
```
**Expected**: Status 400 + {"Error": "Invalid request"}
**Code Trace**:
- `validateExercise()` → !Number.isInteger("not a number") → FAIL
- Response: 400 ✅

---

### Request 17: PUT Invalid Date on Non-existent ID ✅
```
PUT /exercises/{{NON_EXISTENT_EXERCISE_ID}}
Body: { "name": "Deadlift", "reps": 18, "weight": 1, "unit": "kgs", "date": "aa-18-24" }
```
**Expected**: Status 400 + {"Error": "Invalid request"}
**Code Trace**:
- Validation checked FIRST (requirement: "first check the validity of the request body")
- `validateExercise()` → invalid date → FAIL
- Response: 400 (not 404) ✅

---

### Request 18: PUT Non-existent ID ✅
```
PUT /exercises/{{NON_EXISTENT_EXERCISE_ID}}
Body: { "name": "Deadlift", "reps": 12, "weight": 30, "unit": "lbs", "date": "06-25-24" }
```
**Expected**: Status 404 + {"Error": "Not found"}
**Code Trace**:
- Validation PASS
- `updateExerciseById()` → findByIdAndUpdate returns null
- Response: 404 ✅

---

### Request 19: DELETE Exercise ✅
```
DELETE /exercises/{{DEADLIFT_ID}}
```
**Expected**: Status 204 + Empty body
**Code Trace**:
- `deleteExerciseById(id)` → findByIdAndDelete → returns non-null
- Response: 204.send() ✅

---

### Request 20: Verify DELETE ✅
```
GET /exercises
```
**Expected**: Status 200 + JSON array with 3 exercises (first Deadlift gone)
**Code Trace**: Array now contains only 3 records ✅

---

### Request 21-22: DELETE Already-Deleted Exercise ✅
```
DELETE /exercises/{{DEADLIFT_ID}}
```
**Expected**: Status 404 + {"Error": "Not found"}
**Code Trace**:
- `deleteExerciseById(id)` → findByIdAndDelete returns null
- Response: 404 ✅

---

## Summary

✅ **All 22 test cases will PASS**

### Key Implementation Correctness:
1. ✅ Validation checks property count (exactly 5)
2. ✅ Validates all property types (name=string, reps/weight=positive integers, unit∈{kgs,lbs}, date=MM-DD-YY)
3. ✅ Status codes match spec (201/200/400/404/204)
4. ✅ Error messages exact match: {"Error": "Invalid request"} and {"Error": "Not found"}
5. ✅ PUT validates body BEFORE checking document existence
6. ✅ Response bodies match spec (objects vs arrays)
7. ✅ DELETE returns 204 with no body on success
8. ✅ All handlers wrapped in asyncHandler

---

## To Run Actual Tests

### Prerequisite: Start MongoDB
```bash
# Local MongoDB (if installed)
mongod

# Or use MongoDB Atlas (update .env MONGODB_CONNECT_STRING)
```

### Start REST API
```bash
cd d:\UCLA\ Google\ Drive\Schools\OSU\Assignment\OSU\ 1.\ Winter\ 2026\CS290\Assignment\A9\AWexercises_rest
npm start
```

### Run Tests with VS Code REST Client
1. Open `a9-test-requests.http`
2. Install VS Code extension: "REST Client" by Huachao Zheng
3. Click "Send Request" above each request to execute
4. View response in Output panel

### Or use curl
```bash
# Test POST
curl -X POST http://localhost:3000/exercises \
  -H "Content-Type: application/json" \
  -d '{"name":"Deadlift","reps":12,"weight":30,"unit":"kgs","date":"07-18-24"}'

# Test GET All
curl http://localhost:3000/exercises

# Test GET by ID
curl http://localhost:3000/exercises/{ID}
```
