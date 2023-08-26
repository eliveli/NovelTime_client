import { useEffect, useRef, useState } from "react";
import { closeModal, openModal } from "store/clientSlices/modalSlice";

import Icon from "assets/Icon";
import { handleNovelIdToAddToList } from "store/clientSlices/userNovelListSlice";
import {
  useAddOrRemoveNovelInListMutation,
  useGetMyNovelListQuery,
} from "store/serverAPIs/novelTime";
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
  const novelIdToAdd = useAppSelector((state) => state.userNovelList.novelIdToAddToList);
  const userName = useAppSelector((state) => state.user.loginUserInfo.userName);

  const myNovelListResult = useGetMyNovelListQuery({
    novelId: novelIdToAdd,
    userName,
  });
  const [addOrRemoveNovelInList, addOrRemoveNovelInListResult] =
    useAddOrRemoveNovelInListMutation();

  const [listsSelected, handleListsSelected] = useState<string[]>([]);

  const initialListsContainingTheNovel = useRef<string[]>([]);

  // set the list that contains the novel already
  useEffect(() => {
    if (!myNovelListResult.data) return;

    const listsContainingTheNovel = myNovelListResult.data.map((_) => {
      if (_.isContaining) {
        return _.novelListId;
      }
    });

    const listsWithoutUndefined = listsContainingTheNovel.filter((__) => !!__);

    initialListsContainingTheNovel.current = listsWithoutUndefined as string[];

    handleListsSelected(listsWithoutUndefined as string[]);
  }, [myNovelListResult.data]);

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

    if (addOrRemoveNovelInListResult.isLoading) return;

    const initialLists = initialListsContainingTheNovel.current;

    let listIDsToRemoveNovel: string[] = [];
    let listIDsToAddNovel: string[] = [];

    if (!initialLists.length) {
      listIDsToAddNovel = listsSelected;
    } else {
      listIDsToRemoveNovel = initialLists.filter((_) => !listsSelected.includes(_));

      listIDsToAddNovel = listsSelected.filter((_) => !initialLists.includes(_));
    }

    await addOrRemoveNovelInList({
      novelId: novelIdToAdd,
      listIDsToAddNovel,
      listIDsToRemoveNovel,
      userName,
    });

    // novels in the list are updated with provide and invalidate tags

    if (addOrRemoveNovelInListResult.isError) {
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
            <MyList key={_.novelListId}>
              <Icon.IconBox
                onClick={() => {
                  // remove the list if it was selected already
                  if (listsSelected.includes(_.novelListId)) {
                    const nextLists = listsSelected.filter((__) => __ !== _.novelListId);
                    handleListsSelected(nextLists);
                    return;
                  }

                  // add the list
                  handleListsSelected((prev) => [...prev, _.novelListId]);
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
