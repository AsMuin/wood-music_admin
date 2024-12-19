import { showMessage } from '@/component/MessageManager';
import { IQueryList } from '@/service/api';
import { getSongList, removeSong } from '@/service/api/song';
import Table from '@/component/UI/Table';
import useSWR from 'swr';

export interface ISong {
    _id: string;
    name: string;
    desc: string;
    album: string;
    image: string;
    file: string;
    duration: string;
}

function ListSong() {
    const {
        data: songListResponse,
        error,
        isLoading,
        mutate
    } = useSWR({ key: 'songList', pageIndex: 1, pageSize: 20 }, ({ pageIndex, pageSize }) =>
        getSongList<IQueryList<ISong[]>>({ pageIndex, pageSize })
    );
    const songList = songListResponse?.data?.itemList || [];

    const columns = [
        {
            key: 'image',
            header: '图片',
            render: (value: string) => <img className="max-h-14 w-12" src={value} alt="" />
        },
        {
            key: 'name',
            header: '名字'
        },
        {
            key: 'album',
            header: '专辑'
        },
        {
            key: 'duration',
            header: '音频时长'
        },
        {
            key: 'action',
            header: '操作',
            render: (value: string, rowData: ISong) => (
                <span className="cursor-pointer text-red-500" onClick={() => onDeleteSong(rowData._id)}>
                    删除
                </span>
            )
        }
    ];
    async function onDeleteSong(id: string) {
        try {
            const newSongListResponse = {
                ...songListResponse!,
                data: {
                    ...songListResponse!.data,
                    itemList: songList.filter(song => song._id !== id)
                }
            };
            const mutateOption = {
                optimisticData: newSongListResponse,
                rollbackOnError(error: any) {
                    return error.name !== 'AbortError';
                }
            };
            await mutate(removeSong({ id }), mutateOption);
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
            <Table dataSource={songList} columns={columns} isLoading={isLoading} isError={error} />
        </div>
    );
}

export default ListSong;
