import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
export default function render() {


  return (

    <Carousel>

      {img.map((item, index) => (
        <div key={index}>
          <img src={item.images} alt="Image not found" />
        </div>

      ))}

    </Carousel>
  );
}