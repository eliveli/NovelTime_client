import { useEffect } from "react";
import { useImageHostingMutation } from "store/serverAPIs/imageHosting";

export default function HostingProfileImgForMobile({
  selectedProfileImage,
}: {
  selectedProfileImage: string | Blob | File;
}) {
  // image hosting on imgur after finishing editing the profile image
  const [ImageHosting, { isLoading, data, error }] = useImageHostingMutation();
  const handleImageHosting = async () => {
    if (selectedProfileImage) {
      const formData = new FormData();
      const imageBase64orFile =
        typeof selectedProfileImage === "string"
          ? selectedProfileImage.split(",")[1]
          : selectedProfileImage;

      // const array = [];
      // for (let i = 0; i < imageBase64.length; i += 1) {
      //   array.push(imageBase64.charCodeAt(i));
      // }
      // const imageFile = new Blob([new Uint8Array(array)], { type: "image/jpeg" });

      // const imageForHosting = selectedProfileImage.replace("image/jpeg", "image/octet-stream");

      formData.append("image", imageBase64orFile);

      console.log("formData:", formData);
      console.log("imageDataUrl:", selectedProfileImage);
      // console.log("imageForHosting:", imageForHosting);
      console.log("imageBase64orFile:", imageBase64orFile);
      // console.log("imageFile:", imageFile);

      await ImageHosting(formData);
      // .then((data) => data.json())
      // .then((data) => {
      //   console.log("image link from imgur : ", data.data.link);
      // });
    }
    // 에러 처리도 하자
    console.log("after requesting image hosting, isLoading:", isLoading);
    console.log("after requesting image hosting, data:", data);
    console.log("after requesting image hosting, error:", error);
  };

  useEffect(() => {
    handleImageHosting();
  }, []);

  return <p>이미지 저장 완료</p>;
}
