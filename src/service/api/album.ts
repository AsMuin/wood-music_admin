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

export { addAlbum };
