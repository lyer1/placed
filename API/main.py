from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import DuplicateKeyError
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware




#swagger docs https://api-lyart-delta.vercel.app/docs
# [0-9]*@kiit.ac.in

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],
)


uri = "mongodb+srv://lyeriff0:CVuSVLlgsxUEUTqp@placedcluster.ol0el.mongodb.net/?retryWrites=true&w=majority&appName=placedCluster"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client["placedCluster"]
collection = db["companies"] 
question_collection = db["questions"]
users_collection = db["users"]
users_info_collection = db["user-info"]

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


#company schema
class Company(BaseModel):
    id: int = None
    name: str
    icon_url: str
    questions: List[int] = Field(default_factory=list)

class AddQuestions(BaseModel):
    questions: List[int]

class Authen(BaseModel):
    email: str
    password: str

#question schemas
class Question(BaseModel):
    id: Optional[int] = None
    title: str
    content: str
    user_id: int
    type: str
    tags: List[str]


class QuestionResp(BaseModel):
    id: Optional[int] = None
    title: str
    content: str
    user_id: int
    type: str
    tags: List[str]
    user_name: str
    user_profile_pic: str


class UserInfo(BaseModel):
    id: int
    resume: Optional[str]
    github: Optional[str]
    website: Optional[str]
    linkedin: Optional[str]


#schema for user submission form
class QuestionWithCompany(BaseModel):
    user_id: int
    title: str
    content: str
    type: str
    company_name: str
    company_img_url: Optional[str]
    tags: List[str]

#user schemas
class UserCreate(BaseModel):
    id: Optional[int]
    name: str
    email_id: str
    questions: List[int] = []
    profile_pic_url: str
    password:  Optional[str]

class UserResponse(BaseModel):
    id: int
    name: str
    password: Optional[str]
    email_id: str
    questions: List[int]
    profile_pic_url: str

class CompanyResp(BaseModel):
    id: int = None
    name: str
    icon_url: str
    questions: List[int]
    packed_questions: List[QuestionResp]



@app.get("/")
def retuf():
    return "Hi"

@app.post("/companies/", status_code=201)
def create_company(company: Company):
    last_company = collection.find_one(sort=[("id", -1)])
    new_id = (last_company["id"] + 1) if last_company else 1
    company.id = new_id

    try:
        result = collection.insert_one(company.dict())
        return {"message": "Company created successfully", "id": company.id}
    except DuplicateKeyError:
        raise HTTPException(status_code=400, detail="Company with this ID already exists")
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to insert company")

@app.get("/companies/", response_model=List[Company])
def get_companies():
    companies = list(collection.find())
    return companies

@app.get("/companies_with_question/", response_model=List[CompanyResp], status_code=201)
def get_companies():
    companies = list(collection.find())
    questions = get_questions()
    questions = {i["id"]: i for i in questions}
    result = []
    for c in companies:
        ques = c["questions"]
        try:
            c["packed_questions"] = [questions[i] for i in ques]
        except KeyError:
            c["packed_questions"] = []
        result.append(c)
    return result


@app.get("/companies/{company_id}", response_model=Company)
def get_company(company_id: int):
    company = collection.find_one({"id": company_id})
    if company:
        return company
    else:
        raise HTTPException(status_code=404, detail="Company not found")

@app.patch("/companies/{company_id}/questions", status_code=200)
def add_questions(company_id: int, questions: AddQuestions):
    result = collection.update_one(
        {"id": company_id},
        {"$addToSet": {"questions": {"$each": questions.questions}}}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Company not found")
    elif result.modified_count == 0:
        raise HTTPException(status_code=304, detail="No questions added; they may already exist in the list.")
    
    return {"message": "Questions added successfully"}

@app.delete("/companies/{company_id}", status_code=200)
def delete_company(company_id: int):
    result = collection.delete_one({"id": company_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Company not found")
    return {"message": "Company deleted successfully"}

@app.post("/questions/", status_code=201)
def create_question(question: Question):
    last_question = question_collection.find_one(sort=[("id", -1)])
    new_id = (last_question["id"] + 1) if last_question else 1
    question.id = new_id

    try:
        question_collection.insert_one(question.dict())
        return {"message": "Question created successfully", "id": question.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to insert question")

@app.delete("/questions/{question_id}", status_code=200)
def delete_question(question_id: int):
    result = question_collection.delete_one({"id": question_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Question not found")
    return {"message": "Question deleted successfully"}

@app.get("/questions/{question_id}", response_model=Question)
def get_question(question_id: int):
    qustion = question_collection.find_one({"id": question_id})
    if qustion:
        return qustion
    else:
        raise HTTPException(status_code=404, detail="Question not found")

@app.get("/questions/", response_model=List[QuestionResp])
def get_questions():
    questions = list(question_collection.find())
    result = []
    for q in questions:
        user = get_user(q["user_id"])
        packed = {
            "id": q["id"],
            "title": q["title"],
            "content": q["content"],
            "user_id": q["user_id"],
            "type": q["type"],
            "tags": q["tags"],
            "user_name": user.name,
            "user_profile_pic": user.profile_pic_url
        }
        result.append(packed)
    return result

@app.get("/get_tags/", response_model=List[str])
def get_tags():
    questions = list(question_collection.find())
    result = set()
    for q in questions:
        for f in q["tags"]:
            result.add(f)
    return list(result)

@app.post("/users/", response_model=UserResponse, status_code=201)
def create_user(user: UserCreate):
    if not user.id:
        last_user = users_collection.find_one(sort=[("id", -1)])
    else:
        last_user = {"id" : user.id - 1}
    new_user_id = (last_user["id"] + 1) if last_user else 1
    user_document = {
        "id": new_user_id,
        "name": user.name,
        "password": user.password,
        "email_id": user.email_id,
        "questions": user.questions,
        "profile_pic_url": user.profile_pic_url
    }

    try:
        users_collection.insert_one(user_document)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to insert user")

    return UserResponse(**user_document)

@app.get("/users/{user_id}", response_model=UserResponse)
def get_user(user_id: int):
    user = users_collection.find_one({"id": user_id})
    if user is None:
        raise HTTPException(status_code=404, detail=f"User not found id - {user_id}")

    return UserResponse(**user)

@app.delete("/users/{user_id}", status_code=204)
def delete_user(user_id: int):
    result = users_collection.delete_one({"id": user_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="User not found")

    return {"message": "User deleted successfully"}

@app.get("/serve_question", response_model=List[Question])
def serve_question():
    questions = list(question_collection.find())
    return questions

@app.get("/serve_users", response_model=List[UserResponse])
def user_question():
    users = list(users_collection.find())
    return users


@app.post("/questions_with_company/", status_code=201)
def add_question_with_company(question_data: QuestionWithCompany):
    last_question = question_collection.find_one(sort=[("id", -1)])
    new_question_id = (last_question["id"] + 1) if last_question else 1
    question_document = {
        "id": new_question_id,
        "user_id": question_data.user_id,
        "title": question_data.title,
        "type": question_data.type,
        "tags": question_data.tags,
        "content": question_data.content
    }
    
    try:
        question_collection.insert_one(question_document)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to insert question")

    existing_company = collection.find_one({"name": question_data.company_name})

    if existing_company:
        collection.update_one(
            {"name": question_data.company_name},
            {"$addToSet": {"questions": new_question_id}}
        )
    else:
        last_company = collection.find_one(sort=[("id", -1)])
        new_company_id = (last_company["id"] + 1) if last_company else 1
        
        company_document = {
            "id": new_company_id,
            "name": question_data.company_name,
            "icon_url": question_data.company_img_url,
            "questions": [new_question_id]
        }

        try:
            collection.insert_one(company_document)
        except Exception as e:
            raise HTTPException(status_code=500, detail="Failed to insert company")

    user = users_collection.find_one({"id": question_data.user_id})
    if user:
        users_collection.update_one(
            {"id": question_data.user_id},
            {"$addToSet": {"questions": new_question_id}}
        )
    else:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "message": "Question added and company/user updated successfully",
        "question_id": new_question_id,
        "company_name": question_data.company_name
    }

@app.post("/add_user_info/")
def add_user_info(user_info: UserInfo):
    existing_user = users_info_collection.find_one({"id": user_info.id})
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this ID already exists")

    result = users_info_collection.insert_one(user_info.dict())
    
    return {
        "message": "User info added successfully",
        "user_id": str(result.inserted_id),
    }

@app.get("/get_user_info/{user_id}")
def get_user_info(user_id: int):
    user = users_info_collection.find_one({"id": user_id})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    
    return UserInfo(**user)




@app.get("/get_packed_info/{user_id}")
def get_user_info(user_id: int):
    user = users_info_collection.find_one({"id": user_id})
    result = users_collection.find_one({"id": user_id})

    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    res = []
    questions = result["questions"]
    for q in questions:
        curr_ques = get_question(q)
        res.append(curr_ques["title"])

    user["_id"] = str(user["_id"]) 

    return {"info": user, "questions": res}

@app.post("/get_id/", response_model=int)
def get_user_id(userin: Authen):
    user = users_collection.find_one({"email_id": userin.email, "password": userin.password})

    if not user:
        raise HTTPException(status_code=404, detail="Invalid email or password")
    
    return user["id"]