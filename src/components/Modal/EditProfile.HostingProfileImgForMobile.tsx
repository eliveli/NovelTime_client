import { useEffect } from "react";
import { useImageHostingMutation } from "store/serverAPIs/imageHosting";

export default function HostingProfileImgForMobile({
  selectedProfileImage,
  setNewProfileImage,
  handleEditedImage,
}: {
  selectedProfileImage: string;
  setNewProfileImage: React.Dispatch<React.SetStateAction<string>>;
  handleEditedImage: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // image hosting on imgur after finishing editing the profile image
  const [ImageHosting] = useImageHostingMutation();
  const handleImageHosting = async () => {
    if (selectedProfileImage) {
      const formData = new FormData();
      const imageBase64 = selectedProfileImage.split(",")[1];

      formData.append("image", imageBase64);

      await ImageHosting(formData)
        .unwrap()
        .then((result) => {
          const imageLink = result.link; // get image link from imgur
          setNewProfileImage(imageLink);
          handleEditedImage(true); // show profile modal
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
