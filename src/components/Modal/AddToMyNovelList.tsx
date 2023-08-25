import { useState } from "react";
import { closeModal, openModal } from "store/clientSlices/modalSlice";

import Icon from "assets/Icon";
import { handleNovelIdToAddToList } from "store/clientSlices/userNovelListSlice";
import { useAddNovelToListMutation, useGetMyNovelListQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
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
  const myNovelListResult = useGetMyNovelListQuery(undefined);

  const [addNovelToList, addNovelToListResult] = useAddNovelToListMutation();

  const novelIdToAdd = useAppSelector((state) => state.userNovelList.novelIdToAddToList);

  // add a novel to one or more lists selected
  const [listsSelected, setListsSelected] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const closeAndInitialize = () => {
    dispatch(closeModal());

    dispatch(handleNovelIdToAddToList(""));
  };
  const handleToAddNovelToLists = async () => {
    if (!novelIdToAdd) {
      alert("담을 소설이 없습니다");
      return;
    }

    if (!listsSelected.length) {
      alert("리스트를 선택해 주세요");
      return;
    }

    if (addNovelToListResult.isLoading) return;

    await addNovelToList({ novelId: novelIdToAdd, listIDs: listsSelected });

    // novels in the list are updated automatically used in list detailed page

    if (addNovelToListResult.isError) {
      alert("리스트에 담을 수 없습니다. 새로고침 후 시도해보세요");
      return;
    }

    closeAndInitialize();
  };

  return (
    <TranslucentBG onClick={closeAndInitialize}>
      {myNovelListResult.isFetching && <Spinner styles="fixed" />}
      <ModalBox
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
        }}
      >
        <ContentContnr>
          <ModalTitle>리스트에 담기</ModalTitle>
        </ContentContnr>
        <GuideContainer>
          <ContainerToCreateNewList onClick={() => dispatch(openModal("writeNewListTitle"))}>
            <Icon.IconBox styles="margin-top: -2px;">
              <Icon.Plus />
            </Icon.IconBox>
            <GuideText>새 리스트</GuideText>
          </ContainerToCreateNewList>
          <GuideText onClick={handleToAddNovelToLists}>완료</GuideText>
        </GuideContainer>
        <MyListsContainer>
          {myNovelListResult.data?.map((_) => (
            <MyList>
              <Icon.IconBox
                onClick={() => {
                  // remove the list if it was selected already
                  if (listsSelected.includes(_.novelListId)) {
                    const nextLists = listsSelected.filter((__) => __ !== _.novelListId);
                    setListsSelected(nextLists);
                    return;
                  }

                  // add the list
                  setListsSelected((prev) => [...prev, _.novelListId]);
                }}
              >
                {listsSelected.includes(_.novelListId) ? (
                  <Icon.CheckBoxSelected />
                ) : (
                  <Icon.CheckBoxOutline />
                )}
              </Icon.IconBox>

              <ListTitle>{_.novelListTitle}</ListTitle>
            </MyList>
          ))}
        </MyListsContainer>
      </ModalBox>
    </TranslucentBG>
  );
}
