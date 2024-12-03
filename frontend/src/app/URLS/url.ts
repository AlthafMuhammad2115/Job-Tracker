export const BASE_URL="https://job-seeker-backend-x4r7.onrender.com"
// export const BASE_URL="http://localhost:3000"

export const ADMIN_URL=BASE_URL+"/api/company"
export const USER_URL=BASE_URL+"/api/user"
export const JOB_URL=BASE_URL+"/api/job"
export const APPLICATION_URL=BASE_URL+"/api/application"

//jobs
export const CREATE_JOB=JOB_URL+"/create_job_application"
export const LIST_JOB=JOB_URL+"/list_job_application"
export const EDIT_JOB=JOB_URL+"/edit_job_application"
export const DELETE_JOB=JOB_URL+"/delete_job_application"
export const FILTER_JOB=JOB_URL+"/fliter_jobs"

//user
export const USER_LOGIN=USER_URL+"/login"
export const USER_SIGNUP=USER_URL+"/signup"
export const USER_APPLICATION=USER_URL+"/applicant"

//application
export const ADD_APPLICANT=APPLICATION_URL+"/add_applicant"
export const LIST_APPLICANT=APPLICATION_URL+"/list_applicants"
export const UPDATE_APPLICANT_STATUS=APPLICATION_URL+"/update_status"

//admin
export const ADMIN_LOGIN=ADMIN_URL+'/login'
export const ADMIN_SIGNUP=ADMIN_URL+'/signup'
export const ADMIN_JOB_LIST=ADMIN_URL+'/jobs'