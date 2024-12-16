import { IQueryList } from '@/service/api';
import { getSongList } from '@/service/api/song';
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
        isLoading
    } = useSWR({ key: 'songList', pageIndex: 1, pageSize: 20 }, ({ pageIndex, pageSize }) =>
        getSongList<IQueryList<ISong[]>>({ pageIndex, pageSize })
    );
    return (
        <div>
            <p>所有歌曲列表</p>
            <br />
            <div>
                <div className="hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 border border-gray-300 bg-gray-100 p-3 text-sm font-bold text-black sm:grid">
                    <b>图片</b>
                    <b>名字</b>
                    <b>专辑</b>
                    <b>音频时长</b>
                    <b>操作</b>
                </div>
                <div className="mt-2 grid min-h-96">
                    {isLoading ? (
                        <>
                            <div className="grid h-full place-content-center">
                                <span className="loading loading-dots w-32"></span>
                            </div>
                        </>
                    ) : error ? (
                        <div className="grid h-full place-content-center">
                            <span className="text-center text-3xl font-bold text-red-500 drop-shadow-md">请求数据出现了问题</span>
                        </div>
                    ) : (songListResponse?.data?.itemList.length || 0) <= 0 ? (
                        <div className="grid h-full place-content-center">
                            <span className="text-center text-3xl font-bold text-slate-500 drop-shadow-md">暂无数据</span>
                        </div>
                    ) : (
                        songListResponse?.data?.itemList.map(song => (
                            <div
                                key={song._id}
                                className="grid grid-cols-[1fr_1fr_1fr] items-center gap-2.5 border border-gray-300 p-3 text-sm sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr]">
                                <img className="max-h-14 w-12" src={song.image} alt="" />
                                <p>{song.name}</p>
                                <p>{song.album}</p>
                                <p>{song.duration}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ListSong;
