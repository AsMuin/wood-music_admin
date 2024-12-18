import { assets } from '@/assets/assets';
import { showMessage } from '@/component/MessageManager';
import Form, { FormConfig } from '@/component/UI/Form';
import { addAlbum } from '@/service/api/album';

interface AddAlbumParams {
    bgColor: string;
    desc: string;
    name: string;
    image: File;
}
function AddAlbum() {
    const formConfig: FormConfig = {
        upload: [
            {
                key: 'image',
                label: '上传图片',
                uploadAccept: 'image/*',
                uploadBGImage: assets.upload_area,
                options: {
                    required: '请上传图片'
                }
            }
        ],
        input: [
            {
                key: 'bgColor',
                label: '专辑背景颜色',
                placeholder: '请输入专辑颜色',
                type: 'text',
                options: {
                    required: '请输入专辑颜色'
                }
            },
            {
                key: 'name',
                label: '专辑名称',
                placeholder: '请输入专辑名称',
                type: 'text',
                options: {
                    required: '请输入专辑名称'
                }
            },
            {
                key: 'desc',
                label: '专辑描述',
                placeholder: '请输入专辑描述',
                type: 'text',
                options: {
                    required: '请输入专辑描述'
                }
            }
        ]
    };
    async function onSubmit(data: AddAlbumParams, reset: () => void) {
        try {
            console.log(data);
            await addAlbum(data);
            showMessage({
                type: 'success',
                message: '添加成功'
            });
            reset();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.UploadFieldList fieldConfigList={formConfig.upload} />
            <Form.FieldList fieldConfigList={formConfig.input} />
            <Form.SubmitButton defaultText="提交" loadingText="处理中" />
        </Form>
    );
}

export default AddAlbum;
