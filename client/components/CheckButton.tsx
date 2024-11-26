import {DownloadOutlined} from '@ant-design/icons';
import {getDownloadFileName} from "@/model/ImageType";

interface prop {
    name: string,
    id: string,
    onSelectImage: (value: string, checked: boolean) => void,
    checkedImage: string[],
    onSelectImageCarousel: (value: string, checked: boolean) => void,
    flag: string,
    imageDetail: any
    image_url: string,
    unSignedUrl: string,
    imageDescription: string[]
}

export default function CheckButton({name, id, onSelectImage, checkedImage, onSelectImageCarousel, flag, image_url, unSignedUrl, imageDescription}: prop) {
    const handleChecked = (e: any) => {
        const {value, checked} = e.target;
        if (flag == 'list') {
            onSelectImage(value, checked)
        } else {
            const {value, checked} = e.target;
            onSelectImageCarousel(value, checked)
        }
    }

    const isList = (flag == 'list');
    const isChecked = checkedImage.includes(id.toString());
    const downloadUrl = `/web/media/downloadStream?s3Url=${unSignedUrl}&fileName=${getDownloadFileName(name, unSignedUrl)}`;

    function getImageNameOrDescription() {
        return <>
            {!imageDescription ?
                <label className="font-medium text-blue-700">
                    <a href={image_url} target="_blank">{name}</a>
                </label>
                : <label className="font-medium text-blue-700 image-description">
                    <a href={image_url} target="_blank">{imageDescription.map((text, idx) => <div
                        key={idx}>{text}</div>)}</a>
                </label>}
        </>;
    }

    return (
        <fieldset className="mt-3">
            <div className="flex justify-between"
                 style={{margin: "0px 10px 0px 10px"}}>
                <div className="mr-8">
                    <input
                        id={id.toString()}
                        value={id}
                        aria-describedby="comments-description"
                        type="checkbox"
                        checked={isChecked}
                        className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
                        style={{marginTop: "6px"}}
                        onChange={(e) => handleChecked(e)}
                    />
                </div>
                <div className="mr-8">
                    <a href={downloadUrl} className="text-blue-600" download>
                        <DownloadOutlined/>
                    </a>
                </div>
            </div>
            <div className="mt-1 text-sm" style={{padding: "6px"}}>
                {getImageNameOrDescription()}
            </div>
        </fieldset>
    );
}
