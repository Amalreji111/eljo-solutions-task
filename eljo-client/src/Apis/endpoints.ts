
export enum  Slug {
    /**
     * Represents the login route.
     */
    USER = "/user",
    EMPLOYEE = "/employee",
    LOGIN = `${Slug.USER}/login`,
    REGISTER_EMPLOYEE = `${Slug.USER}/register-employee`,
    UPDATE_EMPLOYEE = `${Slug.EMPLOYEE}/update`,
    LIST_EMPLOYEE = `${Slug.EMPLOYEE}/list`,
    DETAIL_EMPLOYEE = `${Slug.EMPLOYEE}/detail`

  }