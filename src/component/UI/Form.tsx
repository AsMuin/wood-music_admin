import { assets } from '@/assets/assets';
import { createContext, ReactNode, useContext } from 'react';
import { DefaultValues, FieldErrors, FieldValues, RegisterOptions, useForm, UseFormRegister } from 'react-hook-form';
import FormError from './Error';

interface FormProps<T> {
    formData?: T;
    onSubmit: (data: T) => void;
}
interface FormContext<T extends FieldValues> {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    isSubmitting: boolean;
    reset: () => void;
}

const FormContext = createContext<FormContext<any>>({
    register: () => ({}) as any,
    reset: () => {},
    isSubmitting: false,
    errors: {}
});

function useFormContext<T extends FieldValues>() {
    const context = useContext(FormContext as React.Context<FormContext<T>>);
    if (!context) {
        throw new Error('useFormContext 必须在 FormContext.Provider 内部使用');
    }
    return context;
}

function Form<T extends FieldValues>({ formData, onSubmit, children }: React.PropsWithChildren<FormProps<T>>) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset
    } = useForm<T>({
        defaultValues: formData as DefaultValues<T>
    });

    const ContextValue: FormContext<T> = {
        register,
        reset,
        isSubmitting,
        errors
    };
    return (
        <FormContext.Provider value={ContextValue}>
            <form className="flex flex-col items-start gap-8 text-gray-600" onSubmit={handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormContext.Provider>
    );
}

export interface UploadFieldProps {
    key: string;
    label: string;
    options?: RegisterOptions;
    uploadAccept?: string;
    uploadBGImage?: string;
}

Form.UploadFieldList = function UploadFieldList({ fieldConfigList }: { fieldConfigList: UploadFieldProps[] }) {
    const { register, errors } = useFormContext();
    return (
        <div className="flex gap-8">
            {/* 文件上传区 */}
            {fieldConfigList.map(fieldItem => (
                <label key={fieldItem.key}>
                    <p className="text-center text-lg">{fieldItem.label}</p>
                    <input type="file" hidden accept={fieldItem.uploadAccept} {...register(fieldItem.key, fieldItem.options)} />
                    <img className="mx-auto w-24 cursor-pointer" src={fieldItem.uploadBGImage || assets.upload_area} alt="" />
                    <FormError errorMessage={errors?.[fieldItem.key]?.message as string} />
                </label>
            ))}
        </div>
    );
};

export interface FieldProps {
    key: string;
    label: string;
    placeholder?: string;
    type?: string;
    options?: RegisterOptions;
    choices?: { label: string; value: string }[];
}

Form.FieldList = function FieldList({ fieldConfigList }: { fieldConfigList: FieldProps[] }) {
    const { register, errors } = useFormContext();
    return (
        <>
            {fieldConfigList.map(fieldItem => (
                <div key={fieldItem.key} className="flex flex-col gap-2.5">
                    <label>
                        <p className="">{fieldItem.label}</p>
                        {/*  输入框 */}
                        {(fieldItem.type === 'text' || fieldItem.type === 'password' || fieldItem.type === 'email') && (
                            <input
                                className="w-[max(40vw,250px)] rounded-sm border-2 border-gray-400 bg-transparent p-2.5 focus:outline-none"
                                placeholder={fieldItem.placeholder || ''}
                                type={fieldItem.type || 'text'}
                                {...register(fieldItem.key, fieldItem.options)}
                            />
                        )}
                        {
                            // 下拉框
                            fieldItem.type === 'select' && (
                                <select
                                    className="w-[max(10vw,250px)] rounded-sm border-2 border-gray-400 bg-transparent p-2.5 focus:outline-none"
                                    {...register(fieldItem.key, fieldItem.options)}>
                                    {fieldItem.choices?.map((choice: any) => (
                                        <option key={choice.value} value={choice.value}>
                                            {choice.label}
                                        </option>
                                    ))}
                                </select>
                            )
                        }
                        <FormError errorMessage={errors?.[fieldItem.key]?.message as string} />
                    </label>
                </div>
            ))}
        </>
    );
};

Form.SubmitButton = function SubmitButton({ text, children }: { children?: ReactNode; text: string }) {
    const { isSubmitting } = useFormContext();
    if (children) {
        return children;
    }
    return (
        <button type="submit" className="btn glass min-w-20 bg-green-600 text-xl text-orange-200 hover:text-orange-500" disabled={isSubmitting}>
            {isSubmitting ? (
                <>
                    <span className="loading loading-spinner loading-md"></span>
                    <span>处理中...</span>
                </>
            ) : (
                text
            )}
        </button>
    );
};
export default Form;
