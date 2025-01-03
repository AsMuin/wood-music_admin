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
    audio: File | FileList;
    image: File | FileList;
    name: string;
    desc: string;
    album: string;
}

const addSong = RequestConstructor<AddSongParams>(
    {
        method: 'post',
        url: `${BASEURL}/add`,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    },
    {
        beforeRequest(params) {
            params.audio = (params.audio as FileList)[0];
            params.image = (params.image as FileList)[0];
        }
    }
);

interface RemoveSongParams {
    id: string;
}

const removeSong = RequestConstructor<RemoveSongParams>({
    method: 'post',
    url: `${BASEURL}/delete`
});

export { getSongList, addSong, removeSong };
