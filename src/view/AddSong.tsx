import { assets } from '@/assets/assets';
import { showMessage } from '@/component/MessageManager';
import Form, { FormConfig } from '@/component/UI/Form';
import { IQueryList } from '@/service/api';
import { getAlbumList } from '@/service/api/album';
import { addSong } from '@/service/api/song';
import { useEffect, useState } from 'react';
import { IAlbum } from './ListAlbum';
interface AddSubmitProps {
    audio: File;
    image: File;
    name: string;
    desc: string;
    album: string;
}

function AddSong() {
    const addSongFormConfig: FormConfig = {
        upload: [
            {
                key: 'audio',
                label: '上传歌曲',
                uploadAccept: 'audio/*',
                uploadBGImage: assets.upload_song,
                options: {
                    required: '请上传歌曲'
                }
            },
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
                key: 'name',
                label: '歌曲名称',
                placeholder: '请输入歌曲名称',
                type: 'text',
                options: {
                    required: '请输入歌曲名称'
                }
            },
            {
                key: 'desc',
                label: '相关描述',
                placeholder: '请输入歌曲相关描述',
                type: 'text',
                options: {
                    required: '请输入歌曲相关描述'
                }
            },
            {
                key: 'album',
                label: '专辑',
                placeholder: '请选择所属的专辑',
                type: 'select',
                options: {
                    required: '请选择所属的专辑'
                },
                choices: [
                    {
                        value: 'none',
                        label: '无'
                    }
                ]
            }
        ]
    };
    const [formConfig, setFormConfig] = useState<FormConfig>(addSongFormConfig);

    useEffect(() => {
        const albumResponse = getAlbumList<IQueryList<IAlbum[]>>({ pageIndex: 1, pageSize: 100 });
        albumResponse.then(response => {
            if (response.data) {
                const choices = response.data.itemList.map(album => ({
                    value: album.name,
                    label: album.name
                }));
                setFormConfig(prevConfig => ({
                    ...prevConfig,
                    input: prevConfig.input.map(input => {
                        if (input.key === 'album') {
                            return {
                                ...input,
                                choices: [
                                    {
                                        value: 'none',
                                        label: '无'
                                    },
                                    ...choices
                                ]
                            };
                        }
                        return input;
                    })
                }));
            }
        });
    }, []);

    async function onSubmit(data: AddSubmitProps, reset: (data?: AddSubmitProps) => void) {
        try {
            console.log(data);
            await addSong(data);
            showMessage({
                type: 'success',
                message: '添加成功',
                position: 'topEnd'
            });
            reset();
        } catch (error: any) {
            console.error(error);
            showMessage({
                type: 'error',
                message: error.message,
                position: 'topEnd'
            });
        }
    }
    return (
        <Form onSubmit={onSubmit}>
            <Form.UploadFieldList fieldConfigList={formConfig.upload} />
            <Form.FieldList fieldConfigList={formConfig.input} />
            <Form.SubmitButton defaultText="确认提交" />
        </Form>
    );
}

export default AddSong;
