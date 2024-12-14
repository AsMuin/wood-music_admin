import RequestConstructor from '.';

const BASEURL = '/song';

interface GetSongParams {
    pageIndex: number;
    pageSize: number;
}

const getSongList = RequestConstructor<GetSongParams>({
    method: 'get',
    url: `${BASEURL}/list`
});

interface AddSongParams {
    song: File;
    image: File;
    name: string;
    desc: string;
    album: string;
}

const addSong = RequestConstructor<AddSongParams>({
    method: 'post',
    url: `${BASEURL}/add`,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
export { getSongList, addSong };
