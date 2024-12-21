import RequestConstructor from '.';

const BASEURL = '/album';

interface AddAlbumParams {
    name: string;
    desc: string;

    image: File | FileList;

    bgColor: string;
}

const addAlbum = RequestConstructor<AddAlbumParams>(
    {
        method: 'post',
        url: `${BASEURL}/add`,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    },
    {
        beforeRequest(params) {
            return {
                ...params,
                image: params.image instanceof File ? params.image : params.image[0]
            };
        }
    }
);

interface GetAlbumParams {
    pageIndex: number;
    pageSize: number;
}
const getAlbumList = RequestConstructor<GetAlbumParams>({
    method: 'get',
    url: `${BASEURL}/list`
});

interface DeleteAlbumParams {
    id: string;
}

const deleteAlbum = RequestConstructor<DeleteAlbumParams>({
    method: 'post',
    url: `${BASEURL}/delete`
});
export { addAlbum, getAlbumList, deleteAlbum };
