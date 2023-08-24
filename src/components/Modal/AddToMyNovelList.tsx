import { useState } from "react";
import { closeModal } from "store/clientSlices/modalSlice";

import Icon from "assets/Icon";
import { handleNovelIdToAddToList } from "store/clientSlices/userNovelListSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

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

  const novelIdToAdd = useAppSelector((state) => state.userNovelList.novelIdToAddToList);

  // add a novel to one or more lists selected
  const [listsSelected, setListsSelected] = useState<string[]>([]);

  const closeAndInitialize = () => {
    dispatch(closeModal());

    dispatch(handleNovelIdToAddToList(""));
  };

  const handleToCreateList = () => {};

  const handleToAddNovelToLists = () => {
    closeAndInitialize();
  };

  // * get the user's novel list titles
  //    default list is required in DB
  //    if it doesn't exist, set a default one and give to user in server
  // : give _ login user's id (set in header as default)
  //   receive _ {list id , list title}[]
  // * create a novel list with title
  // : give _ new novel list title
  // * add this novel to novel lists selected
  // : give _ a novel id, novel list's titles
  //   after success _ update my novel list with provide and invalidate tags

  return (
    <TranslucentBG onClick={closeAndInitialize}>
      <ModalBox
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
        }}
      >
        <ContentContnr>
          <ModalTitle>리스트에 담기</ModalTitle>
        </ContentContnr>
        <GuideContainer>
          <ContainerToCreateNewList onClick={handleToCreateList}>
            <Icon.IconBox styles="margin-top: -2px;">
              <Icon.Plus />
            </Icon.IconBox>
            <GuideText>새 리스트</GuideText>
          </ContainerToCreateNewList>
          <GuideText onClick={handleToAddNovelToLists}>완료</GuideText>
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
