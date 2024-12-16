import { SubmitHandler, useForm } from 'react-hook-form';
import Dialog from './UI/Dialog';
import { useEffect } from 'react';
import { userLogin, userRegister } from '@/service/api/user';
import useToggle from '@/Hooks/state/useToggle';
import { showMessage } from './MessageManager';
import FormError from './UI/Error';
interface IFormSubmit {
    name: string;
    password: string;
    email: string;
}
type TFormType = 'login' | 'register';
function Login({ visible, setVisible }: { visible: boolean; setVisible: (visible: boolean) => void }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<IFormSubmit>();
    const [type, { toggle }] = useToggle<TFormType>('login', 'register');
    const onSubmit: SubmitHandler<IFormSubmit> = async (data: IFormSubmit) => {
        try {
            console.log(data);
            if (type === 'login') {
                await userLogin(data);
                setVisible(false);
                showMessage({ type: 'success', message: '登录成功' });
            } else {
                await userRegister(data);
                showMessage({ type: 'success', message: '注册成功, 请登录' });
                reset();
                toggle();
            }
        } catch (error) {
            console.error(error);
        }
    };
    const loginConfig = [
        {
            key: 'email',
            type: 'email',
            config: {
                required: '请输入邮箱',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '请输入正确的邮箱'
                }
            }
        },
        {
            key: 'password',
            type: 'password',
            config: {
                required: '请输入密码'
            }
        }
    ];
    const registerConfig = [
        {
            key: 'name',
            type: 'text',
            config: {
                required: '请输入用户名'
            }
        },
        {
            key: 'email',
            type: 'email',
            config: {
                required: '请输入邮箱'
            }
        },
        {
            key: 'password',
            type: 'password',
            config: {
                required: '请输入密码'
            }
        }
    ];
    const formElement = type === 'login' ? loginConfig : registerConfig;
    useEffect(() => {
        if (!visible) {
            reset();
            if (!localStorage.getItem('token')) {
                setVisible(true);
            }
        }
    }, [visible, reset, setVisible]);
    return (
        <>
            <Dialog visible={visible} setVisible={setVisible}>
                <h3 className="mb-2 text-2xl font-bold text-invert duration-500 hover:text-main">{type === 'login' ? '登录' : '注册'}</h3>
                <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
                    {formElement.map(item => (
                        <div className="" key={item.key}>
                            <input
                                className="placeholder-muted w-full rounded-md border px-2 py-4 text-highlight outline-none focus:border-pink-400 focus:shadow-lg"
                                type={item.type}
                                placeholder={'请填写' + item.key}
                                {...register(item.key as keyof IFormSubmit, item.config)}
                            />
                            <FormError errorMessage={errors[item.key as keyof IFormSubmit]?.message} />
                        </div>
                    ))}
                    <div className="text-end">
                        <span
                            onClick={toggle}
                            className="ml-4 cursor-pointer text-sm font-medium underline underline-offset-1 duration-300 hover:text-red-500">
                            {type === 'login' ? '注册' : '登录'}点击这里
                        </span>
                    </div>
                    <div className="text-end">
                        <button type="submit" className="btn glass relative top-5 mr-5 rounded-full px-6 text-lg hover:scale-105" disabled={isSubmitting}>
                            {isSubmitting ? <span className="loading loading-spinner"></span> : '确定'}
                        </button>
                    </div>
                </form>
            </Dialog>
        </>
    );
}

export default Login;
