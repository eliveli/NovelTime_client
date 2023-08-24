import { useState } from "react";
import { closeModal } from "store/clientSlices/modalSlice";

import Icon from "assets/Icon";
import { useAppDispatch } from "../../store/hooks";

import {
  ModalTitle,
  ContentContnr,
  TranslucentBG,
  ModalBox,
  GuideContainer,
  GuideText,
  MyListsContainer,
  MyList,
  ListTitle,
  ContainerToCreateNewList,
} from "./Modal.styles";

export default function AddToMyNovelList() {
  const dispatch = useAppDispatch();

  // add a novel to one or more lists selected
  const [listsSelected, setListsSelected] = useState<string[]>([]);

  return (
    <TranslucentBG onClick={() => dispatch(closeModal())}>
      <ModalBox
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
        }}
      >
        <ContentContnr>
          <ModalTitle>리스트에 담기</ModalTitle>
        </ContentContnr>
        <GuideContainer>
          <ContainerToCreateNewList>
            <Icon.IconBox styles="margin-top: -2px;">
              <Icon.Plus />
            </Icon.IconBox>
            <GuideText>새 리스트</GuideText>
          </ContainerToCreateNewList>
          <GuideText>완료</GuideText>
        </GuideContainer>
        <MyListsContainer>
          {[
            { listId: "123", listTitle: "title2" },
            {
              listId: "234",
              listTitle: "리스트",
            },
            { listId: "2345", listTitle: "title3" },
          ].map((_) => (
            <MyList>
              <Icon.IconBox
                onClick={() => {
                  // remove the list if it was selected already
                  if (listsSelected.includes(_.listId)) {
                    const nextLists = listsSelected.filter((__) => __ !== _.listId);
                    setListsSelected(nextLists);
                    return;
                  }

                  // add the list
                  setListsSelected((prev) => [...prev, _.listId]);
                }}
              >
                {listsSelected.includes(_.listId) ? (
                  <Icon.CheckBoxSelected />
                ) : (
                  <Icon.CheckBoxOutline />
                )}
              </Icon.IconBox>

              <ListTitle>{_.listTitle}</ListTitle>
            </MyList>
          ))}
        </MyListsContainer>
      </ModalBox>
    </TranslucentBG>
  );
}
