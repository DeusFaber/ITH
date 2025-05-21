import imgImage3 from "figma:asset/f5c2380da9c3ad79f47f1a4b5af3712e3c45ec75.png";

export default function Image3() {
  return (
    <div className="relative size-full" data-name="image 3">
      <div
        className="absolute bg-[50%_50%] bg-cover bg-no-repeat inset-0"
        data-name="image 3"
        style={{ backgroundImage: `url('${imgImage3}')` }}
      />
    </div>
  );
}