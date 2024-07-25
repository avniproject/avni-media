import {imageType} from "@/model/ImageType";
import axios from "axios";
import _ from 'lodash';
import {getUserName, isDevMode} from '@/utils/ConfigUtil';

export class MediaSearchService {
    static async searchMedia(searchData: any, pageNumber: any, pageSize: any) {
        const options = {
            headers: {
                "AUTH-TOKEN": localStorage.getItem("authToken"),
            },
        };
        const response = await axios.post(
            `${process.env.NEXT_PUBLIC_ETL}/media/search?page=${pageNumber}&size=${pageSize}`,
            searchData,
        !isDevMode() ? options : {headers: {"USER-NAME" : getUserName()}}
        );
        const responseData = response.data.data;
        await Promise.all(responseData.map(async (img: imageType) => {
            if (_.isNil(img.signedThumbnailUrl))
                img.signedThumbnailUrl = img.signedUrl;
        }));
        return {data: responseData, total: responseData.length};
    }
}
