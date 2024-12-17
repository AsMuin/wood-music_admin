import { assets } from '@/assets/assets';
import { createContext, useContext, useRef } from 'react';
import { DefaultValues, FieldErrors, FieldValues, RegisterOptions, useForm, UseFormRegister } from 'react-hook-form';
import FormError from './Error';
import StatusButton from './StatusButton';

interface FormProps<T> {
    formData?: T;
    onSubmit: (data: T, reset: (data?: T) => void) => void;
}
interface FormContext<T extends FieldValues> {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    isSubmitting: boolean;
    reset: (data: T) => void;
}

export interface FormConfig {
    upload: UploadFieldProps[];
    input: FieldProps[];
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
            <form className="flex flex-col items-start gap-8 text-gray-600" onSubmit={handleSubmit(data => onSubmit(data, reset))}>
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
    return (
        <div className="flex gap-8">
            {/* 文件上传区 */}
            {fieldConfigList.map(fieldItem => (
                <FormUploadItem key={fieldItem.key} fieldConfig={fieldItem} />
            ))}
        </div>
    );
};

function FormUploadItem({ fieldConfig }: { fieldConfig: UploadFieldProps }) {
    const { register, errors } = useFormContext();
    const imgEleRef = useRef<HTMLImageElement | null>(null);

    function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        const originalImage = imgEleRef.current?.src || assets.upload_area;
        if (file) {
            const reader = new FileReader();
            reader.onload = event => {
                if (event.target?.result && typeof event.target.result === 'string') {
                    const img = imgEleRef.current;
                    if (img) {
                        const fileType = file.type;
                        if (fileType.startsWith('image/')) {
                            img.src = (event.target.result as string) || assets.upload_added;
                        } else {
                            img.src = assets.upload_added;
                        }
                    }
                }
            };
            reader.readAsDataURL(file);
        } else {
            const img = imgEleRef.current;
            if (img) {
                img.src = originalImage;
            }
        }
    }
    return (
        <label key={fieldConfig.key}>
            <p className="text-center text-lg">{fieldConfig.label}</p>
            <input
                type="file"
                hidden
                accept={fieldConfig.uploadAccept}
                {...register(fieldConfig.key, { ...fieldConfig.options, onChange: onFileChange })}
            />
            <img ref={imgEleRef} className="mx-auto max-h-24 w-24 cursor-pointer" src={fieldConfig.uploadBGImage || assets.upload_area} alt="" />
            <FormError errorMessage={errors?.[fieldConfig.key]?.message as string} />
        </label>
    );
}

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

interface FormSubmitButtonProps {
    defaultText?: string;
    loadingText?: string;
}
Form.SubmitButton = function SubmitButton({ defaultText, children, loadingText }: React.PropsWithChildren<FormSubmitButtonProps>) {
    const { isSubmitting } = useFormContext();
    if (children) {
        return children;
    }
    return (
        <StatusButton
            type="submit"
            className="glass min-w-20 bg-green-600 text-xl text-orange-200 hover:text-orange-500"
            disabled={isSubmitting}
            loadingText={loadingText || '处理中'}
            defaultText={defaultText || '确定'}
            status={isSubmitting ? 'loading' : 'default'}
        />
    );
};
export default Form;
