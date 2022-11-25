export class UserRegister {
    empId: string;
    firstName: string;
    lastName: string;
    email: string;
    jobTitle: string;
    experience: string;
    teamName: string;
    location: string;
    gender?: string;
    profilePic?: string;
    techStack: any;
}

export class UserRegisterResponse {
    response: UserRegister[];
    sucess: boolean;
}