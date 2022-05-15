import { useEffect } from "react";
import { useImageHostingMutation } from "store/serverAPIs/imageHosting";

export default function HostingProfileImgForMobile({
  selectedProfileImage,
  handleNewProfileImage,
}: {
  selectedProfileImage: string | Blob | File;
  handleNewProfileImage: React.Dispatch<React.SetStateAction<boolean>>;
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
          const imageLink = result.data.data.link; // get image link from imgur
          // setSelectedProfileImage(imageLink as string);
          handleNewProfileImage(true); // show profile modal again
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
