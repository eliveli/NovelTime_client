import theme, { styled } from "assets/styles/theme";

const EditAndDeleteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: -6px;
`;

const Button = styled.button<{ buttonStyles?: string }>`
  background-color: transparent;
  border: none;
  color: rgba(0, 0, 0, 0.4);
  font-weight: 500;
  font-size: 14px;
  ${({ buttonStyles }) => buttonStyles && buttonStyles}

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;

export function EditAndDelete({
  clickToEdit,
  clickToDelete,
  buttonStyles,
}: {
  clickToEdit: () => void;
  clickToDelete: () => void;
  buttonStyles?: string;
}) {
  return (
    <EditAndDeleteContainer>
      <Button buttonStyles={buttonStyles} onClick={clickToEdit}>
        수정
      </Button>
      <Button buttonStyles={buttonStyles} onClick={clickToDelete}>
        삭제
      </Button>
    </EditAndDeleteContainer>
  );
}

export function CancelWhenEditing({ clickToCancel }: { clickToCancel: () => void }) {
  return (
    <EditAndDeleteContainer>
      <Button onClick={clickToCancel}>수정 취소</Button>
    </EditAndDeleteContainer>
  );
}
