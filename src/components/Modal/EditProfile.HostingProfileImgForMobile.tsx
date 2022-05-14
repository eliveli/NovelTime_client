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

      formData.append("image", imageBase64orFile);

      await ImageHosting(formData);
      // .then((data) => data.json())
      // .then((data) => {
      //   console.log("image link from imgur : ", data.data.link);
      // });
    }
    // 에러 처리도 하자
    console.log("after requesting image hosting, error:", error);
  };

  useEffect(() => {
    handleImageHosting();
  }, []);

  return <p>이미지 저장 완료</p>;
}
