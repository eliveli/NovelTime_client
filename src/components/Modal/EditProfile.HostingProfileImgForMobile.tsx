import { useEffect } from "react";
import { useImageHostingMutation } from "store/serverAPIs/imageHosting";

export default function HostingProfileImgForMobile({
  selectedProfileImage,
}: {
  selectedProfileImage: string | Blob | File;
}) {
  // image hosting on imgur after finishing editing the profile image
  const [ImageHosting] = useImageHostingMutation();
  const handleImageHosting = async () => {
    if (selectedProfileImage) {
      const formData = new FormData();
      const imageBase64orFile =
        typeof selectedProfileImage === "string"
          ? selectedProfileImage.split(",")[1]
          : selectedProfileImage;

      formData.append("image", imageBase64orFile);

      await ImageHosting(formData)
        .then((result) => {
          console.log("image result: ", result.data.data.link);
        })
        .catch((err) => {
          console.log("after requesting image hosting, err:", err);
          alert("10MB까지 저장 가능합니다");
        });
    }
  };

  // fix this later!!!! (not complete)
  useEffect(() => {
    handleImageHosting();
  }, []);

  return <p>이미지 저장 완료</p>;
}
