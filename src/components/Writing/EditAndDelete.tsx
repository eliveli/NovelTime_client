import { styled } from "assets/styles/theme";

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

export function EditAndDelete({
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

export function CancelWhenEditing({ clickToCancel }: { clickToCancel: () => void }) {
  return (
    <EditAndDeleteContainer>
      <Button onClick={clickToCancel}>취소</Button>
    </EditAndDeleteContainer>
  );
}
