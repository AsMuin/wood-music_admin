import RequestConstructor from '.';

const BASEURL = '/user';

interface UserLoginParams {
    email: string;
    password: string;
}
const userLogin = RequestConstructor<UserLoginParams>({
    method: 'post',
    url: `${BASEURL}/login`
});

interface UserRegisterParams {
    email: string;
    name: string;
    password: string;
}
const userRegister = RequestConstructor<UserRegisterParams>({
    method: 'post',
    url: `${BASEURL}/register`
});
export { userLogin, userRegister };
