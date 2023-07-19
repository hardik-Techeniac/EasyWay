export interface UserType {
    courseTime: "",
    subcourse_id: 0,
    subcourse_description: "",
    subcourse_slug: "",
    chapter_id: 0,
    name: "",
    course_id: 0,
    course_name: "",
    course_description: "",
    course_image: "",
    course_slug: "",
}

export interface MyCourses
{
    mycourses:UserType[] 
}
// ------------------------------
export interface ChaptersObj
{
    course: course1
    chapters:chapter[]  
}
export interface course1
{
    id: 0,
    name: "",
    description:"",
    slug: "",
    image:"",
    status: "",
}
export interface chapterResponse
{
    chapter:chapter
}
export interface chapter
{
    id: 0,
    name: "",
    course_id: 0,
    subcourse_id: 0,
    description: "",
    slug: "",
    status: "",
    created_at: "",
    updated_at: "",
    contents:content[]
    indexx?:0
}

export interface content
{
    id: 0,
    title: "",
    course_id: 0,
    subcourse_id: 0,
    chapter_id: 0,
    content_type: "",
    content_path: "",
    file_name:"",   
    type:"",
    status:"",
    created_at: "",
    updated_at: ""
}

export interface CurrentUserType
{
    id?: 0,
    name?: "",
    email?: "",
    contactno?: 0,
    user_type?: "",
    status?: "",
}
