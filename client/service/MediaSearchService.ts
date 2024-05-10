import {imageType} from "@/model/ImageType";
import axios from "axios";
import _ from 'lodash';

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
            options
        );
        const responseData = response.data.data;
        await Promise.all(responseData.map(async (img: imageType) => {
            if (_.isNil(img.signedThumbnailUrl))
                img.signedThumbnailUrl = img.signedUrl;
        }));
        return {data: responseData, total: responseData.length};
    }
}
