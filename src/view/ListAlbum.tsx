import { showMessage } from '@/component/MessageManager';
import Table from '@/component/UI/Table';
import { IQueryList } from '@/service/api';
import { deleteAlbum, getAlbumList } from '@/service/api/album';
import useSWR from 'swr';

export interface IAlbum {
    _id: string;
    name: string;
    desc: string;
    bgColor: string;
    image: string;
}
function ListAlbum() {
    const {
        data: albumListResponse,
        error,
        isLoading,
        mutate
    } = useSWR({ key: 'albumList', pageIndex: 1, pageSize: 20 }, ({ pageIndex, pageSize }) =>
        getAlbumList<IQueryList<IAlbum[]>>({ pageIndex, pageSize })
    );
    const albumList = albumListResponse?.data?.itemList || [];

    const columns = [
        {
            key: 'image',
            header: '专辑封面',
            render: (value: string) => <img className="max-h-14 w-12" src={value} alt="" />
        },
        {
            key: 'name',
            header: '专辑名字'
        },
        {
            key: 'bgColor',
            header: '专辑背景颜色',
            render: (value: string) => (
                <div
                    className="grid h-10 w-16 place-content-center rounded border border-gray-200 shadow-sm"
                    style={{ backgroundColor: value || '#ffff' }}>
                    {value}
                </div>
            )
        },
        {
            key: 'action',
            header: '操作',
            render: (value: string, rowData: IAlbum) => (
                <span className="cursor-pointer text-red-500" onClick={() => onDeleteAlbum(rowData._id)}>
                    删除
                </span>
            )
        }
    ];
    async function onDeleteAlbum(id: string) {
        try {
            const newSongListResponse = {
                ...albumListResponse!,
                data: {
                    ...albumListResponse!.data,
                    itemList: albumList.filter(song => song._id !== id)
                }
            };
            const mutateOption = {
                optimisticData: newSongListResponse,
                rollbackOnError(error: any) {
                    return error.name !== 'AbortError';
                }
            };
            await mutate(deleteAlbum({ id }), mutateOption);
            showMessage({
                type: 'success',
                message: '删除成功'
            });
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div>
            <p>所有歌曲列表</p>
            <br />
            <Table dataSource={albumList} columns={columns} isLoading={isLoading} isError={error} />
        </div>
    );
}

export default ListAlbum;
