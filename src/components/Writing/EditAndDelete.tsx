import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

const EditAndDeleteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: -6px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 500;
  font-size: 14px;
`;

export default function EditAndDelete({
  clickToEdit,
  clickToDelete,
}: {
  clickToEdit: () => void;
  clickToDelete: () => void;
}) {
  return (
    <EditAndDeleteContainer>
      <Button onClick={clickToEdit}>수정</Button>
      <Button onClick={clickToDelete}>삭제</Button>
    </EditAndDeleteContainer>
  );
}
