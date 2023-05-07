import{DownloadOutlined} from '@ant-design/icons';
interface prop {
  name: string,
  id: string,
  onSelectImage: (value: string, checked: boolean) => void,
  checkedImage: string[],
  onSelectImageCarousel: (value: string, checked: boolean) => void,
  flag: string,
  imageDetail: any
  image_url: string
}

export default function CheckButton({ name, id, onSelectImage, checkedImage, onSelectImageCarousel, flag,image_url }: prop) {
  const handleChecked = (e: any) => {
    const { value, checked } = e.target;
    if (flag == 'list') {
      onSelectImage(value, checked)
    } else {
      const { value, checked } = e.target;
      onSelectImageCarousel(value, checked)
    }
  }

  const isChecked = checkedImage.includes(id.toString());

  return (
    <fieldset className="mt-5">
      <div className="flex justify-between">
        <div className="">
          <input
            id={id.toString()}
            value={id}
            aria-describedby="comments-description"
            type="checkbox"
            checked={isChecked}
            className="focus:ring-teal-500 h-4 w-4 text-teal-600 border-gray-300 rounded"
            onChange={(e) => handleChecked(e)}
          />
        </div>
        <div className="mr-3">
          <a href={image_url}>
            <DownloadOutlined />
          </a>
        </div>
      </div>
      <div className="mt-1 text-sm">
        <label className="font-medium text-gray-700">{name}</label>
      </div>
    </fieldset>
  );
}
