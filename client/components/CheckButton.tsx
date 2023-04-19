interface prop {
  name: string,
  id: string,
  onSelectImage: (value: string, checked: boolean) => void,
  checkedImage: string[],
  onSelectImageCarousel: (value: string, checked: boolean) => void,
  flag: string,
  imageDetail: any
}

export default function CheckButton({ name, id, onSelectImage, checkedImage, onSelectImageCarousel, flag }: prop) {
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
    <fieldset className="space-y-5">
      <legend className="sr-only">Notifications</legend>
      <div className="relative flex items-start">
        <div className="flex items-center h-5">
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
        <div className="ml-3 text-sm">
          <label htmlFor="comments" className="font-medium text-gray-700">
            {name}
          </label>
        </div>
      </div>
    </fieldset>
  )
}
